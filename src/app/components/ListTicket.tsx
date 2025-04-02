import React from 'react';
import Link from 'next/link';

interface Event {
  id: number;
  date: {
    day: number;
    month: string;
    year: number;
  };
  title: string;
  category: string;
  organizer: string;
  time: string;
  location: string;
  price: number;
}

const ListTicket = () => {
  // Données d'exemple
  const events: Event[] = [
    {
      id: 1,
      date: {
        day: 15,
        month: 'janvier',
        year: 2025
      },
      title: 'Vente de petit pain',
      category: 'Nourriture',
      organizer: 'Par CESI Miam',
      time: 'Tous les mardi à 10:00',
      location: 'CESI - Arras',
      price: 35
    },
    {
      id: 2,
      date: {
        day: 20,
        month: 'janvier',
        year: 2025
      },
      title: 'Vente de croissants',
      category: 'Nourriture',
      organizer: 'Par CESI Miam',
      time: 'Tous les jeudi à 10:00',
      location: 'CESI - Arras',
      price: 40
    },
    {
      id: 3,
      date: {
        day: 25,
        month: 'janvier',
        year: 2025
      },
      title: 'Vente de gâteaux',
      category: 'Nourriture',
      organizer: 'Par CESI Miam',
      time: 'Tous les vendredi à 15:00',
      location: 'CESI - Arras',
      price: 45
    },
    {
        id: 4,
        date: {
          day: 30,
          month: 'janvier',
          year: 2025
        },
        title: 'Vente Pains',
        category: 'Nourriture',
        organizer: 'Par CESI Miam',
        time: 'Aujourd\'hui à 15:00',
        location: 'CESI - Arras',
        price: 45
    },
    {
        id: 5,
        date: {
          day: 31,
          month: 'janvier',
          year: 2025
        },
        title: 'Vente de Sandwichs',
        category: 'Nourriture',
        organizer: 'Par CESI Miam',
        time: 'Aujourd\'hui à 15:00',
        location: 'CESI - Arras',
        price: 45
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Évènements à venir</h1>
      <div className="space-y-4">
        {events.map((event) => (
          <div 
            key={event.id}
            className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden flex"
          >
            {/* Date section */}
            <div className="bg-gray-100 border-r border-gray-400 p-6 flex flex-col justify-center items-center min-w-[140px]">
              <span className="text-4xl font-bold text-gray-800">{event.date.day}</span>
              <span className="text-gray-600">{event.date.month}</span>
              <span className="text-gray-600">{event.date.year}</span>
            </div>

            {/* Event details section */}
            <div className="p-6 flex-grow flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full border border-gray-400">
                    {event.category}
                  </span>
                  <span className="text-gray-600">{event.organizer}</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{event.title}</h2>
                <div className="space-y-2">
                  <div className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center mt-6">
                <span className="text-2xl font-bold text-gray-900">{event.price}€</span>
                <Link 
                  href={`/tickets/${event.id}`}
                  className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-md hover:bg-blue-700 transition-colors duration-200 shadow-md"
                >
                  Voir le ticket →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListTicket;
