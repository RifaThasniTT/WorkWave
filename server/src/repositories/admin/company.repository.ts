import { inject, injectable } from "inversify";
import { IAdminCompanyRepository } from "../../interfaces/admin/company.repository";
import TYPES from "../../di/types";
import { Model } from "mongoose";
import { ICompany } from "../../models/company.model";
import { IEmployee } from "../../models/employees.model";

@injectable()
export default class AdminCompanyRepository implements IAdminCompanyRepository {
    constructor (
        @inject(TYPES.CompanyModel)
        private companyModel: Model<ICompany>,
        @inject(TYPES.EmployeesModel)
        private employeeModel: Model<IEmployee>
    ) {}

    async listCompanies(search: string, page: number, limit: number): Promise<{ companies: ICompany[]; total: number; }> {
        const query: any = { status: "approved" };

        if (search) {
          query.name = { $regex: new RegExp(search, "i") };
        }
        
        const total = await this.companyModel.countDocuments(query);
        const companies = await this.companyModel
            .find(query)
            .skip((page - 1) * limit)
            .limit(limit);

        return { companies, total };
    }

    async updateBlockStatus(companyId: string, isBlocked: boolean): Promise<ICompany | null> {
        return this.companyModel.findByIdAndUpdate(companyId, { isBlocked }, { new: true });
    }

    async listCompanyRequests(search: string, page: number, limit: number): Promise<{ companies: ICompany[]; total: number; }> {
        const query = search ? { name: { $regex: new RegExp(search, "i") } } : {};

        const total = await this.companyModel.countDocuments(query);
        const companies = await this.companyModel
            .find(query)
            .skip((page - 1) * limit)
            .limit(limit);

        return { companies, total };
    }

    async updateCompanyRequestStatus(companyId: string, status: "approved" | "rejected"): Promise<ICompany | null> {
        const company = await this.companyModel.findById(companyId);

        if (!company || company.status !== "pending") {
            return null;
        }

        company.status = status;
        await company.save();

        if (status === "approved") {
            await this.employeeModel.create({
                name: company.name,
                email: company.email,
                password: company.password,
                companyId: company._id,
                role: "admin",
                status: "active",
                isSubscribed: false,
            });
        }

        return company;
    }
}