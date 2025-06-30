const TYPES = {

    BaseRepository: Symbol.for("BaseRepository"),
    
    UserAuthRepository: Symbol.for("UserAuthRepository"),
    CompanyAuthRepository: Symbol.for("CompanyAuthRepository"),
    CompanyProfileRepository: Symbol.for("CompanyProfileRepository"),
    AdminUserRepository: Symbol.for("AdminUserRepository"),
    AdminCompanyRepository: Symbol.for("AdminCompanyRepository"),

    UserAuthService: Symbol.for("UserAuthService"),
    CompanyAuthService: Symbol.for("CompanyAuthService"),
    CompanyProfileService: Symbol.for("CompanyProfileService"),
    AdminUserService: Symbol.for("AdminUserService"),
    AdminCompanyService: Symbol.for("AdminCompanyService"),

    UserAuthController: Symbol.for("UserAuthController"),
    CompanyAuthController: Symbol.for("CompanyAuthController"),
    CompanyProfileController: Symbol.for("CompanyProfileController"),
    AdminUserController: Symbol.for("AdminUserController"),
    AdminCompanyController: Symbol.for("AdminCompanyController"),

    UserModel: Symbol.for("UserModel"),
    AdminModel: Symbol.for("AdminModel"),
    CompanyModel: Symbol.for("CompanyModel"),
    EducationModel: Symbol.for("EducaitonModel"),
    ExperienceModel: Symbol.for("ExperienceModel"),
    EmployeesModel: Symbol.for("EmployeesModel"),

    
}

export default TYPES;