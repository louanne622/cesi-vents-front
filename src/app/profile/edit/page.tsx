"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Button from '../../components/ui/Button';
import { FaUser, FaCamera, FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';

export default function EditProfilePage() {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@viacesi.fr',
    phone: '+33 6 12 34 56 78',
    campus: 'Lille',
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setProfileImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique de sauvegarde à implémenter
    console.log('Données à sauvegarder:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-white pb-16 md:pb-0">
      <div className="container mx-auto px-4 py-8">
        <div className="w-full max-w-2xl mx-auto">
          {/* En-tête */}
          <div className="flex items-center justify-between mb-8">
            <Link href="/profile" className="flex items-center text-gray-600 hover:text-gray-900">
              <FaArrowLeft className="mr-2" />
              Retour
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Modifier le profil</h1>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Photo de profil */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6" style={{ paddingTop: '0px' }}   >
              <div className="flex flex-col items-center">
                <div className="relative w-32 h-32 mb-4">
                  <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    {profileImage ? (
                      <Image
                        src={profileImage}
                        alt="Photo de profil"
                        width={128}
                        height={128}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <FaUser className="h-16 w-16 text-gray-500" />
                    )}
                  </div>
                  <label className="absolute bottom-0 right-0 bg-yellow-400 text-white rounded-full p-2 cursor-pointer hover:bg-yellow-500">
                    <FaCamera className="h-5 w-5" />
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
                <p className="text-sm text-gray-500">Cliquez pour changer la photo</p>
              </div>
            </div>

            {/* Informations personnelles */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6" style={{ paddingTop: '0px' }}   >
              <h3 className="text-lg font-medium text-gray-900 mb-4">Informations personnelles</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Campus</label>
                  <select
                    name="campus"
                    value={formData.campus}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  >
                    <option value="Lille">Lille</option>
                    <option value="Paris">Paris</option>
                    <option value="Arras">Arras</option>
                    <option value="Rouen">Rouen</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="flex justify-end space-x-4">
              <Link href="/profile">
                <Button
                  text="Annuler"
                  color="secondary"
                  variant="outline"
                  onClick={() => {}}
                />
              </Link>
              <Button
                text="Enregistrer"
                color="primary"
                type="submit"
                onClick={() => {}}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 