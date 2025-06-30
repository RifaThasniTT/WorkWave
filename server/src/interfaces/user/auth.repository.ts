import { IUser } from "../../models/user.model"
import { IBaseRepository } from "../base.repository";

export interface IUserAuthRepository extends IBaseRepository<IUser>{

    findByEmail(email: string): Promise<IUser | null>;
    verifyAndUpdateUser(email: string): Promise<IUser | null>;
    updateOtp(email: string, otp: string, otpExpiry: Date): Promise<IUser | null>;
}