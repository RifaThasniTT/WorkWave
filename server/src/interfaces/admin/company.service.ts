import { ICompany } from "../../models/company.model";
import { listCompanies } from "../../types/dtos";

export interface IAdminCompanyService {
    getCompanies(search: string, page: number, limit: number): Promise<{ companies: listCompanies[], total: number }>;
    blockUnblockCompany(companyId: string, isBlocked: boolean): Promise<{ message: string }>;
    getCompanyRequests(search: string, page: number, limit: number): Promise<{ companies: listCompanies[]; total: number }>
    updateRequestStatus(companyId: string, status: "approved" | "rejected"): Promise<{ message: string }>
}