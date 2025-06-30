import { CompanyProfileDto } from "../../types/dtos";

export interface ICompanyProfileService {
    getProfile(companyId: string): Promise<CompanyProfileDto>;
}