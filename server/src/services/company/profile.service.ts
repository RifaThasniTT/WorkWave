import { inject, injectable } from "inversify";
import { ICompanyProfileService } from "../../interfaces/company/profile.service";
import TYPES from "../../di/types";
import { ICompanyProfileRepository } from "../../interfaces/company/profile.repository";
import { CompanyProfileDto } from "../../types/dtos";

@injectable()
export default class CompanyProfileService implements ICompanyProfileService {
    constructor (
        @inject(TYPES.CompanyProfileRepository)
        private repository: ICompanyProfileRepository
    ) {}

    async getProfile(companyId: string): Promise<CompanyProfileDto> {
        const profile = await this.repository.getProfile(companyId);

        if (!profile) {
            throw new Error("Company not found!");
        }

        return profile;
    }
}