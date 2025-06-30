import { inject, injectable } from "inversify";
import { ICompanyProfileRepository } from "../../interfaces/company/profile.repository";
import TYPES from "../../di/types";
import { Model } from "mongoose";
import { ICompany } from "../../models/company.model";
import { CompanyProfileDto } from "../../types/dtos";

@injectable()
export default class CompanyProfileRepository implements ICompanyProfileRepository {
    constructor (
        @inject(TYPES.CompanyModel)
        private companyModel: Model<ICompany>
    ) {}

    async getProfile(companyId: string): Promise<CompanyProfileDto | null> {
        const company = await this.companyModel.findById(companyId).select(
          "_id name email logoUrl website foundedIn location about employees industry phone"
        );

        return company as CompanyProfileDto | null;
    }
}