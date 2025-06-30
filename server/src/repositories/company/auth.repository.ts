import { inject, injectable } from "inversify";
import { ICompanyAuthRepository } from "../../interfaces/company/auth.repository";
import { BaseRepository } from "../base.respository";
import { ICompany } from "../../models/company.model";
import TYPES from "../../di/types";
import { Model } from "mongoose";

@injectable()
export default class CompanyAuthRepository extends BaseRepository<ICompany> implements ICompanyAuthRepository {
    constructor (
        @inject(TYPES.CompanyModel) 
        private companyModel: Model<ICompany>
    ) {
        super(companyModel);
    }

    async findByEmail(email: string): Promise<ICompany | null> {
        return this.findOne({ email });
    }

    async verifyAndUpdateCompany(email: string): Promise<ICompany | null> {
        return this.companyModel.findOneAndUpdate(
            { email },
            { isVerified: true },
            { new: true }
        )
    }

    async updateOtp(email: string, otp: string, otpExpiry: Date): Promise<ICompany | null> {
        return this.companyModel.findOneAndUpdate(
            { email },
            { otp, otpExpiry },
            { new: true }
        )
    }
}