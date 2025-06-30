import { ICompany } from "../../models/company.model";
import { IBaseRepository } from "../base.repository";

export interface ICompanyAuthRepository extends IBaseRepository<ICompany> {
    findByEmail(email: string): Promise<ICompany | null>;
    verifyAndUpdateCompany(email: string): Promise<ICompany | null>;
    updateOtp(email: string, otp: string, otpExpiry: Date): Promise<ICompany | null>;
}