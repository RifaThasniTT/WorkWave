import { inject, injectable } from "inversify";
import { IAdminUserController } from "../../interfaces/admin/user.controller";
import TYPES from "../../di/types";
import { Request, Response } from "express";
import { IAdminUserService } from "../../interfaces/admin/user.service";
import HttpStatus from "../../utils/httpstatus";
import { errorResponse, successResponse } from "../../types/types";
import logger from "../../utils/logger";
import { setTokensAsCookies } from "../../utils/token";

@injectable()
export default class AdminUserController implements IAdminUserController {
    constructor (
        @inject(TYPES.AdminUserService)
        private service: IAdminUserService
    ) {}

    async listUsers(req: Request, res: Response): Promise<void> {
        try {
            const search = req.query.search?.toString() || "";
            const page = parseInt(req.query.page as string) || 1;
            const limit = 10;

            const result = await this.service.getUsers(search, page, limit);
            res.status(HttpStatus.OK).json(successResponse("Users fetched", result));
        } catch (error) {
            const err = error as Error;
            logger.error("Error fetching users", err);
            res.status(HttpStatus.BAD_REQUEST).json(errorResponse("Internal server error", err.message));
        }
    }

    async blockOrUnblockUser(req: Request, res: Response): Promise<void> {
        try {
            const { userId } = req.params;
            const { isBlocked } = req.body;

            const user = await this.service.blockUnblockUser(userId, isBlocked);
            res.status(HttpStatus.OK).json(successResponse("User status updated", user));
        } catch (error) {
            const err = error as Error;
            logger.error("Error updating status", err);
            res.status(HttpStatus.BAD_REQUEST).json(errorResponse("Internal server error", err.message));
        }
    }

    async login(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;
            logger.debug(`email${email}`);
            const { accessToken, refreshToken } = await this.service.login(email, password);
            setTokensAsCookies(res, accessToken, refreshToken, "admin");
            res.status(HttpStatus.OK).json(successResponse("Admin Login successful", accessToken));
        } catch (error) {
            const err = error as Error;
            logger.error("error admin login", err);
            res.status(HttpStatus.BAD_REQUEST).json(errorResponse("Internal server error", err.message));
        }
    }

    async logout(req: Request, res: Response): Promise<void> {
        try {
            res.clearCookie("adminAccessToken");
            res.clearCookie("adminRefreshToken");

            res.status(HttpStatus.OK).json(successResponse("Admin logged out!"));
        } catch (error) {
            const err = error as Error;
            logger.error("logout adm error", err);
            res.status(HttpStatus.BAD_REQUEST).json(errorResponse("Failed to log out", err.message));
        }
    }
}