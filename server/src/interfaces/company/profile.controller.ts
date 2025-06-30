export interface ICompanyProfileController {
    getProfile(req: Request, res: Response): Promise<void>
}