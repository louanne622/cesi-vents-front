"use client";

import React, { useState } from 'react';
import { FaEuroSign, FaChartLine, FaCalendarAlt, FaSearch } from 'react-icons/fa';
import Button from '@/app/components/ui/Button';

// Données de démonstration (à remplacer par des appels API)
const mockFinancialData = {
  monthlyRevenue: 2450,
  yearlyRevenue: 29400,
  monthlyExpenses: 1200,
  yearlyExpenses: 14400,
  profit: 1250,
  transactions: [
    {
      id: 1,
      date: '2024-04-15',
      description: 'Soirée Cinéma',
      amount: 225,
      type: 'income',
      category: 'Événement',
    },
    {
      id: 2,
      date: '2024-04-10',
      description: 'Achat matériel photo',
      amount: -150,
      type: 'expense',
      category: 'Équipement',
    },
    {
      id: 3,
      date: '2024-04-05',
      description: 'Tournoi de Football',
      amount: 160,
      type: 'income',
      category: 'Événement',
    },
  ],
};

export default function AdminFinancesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  const filteredTransactions = mockFinancialData.transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || transaction.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Gestion des finances</h1>

        {/* Statistiques financières */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Revenus mensuels */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Revenus mensuels</p>
                <p className="text-2xl font-semibold text-gray-900">{mockFinancialData.monthlyRevenue}€</p>
              </div>
              <div className="p-3 bg-[#fbe216] bg-opacity-10 rounded-full">
                <FaEuroSign className="h-6 w-6 text-[#fbe216]" />
              </div>
            </div>
          </div>

          {/* Revenus annuels */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Revenus annuels</p>
                <p className="text-2xl font-semibold text-gray-900">{mockFinancialData.yearlyRevenue}€</p>
              </div>
              <div className="p-3 bg-[#fbe216] bg-opacity-10 rounded-full">
                <FaChartLine className="h-6 w-6 text-[#fbe216]" />
              </div>
            </div>
          </div>

          {/* Dépenses mensuelles */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Dépenses mensuelles</p>
                <p className="text-2xl font-semibold text-gray-900">{mockFinancialData.monthlyExpenses}€</p>
              </div>
              <div className="p-3 bg-[#fbe216] bg-opacity-10 rounded-full">
                <FaEuroSign className="h-6 w-6 text-[#fbe216]" />
              </div>
            </div>
          </div>

          {/* Bénéfice mensuel */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Bénéfice mensuel</p>
                <p className="text-2xl font-semibold text-gray-900">{mockFinancialData.profit}€</p>
              </div>
              <div className="p-3 bg-[#fbe216] bg-opacity-10 rounded-full">
                <FaChartLine className="h-6 w-6 text-[#fbe216]" />
              </div>
            </div>
          </div>
        </div>

        {/* Barre de recherche et filtres */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Rechercher une transaction..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fbe216] focus:border-transparent"
              />
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaCalendarAlt className="h-5 w-5 text-gray-400" />
              </div>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="pl-10 pr-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fbe216] focus:border-transparent"
              >
                <option value="all">Tous les types</option>
                <option value="income">Revenus</option>
                <option value="expense">Dépenses</option>
              </select>
            </div>
          </div>
        </div>

        {/* Liste des transactions */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Catégorie
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Montant
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(transaction.date).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{transaction.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{transaction.category}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className={`text-sm font-medium ${
                        transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.type === 'income' ? '+' : '-'}{Math.abs(transaction.amount)}€
                      </div>
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