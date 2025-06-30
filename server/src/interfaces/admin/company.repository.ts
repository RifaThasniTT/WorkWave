import { ICompany } from "../../models/company.model";

export interface IAdminCompanyRepository {
  listCompanies(search: string, page: number, limit: number): Promise<{ companies: ICompany[]; total: number }>;
  updateBlockStatus(companyId: string, isBlocked: boolean): Promise<ICompany | null>;
  listCompanyRequests(search: string, page: number, limit: number): Promise<{ companies: ICompany[]; total: number }>;
  updateCompanyRequestStatus(companyId: string, status: "approved" | "rejected"): Promise<ICompany | null>;
}