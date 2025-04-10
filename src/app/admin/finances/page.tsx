"use client"

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { 
  getTransactionsByMonth, 
  getTransactionsByYear,
  getAllTransactions
} from '@/redux/features/transactionSlice';
import { FaEuroSign, FaChartLine, FaSearch } from 'react-icons/fa';

interface Transaction { 
  userId: string;
  totalAmount: number;
  promoCode: string;
  date: string;
}

export default function AdminFinancesPage() {
  const dispatch = useDispatch<AppDispatch>();
  const [searchQuery, setSearchQuery] = useState('');

  const { 
    transactions,
    loading,
    error
  } = useSelector((state: RootState) => state.transaction);

  useEffect(() => {
    dispatch(getAllTransactions());
  }, [dispatch]);

  const filteredTransactions = Array.isArray(transactions) 
    ? transactions.filter((transaction) => {
        const matchesSearch = transaction.promoCode.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesSearch;
      })
    : [];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Gestion des finances</h1>

        {/* Statistiques financières */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Revenus mensuels */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Revenus mensuels</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {loading ? 'Chargement...' : `${transactions.length} €`}
                </p>
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
                <p className="text-2xl font-semibold text-gray-900">
                  {loading ? 'Chargement...' : `${transactions.length} €`}
                </p>
              </div>
              <div className="p-3 bg-[#fbe216] bg-opacity-10 rounded-full">
                <FaEuroSign className="h-6 w-6 text-[#fbe216]" />
              </div>
            </div>
          </div>
        </div>

        {/* Barre de recherche */}
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
                    Code promo
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Montant
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan={3} className="px-6 py-4 text-center text-gray-500">
                      Chargement des transactions...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan={3} className="px-6 py-4 text-center text-red-500">
                      {error}
                    </td>
                  </tr>
                ) : filteredTransactions.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-6 py-4 text-center text-gray-500">
                      Aucune transaction trouvée
                    </td>
                  </tr>
                ) : (
                  filteredTransactions.map((transaction) => (
                    <tr key={transaction.userId} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(transaction.date).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{transaction.promoCode}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="text-sm font-medium">
                          {transaction.totalAmount.toFixed(2)} €
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}