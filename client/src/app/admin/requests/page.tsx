"use client";
import React, { useEffect, useState } from "react";
import AdminHeader from "@/components/admin/Header";
import PageHeading from "@/components/admin/PageHeading";
import SearchBar from "@/components/admin/SearchBar";
import AdminSidebar from "@/components/admin/Sidebar";
import { fetchAllRequests, updateRequestStatus } from "@/lib/api/admin/company";
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
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [totalRequests, setTotalRequests] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const loadRequests = async (search = '', page = 1) => {
    try {
      setLoading(true);
      const result = await fetchAllRequests({ search, page: page.toString() });
      setRequests(result?.data?.companies || []);
      setTotalRequests(result?.data?.total || 0);
    } catch (error) {
      const err = error as Error; 
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  useEffect(() => {
    loadRequests(searchQuery, currentPage);
  }, [searchQuery, currentPage]);

  const handleUpdateRequest = async (e: React.ChangeEvent<HTMLSelectElement>, id: string) => {
    const newStatus = e.target.value;
    if (!["approved", "rejected"].includes(newStatus)) {
      toast.error("Invalid status!");
      return;
    }
    setLoadingId(id);
    try {
      await updateRequestStatus({ id, status: newStatus });
      toast.success('Status updated successfully!');
      loadRequests(searchQuery, currentPage);
    } catch (error) {
      const err = error as Error;
      toast.error(err.message);
    } finally {
      setLoadingId(null);
    }
  }

  const totalPages = Math.ceil(totalRequests / 10);

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
                          <select 
                            className="px-3 py-1 border rounded-md bg-white text-gray-700"
                            value={req.status}
                            onChange={(e) => handleUpdateRequest(e, req._id)}
                            disabled={loadingId === req._id}
                          >
                            <option value={'pending'}>Pending</option>
                            <option value={'approved'}>Approved</option>
                            <option value={'rejected'}>Rejected</option>
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

          {totalPages > 0 && (
            <div className="flex justify-center mt-6 space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="w-8 h-8 flex items-center justify-center rounded-md border text-sm text-gray-600 hover:bg-gray-100 disabled:opacity-50"
              >
                ←
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded-md text-sm ${
                    currentPage === page ? 'bg-blue-500 text-white' : 'border text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="w-8 h-8 flex items-center justify-center rounded-md border text-sm text-gray-600 hover:bg-gray-100 disabled:opacity-50"
              >
                →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestManagement;