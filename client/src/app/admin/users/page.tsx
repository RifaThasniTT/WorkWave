"use client"
import React, { useEffect, useState } from 'react';
import AdminHeader from '@/components/admin/Header';
import PageHeading from '@/components/admin/PageHeading';
import SearchBar from '@/components/admin/SearchBar';
import AdminSidebar from '@/components/admin/Sidebar';
import { fetchAllUsers, toggleBlockUser } from '@/lib/api/admin/user';
import { toast } from 'sonner';

interface User {
  _id: string;
  name: string;
  email: string;
  isBlocked: boolean;
  createdAt: string;
}

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = (query: string) => {
    
  };

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await fetchAllUsers({search: '', page: '1'});
      console.log(data);
      setUsers(data?.data?.users); 
    } catch (err) {
      console.error('Failed to load users', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleBlockToggle = async (userId: string, currentStatus: boolean) => {
    try {
      const updated = await toggleBlockUser(userId, currentStatus ? false : true);
      
      toast.success("User status updated!");
      loadUsers();
    } catch (err) {
      console.error("Action failed", err);
      toast.error("Failed to update user status");
    }
  };

  return (
    <div className="flex h-screen">
      <AdminSidebar />

      <div className="flex flex-col flex-1">
        <AdminHeader />
        <div className="p-6 ml-60 overflow-auto flex-1">
          <PageHeading title="User Management" />
          <div className="mb-4">
            <SearchBar placeholder="Search users...." onSearch={handleSearch} />
          </div>

          {loading ? (
            <p className="text-center text-gray-600">Loading users...</p>
          ) : (
            <div className="w-full overflow-x-auto">
              <table className="min-w-full bg-white rounded-md shadow-sm">
                <thead>
                  <tr className="text-left text-sm font-medium text-gray-700 border-b">
                    <th className="p-4">Full Name</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Joined Date</th>
                    <th className="p-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length > 0 ? (
                    users.map((user) => (
                      <tr key={user._id} className="border-b hover:bg-gray-50">
                        <td className="p-4">{user.name}</td>
                        <td className="p-4">{user.email}</td>
                        <td className="p-4">{user.isBlocked ? "Blocked": "Active"}</td>
                        <td className="p-4">{new Date(user.createdAt).toLocaleDateString()}</td>
                        <td className="p-4">
                          <button
                            onClick={() => handleBlockToggle(user._id, user.isBlocked)}
                            className="px-4 py-1 bg-[#09B9FF] hover:bg-blue-400 text-white text-sm rounded-md"
                          >
                            {user.isBlocked ? "Unblock" : "Block"}
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="p-4 text-center text-gray-500">
                        No users found.
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

export default UserManagement;
