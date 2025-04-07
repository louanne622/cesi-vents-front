"use client";

import React, { useState, useEffect } from 'react';
import Button from '../../components/ui/Button';
import { FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';
import ProfilePictureUpload from '@/app/components/ProfilePictureUpload';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getProfile, updateProfile } from '@/redux/features/authSlice';

export default function EditProfilePage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { profile, isLoading, error, token } = useAppSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    campus: '',
    role: '',
    bde_member: false
  });

  useEffect(() => {
    if (!token) {
      router.push('/login');
      return;
    }
    if (!profile) {
      dispatch(getProfile());
    } else {
      setFormData({
        first_name: profile.first_name || '',
        last_name: profile.last_name || '',
        email: profile.email || '',
        phone: profile.phone || '',
        campus: profile.campus || '',
        role: profile.role || 'user',
        bde_member: profile.bde_member || false
      });
    }
  }, [dispatch, router, token, profile]);



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await dispatch(updateProfile(formData)).unwrap();
      if (result) {
        router.push('/profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
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
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6" style={{ paddingTop: '0px' }}>
              <ProfilePictureUpload />
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
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                    <input
                      type="text"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
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
                    className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Campus</label>
                  <select
                    name="campus"
                    value={formData.campus}
                    onChange={handleChange}
                    className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
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
                />
              </Link>
              <Button
                text={isLoading ? 'Enregistrement...' : 'Enregistrer'}
                color="primary"
                type="submit"
                disabled={isLoading}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 