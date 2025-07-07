import API from "@/lib/axiosInstance";
import { isAxiosError } from "axios";

const getProfile = async () => {
    try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('companyAccessToken') : null;

        const response = await API.get(`/company/profile`, {
            headers: {
                Authorization: token ? `Bearer ${token}` : '',
            }
        });

        console.log(`comprfoile`, response);
        return response.data;
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error?.response?.data?.error || "Failed to fetch profile details");
        }
        throw new Error("Something went wrong");
    }
}

const editProfile = async (formData: FormData) => {
    try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('companyAccessToken') : null;

        const response = await API.patch(`/company/profile`, formData, {
            headers: {
                Authorization: token ? `Bearer ${token}` : '',
                "Content-Type": "multipart/form-data",
            }
        });

        console.log('editdata', response);
        return response.data;
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error?.response?.data?.error || "Failed to edit profile details");
        }
        throw new Error("Something went wrong");
    }
}

export {
    getProfile,
    editProfile,
}