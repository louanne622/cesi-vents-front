"use client";

import React, { useEffect, useState } from 'react';
import { FaUser, FaPlus, FaEye, FaTrash, FaPencilAlt } from 'react-icons/fa';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import FilterBar from '@/components/ui/FilterBar';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { deleteUser, getAllUsers, getUserById} from '@/redux/features/userSlice';
import { User } from '@/app/types/User';


export default function AdminUsersPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const result = await dispatch(getAllUsers()).unwrap();
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

  const handleViewUser = async (userId: string) => {
    try {
      await dispatch(getUserById(userId));
      router.push(`/admin/users/${userId}/view`);
    } catch (error) {
      toast.error('Erreur lors de la récupération des détails de l\'utilisateur');
    }
  };

  const confirmDeleteUser = (userId: string) => {
    // TODO Empêcher la suppression du profil courant (currentUser)
    setUserToDelete(userId);
    setIsDeleteModalOpen(true);
  };
    
  const handleDelete = async (userIdToDelete: string) => {
    console.log("handleDelete triggered avec :", userIdToDelete);

    try {
      await dispatch(deleteUser({ id: userIdToDelete })).unwrap();
      console.log("Suppression réussie !");
      toast.success('Utilisateur supprimé avec succès');
      setIsDeleteModalOpen(false);
      setUserToDelete(null);

      const updatedUsers = await dispatch(getAllUsers()).unwrap();
      setUsers(updatedUsers);
    } catch (error: any) {
      toast.error(error.message || 'Erreur lors de la suppression de l\'utilisateur');
    }
  };

 

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
        { value: 'user', label: 'Utilisateur' },
        { value: 'clubleader', label: 'Club Leader' }
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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">Gestion des utilisateurs</h1>
          <Button
            text="Créer un utilisateur"
            color="primary"
            icon={<FaPlus />}
            iconPosition="left"
            onClick={() => window.location.href = '/admin/users/create'}
          />
        </div>

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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rôle
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user: User) => (
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
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {user.role === 'admin' ? 'Administrateur' :
                         user.role === 'clubleader' ? 'Club Leader' :
                         'Utilisateur'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                      <Button
                        text=""
                        color="primary"
                        variant="outline"
                        size="sm"
                        icon={<FaEye />}
                        onClick={() => handleViewUser(user._id)}
                        className="flex items-center justify-center w-8 h-8"
                      />
                      <Button
                        text=""
                        color="secondary"
                        variant="outline"
                        size="sm"
                        icon={<FaTrash />}
                        onClick={() => confirmDeleteUser(user._id)}
                        className="flex items-center justify-center w-8 h-8"
                      />
                      <Button
                        text=""
                        color="secondary"
                        variant="outline"
                        size="sm"
                        icon={<FaPencilAlt />}
                        onClick={() => window.location.href = `/admin/users/${user._id}/edit`}
                        className="flex items-center justify-center w-8 h-8"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => {
          console.log("SUPPRESSION DE : ", userToDelete);
          if (userToDelete) {
            handleDelete(userToDelete);
          }
        }}
        title="Supprimer l'utilisateur"
        message="Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action est irréversible."
        confirmText="Supprimer"
      />
    </div>
  );
}