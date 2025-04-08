"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaArrowLeft, FaImage, FaUsers, FaMapMarkerAlt, FaCalendarAlt, FaUser } from 'react-icons/fa';
import Button from '../../../components/ui/Button';
import { createClub } from '@/redux/features/clubSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { toast } from 'react-hot-toast';
import { useAppDispatch,useAppSelector } from '@/redux/hooks';
import Toast from '@/app/components/Toast';

export default function CreateClubPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const MAX_IMAGE_SIZE = 50 * 1024; // 50KB en bytes
  
  const [formatData, setFormat] = useState({
    name: '',
    description: '',
    email: '',
    logo: { url: '', alt: '' },
    category: '',
    campus: ''
  });

  const {currentClub} = useAppSelector((state) => state.club);

  // Initialize currentClub with default values if not set
  useEffect(() => {
    if (!currentClub) {
      
    } else {
      setFormat({
        name: currentClub.name,
        description: currentClub.description,
        email: currentClub.email,
        logo: currentClub.logo,
        category: currentClub.category,
        campus: currentClub.campus
      });
    }
  }, [dispatch, currentClub]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log('Début de la soumission du formulaire');
      console.log('formatData:', formatData);

      // Vérification de la taille de l'image
      if (formatData.logo.url) {
        const base64String = formatData.logo.url.split(',')[1];
        const fileSize = Math.ceil((base64String.length * 3) / 4);
        if (fileSize > MAX_IMAGE_SIZE) {
          <Toast message={`L'image ne doit pas dépasser ${MAX_IMAGE_SIZE / 1024}KB`} type="error" duration={5000} />
        }
      }

      const clubData = {
        name: formatData.name,
        description: formatData.description,
        email: formatData.email,
        logo: {
          url: formatData.logo.url,
          alt: formatData.logo.alt || formatData.name
        },
        category: formatData.category,
        campus: formatData.campus
      };
      console.log('Données du club à créer:', clubData);

      const result = await dispatch(createClub(clubData)).unwrap();
      console.log('Résultat de la création:', result);
      <Toast message="Club créé avec succès !" type="success" duration={5000} />
      router.push('/admin/clubs');
    } catch (error: any) {
      console.error('Erreur lors de la création:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormat(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Vérification de la taille du fichier
      if (file.size > MAX_IMAGE_SIZE) {
        <Toast message={`L'image ne doit pas dépasser ${MAX_IMAGE_SIZE / 1024}KB`} type="error" duration={5000} />
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormat(prev => ({
          ...prev,
          logo: {
            url: reader.result as string,
            alt: file.name
          }
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="container mx-auto px-4 py-8">
        {/* En-tête avec bouton retour */}
        <div className="mb-6">
          <Button
            text="Retour"
            color="secondary"
            icon={<FaArrowLeft />}
            iconPosition="left"
            onClick={() => router.push('/admin/clubs')}
          />
        </div>

        {/* Formulaire de création */}
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Créer un nouveau club</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nom du club */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nom du club
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formatData.name || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                placeholder="Ex: Club Photo"
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formatData.description || ''}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                placeholder="Décrivez les activités et objectifs du club..."
              />
            </div>

            {/* Email du club */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email du club
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formatData.email || ''}
                  onChange={handleChange}
                  className="w-full pl-10 px-4 py-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                  placeholder="email@cesi.fr"
                />
              </div>
            </div>

            {/* Catégorie */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Catégorie
              </label>
              <select
                id="category"
                name="category"
                value={formatData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
              >
                <option value="">Sélectionner une catégorie</option>
                <option value="culture">Culture</option>
                <option value="sport">Sport</option>
                <option value="tech">Technologie</option>
                <option value="social">Social</option>
              </select>
            </div>

            {/* Campus */}
            <div>
              <label htmlFor="campus" className="block text-sm font-medium text-gray-700 mb-1">
                Campus
              </label>
              <select
                name="campus"
                value={formatData.campus}
                onChange={handleChange}
                className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
              >
                <option value="Lille">Lille</option>
                <option value="Paris">Paris</option>
                <option value="Arras">Arras</option>
                <option value="Rouen">Rouen</option>
              </select>
            </div>

            

            {/* Image du club */}
            <div>
              <label htmlFor="logo" className="block text-sm font-medium text-gray-700 mb-1">
                Image du club
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="file"
                  id="logo"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <label
                  htmlFor="logo"
                  className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-gray-700"
                >
                  Choisir une image
                </label>
                {formatData.logo.url && (
                  <div className="relative h-20 w-20">
                    <img
                      src={formatData.logo.url}
                      alt={formatData.logo.alt}
                      className="object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                type="submit"
                text={isLoading ? "Création en cours..." : "Créer le club"}
                color="primary"
                disabled={isLoading}
              />
              <Button
                type="button"
                text="Annuler"
                color="secondary"
                variant="outline"
                onClick={() => router.push('/admin/clubs')}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 