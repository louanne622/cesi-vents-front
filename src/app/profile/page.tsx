"use client";

import React, { useEffect } from 'react';
import Image from 'next/image';
import Button from '../components/ui/Button';
import { FaUser, FaEdit, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getProfile } from '@/redux/features/authSlice';

export default function ProfilePage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { profile, isFetchingProfile, error, token } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!token) {
      router.push('/login');
      return;
    }
    dispatch(getProfile());
  }, [dispatch, router, token]);

  if (isFetchingProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Chargement...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

  if (!profile) {
    return null;
  }

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
                {profile.logo ? (
                  <Image
                    src={profile.logo.url} 
                    alt={profile.logo.alt}
                    width={96}
                    height={96}
                    className="rounded-full"
                  />
                ) : (
                  <FaUser size={40} className="text-gray-400" />
                )}
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900">{profile.first_name} {profile.last_name}</h2>
                <p className="text-gray-500">{profile.email}</p>
                {profile.role && (
                  <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded mt-2">
                    {profile.role}
                  </span>
                )}
                <div className="mt-4 flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <FaCalendarAlt className="text-gray-400" />
                    <span className="text-sm text-gray-600">
                      Inscrit depuis {new Date(profile.createdAt).getFullYear()}
                    </span>
                  </div>
                  {profile.location && (
                    <div className="flex items-center space-x-2">
                      <FaMapMarkerAlt className="text-gray-400" />
                      <span className="text-sm text-gray-600">{profile.location}</span>
                    </div>
                  )}
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
                <p className="mt-1 text-gray-900">{profile.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Téléphone</label>
                <p className="mt-1 text-gray-900">
                  {profile.phone || 'Non renseigné'}
                </p>
              </div>
            </div>
          </div>

          {/* Mes tickets */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Mes tickets</h3>
              <Link href="/profile/tickets">
                <Button
                  text="Mes tickets"
                  color="primary"
                  variant="outline"
                  size="sm"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 