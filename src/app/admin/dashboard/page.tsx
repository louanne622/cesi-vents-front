"use client";

import React from 'react';
import { FaUsers, FaCalendarAlt, FaEuroSign, FaChartLine, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';
import Button from '@/app/components/ui/Button';

// Données de démonstration (à remplacer par des appels API)
const mockStats = {
  activeClubs: 12,
  activeEvents: 8,
  monthlyRevenue: 2450,
  totalMembers: 156,
  pendingRequests: 3,
  completedEvents: 5,
};

const recentActivities = [
  { id: 1, type: 'event', title: 'Soirée Cinéma', date: '2024-04-03', status: 'completed' },
  { id: 2, type: 'club', title: 'Nouveau club créé: Club Photo', date: '2024-04-02', status: 'pending' },
  { id: 3, type: 'event', title: 'Tournoi de Football', date: '2024-04-01', status: 'active' },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Tableau de bord administrateur</h1>

        {/* Statistiques principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Clubs actifs */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Clubs actifs</p>
                <p className="text-2xl font-semibold text-gray-900">{mockStats.activeClubs}</p>
              </div>
              <div className="p-3 bg-[#fbe216] bg-opacity-10 rounded-full">
                <FaUsers className="h-6 w-6 text-[#fbe216]" />
              </div>
            </div>
            <div className="mt-4">
              <Button
                text="Voir les clubs"
                color="secondary"
                variant="outline"
                onClick={() => window.location.href = '/admin/clubs'}
              />
            </div>
          </div>

          {/* Événements en cours */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Événements en cours</p>
                <p className="text-2xl font-semibold text-gray-900">{mockStats.activeEvents}</p>
              </div>
              <div className="p-3 bg-[#fbe216] bg-opacity-10 rounded-full">
                <FaCalendarAlt className="h-6 w-6 text-[#fbe216]" />
              </div>
            </div>
            <div className="mt-4">
              <Button
                text="Voir les événements"
                color="secondary"
                variant="outline"
                onClick={() => window.location.href = '/admin/events'}
              />
            </div>
          </div>

          {/* Revenus mensuels */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Revenus ce mois</p>
                <p className="text-2xl font-semibold text-gray-900">{mockStats.monthlyRevenue}€</p>
              </div>
              <div className="p-3 bg-[#fbe216] bg-opacity-10 rounded-full">
                <FaEuroSign className="h-6 w-6 text-[#fbe216]" />
              </div>
            </div>
            <div className="mt-4">
              <Button
                text="Voir les finances"
                color="secondary"
                variant="outline"
                onClick={() => window.location.href = '/admin/finances'}
              />
            </div>
          </div>
        </div>

        {/* Statistiques secondaires */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Total membres */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total membres</p>
                <p className="text-2xl font-semibold text-gray-900">{mockStats.totalMembers}</p>
              </div>
              <div className="p-3 bg-[#fbe216] bg-opacity-10 rounded-full">
                <FaUsers className="h-6 w-6 text-[#fbe216]" />
              </div>
            </div>
          </div>

          {/* Demandes en attente */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Demandes en attente</p>
                <p className="text-2xl font-semibold text-gray-900">{mockStats.pendingRequests}</p>
              </div>
              <div className="p-3 bg-[#fbe216] bg-opacity-10 rounded-full">
                <FaExclamationTriangle className="h-6 w-6 text-[#fbe216]" />
              </div>
            </div>
          </div>

          {/* Événements terminés */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Événements terminés</p>
                <p className="text-2xl font-semibold text-gray-900">{mockStats.completedEvents}</p>
              </div>
              <div className="p-3 bg-[#fbe216] bg-opacity-10 rounded-full">
                <FaCheckCircle className="h-6 w-6 text-[#fbe216]" />
              </div>
            </div>
          </div>
        </div>

        {/* Activités récentes */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Activités récentes</h2>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-[#fbe216] bg-opacity-10 rounded-full">
                    {activity.type === 'event' ? (
                      <FaCalendarAlt className="h-5 w-5 text-[#fbe216]" />
                    ) : (
                      <FaUsers className="h-5 w-5 text-[#fbe216]" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{activity.title}</p>
                    <p className="text-sm text-gray-500">{new Date(activity.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  activity.status === 'completed' 
                    ? 'bg-green-100 text-green-800' 
                    : activity.status === 'active'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {activity.status === 'completed' ? 'Terminé' : activity.status === 'active' ? 'En cours' : 'En attente'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 