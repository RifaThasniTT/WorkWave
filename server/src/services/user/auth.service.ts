import { inject, injectable } from "inversify";
import TYPES from "../../di/types";
import { IUserAuthService } from "../../interfaces/user/auth.service";
import { IUserAuthRepository } from "../../interfaces/user/auth.repository";
import logger from "../../utils/logger";
import bcrypt from "bcrypt";
import { sentOtpEmail } from "../../utils/emailService";
import { generateTokens } from "../../utils/token";

@injectable()
export default class UserAuthService implements IUserAuthService{
    constructor(
        @inject(TYPES.UserAuthRepository) 
        private userAuthRepository: IUserAuthRepository
    ) {}

    async register(name: string, email: string, password: string): Promise<{ message: string; userId: string; }> {
        const existingUser = await this.userAuthRepository.findByEmail(email);
        if (existingUser) {
            logger.warn("Email is already registered!");
            throw new Error("Email is already registered!");
        }

        const saltRounds = parseInt(process.env.SALT_ROUNDS ||'10');
        const hashPassword = await bcrypt.hash(password, saltRounds);
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = new Date(Date.now() + 2 * 60 * 1000);
        logger.debug(`otp is ${otp} expires in ${otpExpiry}`);

        const newUser = await this.userAuthRepository.create({
            name,
            email,
            password: hashPassword,
            isVerified: false,
            otp,
            otpExpiry
        });

        await sentOtpEmail(email, otp);
        return { message: "User registered successfully! OTP sent for verification", userId: newUser._id.toString()}
    }

    async verifyOtp(email: string, otp: string): Promise<{ message: string; }> {
        const user = await this.userAuthRepository.findByEmail(email);
        if (!user) {
            logger.warn(`OTP verification attempt for non-existent user: ${email}`);
            throw new Error("User not found!");
        }

        if (user.otp !== otp || !user.otpExpiry || user.otpExpiry.getTime() < Date.now()) {
            logger.warn(`Invalid or expired OTP!`);
            throw new Error('Invalid or expired OTP!');
        }
        
        logger.info(`User verified successfully`);
        await this.userAuthRepository.verifyAndUpdateUser(email);
        return { message: `OTP verified successfully!`};
    }

    async login(email: string, password: string): Promise<{ accessToken: string; refreshToken: string; userId: string; }> {
        const user = await this.userAuthRepository.findByEmail(email);
        if (!user) {
            logger.warn(`User doesn't exist`);
            throw new Error("User not found");
        }

        if (!user.isVerified) {
            logger.warn(`User email is not verified`);
            throw new Error("Please verify your email via OTP");
        }

        if (user.isBlocked) {
            logger.warn("Blocked user trying to login");
            throw new Error("Your account has been blocked!");
        }

        if (!user.password) {
            logger.warn('Invalid credentials: No password set for user');
            throw new Error('Invalid credentials!');
        }
        
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            logger.warn('Invalid credentials');
            throw new Error("Invalid credentials!");
        }

        const { accessToken, refreshToken } = generateTokens(user._id.toString(), "user");
        logger.info("User logged in successfully!");

        return { accessToken, refreshToken, userId: user._id.toString() };
    }

    async resendOtp(email: string): Promise<{ message: string; }> {
        const user = await this.userAuthRepository.findByEmail(email);
        if (!user) {
            logger.warn("Resent otp request for non existent user");
            throw new Error("User not found!");
        } 

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = new Date(Date.now() + 2 * 60 * 1000);
        
        await this.userAuthRepository.updateOtp(email, otp, otpExpiry);
        
        await sentOtpEmail(email, otp);

        logger.debug(`otp is ${otp} exprires at ${otpExpiry}`);
        return { message: `New OTP is send to email`}
    }
}