"use client";
import React, { useEffect, useState } from "react";
import AdminHeader from "@/components/admin/Header";
import PageHeading from "@/components/admin/PageHeading";
import SearchBar from "@/components/admin/SearchBar";
import AdminSidebar from "@/components/admin/Sidebar";
import { fetchAllRequests } from "@/lib/api/admin/company";
import { toast } from "sonner";

interface Request {
  _id: string;
  name: string;
  email: string;
  status: string;
  createdAt: string;
  kyc: string;
}

const RequestManagement = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(false);

  const loadRequests = async (search = "") => {
    try {
      setLoading(true);
      const result = await fetchAllRequests({ search, page: "1" });
      setRequests(result?.data?.companies || []);
    } catch (error) {
      const err = error as Error; 
      console.error("Failed to fetch requests", err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    loadRequests(query);
  };

  useEffect(() => {
    loadRequests();
  }, []);

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex flex-col flex-1">
        <AdminHeader />
        <div className="p-6 ml-60 overflow-auto flex-1">
          <PageHeading title="Company Requests" />

          <div className="mb-4">
            <SearchBar
              placeholder="Search company requests...."
              onSearch={handleSearch}
            />
          </div>

          {loading ? (
            <p className="text-center text-gray-600">Loading requests...</p>
          ) : (
            <div className="w-full overflow-x-auto">
              <table className="min-w-full bg-white rounded-md shadow-sm">
                <thead>
                  <tr className="text-left text-sm font-medium text-gray-700 border-b">
                    <th className="p-4">Company Name</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Requested Date</th>
                    <th className="p-4">View KYC</th>
                    <th className="p-4">Change Status</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.length > 0 ? (
                    requests.map((req) => (
                      <tr key={req._id} className="border-b hover:bg-gray-50">
                        <td className="p-4">{req.name}</td>
                        <td className="p-4">{req.email}</td>
                        <td className="p-4">{req.status}</td>
                        <td className="p-4">{new Date(req.createdAt).toLocaleDateString()}</td>
                        <td className="p-4">
                          <a
                            href={req.kyc}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-1 bg-[#09B9FF] hover:bg-blue-400 text-white text-sm rounded-md inline-block"
                          >
                            View KYC
                          </a>
                        </td>
                        <td className="p-4">
                          <select className="px-3 py-1 border rounded-md bg-white text-gray-700">
                            <option>approved</option>
                            <option>rejected</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="text-center text-gray-500 p-4">
                        No company requests found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestManagement;
