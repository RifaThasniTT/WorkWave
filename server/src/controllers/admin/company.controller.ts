import { inject, injectable } from "inversify";
import { IAdminCompanyController } from "../../interfaces/admin/company.controller";
import TYPES from "../../di/types";
import { IAdminCompanyService } from "../../interfaces/admin/company.service";
import { Request, Response } from "express";
import HttpStatus from "../../utils/httpstatus";
import { errorResponse, successResponse } from "../../types/types";
import logger from "../../utils/logger";

@injectable()
export default class AdminCompanyController implements IAdminCompanyController {
    constructor(
        @inject(TYPES.AdminCompanyService)
        private service: IAdminCompanyService
    ) {}

    async listCompanies(req: Request, res: Response): Promise<void> {
        try {
            logger.debug('listing companies')
            const search = (req.query.search as string || "");
            const page = parseInt(req.query.page as string) || 1;
            const limit = 10;

            const result = await this.service.getCompanies(search, page, limit);
            logger.debug(result);
            res.status(HttpStatus.OK).json(successResponse("Companies fetched", result));
        } catch (error) {
            const err = error as Error;
            logger.error("Error fetching companies", err)
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(errorResponse("Something went wrong", err.message))
        }
    }

    async blockOrUnblockCompany(req: Request, res: Response): Promise<void> {
        try {
            const { companyId } = req.params;
            const { isBlocked } = req.body;

            const result = await this.service.blockUnblockCompany(companyId, isBlocked);

            res.status(HttpStatus.OK).json(successResponse(`Company ${isBlocked ? "blocked" : "unblocked"} successfully`))
        } catch (error) {
            const err = error as Error;
            logger.error("Error updating company status", err);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(errorResponse("Something went wrong", err.message));
        }
    }

    async listRequests(req: Request, res: Response): Promise<void> {
        try {
            logger.debug('request listing...');
            const search = (req.query.search as string) || "";
            const page = parseInt(req.query.page as string) || 1;
            const limit = 10;

            const result = await this.service.getCompanyRequests(search, page, limit);
            res.status(HttpStatus.OK).json(successResponse("Company requests fetched", result));
        } catch (error) {
            const err = error as Error;
            logger.error("Error fetching company requests", err);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(errorResponse("Something went wrong", err.message));
        }
    }

    async updateRequestStatus(req: Request, res: Response): Promise<void> {
        try {
            const { companyId } = req.params;
            logger.debug('updating request stauts', req.body);
            const { status } = req.body;
            
            if (!["approved", "rejected"].includes(status)) {
                res.status(HttpStatus.BAD_REQUEST).json(errorResponse("Invalid status"));
            }

            const result = await this.service.updateRequestStatus(companyId, status as "approved" | "rejected");

            res.status(HttpStatus.OK).json(successResponse(result.message));

        } catch (error) {
            const err = error as Error;
            logger.error("Error updating company request status", err);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(errorResponse("Something went wrong", err.message));
        }
    }
}

