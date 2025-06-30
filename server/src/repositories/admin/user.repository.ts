import { inject, injectable } from "inversify";
import { IAdminUserRepository } from "../../interfaces/admin/user.repository";
import TYPES from "../../di/types";
import { IUser } from "../../models/user.model";
import { Model } from "mongoose";
import { BaseRepository } from "../base.respository";
import { IAdmin } from "../../models/admin.model";

@injectable()

export default class AdminUserRepository implements IAdminUserRepository {
    constructor(
        @inject(TYPES.UserModel)
        private userModel: Model<IUser>,
        @inject(TYPES.AdminModel)
        private adminModel: Model<IAdmin>
    ) {
        
    }

    async listUsers(search: string, page: number, limit: number): Promise<{users: IUser[], total: number}> {
        const query = search ? { name: { $regex: new RegExp(search, 'i') } } : {};

        const total = await this.userModel.countDocuments(query);
        const users = await this.userModel.find(query)
            .skip((page - 1) * limit)
            .limit(limit);

        return { users, total };
    }

    async updateUserBlockStatus(userId: string, isBlocked: boolean): Promise<IUser | null> {
        return this.userModel.findByIdAndUpdate(userId, { isBlocked }, { new: true });
    }

    async findByEmail(email: string): Promise<IAdmin | null> {
        return this.adminModel.findOne({ email });
    }
}