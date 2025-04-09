"use client";

import React from 'react';
import Image from 'next/image';
import { FaUsers, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import Button from '../ui/Button';
import { useRouter } from 'next/navigation';

interface ClubCardProps {
  club: {
    _id: string;
    name: string;
    description: string;
    category: string;
    logo: {
      url: string;
      alt: string;
    };
    email: string;
    campus: string;
  };
}

export default function ClubCard({ club }: ClubCardProps) {
  const router = useRouter();

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className="relative aspect-[4/3]">
        <Image
          src={club.logo.url}
          alt={club.logo.alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{club.name}</h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{club.description}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <FaMapMarkerAlt className="h-4 w-4 text-[#fbe216] mr-2" />
            <span>{club.campus}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <FaUsers className="h-4 w-4 text-[#fbe216] mr-2" />
            <span>{club.email}</span>
          </div>
        </div>

        <Button
          text="Voir détail"
          color="primary"
          size="md"
          onClick={() => router.push(`/clubs/${club._id}`)}
        />
      </div>
    </div>
  );
}