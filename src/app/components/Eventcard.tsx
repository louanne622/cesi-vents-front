'use client'

import React from 'react';
import Image from 'next/image';
import { IoLocationSharp } from 'react-icons/io5';
import { IoTimeOutline } from 'react-icons/io5';
import Date from './ui/Date';
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
  price?: number;
  maxCapacity?: number;
  currentParticipants?: number;
  status?: 'draft' | 'published' | 'cancelled';
  deadline?: string;
}

const EventCard: React.FC<EventCardProps> = ({ id, title, imageUrl, place, schedule, date, price, maxCapacity, currentParticipants, status, deadline }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/events/${id}`);
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow duration-300 h-full flex flex-col"
      onClick={handleClick}
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <Image
          src="/img/lan.jpg"
          alt={title || 'Event image'}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Date component positioned at the bottom of the image */}
      {date && (
        <div className="absolute top-[calc(40%-6px)] left-4 z-10">
          <Date date={date} />
        </div>
      )}
      
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        
        <div className="space-y-2 mt-auto">
          <div className="flex items-center text-gray-600">
            <IoTimeOutline className="w-5 h-5 mr-2 text-yellow-500" />
            <span>{schedule}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <IoLocationSharp className="w-5 h-5 mr-2 text-yellow-500" />
            <span>{place}</span>
          </div>

          {price !== undefined && (
            <div className="flex items-center text-gray-600">
              <svg className="w-5 h-5 mr-2 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{price === 0 ? 'Gratuit' : `${price}€`}</span>
            </div>
          )}

          {deadline && (
            <div className="flex items-center text-gray-600">
              <svg className="w-5 h-5 mr-2 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Limite : {deadline}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;