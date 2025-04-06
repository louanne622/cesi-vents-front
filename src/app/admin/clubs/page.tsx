"use client";

import React, { useState } from 'react';
import { FaUsers, FaPlus } from 'react-icons/fa';
import Button from '../../components/ui/Button';
import FilterBar from '@/components/ui/FilterBar';

// Données de démonstration (à remplacer par des appels API)
const mockClubs = [
  {
    id: 1,
    name: 'Club Photo',
    category: 'culture',
    members: 45,
    campus: 'Lille',
    status: 'active',
  },
  {
    id: 2,
    name: 'Club Robotique',
    category: 'tech',
    members: 32,
    campus: 'Paris',
    status: 'active',
  },
  {
    id: 3,
    name: 'Club Théâtre',
    category: 'culture',
    members: 28,
    campus: 'Arras',
    status: 'pending',
  },
];

export default function AdminClubsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredClubs = mockClubs.filter(club => {
    const matchesSearch = club.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || club.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || club.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
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
    {
      label: 'Tous les statuts',
      value: selectedStatus,
      options: [
        { value: 'active', label: 'Actifs' },
        { value: 'pending', label: 'En attente' },
        { value: 'inactive', label: 'Inactifs' },
      ],
      onChange: setSelectedStatus,
    },
  ];

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
                    Membres
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredClubs.map((club) => (
                  <tr key={club.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <FaUsers className="h-10 w-10 text-[#fbe216]" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{club.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {club.category === 'culture' ? 'Culture' :
                         club.category === 'sport' ? 'Sport' :
                         club.category === 'tech' ? 'Technologie' : 'Social'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{club.campus}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{club.members}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        club.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : club.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {club.status === 'active' ? 'Actif' : club.status === 'pending' ? 'En attente' : 'Inactif'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button
                        text="Modifier"
                        color="secondary"
                        variant="outline"
                        onClick={() => window.location.href = `/admin/clubs/${club.id}/edit`}
                      />
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