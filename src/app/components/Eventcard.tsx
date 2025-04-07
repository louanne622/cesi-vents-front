'use client'

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaCalendarAlt, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

interface EventCardProps {
  id: number;
  title: string;
  imageUrl: string;
  place: string;
  schedule: string;
  date: {
    day: string;
    month: string;
  };
}

const EventCard: React.FC<EventCardProps> = ({
  id,
  title,
  imageUrl,
  place,
  schedule,
  date,
}) => {

  const router = useRouter();

  const handleClick = () => {
    router.push(`/events/${id}`);
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={handleClick}
    >
      {/* Image de l'événement */}
      <div className="relative h-48">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
        />
      </div>

      {/* Contenu */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        
        {/* Métadonnées */}
        <div className="space-y-2">
          <div className="flex items-center text-gray-600">
            <FaCalendarAlt className="mr-2 text-[#fbe216]" />
            <span>{date.day} {date.month}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <FaClock className="mr-2 text-[#fbe216]" />
            <span>{schedule}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <FaMapMarkerAlt className="mr-2 text-[#fbe216]" />
            <span className="truncate">{place}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;