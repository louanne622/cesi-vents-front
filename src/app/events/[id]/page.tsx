'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  FaCalendar,
  FaMapMarkerAlt,
  FaUser,
  FaUsers,
  FaMoneyBillWave,
  FaClock,
} from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { fetchEventById } from '@/redux/features/eventSlice';
import { fetchUserTickets } from '@/redux/features/ticketSlice';
import React from 'react';

interface Participant {
  userId: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  registrationDate: string;
}

interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  maxCapacity: number;
  price: number;
  availableTickets: number;
  registrationDeadline: string;
  status: 'draft' | 'published' | 'cancelled';
  createdBy: string;
  participants: Participant[];
  createdAt: string;
  updatedAt: string;
}

interface Ticket {
  _id: string;
  event_id: string;
  user_id: string;
  purchase_date: string;
  status: 'valid' | 'used' | 'cancelled';
  qr_code: string;
}

interface PageParams {
  id: string;
}

export default function EventDetailsPage({ params }: { params: Promise<PageParams> }) {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { selectedEvent: event, status, error } = useSelector((state: RootState) => state.events);
  const resolvedParams = React.use(params);
  const profile = useSelector((state: RootState) => state.auth.profile);
  const { tickets, loading: ticketLoading, error: ticketError } = useSelector((state: RootState) => state.ticket);

  const [hasTicket, setHasTicket] = useState(false);
  const [ticketCheckError, setTicketCheckError] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchEventById(resolvedParams.id));
  }, [dispatch, resolvedParams.id]);

  useEffect(() => {
    if (profile?._id && event?._id) {
      dispatch(fetchUserTickets(profile._id));
    }
  }, [dispatch, profile?._id, event?._id]);

  useEffect(() => {
    if (tickets && event?._id) {
      const hasExistingTicket = tickets.some(ticket => ticket.event_id === event._id);
      setHasTicket(hasExistingTicket);
      setTicketCheckError(null);
    }
  }, [tickets, event?._id]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  if (status === 'failed' || !event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Erreur</h2>
          <p className="text-gray-600">{error || 'Événement non trouvé'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4">

        {/* Bouton retour */}
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Retour
        </button>

        {/* Image principale */}
        <div className="relative aspect-[16/9] w-full rounded-lg overflow-hidden mb-8">
          <Image
            src="/img/lan.jpg"
            alt={event.title}
            fill
            className="object-cover"
            sizes="(max-width: 896px) 100vw, 896px"
          />
        </div>

        {/* Titre */}
        <h1 className="text-3xl font-bold text-gray-900 mb-6">{event.title}</h1>

        {/* Détails principaux */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Infos de base */}
          <div className="space-y-4">
            <div className="flex items-center text-gray-600">
              <FaCalendar className="w-5 h-5 mr-3 text-yellow-400" />
              <span>
                {new Date(event.date).toLocaleDateString('fr-FR', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
            <div className="flex items-center text-gray-600">
              <FaClock className="w-5 h-5 mr-3 text-yellow-400" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <FaMapMarkerAlt className="w-5 h-5 mr-3 text-yellow-400" />
              <span>{event.location}</span>
            </div>
          </div>

          {/* Stats */}
          <div className="space-y-4">
            <div className="flex items-center text-gray-600">
              <FaUsers className="w-5 h-5 mr-3 text-yellow-400" />
              <span>{event.availableTickets}/{event.maxCapacity} participants</span>
            </div>
            <div className="flex items-center text-gray-600">
              <FaMoneyBillWave className="w-5 h-5 mr-3 text-yellow-400" />
              <span>{event.price === 0 ? 'Gratuit' : `${event.price}€`}</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Description</h2>
          <p className="text-gray-600 whitespace-pre-line">{event.description}</p>
        </div>

        {/* Organisateur */}
        <div className="bg-white rounded-lg p-6 mb-8">
          <div className="flex items-center text-gray-600">
            <FaUser className="w-5 h-5 mr-3 text-yellow-400" />
            <span>Organisé par {/*{event.createdBy}*/} </span>
          </div>
        </div>

        {/* Bouton inscription */}
        <div className="flex justify-center">
          <button
            className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-lg hover:bg-yellow-500 transition-colors text-lg font-medium"
            disabled={
              event?.status !== 'published' || 
              event?.availableTickets >= event?.maxCapacity ||
              hasTicket ||
              ticketLoading
            }
            onClick={() => router.push(`/events/${event?._id}/payment`)}
          >
            {event?.status !== 'published'
              ? 'Inscriptions non ouvertes'
              : event?.availableTickets >= event?.maxCapacity
              ? 'Événement complet'
              : hasTicket
              ? 'Vous avez déjà un ticket'
              : ticketError
              ? ticketError
              : ticketLoading
              ? 'Vérification en cours...'
              : "S'inscrire"}
          </button>
        </div>
      </div>
    </div>
  );
}
