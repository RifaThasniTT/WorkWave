import { inject, injectable } from "inversify";
import bcrypt from "bcrypt";
import { ICompanyAuthService } from "../../interfaces/company/auth.service";
import TYPES from "../../di/types";
import { ICompanyAuthRepository } from "../../interfaces/company/auth.repository";
import logger from "../../utils/logger";
import { sentOtpEmail } from "../../utils/emailService";
import { generateTokens } from "../../utils/token";

@injectable()

export default class CompanyAuthService implements ICompanyAuthService {
    constructor (
        @inject(TYPES.CompanyAuthRepository)
        private repository: ICompanyAuthRepository
    ) {}

    async register(name: string, email: string, password: string, kyc: string): Promise<{ message: string; companyId: string; }> {
        const existing = await this.repository.findByEmail(email);
        if (existing) {
            throw new Error("Company email already registered!");
        }

        const saltRounds = parseInt(process.env.SALT_ROUNDS ||'10');
        const hashPassword = await bcrypt.hash(password, saltRounds);
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = new Date(Date.now() + 2 * 60 * 1000);
        logger.debug(`otp is ${otp} expires in ${otpExpiry}`);

        const newCompany = await this.repository.create({
            name,
            email,
            password: hashPassword,
            kyc,
            isVerified: false,
            isBlocked: false,
            otp,
            otpExpiry,
            status: "pending"
        });

        await sentOtpEmail(email, otp)
        return { message: "Company registered. OTP sent for verifcation.", companyId: (newCompany._id as string).toString()}
    }

    async verifyOtp(email: string, otp: string): Promise<{ message: string; }> {
        const company = await this.repository.findByEmail(email);
        if (!company) {
            throw new Error("Company not found!");
        }

        if (company.otp !== otp || !company.otpExpiry || company.otpExpiry.getTime() < Date.now()) {
            throw new Error("Invalid or expired OTP!");
        }

        await this.repository.verifyAndUpdateCompany(email);
        return { message: "OTP verified successfully!"};
    }

    async resendOtp(email: string): Promise<{ message: string; }> {
        const company = await this.repository.findByEmail(email);
        if (!company) {
            throw new Error("Company not found!");
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = new Date(Date.now() + 2 * 60 * 1000);
        await this.repository.updateOtp(email, otp, otpExpiry);
        await sentOtpEmail(email, otp);

        return { message: "New OTP sent to email"};
    }

    async login(email: string, password: string): Promise<{ accessToken: string; refreshToken: string; companyId: string; }> {
        const company = await this.repository.findByEmail(email);

        if (!company) {
            logger.warn("Company doesn't exist!");
            throw new Error("Company not found!");
        }

        if (!company.isVerified) {
            logger.warn("Company email is not verified!");
            throw new Error("Please verify your email via OTP");
        }

        if (company.status !== "approved") {
            logger.warn("Company not approved!");
            throw new Error("Your company is not approved by the admin!");
        }

        if (company.isBlocked) {
            logger.warn("Blocked company trying to login!");
            throw new Error("Your company has been blocked!");
        }

        const isValidPassword = await bcrypt.compare(password, company.password);
        if (!isValidPassword) {
            logger.warn("Invalid credentials");
            throw new Error("Invalid credentials");
        }

        const { accessToken, refreshToken } = generateTokens((company._id as string).toString(), "company");
        logger.info("Company logged in successfully!");

        return { accessToken, refreshToken, companyId: (company._id as string).toString()}
    }

}