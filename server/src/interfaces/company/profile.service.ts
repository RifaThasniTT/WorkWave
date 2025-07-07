import { CompanyProfileDto } from "../../types/dtos";

export interface ICompanyProfileService {
    getProfile(companyId: string): Promise<CompanyProfileDto>;
    updateProfile(companyId: string, data: Partial<CompanyProfileDto>): Promise<CompanyProfileDto>;
}