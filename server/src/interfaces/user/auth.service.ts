export interface IUserAuthService {

    register(name: string, email: string, password: string): Promise<{
        message: string,
        userId: string
    }>;

    verifyOtp(email: string, otp: string): Promise<{
        message: string
    }>;

    login(email: string, password: string): Promise<{
        accessToken: string;
        refreshToken: string;
        userId: string;
    }>;

    resendOtp(email: string): Promise<{
        message: string
    }>

    resetPassword(email: string, password: string): Promise<{
        message: string
    }>
}