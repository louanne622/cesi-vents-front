"use client";

import Hero from "./components/Hero";
import EventCard from "./components/Eventcard";
import { FaUsers } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

// Données de démonstration
const upcomingEvents = [
  {
    id: 1,
    title: "Soirée d'intégration CESI",
    place: "Campus CESI - Hall Principal",
    schedule: "19:00",
    date: { day: "15", month: "Septembre" },
    imageUrl: "/img/lan.jpg"
  },
  {
    id: 2,
    title: "Hackathon IA & Innovation",
    place: "Campus CESI - Labo Tech",
    schedule: "09:00",
    date: { day: "22", month: "Octobre" },
    imageUrl: "/img/lan.jpg"
  },
  {
    id: 3,
    title: "Atelier CV & LinkedIn",
    place: "Campus CESI - Salle 103",
    schedule: "14:30",
    date: { day: "05", month: "Novembre" },
    imageUrl: "/img/lan.jpg"
  }
];

const featuredClubs = [
  {
    id: 1,
    name: "Club Robotique",
    description: "Passionnés de robotique et d'innovation",
    members: 32
  },
  {
    id: 2,
    name: "BDE CESI",
    description: "Bureau des Étudiants - Animation de la vie étudiante",
    members: 45
  },
  {
    id: 3,
    name: "Club Gaming",
    description: "Esport et événements gaming",
    members: 28
  }
];

const bdeFeaturedEvents = [
  {
    id: 4,
    title: "Gala annuel CESI",
    place: "Hôtel Le Grand Palace",
    schedule: "19:30",
    date: { day: "14", month: "Février" },
    imageUrl: "/img/lan.jpg"
  },
  {
    id: 5,
    title: "Soirée Réseautage Entreprises",
    place: "Campus CESI - Espace Carrière",
    schedule: "18:30",
    date: { day: "26", month: "Janvier" },
    imageUrl: "/img/lan.jpg"
  },
  {
    id: 6,
    title: "Forum des Associations",
    place: "Campus CESI - Hall Principal",
    schedule: "12:00",
    date: { day: "21", month: "Mars" },
    imageUrl: "/img/lan.jpg"
  }
];

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white pb-20">
      <Hero />
      <div className="container mx-auto px-4 py-8">
        {/* Section Événements à venir */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Événements à venir</h2>
            <button 
              onClick={() => router.push('/events')}
              className="text-sm text-[#fbe216] hover:underline"
            >
              Voir tous les événements
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <div 
                key={event.id}
                onClick={() => router.push(`/events/${event.id}`)}
                className="cursor-pointer hover:scale-105 transition-transform duration-200"
              >
                <EventCard {...event} />
              </div>
            ))}
          </div>
        </section>

        {/* Section Clubs mis en avant */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Clubs à découvrir</h2>
            <button 
              onClick={() => router.push('/clubs')}
              className="text-sm text-[#fbe216] hover:underline"
            >
              Voir tous les clubs
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredClubs.map((club) => (
              <div 
                key={club.id}
                onClick={() => router.push(`/clubs/${club.id}`)}
                className="bg-white rounded-lg shadow-sm p-6 cursor-pointer hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0">
                    <FaUsers className="h-10 w-10 text-[#fbe216]" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">{club.name}</h3>
                    <p className="text-sm text-gray-500">{club.members} membres</p>
                  </div>
                </div>
                <p className="text-gray-600">{club.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section Événements mis en avant par le BDE */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Mis en avant par le BDE</h2>
            <button 
              onClick={() => router.push('/events')}
              className="text-sm text-[#fbe216] hover:underline"
            >
              Voir tous les événements
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bdeFeaturedEvents.map((event) => (
              <div 
                key={event.id}
                onClick={() => router.push(`/events/${event.id}`)}
                className="cursor-pointer hover:scale-105 transition-transform duration-200"
              >
                <EventCard {...event} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}