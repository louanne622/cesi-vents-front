import React from 'react';
import Image from 'next/image';
import { IoLocationSharp } from 'react-icons/io5';
import { IoTimeOutline } from 'react-icons/io5';

interface EventCardProps {
  title?: string;
  imageUrl?: string;
  place?: string;
  schedule?: string;
  date?: {
    day: string;
    month: string;
  };
}

const EventCard: React.FC<EventCardProps> = ({ title, imageUrl, place, schedule, date }) => {
  return (
    <div className="relative w-full max-w-xs bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Container with background - increased height */}
      <div className="relative w-full" style={{ paddingTop: '25%' }}>
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

      {/* Date square that sits on the border */}
      {date && (
        <div className="absolute left-4 transform -translate-y-1/2 bg-white rounded-xl shadow-md w-12 h-12 flex flex-col items-center justify-center">
          <div className="text-lg text-purple-800 font-bold leading-none">{date.day}</div>
          <div className="text-xs text-purple-800 mt-0.5">{date.month}</div>
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
        
        {/* Button */}
        <button className="absolute bottom-4 right-4 bg-purple-100 hover:bg-purple-200 text-purple-800 rounded-lg px-4 py-1 text-sm">
          Reserve
        </button>
      </div>
    </div>
  );
};

export default EventCard;