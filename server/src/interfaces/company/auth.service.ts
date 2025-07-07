export interface ICompanyAuthService {
    register(name: string, email: string, password: string, kyc: string): Promise<{ message: string; companyId: string; }>;
    verifyOtp(email: string, otp: string): Promise<{ message: string }>;
    resendOtp(email: string): Promise<{ message: string }>;
    login(email: string, password: string): Promise<{ accessToken: string; refreshToken: string; companyId: string }>;
}