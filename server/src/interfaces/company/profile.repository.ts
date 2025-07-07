import { CompanyProfileDto } from "../../types/dtos";

export interface ICompanyProfileRepository {
    getProfile(companyId: string): Promise<CompanyProfileDto | null>;
    updateProfile(companyId: string, data: Partial<CompanyProfileDto>): Promise<CompanyProfileDto | null>;
}