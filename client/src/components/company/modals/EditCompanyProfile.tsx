'use client';

import React, { useState } from 'react';

interface CompanyProfile {
  _id: string;
  name: string;
  logoUrl?: string;
  website?: string;
  foundedIn?: Date;
  employees?: number;
  location?: string;
  industry?: string;
  about?: string;
  phone?: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialData: CompanyProfile;
  onSave: (updatedData: FormData) => void;
}

const EditCompanyProfile: React.FC<Props> = ({ isOpen, onClose, initialData, onSave }) => {
  const [name, setName] = useState(initialData.name);
  const [website, setWebsite] = useState(initialData.website || '');
  const [foundedIn, setFoundedIn] = useState(
    initialData.foundedIn ? new Date(initialData.foundedIn).toISOString().substring(0, 10) : ''
  );
  const [employees, setEmployees] = useState(initialData.employees?.toString() || '');
  const [location, setLocation] = useState(initialData.location || '');
  const [industry, setIndustry] = useState(initialData.industry || '');
  const [about, setAbout] = useState(initialData.about || '');
  const [phone, setPhone] = useState(initialData.phone || '');
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(initialData.logoUrl || null);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) newErrors.name = 'Company name is required.';
    if (!foundedIn) {
      newErrors.foundedIn = 'Founded date is required.';
    } else {
      const foundedDate = new Date(foundedIn);
      const today = new Date();
      if (isNaN(foundedDate.getTime())) {
        newErrors.foundedIn = 'Founded date is not valid.';
      } else if (foundedDate > today) {
        newErrors.foundedIn = 'Founded date cannot be in the future.';
      }
    }

    if (!location.trim()) newErrors.location = 'Location is required.';
    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (!/^\+?\d{7,15}$/.test(phone)) {
      newErrors.phone = 'Phone number is invalid. Use digits only, optional + prefix.';
    }

    if (website && !/^https?:\/\/[^\s/$.?#].[^\s]*$/.test(website)) {
      newErrors.website = 'Website URL is not valid.';
    }

    if (employees && (!/^\d+$/.test(employees) || parseInt(employees) < 0)) {
      newErrors.employees = 'Employees must be a valid positive number.';
    }

    if (about && about.trim().length > 0 && about.trim().length < 50) {
      newErrors.about = 'About must be at least 50 characters if provided.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('website', website);
    formData.append('foundedIn', foundedIn);
    formData.append('employees', employees);
    formData.append('location', location);
    formData.append('industry', industry);
    formData.append('about', about);
    formData.append('phone', phone);
    if (logoFile) formData.append('logoUrl', logoFile);

    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white w-full max-w-2xl p-6 rounded-xl shadow-lg relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl">
          &times;
        </button>

        <h2 className="text-lg font-semibold mb-4">Edit Company Profile</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Logo Upload */}
          <div>
            <label className="block text-sm font-medium mb-1">Logo</label>
            {/* {logoPreview && (
              <div className="mb-2">
                <p className="text-sm font-medium mb-1">Preview</p>
                <div className="w-24 h-24 rounded-full overflow-hidden border border-gray-200">
                  <img
                    src={logoPreview}
                    alt="Logo Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )} */}

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                setLogoFile(file);
                if (file) {
                  setLogoPreview(URL.createObjectURL(file));
                }
              }}
            />

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border rounded px-3 py-2 text-sm"
              />
              {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}
            </div>

            {/* Website */}
            <div>
              <label className="block text-sm font-medium mb-1">Website</label>
              <input
                type="url"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="w-full border rounded px-3 py-2 text-sm"
              />
              {errors.website && <p className="text-red-600 text-xs mt-1">{errors.website}</p>}
            </div>

            {/* Founded In */}
            <div>
              <label className="block text-sm font-medium mb-1">Founded In</label>
              <input
                type="date"
                value={foundedIn}
                onChange={(e) => setFoundedIn(e.target.value)}
                className="w-full border rounded px-3 py-2 text-sm"
              />
              {errors.foundedIn && <p className="text-red-600 text-xs mt-1">{errors.foundedIn}</p>}
            </div>

            {/* Employees */}
            <div>
              <label className="block text-sm font-medium mb-1">Employees</label>
              <input
                type="number"
                value={employees}
                onChange={(e) => setEmployees(e.target.value)}
                className="w-full border rounded px-3 py-2 text-sm"
              />
              {errors.employees && <p className="text-red-600 text-xs mt-1">{errors.employees}</p>}
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full border rounded px-3 py-2 text-sm"
              />
              {errors.location && <p className="text-red-600 text-xs mt-1">{errors.location}</p>}
            </div>

            {/* Industry */}
            <div>
              <label className="block text-sm font-medium mb-1">Industry</label>
              <input
                type="text"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full border rounded px-3 py-2 text-sm"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border rounded px-3 py-2 text-sm"
              />
              {errors.phone && <p className="text-red-600 text-xs mt-1">{errors.phone}</p>}
            </div>
          </div>

          {/* About */}
          <div>
            <label className="block text-sm font-medium mb-1">About</label>
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm h-24"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm border rounded bg-gray-100 hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCompanyProfile;
