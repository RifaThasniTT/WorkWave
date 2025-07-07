import API from "@/lib/axiosInstance";
import { isAxiosError } from "axios";

const registerCompany = async (formData: FormData) => {
  try {
    const response = await API.post("/company/register", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error?.response?.data?.error || "Company registration failed");
    }
    throw new Error("Something went wrong!");
  }
};

const verifyOtp = async (data: { email: string, otp: string}) => {
    try {
        const result = await API.post("/company/verify-otp", data);

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
        const result = await API.post("/company/resend-otp", data);

        console.log(result);
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
    const result = await API.post("company/login", data);

    if (!result.data) {
      throw new Error("No data recieved!");
    }

    console.log("company login data", result.data);
    return result.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error?.response?.data?.error || "Failed to login company");
    }
    throw new Error("Something went wrong!");
  }
}

const logout = async () => {
  try {
    const token = typeof window !== 'undefined' ? localStorage.getItem('companyAccessToken') : null;

    const response = await API.post(`company/logout`, {}, {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      }
    });

    if (response.status === 200) {
      localStorage.removeItem("companyAccessToken");
    }
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error?.response?.data?.error || "Logout attempt failed!");
    }
    throw new Error('Something went wrong!');
  }
}

export {
    registerCompany,
    verifyOtp,
    resendOtp,
    login,
    logout
}