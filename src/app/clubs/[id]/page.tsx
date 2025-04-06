"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import ClubDetails from '../../components/clubs/ClubDetails';

// Données des clubs (à déplacer dans un fichier de données séparé plus tard)
const clubs = [
  {
    id: 1,
    name: 'Club Photo',
    description: 'Capturez les moments forts de la vie étudiante. Notre club photo vous offre l\'opportunité de développer vos compétences en photographie, de participer à des sorties photo et d\'exposer vos œuvres lors d\'expositions sur le campus.',
    category: 'culture',
    members: 45,
    image: '/images/clubs/photo-club.jpg',
    campus: 'Lille',
    nextEvent: '15 Septembre 2023',
  },
  {
    id: 2,
    name: 'Club Robotique',
    description: 'Concevez et construisez des robots. Le club robotique vous permet de mettre en pratique vos connaissances en programmation et en électronique dans des projets passionnants.',
    category: 'tech',
    members: 30,
    image: '/images/clubs/robot-club.jpg',
    campus: 'Lille',
    nextEvent: '20 Septembre 2023',
  },
  {
    id: 3,
    name: 'Club Football',
    description: 'Participez aux compétitions inter-campus. Rejoignez notre équipe de football et représentez CESI lors des tournois inter-campus.',
    category: 'sport',
    members: 25,
    image: '/images/clubs/football-club.jpg',
    campus: 'Lille',
    nextEvent: '10 Septembre 2023',
  },
  {
    id: 4,
    name: 'Club Théâtre',
    description: 'Montez sur scène et exprimez-vous. Le club théâtre vous offre l\'opportunité de découvrir ou de perfectionner votre art dramatique à travers des pièces et des performances.',
    category: 'culture',
    members: 35,
    image: '/images/clubs/theatre-club.jpg',
    campus: 'Lille',
    nextEvent: '25 Septembre 2023',
  },
];

export default function ClubDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = React.use(params);
  const club = clubs.find(c => c.id === parseInt(resolvedParams.id));

  if (!club) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Club non trouvé</h1>
          <button
            onClick={() => router.push('/clubs')}
            className="text-[#fbe216] hover:text-[#e6cf14]"
          >
            Retour aux clubs
          </button>
        </div>
      </div>
    );
  }

  return (
    <ClubDetails
      club={club}
      onBack={() => router.push('/clubs')}
    />
  );
} 