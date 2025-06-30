import { IAdmin } from "../../models/admin.model";
import { IUser } from "../../models/user.model";

export interface IAdminUserRepository {
    listUsers(search: string, page: number, limit: number): Promise<{ users: IUser[], total: number }>;
    updateUserBlockStatus(userId: string, isBlocked: boolean): Promise<IUser | null>;
    findByEmail(email: string): Promise<IAdmin | null>;
}