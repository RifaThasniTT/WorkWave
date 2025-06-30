import API  from "@/lib/axiosInstance";

const fetchAllUsers = async ({ search = "", page = "1" }: { search?: string; page?: string }) => {
  try {
    const token = typeof window !== 'undefined' ? localStorage.getItem('adminAccessToken') : null;

    const response = await API.get(`/admin/users?search=${search}&page=${page}`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    });

    return response.data;
  } catch (error: any) {
    console.error(error);
    throw new Error(error?.response?.data?.message || "Failed to fetch users");
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
  } catch (error: any) {
    console.error("Failed to update user status:", error);
    throw new Error(error?.response?.data?.message || "Error updating user status");
  }
};

export {
    fetchAllUsers,
    toggleBlockUser
}