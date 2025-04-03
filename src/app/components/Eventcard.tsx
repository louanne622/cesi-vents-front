'use client'

import React from 'react';
import Image from 'next/image';
import { IoLocationSharp } from 'react-icons/io5';
import { IoTimeOutline } from 'react-icons/io5';
import Date from './ui/Date';
import Button from './ui/Button';
import { useRouter } from 'next/navigation';

interface EventCardProps {
  id: string;
  title?: string;
  imageUrl?: string;
  place?: string;
  schedule?: string;
  date?: {
    day: string;
    month: string;
  };
}

const EventCard: React.FC<EventCardProps> = ({ id, title, imageUrl, place, schedule, date }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/events/${id}`);
  };

  return (
    <div 
      className="relative w-full max-w-xs bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300"
      onClick={handleClick}
    >
      {/* Container with background - increased height */}
      <div className="relative w-full" style={{ paddingTop: '40%' }}>
        {/* Image container */}
        <div className="absolute inset-0">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={title || 'Event image'}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-500" />
          )}
        </div>
      </div>

      {/* Date component positioned at the bottom of the image */}
      {date && (
        <div className="absolute top-[calc(40%-6px)] left-4 z-10">
          <Date date={date} />
        </div>
      )}
      
      {/* Content section */}
      <div className="pt-8 px-4 pb-4 flex flex-col relative min-h-[120px]">
        {title && (
          <h3 className="text-gray-800 text-lg font-semibold">{title}</h3>
        )}
        {place && (
          <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
            <IoLocationSharp className="text-purple-800" />
            <span>{place}</span>
          </div>
        )}
        {schedule && (
          <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
            <IoTimeOutline className="text-purple-800" />
            <span>{schedule}</span>
          </div>
        )}

        {/* Space between content and button */}
        <div className="mt-6"></div>

        {/* Button component */}
        <div className="absolute bottom-4 right-4">
          <Button 
            text="Voir plus" 
            color="primary" 
            size="sm" 
            onClick={() => {
              router.push(`/events/${id}`);
            }} 
          />
        </div>
      </div>
    </div>
  );
};

export default EventCard;