"use client";

import React from 'react';
import Image from 'next/image';
import Button from '../components/ui/Button';
import { FaUser, FaEdit, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import Link from 'next/link';

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-white pb-16 md:pb-0">
      <div className="container mx-auto px-4 py-8">
        <div className="w-full max-w-2xl mx-auto">
          {/* En-tête */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Mon Profil</h1>
            <Link href="/profile/edit">
              <Button
                text="Modifier"
                color="primary"
                variant="outline"
                icon={<FaEdit />}
                iconPosition="left"
                onClick={() => {}}
              />
            </Link>
          </div>

          {/* Photo de profil et informations */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                <FaUser className="h-12 w-12 text-gray-500" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900">John Doe</h2>
                <p className="text-gray-500">Étudiant CESI</p>
                <div className="mt-2 flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <FaCalendarAlt className="text-gray-400" />
                    <span className="text-sm text-gray-600">Inscrit depuis 2023</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaMapMarkerAlt className="text-gray-400" />
                    <span className="text-sm text-gray-600">Campus de Lille</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Informations de contact */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Informations de contact</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-500">Email</label>
                <p className="mt-1 text-gray-900">john.doe@viacesi.fr</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Téléphone</label>
                <p className="mt-1 text-gray-900">+33 6 12 34 56 78</p>
              </div>
            </div>
          </div>

          {/* Événements à venir */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Événements à venir</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">Soirée d'intégration</h4>
                  <p className="text-sm text-gray-500">15 Septembre 2023</p>
                </div>
                <Button
                  text="Voir détails"
                  color="primary"
                  variant="outline"
                  size="sm"
                  onClick={() => {}}
                />
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">Hackathon CESI</h4>
                  <p className="text-sm text-gray-500">20-22 Octobre 2023</p>
                </div>
                <Button
                  text="Voir détails"
                  color="primary"
                  variant="outline"
                  size="sm"
                  onClick={() => {}}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 