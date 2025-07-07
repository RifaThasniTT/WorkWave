"use client"
import React, { useEffect, useState } from 'react';
import PageHeading from '@/components/admin/PageHeading';
import CompanyHeader from '@/components/company/Header';
import CompanySidebar from '@/components/company/Sidebar';
import { editProfile, getProfile } from '@/lib/api/company/profile';
import { toast } from 'sonner';
import EditCompanyProfile from '@/components/company/modals/EditCompanyProfile';

interface CompanyProfile {
  _id: string;
  name: string;
  email: string;
  logoUrl?: string;
  website?: string;
  foundedIn?: Date;
  location?: string;
  about?: string;
  employees?: number;
  industry?: string;
  phone?: string;
}

const Profile = () => {
  const [company, setCompany] = useState<CompanyProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const fetchProfile = async () => {
    setLoading(true)
    try {
      const result = await getProfile();
      setCompany(result.data);
    } catch (error) {
      const err = error as Error;
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleSave = async (formData: FormData) => {
    try {
      await editProfile(formData);
      await fetchProfile(); 
      toast.success("Profile updated successfully");
    } catch (error) {
      const err = error as Error;
      toast.error(err.message || "Failed to update profile");
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
  <div className="flex h-screen">
    <CompanySidebar />

    <div className="flex flex-col flex-1">
      <CompanyHeader />

      <div className="p-6 ml-60 overflow-auto flex-1">
        <PageHeading title="Profile" />

        {loading ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Loading company data...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {/* Basic Info */}
            <div className="col-span-2 bg-white border rounded-lg p-12 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-16">
                {/* Logo */}
                <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                  {company?.logoUrl ? (
                    <img src={company.logoUrl} alt="Company Logo" className="w-full h-full object-contain" />
                  ) : (
                    <span className="text-gray-400 text-sm">No Logo</span>
                  )}
                </div>

                {/* Info */}
                <div>
                  <h2 className="text-xl font-semibold mb-2">{company?.name}</h2>
                  {company?.website && (
                    <a href={company.website} className="text-blue-500 text-sm hover:underline" target="_blank" rel="noreferrer">
                      {company.website}
                    </a>
                  )}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 text-sm">
                    <div>
                      <span className="font-medium">Founded:</span><br />
                      {company?.foundedIn ? new Date(company.foundedIn).toLocaleDateString() : 'N/A'}
                    </div>
                    <div>
                      <span className="font-medium">Employees:</span><br />
                      {company?.employees || 'N/A'}
                    </div>
                    <div>
                      <span className="font-medium">Location:</span><br />
                      {company?.location || 'N/A'}
                    </div>
                    <div>
                      <span className="font-medium">Industry:</span><br />
                      {company?.industry || 'N/A'}
                    </div>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsEditModalOpen(true)} className="hover:text-gray-700">✎</button>
            </div>

            {/* Description */}
            <div className="bg-white border rounded-lg p-8 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold">Company Description</h3>
                {/* <button onClick={() => setIsEditModalOpen(true)} className="hover:text-gray-700">✎</button> */}
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                {company?.about || 'No description available.'}
              </p>
            </div>

            {/* Contacts */}
            <div className="bg-white border rounded-lg p-8 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold">Contacts</h3>
                {/* <button onClick={() => setIsEditModalOpen(true)} className="hover:text-gray-700">✎</button> */}
              </div>
              <div className="space-y-6 text-sm text-gray-700">
                {company?.phone && (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">📞</div>
                    <span>{company.phone}</span>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">📧</div>
                  <span>{company?.email}</span>
                </div>
                {company?.location && (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">📍</div>
                    <span>{company.location}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>

    {/* Edit Modal */}
    {company && (
      <EditCompanyProfile
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        initialData={company}
        onSave={handleSave}
      />
    )}
  </div>
);

};

export default Profile;