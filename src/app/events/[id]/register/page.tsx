"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Button from '@/app/components/ui/Button';
import { FaArrowLeft, FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaEuroSign, FaCheck } from 'react-icons/fa';

// Données de démonstration (à remplacer par un appel API)
const eventsListData = [
  {
    id: 1,
    title: "Soirée d'intégration CESI",
    description: "Rejoignez-nous pour une soirée exceptionnelle pour accueillir les nouveaux étudiants du CESI. Au programme : animations, musique et surprises !",
    date: {
      day: "15",
      month: "Septembre"
    },
    time: "19:00",
    location: "Campus CESI - Hall Principal",
    image: "/img/lan.jpg",
    category: "Social",
    organizer: "BDE CESI",
    price: "Gratuit",
    participants: {
      current: 120,
      max: 200
    }
  },
  // ... autres événements ...
];

// Données de l'utilisateur connecté (à remplacer par les données réelles)
const currentUser = {
  firstName: "Jean",
  lastName: "Dupont",
  email: "jean.dupont@viacesi.fr",
  phone: "0612345678",
  studentId: "CESI2024"
};

interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  studentId: string;
}

export default function EventRegistrationPage() {
  const params = useParams();
  const router = useRouter();
  const [event, setEvent] = useState<any>(null);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
    phone: currentUser.phone,
    studentId: currentUser.studentId
  });
  const [isLoading, setIsLoading] = useState(false);
  const [registrationComplete, setRegistrationComplete] = useState(false);

  useEffect(() => {
    const eventId = parseInt(params.id as string);
    const foundEvent = eventsListData.find(e => e.id === eventId);
    setEvent(foundEvent);
  }, [params.id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simuler un délai de traitement
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Si l'événement est payant, rediriger vers la page de paiement
    if (event?.price !== "Gratuit") {
      router.push(`/events/${event?.id}/payment`);
      return;
    }

    // Sinon, compléter l'inscription
    setRegistrationComplete(true);
    setIsLoading(false);
  };

  if (!event) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-500">Événement non trouvé</p>
      </div>
    );
  }

  if (registrationComplete) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCheck className="text-green-500 text-2xl" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Inscription confirmée !</h1>
              <p className="text-gray-600">Vous êtes maintenant inscrit à l'événement</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Récapitulatif</h2>
              <div className="space-y-3 text-left">
                <p><span className="font-medium">Événement :</span> {event.title}</p>
                <p><span className="font-medium">Date :</span> {event.date.day} {event.date.month} à {event.time}</p>
                <p><span className="font-medium">Lieu :</span> {event.location}</p>
                <p><span className="font-medium">Participant :</span> {userInfo.firstName} {userInfo.lastName}</p>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <Button
                text="Retour à l'événement"
                color="secondary"
                variant="outline"
                onClick={() => router.push(`/events/${event.id}`)}
              />
              <Button
                text="Voir mes inscriptions"
                color="primary"
                onClick={() => router.push('/profile/registrations')}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* En-tête avec bouton retour */}
        <div className="flex items-center mb-8">
          <Button
            text="Retour"
            color="secondary"
            variant="outline"
            icon={<FaArrowLeft />}
            iconPosition="left"
            onClick={() => router.back()}
          />
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Résumé de l'événement */}
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Résumé de l'événement</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center text-gray-600">
                <FaCalendarAlt className="mr-2 text-[#fbe216]" />
                <span>{event.date.day} {event.date.month} à {event.time}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <FaMapMarkerAlt className="mr-2 text-[#fbe216]" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <FaUsers className="mr-2 text-[#fbe216]" />
                <span>{event.participants.current}/{event.participants.max} participants</span>
              </div>
              <div className="flex items-center text-gray-600">
                <FaEuroSign className="mr-2 text-[#fbe216]" />
                <span>{event.price}</span>
              </div>
            </div>
          </div>

          {/* Formulaire d'inscription */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Informations personnelles</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  Prénom *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  value={userInfo.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fbe216] focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Nom *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                  value={userInfo.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fbe216] focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={userInfo.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fbe216] focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Téléphone *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={userInfo.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fbe216] focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="studentId" className="block text-sm font-medium text-gray-700 mb-1">
                Numéro étudiant *
              </label>
              <input
                type="text"
                id="studentId"
                name="studentId"
                required
                value={userInfo.studentId}
                onChange={handleInputChange}
                className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fbe216] focus:border-transparent"
              />
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                text={isLoading ? "Traitement..." : "S'inscrire"}
                color="primary"
                disabled={isLoading}
                className="w-full"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 