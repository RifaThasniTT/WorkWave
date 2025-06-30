"use client"
import PageHeading from '@/components/admin/PageHeading';
import CompanyHeader from '@/components/company/Header';
import CompanySidebar from '@/components/company/Sidebar';
import React from 'react'

const requests = [
  { company: 'Google', email: 'Google@gmail.com', status: 'In progress', date: 'Feb 29 2025' },
  { company: 'apple', email: 'apple@gmail.com', status: 'In progress', date: 'Feb 29 2025' },
  { company: 'apple', email: 'apple@gmail.com', status: 'In progress', date: 'Feb 29 2025' },
  { company: 'apple', email: 'apple@gmail.com', status: 'In progress', date: 'Feb 29 2025' },
  { company: 'apple', email: 'apple@gmail.com', status: 'In progress', date: 'Feb 29 2025' },
  { company: 'Microsoft', email: 'micros@gmail.com', status: 'In progress', date: 'Feb 29 2025' },
];

const TeamManagement = () => {

  // const handleSearch = (query: string) => {
  //   // Add your search logic here
  // };

  return (
    <div className="flex h-screen">
      <CompanySidebar />

      {/* Main content area */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <CompanyHeader />

        {/* Page content */}
        <div className="p-6 ml-60 overflow-auto flex-1 ">
          <PageHeading title="Team Management" />

          {/* Search Bar and Invite member button */}
          <div className="flex items-center justify-end gap-4 mb-4">
            
            <button className="bg-[#09B9FF] hover:bg-blue-400 text-white text-sm px-4 py-2 rounded-md">
                + Invite Member
            </button>
          </div>

          {/* Table */}
          <div className="w-full overflow-x-auto">
            <table className="min-w-full bg-white rounded-md shadow-sm">
              <thead>
                <tr className="text-left text-sm font-medium text-gray-700 border-b">
                  <th className="p-4">Full Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-4">{req.company}</td>
                    <td className="p-4">{req.email}</td>
                    <td className="p-4">{req.status}</td>
                    <td className="p-4">{req.date}</td>
                    <td className="p-4">
                      Active
                    </td>
                    <td className="p-4">
                      <button className="px-4 py-1 bg-[#09B9FF] hover:bg-blue-400 text-white text-sm rounded-md">
                        View KYC
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

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

export default TeamManagement;
