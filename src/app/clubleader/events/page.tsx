'use client';

import React, { useEffect, useState } from 'react';
import { FaPlus, FaEye, FaTrash, FaPencilAlt } from 'react-icons/fa';
import Button from '../../components/ui/Button';
import FilterBar from '@/components/ui/FilterBar';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchClubEvents } from '@/redux/features/eventSlice';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

export default function ClubLeaderEventsPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { events, status, error } = useAppSelector((state) => state.events);
  const { profile: currentUser } = useAppSelector((state) => state.auth);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (currentUser?.clubId) {
          setLoading(true);
          await dispatch(fetchClubEvents({ clubId: currentUser.clubId })).unwrap();
        }
      } catch (err) {
        console.error('Error fetching events:', err);
        toast.error('Erreur lors du chargement des événements');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, currentUser?.clubId]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleViewEvent = (eventId: string) => {
    router.push(`/clubleader/events/${eventId}/view`);
  };

  const filteredEvents = events?.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  if (loading || status === 'loading') {
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
                {filteredEvents.length > 0 ? (
                  filteredEvents.map(event => (
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
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                      Aucun événement trouvé
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
