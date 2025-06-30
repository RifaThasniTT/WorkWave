"use client"
import AdminHeader from '@/components/admin/Header'
import PageHeading from '@/components/admin/PageHeading';
import SearchBar from '@/components/admin/SearchBar';
import AdminSidebar from '@/components/admin/Sidebar'
import { fetchCompanies } from '@/lib/api/admin/company';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';

interface Company {
  _id: string;
  name: string;
  email: string;
  status: string;
  createdAt: string;
  kyc: string;
}


const CompanyManagement = () => {

  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(false);

  const loadCompanies = async (search = '') => {
    try {
      setLoading(true);
      const result = await fetchCompanies({ search, page: '1' });

      setCompanies(result?.data?.companies || []);
    } catch (error: any) {
      console.log('Failed to fetch companies', error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCompanies();
  }, [])

  const handleSearch = (query: string) => {
    loadCompanies(query);
  };

  return (
    <div className="flex h-screen">
      <AdminSidebar />

      {/* Main content area */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <AdminHeader />

        {/* Page content */}
        <div className="p-6 ml-60 overflow-auto flex-1 ">
          <PageHeading title="Company Management" />

          {/* Search Bar */}
          <div className="mb-4">
            <SearchBar
              placeholder="Search company...."
              onSearch={handleSearch}
            />
          </div>

          {loading ? (
            <p className="text-center text-gray-600">Loading companies...</p>
          ) : (
          <div className="w-full overflow-x-auto">
            <table className="min-w-full bg-white rounded-md shadow-sm">
              <thead>
                <tr className="text-left text-sm font-medium text-gray-700 border-b">
                  <th className="p-4">Company Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Created Date</th>
                  <th className="p-4">KYC</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {companies.length > 0 ? (
                companies.map((req, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-4">{req.name}</td>
                    <td className="p-4">{req.email}</td>
                    <td className="p-4">{req.status}</td>
                    <td className="p-4">{req.createdAt}</td>
                    <td className="p-4">
                      <a
                        href={''}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-1 bg-[#09B9FF] hover:bg-blue-400 text-white text-sm rounded-md inline-block"
                      >
                        View KYC
                      </a>
                    </td>
                    <td className="p-4">
                      <button className="px-4 py-1 bg-[#09B9FF] hover:bg-blue-400 text-white text-sm rounded-md">
                        Block
                      </button>
                    </td>
                  </tr>)
                )): (
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

          {/* Pagination */}
          {/* <div className="flex justify-center mt-6 space-x-2">
            <button className="w-8 h-8 flex items-center justify-center rounded-md border text-sm text-gray-600 hover:bg-gray-100">
              ←
            </button>
            <button className="w-8 h-8 rounded-md bg-blue-500 text-white text-sm">1</button>
            <button className="w-8 h-8 rounded-md border text-gray-700 text-sm hover:bg-gray-100">2</button>
            <button className="w-8 h-8 rounded-md border text-gray-700 text-sm hover:bg-gray-100">3</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-md border text-sm text-gray-600 hover:bg-gray-100">
              →
            </button>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default CompanyManagement
