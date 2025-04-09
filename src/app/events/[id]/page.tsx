"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Button from '@/app/components/ui/Button';
import { FaArrowLeft, FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaEuroSign } from 'react-icons/fa';

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
  {
    id: 2,
    title: "Tournoi de Jeux Vidéo",
    description: "Participez à notre tournoi de jeux vidéo ! Au programme : League of Legends, Valorant, et bien d'autres. Des lots à gagner !",
    date: {
      day: "22",
      month: "Septembre"
    },
    time: "14:00",
    location: "Salle Multimédia CESI",
    image: "/img/lan.jpg",
    category: "Gaming",
    organizer: "Club Gaming CESI",
    price: "5€",
    participants: {
      current: 45,
      max: 50
    }
  },
  {
    id: 3,
    title: "Atelier Développement Web",
    description: "Apprenez les bases du développement web avec nos experts. HTML, CSS, JavaScript et plus encore !",
    date: {
      day: "30",
      month: "Septembre"
    },
    time: "10:00",
    location: "Salle Informatique CESI",
    image: "/img/lan.jpg",
    category: "Formation",
    organizer: "Club Tech CESI",
    price: "Gratuit",
    participants: {
      current: 15,
      max: 30
    }
  }
];

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [event, setEvent] = useState<any>(null);

  useEffect(() => {
    const eventId = parseInt(params.id as string);
    const foundEvent = eventsListData.find(e => e.id === eventId);
    setEvent(foundEvent);
  }, [params.id]);

  if (!event) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-500">Événement non trouvé</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-20">
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

        {/* Image de l'événement */}
        <div className="relative w-full h-64 md:h-96 mb-8 rounded-xl overflow-hidden">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover"
          />
        </div>
        {/* Informations principales */}
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{event.title}</h1>
          
          {/* Métadonnées */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
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

          {/* Description */}
          <div className="prose max-w-none mb-8">
            <p className="text-gray-700">{event.description}</p>
          </div>

          {/* Organisateur */}
          <div className="bg-gray-50 p-4 rounded-lg mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Organisé par</h3>
            <p className="text-gray-600">{event.organizer}</p>
          </div>

          {/* Bouton d'inscription */}
          <div className="flex justify-center">
            <Button
              text="S'inscrire à l'événement"
              color="primary"
              onClick={() => router.push(`/events/${event.id}/register`)}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 

