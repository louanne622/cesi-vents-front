"use client";

import React, { useEffect } from 'react';
import Image from 'next/image';
import { FaUsers, FaMapMarkerAlt, FaCalendarAlt, FaArrowLeft, FaEnvelope } from 'react-icons/fa';
import Button from '../ui/Button';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getClubById, getClubByName } from '@/redux/features/clubSlice';
import { toast } from 'react-hot-toast';
import { assignClubToUser } from '@/redux/features/userSlice';

interface ClubDetailsProps {
  clubId?: string;
  clubName?: string;
  onBack: () => void;
}

export default function ClubDetails({ clubId, clubName, onBack }: ClubDetailsProps) {
  const dispatch = useAppDispatch();
  const { currentClub, loading, error } = useAppSelector((state) => state.club);
  const { profile: currentUser } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // Ne récupérer les données que si le club n'est pas déjà chargé
    if (!currentClub || (clubId && currentClub._id !== clubId)) {
      const fetchClub = async () => {
        try {
          if (clubName) {
            await dispatch(getClubByName(clubName));
          } else if (clubId) {
            await dispatch(getClubById(clubId));
          }
        } catch (error) {
          toast.error('Erreur lors de la récupération des détails du club');
        }
      };

      fetchClub();
    }
  }, [dispatch, clubId, clubName, currentClub?._id]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#fbe216] mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement des détails du club...</p>
        </div>
      </div>
    );
  }

  if (!currentClub) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Club non trouvé</p>
          <Button
            text="Retour aux clubs"
            color="secondary"
            icon={<FaArrowLeft />}
            iconPosition="left"
            onClick={onBack}
            className="mt-4"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="container mx-auto px-4 py-8">
        {/* Bouton retour */}
        <div className="mb-6">
          <Button
            text="Retour aux clubs"
            color="secondary"
            icon={<FaArrowLeft />}
            iconPosition="left"
            onClick={onBack}
          />
        </div>

        {/* En-tête avec image */}
        <div className="relative h-64 md:h-96 rounded-xl overflow-hidden mb-8">
          {currentClub.logo?.url ? (
            <Image
              src={currentClub.logo.url}
              alt={currentClub.logo.alt || currentClub.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <FaUsers className="h-24 w-24 text-[#fbe216]" />
            </div>
          )}
        </div>

        {/* Informations du club */}
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{currentClub.name || 'Nom non défini'}</h1>
          
          {/* Catégorie */}
          {currentClub.category && (
            <div className="inline-block px-3 py-1 bg-[#fbe216] text-gray-800 rounded-full text-sm font-medium mb-6">
              {currentClub.category.charAt(0).toUpperCase() + currentClub.category.slice(1)}
            </div>
          )}

          {/* Description */}
          <p className="text-gray-600 mb-8">{currentClub.description || 'Aucune description disponible'}</p>

          {/* Informations détaillées */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {currentClub.campus && (
              <div className="flex items-center text-gray-700">
                <FaMapMarkerAlt className="h-5 w-5 text-[#fbe216] mr-3" />
                <span>Campus de {currentClub.campus}</span>
              </div>
            )}
            {currentClub.email && (
              <div className="flex items-center text-gray-700">
                <FaEnvelope className="h-5 w-5 text-[#fbe216] mr-3" />
                <span>{currentClub.email}</span>
              </div>
            )}
          </div>

          {/* Boutons d'action */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              text="Rejoindre le club"
              color="primary"
              onClick={async () => {
                try {
                  const result = await dispatch(assignClubToUser({
                    userId: currentUser._id, 
                    clubId: currentClub._id
                  })).unwrap();
                  if (result) {
                    toast.success('Vous avez rejoint le club avec succès!');
                  }
                } catch (error: any) {
                  toast.error(error.message || 'Une erreur est survenue lors de l\'inscription au club');
                  console.error(error);
                }
              }}
            />
            <Button
              text="Voir les événements"
              color="secondary"
              variant="outline"
              onClick={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 