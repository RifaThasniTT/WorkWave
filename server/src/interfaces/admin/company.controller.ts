import { Request, Response } from "express";

export interface IAdminCompanyController {
    listCompanies(req: Request, res: Response): Promise<void>;
    listRequests(req: Request, res: Response): Promise<void>;
    blockOrUnblockCompany(req: Request, res: Response): Promise<void>;
    updateRequestStatus(req: Request, res: Response): Promise<void>;
}