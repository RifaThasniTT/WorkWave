import { CompanyProfileDto } from "../../types/dtos";

export interface ICompanyProfileRepository {
    getProfile(companyId: string): Promise<CompanyProfileDto | null>
}