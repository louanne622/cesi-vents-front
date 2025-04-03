"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaCalendar, FaMapMarkerAlt, FaUser, FaUsers, FaMoneyBillWave } from 'react-icons/fa';
import { use } from 'react';

interface EventDetails {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  organizer: string;
  price: string;
  image: string;
  maxParticipants: number;
  currentParticipants: number;
}

export default function EventDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [event, setEvent] = useState<EventDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events/${resolvedParams.id}`);
        if (!response.ok) {
          throw new Error('Événement non trouvé');
        }
        const data = await response.json();
        setEvent(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [resolvedParams.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="animate-pulse">
            <div className="h-64 bg-gray-200 rounded-lg mb-6"></div>
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Erreur</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!event) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Image de l'événement */}
        <div className="relative h-64 sm:h-80 rounded-lg overflow-hidden mb-6">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover"
          />
        </div>

        {/* En-tête de l'événement */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{event.title}</h1>
          <div className="flex flex-wrap gap-4 text-gray-600">
            <div className="flex items-center">
              <FaCalendar className="h-5 w-5 text-[#fbe216] mr-2" />
              <span>{new Date(event.date).toLocaleDateString('fr-FR')} à {event.time}</span>
            </div>
            <div className="flex items-center">
              <FaMapMarkerAlt className="h-5 w-5 text-[#fbe216] mr-2" />
              <span>{event.location}</span>
            </div>
            <div className="flex items-center">
              <FaUser className="h-5 w-5 text-[#fbe216] mr-2" />
              <span>{event.organizer}</span>
            </div>
          </div>
        </div>

        {/* Informations principales */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Description</h2>
          <p className="text-gray-600 whitespace-pre-line">{event.description}</p>
        </div>

        {/* Informations complémentaires */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FaUsers className="h-5 w-5 text-[#fbe216] mr-2" />
                <span className="text-gray-900 font-medium">Participants</span>
              </div>
              <span className="text-gray-600">
                {event.currentParticipants}/{event.maxParticipants}
              </span>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FaMoneyBillWave className="h-5 w-5 text-[#fbe216] mr-2" />
                <span className="text-gray-900 font-medium">Prix</span>
              </div>
              <span className="text-gray-600">{event.price}</span>
            </div>
          </div>
        </div>

        {/* Bouton d'inscription */}
        <button
          className="w-full bg-[#fbe216] text-gray-900 py-3 px-6 rounded-lg font-medium hover:bg-[#e6cf14] transition-colors duration-200"
          onClick={() => {/* TODO: Implémenter l'inscription */}}
        >
          S'inscrire à l'événement
        </button>
      </div>
    </div>
  );
}