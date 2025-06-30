import PageHeading from '@/components/admin/PageHeading'
import CompanyHeader from '@/components/company/Header'
import CompanySidebar from '@/components/company/Sidebar'
import React from 'react'

const Profile = () => {
  return (
    <div className="flex h-screen">
      <CompanySidebar />

      {/* Main content area */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <CompanyHeader />

        {/* Page content */}
        <div className="p-6 ml-60 overflow-auto flex-1 ">
          <PageHeading title="Profile" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {/* Company Basic Info Card */}
            <div className="col-span-2 bg-white border  rounded-lg p-12 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-16">
                {/* Logo */}
                <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                  <img
                    src="/company-logo.png" // change to your logo path
                    alt="Company Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                {/* Info */}
                <div>
                  <h2 className="text-xl font-semibold mb-2 ">Google</h2>
                  <a href="https://google.com" className="text-blue-500 text-sm hover:underline">
                    https://google.com
                  </a>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 text-sm ">
                    <div>
                      <span className="font-medium">Founded:</span><br />
                      February 2025
                    </div>
                    <div>
                      <span className="font-medium">Employees:</span><br />
                      200+
                    </div>
                    <div>
                      <span className="font-medium">Location:</span><br />
                      NewYork, US
                    </div>
                    <div>
                      <span className="font-medium">Industry:</span><br />
                      Software Development
                    </div>
                  </div>
                </div>
              </div>
              {/* Edit Icon */}
              <button className="hover:text-gray-700">
                ✎
              </button>
            </div>
          
            {/* Company Description */}
            <div className="bg-white border rounded-lg p-8 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold ">Company Description</h3>
                <button className=" hover:text-gray-700">✎</button>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                Google is a multinational technology company known for its powerful search engine, which helps users find information quickly and efficiently.
                Founded in 1998, Google has grown to become one of the most influential tech companies in the world, offering a wide range of products and services,
                including Gmail, Google Maps, YouTube, Google Drive, and the Android operating system. It is recognized for its innovative approach to technology
                and its commitment to organizing the world’s information, making it universally accessible and useful.
              </p>
            </div>
          
            {/* Contact Info */}
            <div className="bg-white border rounded-lg p-8 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold">Contacts</h3>
                <button className=" hover:text-gray-700">✎</button>
              </div>
              <div className="space-y-6 text-sm text-gray-700">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    📞
                  </div>
                  <span>79290485920</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    📧
                  </div>
                  <span>google@gmail.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    📍
                  </div>
                  <span>NYC, New York, USA</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Profile
