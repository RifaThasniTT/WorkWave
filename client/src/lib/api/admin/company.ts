import API from "@/lib/axiosInstance";
import { isAxiosError } from "axios";

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
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error?.response?.data?.error || "Failed to fetch company requests");
    }
    throw new Error("Something went wrong!");
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
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error?.response?.data?.error || "Failed to fetch companies");
    }
    throw new Error("Something went wrong!");
  }
}

const updateRequestStatus = async ({ id, status }: { id: string; status: string }) => {
  try {
    const token = typeof window !== "undefined" ? localStorage.getItem('adminAccessToken') : null;

    const response = await API.patch(`/admin/companies/${id}/request-status`, { status }, {
      headers: {
        Authorization: token ? `Bearer ${token}`: ''
      },
    })

    console.log('aproreje', response);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error?.response?.data?.error || "Failed to update status");
    }
    throw new Error("Something went wrong!");
  }
}

const toggleBlockCompany = async ({ id, isBlocked }: { id: string; isBlocked: boolean }) => {
  try {
    const token = typeof window !== "undefined" ? localStorage.getItem('adminAccessToken') : null;

    const response = await API.patch(`admin/companies/${id}/block`, { isBlocked }, {
      headers: {
        Authorization: token ? `Bearer ${token}` : ''
      }
    });

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error?.response?.data?.error || "Failed to update status");
    }
    throw new Error("Something went wrong!");
  }
}

export {
  fetchAllRequests,
  fetchCompanies,
  updateRequestStatus,
  toggleBlockCompany
}