import API from "@/lib/axiosInstance";
import { IUserRegister } from "@/types/user";

const register = async (data: IUserRegister) => {
    try {
        const result = await API.post("/user/register", data);

        return result.data;
    } catch (error: any) {
        console.error("user register err", error);
        throw new Error(error?.response?.data || 'Failed to register user.');
    }
}

const verifyOtp = async (data: { email: string, otp: string}) => {
    try {
        const result = await API.post("/user/verify-otp", data);

        return result.data;
    } catch (error: any) {
        console.error("error verify otp", error);
        throw new Error(error || 'Invalid or expired OTP');
    }
}

const resendOtp = async (data: {email: string}) => {
    try {
        const result = await API.post("user/resend-otp", data);

        return result.data;
    } catch (error: any) {
        console.error("errro resend otp", error);
        throw new Error(error || 'Failed to resend otp');
    }
}

const login = async (data: { email: string, password: string }) => {
    try {
        const result = await API.post("user/login", data);

        if (!result.data) {
          throw new Error("No data received");
        }
        console.log('userlogin data', result.data);
        return result.data;
    } catch (error: any) {
        console.error('error use lgin', error);
        const errorMessage = error.response?.data?.message || 
                       error.message || 
                       "Login failed";
    
        // Re-throw with proper error message
        throw new Error(errorMessage);
    }
} 

export {
    register,
    verifyOtp,
    resendOtp,
    login
}