import { inject, injectable } from "inversify";
import { BaseRepository } from "../base.respository";
import { IUser } from "../../models/user.model";
import { IUserAuthRepository } from "../../interfaces/user/auth.repository";
import TYPES from "../../di/types";
import { Model } from "mongoose";

@injectable()

export default class UserAuthRepository extends BaseRepository<IUser> implements IUserAuthRepository {
    constructor(
        @inject(TYPES.UserModel) 
        private readonly userModel: Model<IUser>
    ) {
        super(userModel);
    }

    async findByEmail(email: string): Promise<IUser | null> {
        return this.findOne({ email });
    }

    async verifyAndUpdateUser(email: string): Promise<IUser | null> {
        return this.userModel.findOneAndUpdate(
            { email },
            { isVerified: true },
            { new: true }
        )
    }

    async updateOtp(email: string, otp: string, otpExpiry: Date): Promise<IUser | null> {
        return this.userModel.findOneAndUpdate(
            { email },
            { otp, otpExpiry },
            { new: true }
        )
    }

    async updatePasswordByEmail(email: string, hashedPassword: string): Promise<void> {
        await this.userModel.updateOne({ email }, { $set: { password: hashedPassword } });
    }

}