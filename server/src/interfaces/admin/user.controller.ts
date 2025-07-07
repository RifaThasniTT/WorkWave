import { Request, Response } from "express";

export interface IAdminUserController {
    listUsers(req: Request, res: Response): Promise<void>;
    blockOrUnblockUser(req: Request, res: Response): Promise<void>;
    login(req: Request, res: Response): Promise<void>;
    logout(req: Request, res: Response): Promise<void>;
}