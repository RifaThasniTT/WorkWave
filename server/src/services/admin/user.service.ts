import { inject, injectable } from "inversify";
import { IAdminUserService } from "../../interfaces/admin/user.service";
import TYPES from "../../di/types";
import { IAdminUserRepository } from "../../interfaces/admin/user.repository";
import { IUser } from "../../models/user.model";
import bcrypt from "bcrypt";
import { generateTokens } from "../../utils/token";
import { listUsers } from "../../types/dtos";

@injectable()
export default class AdminUserService implements IAdminUserService {
    constructor(
        @inject(TYPES.AdminUserRepository)
        private repository: IAdminUserRepository
    ) {}

    async getUsers(search: string, page: number, limit: number): Promise<{ users: listUsers[]; total: number; }> {
        const { users, total} = await this.repository.listUsers(search, page, limit);

        const userDTOs: listUsers[] = users.map((user: IUser) => ({
            _id: user._id.toString(),
            name: user.name,
            email: user.email,
            isBlocked: user.isBlocked,
            createdAt: user.createdAt,
        }))

        return { users: userDTOs, total };
    }

    async blockUnblockUser(userId: string, isBlocked: boolean): Promise<IUser | null> {
        return this.repository.updateUserBlockStatus(userId, isBlocked);
    }

    async login(email: string, password: string): Promise<{ accessToken: string, refreshToken: string }> {
        const admin = await this.repository.findByEmail(email);
        if (!admin) {
            throw new Error("Admin not found!");
        }

        const match = await bcrypt.compare(password, admin.password);
        if (!match) {
            throw new Error("Invalid credentials");
        }

        const { accessToken, refreshToken } = generateTokens((admin._id as string).toString(), "admin");

        return { accessToken, refreshToken };
    }
}