"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaArrowLeft, FaImage, FaUsers, FaMapMarkerAlt, FaCalendarAlt, FaUser } from 'react-icons/fa';
import Button from '@/app/components/ui/Button';

// Données de démonstration (à remplacer par un appel API)
const mockClubData = {
  id: 1,
  name: 'Club Photo',
  description: 'Capturez les moments forts de la vie étudiante. Notre club photo vous offre l\'opportunité de développer vos compétences en photographie.',
  category: 'culture',
  campus: 'Lille',
  image: '/images/clubs/photo-club.jpg',
  leaderEmail: 'john.doe@cesi.fr',
  members: 45,
  nextEvent: '15 Septembre 2023',
};

interface PageParams {
  id: string;
}

export default function EditClubPage({ params }: { params: Promise<PageParams> }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'culture',
    campus: 'Lille',
    image: '',
    leaderEmail: '',
  });

  const resolvedParams = React.use(params);
  const clubId = resolvedParams.id;

  useEffect(() => {
    // TODO: Remplacer par un appel API pour récupérer les données du club
    const club = mockClubData;
    setFormData({
      name: club.name,
      description: club.description,
      category: club.category,
      campus: club.campus,
      image: club.image,
      leaderEmail: club.leaderEmail,
    });
  }, [clubId]);

  const handleSubmit = () => {
    // TODO: Implémenter la logique de mise à jour du club
    console.log('Updated club data:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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

        {/* Formulaire de modification */}
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Modifier le club</h1>
          
          <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-6">
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

            {/* Chef de club */}
            <div>
              <label htmlFor="leaderEmail" className="block text-sm font-medium text-gray-700 mb-1">
                Responsable de club
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="leaderEmail"
                  name="leaderEmail"
                  value={formData.leaderEmail}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fbe216] focus:border-transparent"
                  placeholder="email@cesi.fr"
                />
              </div>
              <p className="mt-1 text-sm text-gray-500">
                L'étudiant recevra une notification pour accepter son rôle de Responsable de club
              </p>
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
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                Image du club
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setFormData(prev => ({
                          ...prev,
                          image: reader.result as string
                        }));
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="hidden"
                />
                <label
                  htmlFor="image"
                  className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 text-gray-900"
                >
                  <FaImage className="h-5 w-5 text-gray-500 mr-2" />
                  <span>Changer l'image</span>
                </label>
                {formData.image && (
                  <div className="relative h-20 w-20">
                    <img
                      src={formData.image}
                      alt="Club"
                      className="object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Informations supplémentaires */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Informations actuelles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center text-gray-700">
                  <FaUsers className="h-5 w-5 text-[#fbe216] mr-3" />
                  <span>{mockClubData.members} membres</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <FaCalendarAlt className="h-5 w-5 text-[#fbe216] mr-3" />
                  <span>Prochain événement : {mockClubData.nextEvent}</span>
                </div>
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="flex justify-end space-x-4">
              <Button
                text="Annuler"
                color="secondary"
                variant="outline"
                onClick={() => router.back()}
              />
              <Button
                text="Enregistrer"
                color="primary"
                onClick={handleSubmit}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 