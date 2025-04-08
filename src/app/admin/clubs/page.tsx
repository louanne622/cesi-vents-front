"use client";

import React, { useEffect, useState } from 'react';
import { FaUsers, FaPlus, FaEye, FaTrash, FaPencilAlt } from 'react-icons/fa';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import FilterBar from '@/components/ui/FilterBar';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getAllClubs, getClubById, deleteClub } from '@/redux/features/clubSlice';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function AdminClubsPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { clubs, loading, error } = useAppSelector((state) => state.club);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [clubToDelete, setClubToDelete] = useState<string | null>(null);

  useEffect(() => {
    dispatch(getAllClubs());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleViewClub = async (clubId: string) => {
    try {
      await dispatch(getClubById(clubId));
      router.push(`/admin/clubs/${clubId}/view`);
    } catch (error) {
      toast.error('Erreur lors de la récupération des détails du club');
    }
  };

  const handleDeleteClick = (clubId: string) => {
    setClubToDelete(clubId);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!clubToDelete) return;
    
    try {
      console.log('Début de la suppression du club:', clubToDelete);
      await dispatch(deleteClub(clubToDelete)).unwrap();
      
      // Recharger la liste des clubs
      await dispatch(getAllClubs()).unwrap();
      
      toast.success('Club supprimé avec succès');
      setIsDeleteModalOpen(false);
      setClubToDelete(null);
    } catch (error: any) {
      console.error('Erreur lors de la suppression:', error);
      toast.error(error.message || 'Erreur lors de la suppression du club');
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setClubToDelete(null);
  };

  const filteredClubs = clubs.filter(club => {
    const matchesSearch = club.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || club.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const filters = [
    {
      label: 'Toutes les catégories',
      value: selectedCategory,
      options: [
        { value: 'culture', label: 'Culture' },
        { value: 'sport', label: 'Sport' },
        { value: 'tech', label: 'Technologie' },
        { value: 'social', label: 'Social' },
      ],
      onChange: setSelectedCategory,
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#fbe216] mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement des clubs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">Gestion des clubs</h1>
          <Button
            text="Créer un club"
            color="primary"
            icon={<FaPlus />}
            iconPosition="left"
            onClick={() => window.location.href = '/admin/clubs/create'}
          />
        </div>

        {/* Barre de recherche et filtres */}
        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          filters={filters}
        />

        {/* Liste des clubs */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Club
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Catégorie
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Campus
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredClubs.map((club) => (
                  <tr key={club._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          {club.logo?.url ? (
                            <img
                              src={club.logo.url}
                              alt={club.logo.alt || club.name}
                              className="h-10 w-10 rounded-full object-cover"
                            />
                          ) : (
                            <FaUsers className="h-10 w-10 text-[#fbe216]" />
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{club.name}</div>
                          <div className="text-sm text-gray-500">{club.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {club.category === 'culture' ? 'Culture' :
                         club.category === 'sport' ? 'Sport' :
                         club.category === 'tech' ? 'Technologie' :
                         club.category === 'social' ? 'Social' :
                         'Autre'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{club.campus}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{club.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                      <Button
                        text=""
                        color="primary"
                        variant="outline"
                        size="sm"
                        icon={<FaEye />}
                        onClick={() => handleViewClub(club._id)}
                        className="flex items-center justify-center w-8 h-8"
                      />
                      <Button
                        text=""
                        color="danger"
                        variant="outline"
                        size="sm"
                        icon={<FaTrash />}
                        onClick={() => handleDeleteClick(club._id)}
                        className="flex items-center justify-center w-8 h-8"
                      />
                      <Button
                        text=""
                        color="secondary"
                        variant="outline"
                        size="sm"
                        icon={<FaPencilAlt />}
                        onClick={() => window.location.href = `/admin/clubs/${club._id}/edit`}
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
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Supprimer le club"
        message="Êtes-vous sûr de vouloir supprimer ce club ? Cette action est irréversible."
        confirmText="Supprimer"
      />
    </div>
  );
} 