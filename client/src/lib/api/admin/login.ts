import API from "@/lib/axiosInstance";
import { IAdminLogin } from "@/types/admin";

const adminLogin = async (data: IAdminLogin) => {
    try {
        const response = await API.post("admin/login", data);
        return response.data;
    } catch (error: any) {
        console.error("amdi n loginerror",error);
        throw new Error(error?.response?.data);
    }
}

export { 
    adminLogin
};