import API  from "@/lib/axiosInstance";
import { isAxiosError } from "axios";

const fetchAllUsers = async ({ search = "", page = "1" }: { search?: string; page?: string }) => {
  try {
    const token = typeof window !== 'undefined' ? localStorage.getItem('adminAccessToken') : null;

    const response = await API.get(`/admin/users?search=${search}&page=${page}`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    });

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error?.response?.data?.error || "Failed to fetch users!");
    }
    throw new Error("Something went wrong!");
  }
};

const toggleBlockUser = async (userId: string, isBlocked: boolean) => {
  try {
    const token = typeof window !== "undefined" ? localStorage.getItem("adminAccessToken") : null;

    const response = await API.patch(`/admin/users/${userId}/block`, 
      { isBlocked }, 
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      }
    );
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error?.response?.data?.error || "Error updating user status");
    }
    throw new Error("Somthing went wrong!");
  }
};

export {
    fetchAllUsers,
    toggleBlockUser
}