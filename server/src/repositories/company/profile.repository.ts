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

    async updateProfile(companyId: string, data: Partial<CompanyProfileDto>): Promise<CompanyProfileDto | null> {
      const updated = await this.companyModel.findByIdAndUpdate(
        companyId,
        {
          $set: {
            name: data.name,
            logoUrl: data.logoUrl,
            website: data.website,
            foundedIn: data.foundedIn,
            employees: data.employees,
            location: data.location,
            industry: data.industry,
            about: data.about,
            phone: data.phone
          },
        },
        { new: true }
      );

      return updated as CompanyProfileDto | null;
    }

}