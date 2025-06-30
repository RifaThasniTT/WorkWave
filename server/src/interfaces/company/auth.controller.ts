import { Request, Response } from "express";

export interface ICompanyAuthController {
    register (req: Request, res: Response): Promise<void>;
    verifyOtp(req: Request, res: Response): Promise<void>;
    resendOtp(req: Request, res: Response): Promise<void>;
}