import { inject, injectable } from "inversify";
import { ICompanyProfileController } from "../../interfaces/company/profile.controller";
import TYPES from "../../di/types";
import { ICompanyAuthService } from "../../interfaces/company/auth.service";

@injectable()
export default class CompanyProfileController implements ICompanyProfileController {
    constructor (
        @inject(TYPES.CompanyProfileService)
        private service: ICompanyAuthService
    ) {}

    async getProfile(req: Request, res: Response): Promise<void> {
        
    }
}