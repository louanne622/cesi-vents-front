"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaArrowLeft, FaImage, FaUsers, FaMapMarkerAlt, FaCalendarAlt, FaUser } from 'react-icons/fa';
import Button from '@/app/components/ui/Button';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getClubById, updateClub } from '@/redux/features/clubSlice';
import { toast } from 'react-hot-toast';

interface PageParams {
  id: string;
}

export default function EditClubPage({ params }: { params: Promise<PageParams> }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { currentClub, loading, error } = useAppSelector((state) => state.club);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    campus: '',
    email: '',
    logo: { url: '', alt: '' }
  });

  const resolvedParams = React.use(params);
  const clubId = resolvedParams.id;

  useEffect(() => {
    const fetchClub = async () => {
      try {
        await dispatch(getClubById(clubId));
      } catch (error) {
        toast.error('Erreur lors de la récupération des données du club');
      }
    };

    fetchClub();
  }, [dispatch, clubId]);

  useEffect(() => {
    if (currentClub) {
      console.log('Current club data:', currentClub);
      setFormData({
        name: currentClub.name,
        description: currentClub.description,
        category: currentClub.category,
        campus: currentClub.campus,
        email: currentClub.email,
        logo: currentClub.logo
      });
    }
  }, [currentClub]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const clubData = {
        name: formData.name || currentClub?.name || '',
        description: formData.description || currentClub?.description || '',
        email: formData.email || currentClub?.email || '',
        category: formData.category || currentClub?.category || 'culture',
        campus: formData.campus || currentClub?.campus || 'Lille',
        logo: formData.logo || currentClub?.logo || { url: '', alt: '' }
      };

      console.log('Sending club data:', clubData);
      const result = await dispatch(updateClub({ id: clubId, data: clubData })).unwrap();
      console.log('Update result:', result);
      
      toast.success('Club mis à jour avec succès');
      router.push('/admin/clubs');
    } catch (error: any) {
      console.error('Update error:', error);
      toast.error(error.message || 'Erreur lors de la mise à jour du club');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#fbe216] mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement des données du club...</p>
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
            text="Retour"
            color="secondary"
            icon={<FaArrowLeft />}
            iconPosition="left"
            onClick={() => router.push('/admin/clubs')}
            className="mt-4"
          />
        </div>
      </div>
    );
  }

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

        {/* Formulaire de modification */}
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Modifier le club</h1>
          
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
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fbe216] focus:border-transparent"
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
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fbe216] focus:border-transparent"
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
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fbe216] focus:border-transparent"
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
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fbe216] focus:border-transparent"
              >
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
                id="campus"
                name="campus"
                value={formData.campus}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fbe216] focus:border-transparent"
              >
                <option value="Lille">Lille</option>
                <option value="Paris">Paris</option>
                <option value="Arras">Arras</option>
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
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setFormData(prev => ({
                          ...prev,
                          logo: {
                            url: reader.result as string,
                            alt: file.name
                          }
                        }));
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="hidden"
                />
                <label
                  htmlFor="logo"
                  className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-gray-700"
                >
                  Changer l'image
                </label>
                {formData.logo.url && (
                  <div className="relative h-20 w-20">
                    <img
                      src={formData.logo.url}
                      alt={formData.logo.alt}
                      className="object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="flex justify-end space-x-4">
              <Button
                text="Annuler"
                color="secondary"
                variant="outline"
                onClick={() => router.back()}
                disabled={isSubmitting}
              />
              <Button
                text={isSubmitting ? "Enregistrement..." : "Enregistrer"}
                color="primary"
                type="submit"
                disabled={isSubmitting}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 