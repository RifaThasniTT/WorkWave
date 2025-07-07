import API from "@/lib/axiosInstance";
import { IUserRegister } from "@/types/user";
import { isAxiosError } from "axios";

const register = async (data: IUserRegister) => {
    try {
        const result = await API.post("/user/register", data);

        return result.data;
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error?.response?.data?.error || 'Failed to register user.');
        }
        throw new Error("Something went wrong!");
    }
}

const verifyOtp = async (data: { email: string, otp: string}) => {
    try {
        const result = await API.post("/user/verify-otp", data);

        return result.data;
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error?.response?.data?.error || 'Invalid or expired OTP');
        }
        throw new Error("Something went wrong!");
    }
}

const resendOtp = async (data: {email: string}) => {
    try {
        const result = await API.post("user/resend-otp", data);

        return result.data;
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error?.response?.data?.error || 'Failed to resend otp');
        }
        throw new Error("Something went wrong!");
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
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error?.response?.data?.error || "Failed to login user!");
        }
        throw new Error("Something went wrong!");
    }
} 

const resetPassword = async (data: { email: string, password: string }) => {
    try {
        const result = await API.patch("user/reset-password", data);

        if (!result.data) {
            throw new Error("No data recieved");
        }
        console.log("rest paswd", result.data);
        return result.data;
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error?.response?.data?.error || "Failed to reset password!");
        }
        throw new Error("Something went wrong!");
    }
}

export {
    register,
    verifyOtp,
    resendOtp,
    login,
    resetPassword
}