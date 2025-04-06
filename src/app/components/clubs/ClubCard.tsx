"use client";

import React from 'react';
import Image from 'next/image';
import { FaUsers, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import Button from '../ui/Button';
import { useRouter } from 'next/navigation';

interface ClubCardProps {
  club: {
    id: number;
    name: string;
    description: string;
    category: string;
    members: number;
    image: string;
    campus: string;
    nextEvent: string;
  };
}

export default function ClubCard({ club }: ClubCardProps) {
  const router = useRouter();

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden pb-20">
      <div className="relative h-48">
        <Image
          src={club.image}
          alt={club.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{club.name}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{club.description}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-700">
            <FaUsers className="h-5 w-5 text-[#fbe216] mr-3" />
            <span>{club.members} membres</span>
          </div>
          <div className="flex items-center text-gray-700">
            <FaMapMarkerAlt className="h-5 w-5 text-[#fbe216] mr-3" />
            <span>Campus de {club.campus}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <FaCalendarAlt className="h-5 w-5 text-[#fbe216] mr-3" />
            <span>Prochain événement : {club.nextEvent}</span>
          </div>
        </div>

        <Button
          text="Voir détail"
          color="primary"
          onClick={() => router.push(`/clubs/${club.id}`)}
        />
      </div>
    </div>
  );
} 