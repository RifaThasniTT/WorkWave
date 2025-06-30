import { inject, injectable } from "inversify";
import {ICompanyAuthController} from "../../interfaces/company/auth.controller";
import TYPES from "../../di/types";
import { ICompanyAuthService } from "../../interfaces/company/auth.service";
import { Request, Response } from "express";
import HttpStatus from "../../utils/httpstatus";
import { errorResponse, successResponse } from "../../types/types";
import logger from "../../utils/logger";

@injectable()
export default class CompanyAuthController implements ICompanyAuthController {
    constructor (
        @inject(TYPES.CompanyAuthService)
        private service: ICompanyAuthService
    ) {}

    async register(req: Request, res: Response): Promise<void> {
        try {
            const { name, email, password } = req.body;
            const kycUrl = req.file?.path; // Cloudinary returns the uploaded URL here

            if (!kycUrl) throw new Error("KYC file upload failed");
            const result = await this.service.register(name, email, password, kycUrl);
            res.status(HttpStatus.CREATED).json(successResponse("New company registered.", result));
        } catch (error) {
            const err = error as Error;
            logger.error("Error registering company", err);
            res.status(HttpStatus.BAD_REQUEST).json(errorResponse("Failed to register company", err.message))
        }
    }
    
    async verifyOtp(req: Request, res: Response): Promise<void> {
        try {
            const { email, otp } = req.body;
            const result = await this.service.verifyOtp(email, otp);
            res.status(HttpStatus.OK).json(successResponse(result.message, null));
        } catch (error) {
            const err = error as Error;
            logger.error("Failed to verify otp", err);
            res.status(HttpStatus.BAD_REQUEST).json(errorResponse("Failed to verify otp", err.message));
        }
    }
    
    async resendOtp(req: Request, res: Response): Promise<void> {
        try {
            console.log('resend comp otp', req.body)
            const { email } = req.body;
            const result = await this.service.resendOtp(email);
            res.status(HttpStatus.OK).json(successResponse(result.message, null));
        } catch (error) {
            const err = error as Error;
            logger.error("Failed to resend OTP", err);
            res.status(HttpStatus.BAD_REQUEST).json(errorResponse("Failed to resend otp", err.message));
        }
    }
}