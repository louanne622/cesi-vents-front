"use client";

import React, { useEffect, useState } from 'react';
import Button from '../components/ui/Button';
import { FaUser, FaEdit, FaCalendarAlt, FaMapMarkerAlt, FaGift } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getProfile } from '@/redux/features/authSlice';
import { fetchGoodies, exchangeGoodie } from '@/redux/features/goodieSlice';

interface Goodie {
  _id: string;
  name: string;
  description: string;
  points_cost: number;
  image_url: string;
  stock: number;
  available: boolean;
}
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { profile, isFetchingProfile, error, token } = useAppSelector((state) => state.auth);
  const { goodies, status } = useAppSelector((state) => state.goodie);
  const [selectedGoodie, setSelectedGoodie] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      router.push('/login');
      return;
    }
    dispatch(getProfile());
    dispatch(fetchGoodies());
  }, [dispatch, router, token]);

  const handleExchange = async (goodieId: string) => {
    try {
      await dispatch(exchangeGoodie(goodieId)).unwrap();
      toast.success('Échange réussi !');
      dispatch(getProfile()); // Refresh user points
      dispatch(fetchGoodies()); // Refresh goodies list
      setSelectedGoodie(null);
    } catch (error: any) {
      toast.error(error || 'Une erreur est survenue');
    }
  };

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

          {/* Points et Goodies */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Mes points et récompenses</h3>
            <div className="p-4 bg-gray-50 rounded-lg mb-6">
              <p className="text-sm text-gray-600">Points disponibles</p>
              <p className="text-2xl font-bold text-gray-900">{profile.points || 0}</p>
            </div>

            {/* Liste des Goodies */}
            <div className="mt-6">
              <h4 className="text-md font-medium text-gray-900 mb-4 flex items-center">
                <FaGift className="mr-2" /> Échanger mes points
              </h4>
              {status === 'loading' ? (
                <p>Chargement des goodies...</p>
              ) : goodies && goodies.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {goodies.map((goodie) => (
                    <div 
                      key={goodie._id} 
                      className="border rounded-lg p-4 bg-white"
                    >
                      <div className="space-y-2">
                        <h5 className="font-medium text-gray-900">{goodie.name}</h5>
                        <p className="text-sm text-gray-600">{goodie.description}</p>
                        <div className="mt-2">
                          <span className="text-sm font-medium text-blue-600">{goodie.points_cost} points</span>
                        </div>
                        {goodie.available && (
                          <Button
                            text={selectedGoodie === goodie._id ? 'Confirmer ?' : 'Échanger'}
                            color={selectedGoodie === goodie._id ? 'danger' : 'primary'}
                            variant="solid"
                            size="sm"
                            className="mt-2 w-full"
                            disabled={profile.points < goodie.points_cost}
                            onClick={() => {
                              if (selectedGoodie === goodie._id) {
                                handleExchange(goodie._id);
                              } else {
                                setSelectedGoodie(goodie._id);
                              }
                            }}
                          />
                        )}
                        {!goodie.available && (
                          <p className="text-sm text-red-500 mt-2">Non disponible</p>
                        )}
                        {goodie.available && profile.points < goodie.points_cost && (
                          <p className="text-xs text-red-500 mt-1">
                            Il vous manque {goodie.points_cost - profile.points} points
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">Aucun goodie disponible pour le moment.</p>
              )}
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