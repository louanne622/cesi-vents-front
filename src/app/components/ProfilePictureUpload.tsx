'use client';

import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import Image from 'next/image';
import { FaUser, FaCamera } from 'react-icons/fa';
import { uploadProfilePicture, getProfile } from '@/redux/features/authSlice';

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

    console.log('Token:', token); //token

    try {
      if (!token) {
        throw new Error('Vous devez être connecté pour télécharger une image');
      }

      const formData = new FormData();
      formData.append('image', file);

      await dispatch(uploadProfilePicture(formData)).unwrap();
      await dispatch(getProfile()).unwrap();
      
    } catch (error: any) {
      console.error('Erreur lors du téléchargement:', error);
      setError(error.message || 'Erreur lors du téléchargement de l\'image');
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
              src={profile.logo.url}
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
