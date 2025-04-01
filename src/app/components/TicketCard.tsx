import React from 'react';
import Link from 'next/link';

interface TicketCardProps {
  date: string;
  eventName: string;
  location: string;
  ticketLink: string;
  qrCodeUrl?: string;
}

const TicketCard: React.FC<TicketCardProps> = ({
  date,
  eventName,
  location,
  ticketLink,
  qrCodeUrl
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm border border-gray-200">
      <div className="flex justify-between items-start mb-6">
        <div className="bg-gray-100 p-2 rounded border-2 border-gray-400">
          <span className="text-lg font-bold text-gray-800">{date}</span>
        </div>
        {qrCodeUrl && (
          <div className="w-24 h-24">
            <img src={qrCodeUrl} alt="QR Code" className="w-full h-full" />
          </div>
        )}
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">{eventName}</h2>
      
      <div className="flex items-center mb-6">
        <svg 
          className="w-5 h-5 mr-2 text-gray-600" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        <span className="text-gray-700 font-medium">{location}</span>
      </div>

      <Link 
        href={ticketLink}
        className="block text-center bg-blue-600 text-white font-semibold py-3 px-6 rounded-md hover:bg-blue-700 transition-colors duration-200 shadow-md"
      >
        Voir le ticket →
      </Link>
    </div>
  );
};

export default TicketCard;
