"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '../components/ui/Button';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getProfile } from '@/redux/features/authSlice';
import { useRouter } from 'next/navigation';

const SettingsPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { profile, isLoading, error, token } = useAppSelector((state) => state.auth);

  useEffect(() => { 
    if (!token) {
      router.push('/login');
      return;
    }
    dispatch(getProfile());
  }, [dispatch, router, token]);

  const handleLogout = async () => {
    try {
      // Supprimer le token du localStorage
      localStorage.removeItem('token');
      
      // Rediriger vers la page de connexion
      router.push('/login');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  return (
    <div className="min-h-screen bg-white pb-16 md:pb-0">
      <div className="container mx-auto px-4 py-8">
        <div className="w-full max-w-2xl mx-auto">
          {/* En-tête */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Paramètres</h1>
            <div className="flex items-center space-x-4">
              <Image
                src="/img/cesi4.png"
                alt="CESI Logo"
                width={60}
                height={60}
                className="object-contain"
              />
            </div>
          </div>

          {/* Profil */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                <FaUser className="h-8 w-8 text-gray-500" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">{profile?.first_name} {profile?.last_name}</h2>
                <p className="text-sm text-gray-500">Étudiant CESI {profile?.campus} </p>
              </div>
            </div>
            <Link href="/profile/edit">
              <Button
                text="Modifier le profil"
                color="primary"
                variant="outline"
              />
            </Link>
          </div>

          {/* Déconnexion */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <Button
              text="Déconnexion"
              color="danger"
              variant="outline"
              onClick={handleLogout}
              fullWidth
              icon={<FaSignOutAlt />}
              iconPosition="left"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;