import { IUser } from "../../models/user.model";
import { listUsers } from "../../types/dtos";

export interface IAdminUserService {
    getUsers(search: string, page: number, limit: number): Promise<{ users: listUsers[], total: number }>;
    blockUnblockUser(userId: string, isBlocked: boolean): Promise<IUser | null>;
    login(email: string, password: string): Promise<{ accessToken: string, refreshToken: string }>;
}