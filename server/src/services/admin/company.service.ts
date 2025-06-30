import { inject, injectable } from "inversify";
import { IAdminCompanyService } from "../../interfaces/admin/company.service";
import TYPES from "../../di/types";
import { IAdminCompanyRepository } from "../../interfaces/admin/company.repository";
import { listCompanies } from "../../types/dtos";

@injectable()
export default class AdminCompanyService implements IAdminCompanyService {
    constructor(
        @inject(TYPES.AdminCompanyRepository)
        private repository: IAdminCompanyRepository
    ) {}

    async getCompanies(search: string, page: number, limit: number): Promise<{ companies: listCompanies[]; total: number; }> {
        const { companies, total } = await this.repository.listCompanies(search, page, limit);

        const companyDto:listCompanies[] = companies.map((company) => ({
            _id: (company._id as string).toString(),
            name: company.name,
            email: company.email,
            isBlocked: company.isBlocked,
            status: company.status,
            kyc: company.kyc,
            createdAt: company.createdAt
        }))

        return { companies: companyDto, total }
    }

    async blockUnblockCompany(companyId: string, isBlocked: boolean): Promise<{ message: string; }> {
        const result = await this.repository.updateBlockStatus(companyId, isBlocked);
        return { message: "Company status updated."}
    }

    async getCompanyRequests(search: string, page: number, limit: number): Promise<{ companies: listCompanies[]; total: number; }> {
        const { companies, total } = await this.repository.listCompanyRequests(search, page, limit);

        const companyDto:listCompanies[] = companies.map((company) => ({
            _id: (company._id as string).toString(),
            name: company.name,
            email: company.email,
            isBlocked: company.isBlocked,
            status: company.status,
            kyc: company.kyc,
            createdAt: company.createdAt
        }))

        return { companies: companyDto, total }
    }

    async updateRequestStatus(companyId: string, status: "approved" | "rejected"): Promise<{ message: string; }> {
        const result = await this.repository.updateCompanyRequestStatus(companyId, status);

        if (!result) {
            throw new Error("Company not found or request already processed.");
        }

        return { message: `Company request ${status}`}
    }
}