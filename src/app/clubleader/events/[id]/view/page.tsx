"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchEventById, cancelEvent } from '@/redux/features/eventSlice';
import Button from '@/components/ui/Button';
import { FaArrowLeft, FaPencilAlt, FaTrash } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

interface ViewEventPageProps {
  id:string;
}

export default function ViewEventPage({ params }: { params: Promise<ViewEventPageProps> }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { selectedEvent, status, error } = useAppSelector((state) => state.events);
  const resolvedParams = React.use(params);
  const eventId = resolvedParams.id;

  useEffect(() => {
    dispatch(fetchEventById(eventId));
  }, [dispatch, eventId]);

  const handleDelete = async () => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cet événement ?")) {
      return;
    }

    try {
      const result = await dispatch(cancelEvent(eventId));
      if (result.meta.requestStatus === 'fulfilled') {
        toast.success('Événement supprimé avec succès');
        router.push('/clubleader/events');
      } else {
        toast.error("Erreur lors de la suppression de l'événement");
      }
    } catch (error) {
      toast.error("Erreur lors de la suppression de l'événement");
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#fbe216] mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement de l'événement...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="min-h-screen bg-gray-50 p-8 text-red-600">Erreur: {error}</div>;
  }

  if (!selectedEvent) {
    return <div className="min-h-screen bg-gray-50 p-8">Événement non trouvé</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex items-center justify-between">
          <Button
            text="Retour"
            color="secondary"
            icon={<FaArrowLeft />}
            onClick={() => router.push('/clubleader/events')}
          />
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-3xl font-bold mb-6">{selectedEvent.title}</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-semibold mb-4">Détails de l'événement</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p>{new Date(selectedEvent.date).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Heure</p>
                  <p>{selectedEvent.time}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Lieu</p>
                  <p>{selectedEvent.location}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Prix</p>
                  <p>{selectedEvent.price}€</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-4">Informations complémentaires</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Capacité</p>
                  <p>{selectedEvent.participants?.length || 0}/{selectedEvent.maxCapacity} participants</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date limite d'inscription</p>
                  <p>{new Date(selectedEvent.registrationDeadline).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Statut</p>
                  <span className={`px-2 py-1 text-sm rounded-full ${
                    selectedEvent.status === 'published'
                      ? 'bg-green-100 text-green-800'
                      : selectedEvent.status === 'draft'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {selectedEvent.status === 'published' ? 'Publié' : selectedEvent.status === 'draft' ? 'Brouillon' : 'Annulé'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4">Description</h2>
            <p className="whitespace-pre-wrap">{selectedEvent.description}</p>
          </div>

          {selectedEvent.participants && selectedEvent.participants.length > 0 && (
            <div className="mt-8">
              <h2 className="text-lg font-semibold mb-4">Liste des participants</h2>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selectedEvent.participants.map((participant, index) => (
                    <div key={index} className="flex items-center space-x-2 p-2 bg-white rounded-lg shadow-sm">
                      <div className="w-2 h-2 rounded-full bg-[#fbe216]"></div>
                      <p className="font-medium">{participant.userId}</p>
                      <span className="text-sm text-gray-500">
                        {new Date(participant.registrationDate).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
