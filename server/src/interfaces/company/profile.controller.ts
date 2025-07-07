import { Response } from "express";
import { AuthenticatedRequest } from "../../middleware/adminAuth.middleware";

export interface ICompanyProfileController {
    getProfile(req: AuthenticatedRequest, res: Response): Promise<void>;
    updateProfile(req: AuthenticatedRequest, res: Response): Promise<void>;
}