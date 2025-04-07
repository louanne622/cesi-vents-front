'use client';

import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import Image from 'next/image';
import { FaUser, FaCamera } from 'react-icons/fa';
import { getProfile } from '@/redux/features/authSlice';
import axiosInstance from '@/utils/axiosConfig';

export default function ProfilePictureUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const token = useAppSelector((state) => state.auth.token);
  const profile = useAppSelector((state) => state.auth.profile);
  const dispatch = useAppDispatch();

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError('');

    try {
      if (!token) {
        throw new Error('Vous devez être connecté pour télécharger une image');
      }

      // Vérifier le type de fichier
      if (!file.type.startsWith('image/')) {
        throw new Error('Veuillez sélectionner une image');
      }

      // Vérifier la taille du fichier (par exemple, 5MB max)
      if (file.size > 5 * 1024 * 1024) {
        throw new Error('L\'image ne doit pas dépasser 5MB');
      }

      const formData = new FormData();
      formData.append('image', file);
      
      console.log('Début de l\'upload, taille du fichier:', file.size);

      // Utiliser l'axiosInstance directement avec le bon Content-Type
      const response = await axiosInstance.post('/auth/upload-profile-picture', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json'
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            console.log('Progress:', progress);
          }
        }
      });

      console.log('Réponse du serveur:', response.data);

      // Rafraîchir le profil
      await dispatch(getProfile()).unwrap();
      
    } catch (error: any) {
      console.error('Erreur détaillée:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        config: error.config
      });
      
      setError(
        error.response?.data?.message || 
        error.message || 
        'Erreur lors du téléchargement de l\'image'
      );
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-32 mb-4">
        <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
          {profile?.logo?.url ? (
            <Image
              src={profile.logo.url }
              alt={profile.logo.alt || 'Photo de profil'}
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
            onChange={handleFileChange}
            disabled={isUploading}
          />
        </label>
      </div>
      <p className="text-sm text-gray-500">
        {isUploading ? 'Upload en cours...' : 'Cliquez pour changer la photo'}
      </p>

      {/* Message d'erreur */}
      {error && (
        <p className="text-red-500 text-sm mt-2">{error}</p>
      )}
    </div>
  );
}
