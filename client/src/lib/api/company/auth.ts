import API from "@/lib/axiosInstance";

const registerCompany = async (formData: FormData) => {
  try {
    const response = await API.post("/company/register", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error: any) {
    console.error(error);
    throw new Error(error?.response?.data?.message || "Company registration failed");
  }
};

const verifyOtp = async (data: { email: string, otp: string}) => {
    try {
        const result = await API.post("/company/verify-otp", data);

        return result.data;
    } catch (error: any) {
        console.error("error compverify otp", error);
        throw new Error(error || 'Invalid or expired OTP');
    }
}

const resendOtp = async (data: {email: string}) => {
    try {
        const result = await API.post("/company/resend-otp", data);

        console.log(result);
        return result.data;
    } catch (error: any) {
        console.error("errro compresend otp", error);
        throw new Error(error || 'Failed to resend otp');
    }
}

export {
    registerCompany,
    verifyOtp,
    resendOtp
}