import API from "@/lib/axiosInstance";
import { IAdminLogin } from "@/types/admin";
import { isAxiosError } from "axios";

const adminLogin = async (data: IAdminLogin) => {
    try {
        const response = await API.post("admin/login", data);
        return response.data;
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error?.response?.data?.error || "Failed to login admin");
        }
        throw new Error("Something went wrong!");
    }
}

const adminLogout = async () => {
  try {
    const token = typeof window !== 'undefined' ? localStorage.getItem('adminAccessToken') : null;

    const response = await API.post(`admin/logout`, {}, {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      }
    });

    if (response.status === 200) {
      localStorage.removeItem("adminAccessToken");
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
    adminLogin,
    adminLogout
};