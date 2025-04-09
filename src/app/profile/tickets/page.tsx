"use client";

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTicketsByUser } from '@/redux/features/ticketSlice';
import { RootState, AppDispatch } from '@/redux/store';
import { FaQrcode, FaCalendarAlt, FaUser, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import Button from '@/app/components/ui/Button';
import Link from 'next/link';

const TicketsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tickets, loading, error } = useSelector((state: RootState) => state.ticket);
  const { profile } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (profile) {
      dispatch(getTicketsByUser(profile._id));
    }
  }, [dispatch, profile]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Chargement...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-500">{typeof error === 'string' ? error : 'Une erreur est survenue'}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-16 md:pb-0">
      <div className="container mx-auto px-4 py-8">
        <div className="w-full max-w-2xl mx-auto">
          {/* En-tête */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Mes tickets</h1>
            <Link href="/profile">
              <Button
                text="Retour au profil"
                color="primary"
                variant="outline"
                onClick={() => {}}
              />
            </Link>
          </div>

          {tickets.length === 0 ? (
            <div className="text-center text-gray-500">
              Vous n'avez pas encore de tickets.
            </div>
          ) : (
            <div className="space-y-6">
              {tickets.map((ticket) => (
                <div
                  key={ticket.event_id}
                  className="bg-white rounded-lg shadow-sm p-6 relative"
                >
                  {/* QR Code Section */}
                  <div className="absolute top-4 left-4 bg-white p-2 rounded border border-gray-200 flex items-center justify-center w-32 h-32">
                    <FaQrcode size={40} className="text-gray-500" />
                  </div>

                  {/* Ticket Content */}
                  <div className="ml-32">
                    <div className="flex items-center mb-4">
                      <FaCalendarAlt size={20} className="text-gray-500" />
                      <span className="ml-2 text-lg font-medium">
                        {new Date(ticket.purchase_date).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex items-center mb-4">
                      <FaUser size={20} className="text-gray-500" />
                      <span className="ml-2">
                        {profile?.first_name} {profile?.last_name}
                      </span>
                    </div>

                    <div className="flex items-center mb-4">
                      <span className="font-medium">Événement: {ticket.event_id}</span>
                    </div>

                    <div className="mt-auto flex items-center justify-end">
                      <div className="flex items-center gap-2 px-3 py-2 rounded-md font-medium text-sm">
                        {ticket.status === 'used' ? (
                          <>
                            <FaTimesCircle className="text-red-500" />
                            <span className="text-red-500">Utilisé</span>
                          </>
                        ) : (
                          <>
                            <FaCheckCircle className="text-green-500" />
                            <span className="text-green-500">Valide</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketsPage;
