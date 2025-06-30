import API from "@/lib/axiosInstance";

const fetchAllRequests = async ({ search = "", page = "1" }: { search?: string; page?: string }) => {
  try {
    const token = typeof window !== 'undefined' ? localStorage.getItem('adminAccessToken') : null;

    const response = await API.get(`/admin/companies/requests?search=${search}&page=${page}`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    });

    console.log('erequ', response);
    return response.data;
  } catch (error: any) {
    console.error(error);
    throw new Error(error?.response?.data?.message || "Failed to fetch company requests");
  }
};

const fetchCompanies = async ({ search = "", page = "1" }: { search?: string; page?: string }) => {
  try {
    const token = typeof window !== 'undefined' ? localStorage.getItem('adminAccessToken') : null;

    const response = await API.get(`/admin/companies?search=${search}&page=${page}`, {
      headers: {
        Authorization: token ? `Bearer ${token}`: '',
      }
    })

    console.log('ecomp', response);
    return response.data;
  } catch (error: any) {
    console.error(error);
    throw new Error(error?.response?.data?.message || "Failed to fetch companies");
  }
}

export {
  fetchAllRequests,
  fetchCompanies,
}