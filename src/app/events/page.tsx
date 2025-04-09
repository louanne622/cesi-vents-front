"use client";

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { fetchEvents } from '@/redux/features/eventSlice';

import EventCard from '../components/Eventcard';
import FilterBar from '@/app/components/ui/FilterBar';
import SearchBar from '../components/events/SearchBar';



interface Event {
  category?: string;
  _id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  maxCapacity: number;
  price: number;
  registrationDeadline: string;
  status: 'draft' | 'published' | 'cancelled';
  createdBy: string;
  participants: Array<{
    userId: string;
    status: 'pending' | 'confirmed' | 'cancelled';
    registrationDate: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

export default function EventsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { events, status, error } = useSelector((state: RootState) => state.events);

  const [searchTerm, setSearchTerm] = useState("");

  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);

  const categories = ["Tous", "Social", "Gaming", "Formation"];

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  useEffect(() => {
    let result = events;

    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      result = result.filter(event =>
        event.title.toLowerCase().includes(term) ||
        event.description.toLowerCase().includes(term) ||
        event.location.toLowerCase().includes(term)
      );
    }

    setFilteredEvents(result);
  }, [events, searchTerm]);


  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 pt-8 pb-24">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Événements</h1>
        <p className="text-gray-600 mb-8">Découvrez tous les événements à venir</p>

        {/* Barre de recherche */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Rechercher un événement..."
            className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="absolute inset-y-0 right-0 px-3 flex items-center bg-yellow-400 text-gray-800 rounded-r-lg hover:bg-yellow-500 transition-colors">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
          </button>
        </div>

        {/* Contenu des événements */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {status === 'loading' && (
            <div className="col-span-full text-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-4 text-gray-600">Chargement des événements...</p>
            </div>
          )}

          {status === 'failed' && (
            <div className="col-span-full text-center py-16">
              <p className="text-red-500">Erreur : {error}</p>
            </div>
          )}

          {status === 'succeeded' && filteredEvents.length === 0 && (
            <div className="col-span-full text-center py-16">
              <p className="text-gray-500 text-lg">Aucun événement ne correspond à vos critères.</p>
            </div>
          )}

          {status === 'succeeded' && filteredEvents.map((event) => (
            <div key={event._id} className="w-full h-full">
              <EventCard
                id={event._id}
                title={event.title}
                imageUrl="/images/event-default.jpg"
                place={event.location}
                schedule={event.time}
                date={{
                  day: new Date(event.date).getDate().toString(),
                  month: new Date(event.date).toLocaleString('fr-FR', { month: 'long' }),
                }}
                price={event.price}
                maxCapacity={event.maxCapacity}
                currentParticipants={event.participants.filter(p => p.status === 'confirmed').length}
                status={event.status}
                deadline={new Date(event.registrationDeadline).toLocaleDateString('fr-FR')}
              />
            </div>
          ))}
        </div>

        {/* Nombre d'événements trouvés */}
        {status === 'succeeded' && filteredEvents.length > 0 && (
          <div className="mt-6 text-center text-sm text-gray-500">
            {filteredEvents.length} événement{filteredEvents.length > 1 ? 's' : ''} trouvé{filteredEvents.length > 1 ? 's' : ''}
          </div>
        )}
      </div>
    </div>
  );
}
