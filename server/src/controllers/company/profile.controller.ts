import { inject, injectable } from "inversify";
import { ICompanyProfileController } from "../../interfaces/company/profile.controller";
import TYPES from "../../di/types";
import { AuthenticatedRequest } from "../../middleware/adminAuth.middleware";
import HttpStatus from "../../utils/httpstatus";
import { errorResponse, successResponse } from "../../types/types";
import { Response } from "express";
import { ICompanyProfileService } from "../../interfaces/company/profile.service";
import logger from "../../utils/logger";

@injectable()
export default class CompanyProfileController implements ICompanyProfileController {
    constructor (
        @inject(TYPES.CompanyProfileService)
        private service: ICompanyProfileService
    ) {}

    async getProfile(req: AuthenticatedRequest, res: Response): Promise<void> {
        try {
            if (!req.user) {
                res.status(HttpStatus.UNAUTHORIZED).json(errorResponse("Unauthorized copmany!", "Invalid token!"));
                return;
            }
            const id = req.user.id;

            const result = await this.service.getProfile(id);
            res.status(HttpStatus.OK).json(successResponse("Company profile details fetched", result));
        } catch (error) {
            const err = error as Error;
            logger.error("Error fetching compnay profile", err);
            res.status(HttpStatus.BAD_REQUEST).json(errorResponse("Failed to fetch profile details", err.message));
        }
    }

    async updateProfile(req: AuthenticatedRequest, res: Response): Promise<void> {
      try {
        if (!req.user) {
          res.status(HttpStatus.UNAUTHORIZED).json(errorResponse("Unauthorized company!", "Invalid token!"));
          return;
        }

        const companyId = req.user.id;
        const data = req.body;

        const logoUrl = req.file?.path;
        if (logoUrl) data.logoUrl = logoUrl;

        const updated = await this.service.updateProfile(companyId, data);
        res.status(HttpStatus.OK).json(successResponse("Company profile updated successfully", updated));
      } catch (error) {
        const err = error as Error;
        logger.error("Error updating company profile", err);
        res.status(HttpStatus.BAD_REQUEST).json(errorResponse("Failed to update profile", err.message));
      }
    }

}