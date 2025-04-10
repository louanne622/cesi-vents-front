"use client";

import React, { useEffect, useState } from 'react';
import { FaUser} from 'react-icons/fa';
import FilterBar from '@/components/ui/FilterBar';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { toast } from 'react-hot-toast';
import { getAllClubMembers, getAllUsers} from '@/redux/features/userSlice';
import { User } from '@/app/types/User';


export default function ClubLeaderUsersPage() {
  const { profile: currentUser } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const result = await dispatch(getAllClubMembers({ clubId: currentUser?.clubId })).unwrap();
        setUsers(result);
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch users');
        toast.error(err.message || 'Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };
    
    fetchUsers();
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);
 

  const filteredUsers = users.filter((user: User) => {
    const matchesSearch = (user.first_name + ' ' + user.last_name).toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const filters = [
    {
      label: 'Tous les rôles',
      value: selectedRole,
      options: [
        { value: 'admin', label: 'Administrateur' },
        { value: 'user', label: 'Utilisateur' }
      ],
      onChange: setSelectedRole,
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#fbe216] mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement des utilisateurs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="container mx-auto px-4 py-8">
        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          filters={filters}
        />

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Utilisateur
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers
                  .filter(user => user.clubId === currentUser?.clubId) // Filter users by club_id
                  .map((user: User) => (
                    <tr key={user._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            {user.avatar ? (
                              <img
                                src={user.avatar.url}
                                alt={`${user.first_name} ${user.last_name}`}
                                className="h-10 w-10 rounded-full object-cover"
                              />
                            ) : (
                              <FaUser className="h-10 w-10 text-[#fbe216]" />
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {user.first_name} {user.last_name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{user.email}</div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}