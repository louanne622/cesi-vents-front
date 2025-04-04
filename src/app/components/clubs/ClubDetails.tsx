"use client";

import React from 'react';
import Image from 'next/image';
import { FaUsers, FaMapMarkerAlt, FaCalendarAlt, FaArrowLeft } from 'react-icons/fa';
import Button from '../ui/Button';

interface ClubDetailsProps {
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
  onBack: () => void;
}

export default function ClubDetails({ club, onBack }: ClubDetailsProps) {
  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="container mx-auto px-4 py-8">
        {/* Bouton retour */}
        <div className="mb-6">
          <Button
            text="Retour aux clubs"
            color="secondary"
            icon={<FaArrowLeft />}
            iconPosition="left"
            onClick={onBack}
          />
        </div>

        {/* En-tête avec image */}
        <div className="relative h-64 md:h-96 rounded-xl overflow-hidden mb-8">
          <Image
            src={club.image}
            alt={club.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Informations du club */}
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{club.name}</h1>
          
          {/* Catégorie */}
          <div className="inline-block px-3 py-1 bg-[#fbe216] text-gray-800 rounded-full text-sm font-medium mb-6">
            {club.category.charAt(0).toUpperCase() + club.category.slice(1)}
          </div>

          {/* Description */}
          <p className="text-gray-600 mb-8">{club.description}</p>

          {/* Informations détaillées */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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

          {/* Boutons d'action */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              text="Rejoindre le club"
              color="primary"
              onClick={() => {}}
            />
            <Button
              text="Voir les événements"
              color="secondary"
              variant="outline"
              onClick={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 