import { Container } from "inversify";
import TYPES from "./types";
import { Model } from "mongoose";


//Controller Imports
import UserAuthController from "../controllers/user/auth.controller";
import { IUserAuthController } from "../interfaces/user/auth.controller";
import CompanyAuthController from "../controllers/company/auth.controller";
import { ICompanyAuthController } from "../interfaces/company/auth.controller";
import AdminUserController from "../controllers/admin/user.controller";
import { IAdminUserController } from "../interfaces/admin/user.controller";
import AdminCompanyController from "../controllers/admin/company.controller";
import { IAdminCompanyController } from "../interfaces/admin/company.controller";
import CompanyProfileController from "../controllers/company/profile.controller";
import { ICompanyProfileController } from "../interfaces/company/profile.controller";

//Service Imports
import UserAuthService from "../services/user/auth.service";
import { IUserAuthService } from "../interfaces/user/auth.service";
import CompanyAuthService from "../services/company/auth.service";
import { ICompanyAuthService } from "../interfaces/company/auth.service";
import AdminUserService from "../services/admin/user.service";
import { IAdminUserService } from "../interfaces/admin/user.service";
import AdminCompanyService from "../services/admin/company.service";
import { IAdminCompanyService } from "../interfaces/admin/company.service";
import CompanyProfileService from "../services/company/profile.service";
import { ICompanyProfileService } from "../interfaces/company/profile.service";

//Repository Imports
import UserAuthRepository from "../repositories/user/auth.repository";
import { IUserAuthRepository } from "../interfaces/user/auth.repository";
import CompanyAuthRepository from "../repositories/company/auth.repository";
import { ICompanyAuthRepository } from "../interfaces/company/auth.repository";
import AdminUserRepository from "../repositories/admin/user.repository";
import { IAdminUserRepository } from "../interfaces/admin/user.repository";
import AdminCompanyRepository from "../repositories/admin/company.repository";
import { IAdminCompanyRepository } from "../interfaces/admin/company.repository";
import CompanyProfileRepository from "../repositories/company/profile.repository";
import { ICompanyProfileRepository } from "../interfaces/company/profile.repository";

//Model Imports
import UserModel from "../models/user.model";
import { IUser } from "../models/user.model";
import AdminModel from "../models/admin.model";
import { IAdmin } from "../models/admin.model";
import CompanyModel from "../models/company.model";
import { ICompany } from "../models/company.model";
import EducationModel from "../models/education.model";
import { IEducation } from "../models/education.model";
import ExperienceModel from "../models/experience.model";
import { IExperience } from "../models/experience.model";
import EmployeesModel from "../models/employees.model";
import { IEmployee } from "../models/employees.model";

const container = new Container();

container.bind<IUserAuthRepository>(TYPES.UserAuthRepository).to(UserAuthRepository);
container.bind<ICompanyAuthRepository>(TYPES.CompanyAuthRepository).to(CompanyAuthRepository);
container.bind<ICompanyProfileRepository>(TYPES.CompanyProfileRepository).to(CompanyProfileRepository);
container.bind<IAdminUserRepository>(TYPES.AdminUserRepository).to(AdminUserRepository);
container.bind<IAdminCompanyRepository>(TYPES.AdminCompanyRepository).to(AdminCompanyRepository);

container.bind<IUserAuthService>(TYPES.UserAuthService).to(UserAuthService);
container.bind<ICompanyAuthService>(TYPES.CompanyAuthService).to(CompanyAuthService);
container.bind<ICompanyProfileService>(TYPES.CompanyProfileService).to(CompanyProfileService);
container.bind<IAdminUserService>(TYPES.AdminUserService).to(AdminUserService);
container.bind<IAdminCompanyService>(TYPES.AdminCompanyService).to(AdminCompanyService);

container.bind<IUserAuthController>(TYPES.UserAuthController).to(UserAuthController);
container.bind<ICompanyAuthController>(TYPES.CompanyAuthController).to(CompanyAuthController);
container.bind<IAdminUserController>(TYPES.AdminUserController).to(AdminUserController);
container.bind<IAdminCompanyController>(TYPES.AdminCompanyController).to(AdminCompanyController);
container.bind<ICompanyProfileController>(TYPES.CompanyProfileController).to(CompanyProfileController);

container.bind<Model<IUser>>(TYPES.UserModel).toConstantValue(UserModel);
container.bind<Model<IAdmin>>(TYPES.AdminModel).toConstantValue(AdminModel);
container.bind<Model<ICompany>>(TYPES.CompanyModel).toConstantValue(CompanyModel);
container.bind<Model<IEducation>>(TYPES.EducationModel).toConstantValue(EducationModel);
container.bind<Model<IExperience>>(TYPES.ExperienceModel).toConstantValue(ExperienceModel);
container.bind<Model<IEmployee>>(TYPES.EmployeesModel).toConstantValue(EmployeesModel);

export { container };