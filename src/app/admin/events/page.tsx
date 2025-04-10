'use client';

import React, { useEffect, useState } from 'react';
import { FaPlus, FaEye, FaTrash, FaPencilAlt } from 'react-icons/fa';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import FilterBar from '@/components/ui/FilterBar';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchEvents, cancelEvent } from '@/redux/features/eventSlice';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

export default function AdminEventsPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { events, status, error } = useAppSelector((state) => state.events);

  const [searchQuery, setSearchQuery] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleViewEvent = (eventId: string) => {
    router.push(`/admin/events/${eventId}`);
  };

  const handleEditEvent = (eventId: string) => {
    router.push(`/admin/events/${eventId}/edit`);
  };

  const handleDeleteClick = (eventId: string) => {
    setEventToDelete(eventId);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!eventToDelete) return;

    try {
      await dispatch(cancelEvent(eventToDelete)).unwrap();
      toast.success('Événement supprimé avec succès');
      setIsDeleteModalOpen(false);
      setEventToDelete(null);
      // PAS de fetchEvents ici, Redux a déjà mis à jour les events
    } catch (error: any) {
      toast.error(error.message || 'Erreur lors de la suppression');
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setEventToDelete(null);
  };

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#fbe216] mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement des événements...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">Gestion des événements</h1>
          <Button
            text="Créer un événement"
            color="primary"
            icon={<FaPlus />}
            iconPosition="left"
            onClick={() => router.push('/admin/events/create')}
          />
        </div>

        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          filters={[]}
        />

        <div className="bg-white rounded-lg shadow-sm overflow-hidden mt-4">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Titre
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Lieu
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredEvents.map(event => (
                  <tr key={event._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {event.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {event.date} à {event.time}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {event.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                      {event.status}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                      <Button
                        text=""
                        icon={<FaEye />}
                        size="sm"
                        variant="outline"
                        color="primary"
                        onClick={() => handleViewEvent(event._id)}
                        className="w-8 h-8"
                      />
                      <Button
                        text=""
                        icon={<FaPencilAlt />}
                        size="sm"
                        variant="outline"
                        color="secondary"
                        onClick={() => handleEditEvent(event._id)}
                        className="w-8 h-8"
                      />
                      <Button
                        text=""
                        icon={<FaTrash />}
                        size="sm"
                        variant="outline"
                        color="secondary" 
                        onClick={() => handleDeleteClick(event._id)}
                        className="w-8 h-8"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal suppression */}
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={handleDeleteCancel}
          onConfirm={handleDeleteConfirm}
          title="Supprimer l'événement"
          message="Êtes-vous sûr de vouloir supprimer cet événement ? Cette action est irréversible."
          confirmText="Supprimer"
        />
      </div>
    </div>
  );
}
