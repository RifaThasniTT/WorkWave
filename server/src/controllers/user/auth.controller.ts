import { inject, injectable } from "inversify";
import TYPES from "../../di/types";
import UserAuthService from "../../services/user/auth.service";
import logger from "../../utils/logger";
import { Request, Response } from "express";
import HttpStatus from "../../utils/httpstatus";
import { errorResponse, successResponse } from "../../types/types";
import { StatusMessages } from "../../utils/statusMessages";
import {IUserAuthController} from "../../interfaces/user/auth.controller";


@injectable()
export default class UserAuthController implements IUserAuthController {
    constructor(
        @inject(TYPES.UserAuthService) 
        private _authService: UserAuthService
    ) {}

    async signup(req: Request, res: Response) {
        try {
            const { name, email, password } = req.body;

            const result = await this._authService.register(name, email, password);
            res.status(HttpStatus.CREATED).json(successResponse("New User Registered Successfully!", result))
        } catch (error) {
            const err = error as Error;
            logger.error(`User registering failed`, err);
            res.status(HttpStatus.BAD_REQUEST).json(errorResponse("Failed to register user", err.message));
        }
    }

    async login(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;

            const result = await this._authService.login(email, password);
            res.status(HttpStatus.OK).json(successResponse("Login successful", result));
        } catch (error) {
            const err = error as Error;
            logger.error(`Login failed`, err);
            res.status(HttpStatus.UNAUTHORIZED).json(errorResponse("Something went wrong", err.message));
        }
    }

    async verifyOtp(req: Request, res: Response): Promise<void> {
        try {
            const { email, otp } = req.body;

            const result = await this._authService.verifyOtp(email, otp);
            res.status(HttpStatus.OK).json(successResponse(result.message, null));
        } catch (error) {
            const err = error as Error;
            logger.error(`OTP verification failed`, err);
            res.status(HttpStatus.BAD_REQUEST).json(errorResponse("Invalid or expired OTP", err.message));
        }
    }

    async resendOtp(req: Request, res: Response): Promise<void> {
        try {
            const { email } = req.body;

            const result = await this._authService.resendOtp(email);
            res.status(HttpStatus.OK).json(successResponse(result.message, null));
        } catch (error) {
            const err = error as Error;
            logger.error(`OTP resent failed`, err);
            res.status(HttpStatus.BAD_REQUEST).json(errorResponse("Failed to resent otp", err.message));
        }
    }
}