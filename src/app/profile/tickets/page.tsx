"use client";

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getTicketsByUser, deleteTicket } from '@/redux/features/ticketSlice';
import { RootState } from '@/redux/store';
import { FaCalendarAlt, FaUser, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import QRCodeSVG from 'react-qr-code';
import Button from '@/app/components/ui/Button';
import Link from 'next/link';

const TicketsPage = () => {
  const dispatch = useAppDispatch();
  const { tickets, loading, error } = useAppSelector((state: RootState) => state.ticket);
  const { profile } = useAppSelector((state: RootState) => state.auth);

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
          <div className="flex flex-col md:flex-row items-center justify-between mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-0">Mes tickets</h1>
            <Link href="/profile" className="w-full md:w-auto">
              <Button
                text="Retour au profil"
                color="primary"
                variant="outline"
                className="w-full md:w-auto justify-center"
                onClick={() => {}}
              />
            </Link>
          </div>

          {tickets.length === 0 ? (
            <div className="text-center text-gray-500 py-12">
              <p className="text-base md:text-lg">Vous n'avez pas encore de tickets.</p>
              <p className="mt-2 text-sm md:text-base text-gray-400">
                Participez à des événements pour obtenir vos tickets !
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {tickets.map((ticket) => (
                <div
                  key={ticket.event_id}
                  className="bg-white rounded-lg shadow-sm p-4 md:p-6 relative"
                >
                  {/* QR Code and Content */}
                  <div className="flex flex-col md:flex-row items-start gap-4 md:gap-6">
                    {/* QR Code Section */}
                    <div className="bg-white p-4 rounded border border-gray-200 w-full md:w-40">
                      <QRCodeSVG
                        value={`CESI Vents Ticket\nEvent: ${ticket.event_id}\nUser: ${profile?.first_name} ${profile?.last_name}\nDate: ${new Date(ticket.purchase_date).toISOString()}`}
                        size={128}
                        bgColor="#ffffff"
                        fgColor="#000000"
                        level="H"
                      />
                    </div>

                    {/* Ticket Content */}
                    <div className="flex-1">
                      <div className="flex flex-col gap-3 md:gap-4">
                        <div className="flex items-center">
                          <FaCalendarAlt size={20} className="text-gray-500" />
                          <span className="ml-2 text-base md:text-lg font-medium">
                            {new Date(ticket.purchase_date).toLocaleDateString()}
                          </span>
                        </div>

                        <div className="flex items-center">
                          <FaUser size={20} className="text-gray-500" />
                          <span className="ml-2 text-sm md:text-base">
                            {profile?.first_name} {profile?.last_name}
                          </span>
                        </div>

                        <div className="flex items-center">
                          <span className="font-medium text-sm md:text-base">Événement: {ticket.event_id}</span>
                        </div>

                        <div className="mt-auto flex items-center justify-between">
                          <div className="flex items-center gap-2 px-3 py-2 rounded-md font-medium text-sm md:text-base">
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
                          {ticket.status === 'valid' && (
                            <Button
                              text="Annuler"
                              color="danger"
                              variant="solid"
                              className="w-full md:w-auto"
                              onClick={() => {
                                dispatch(deleteTicket(ticket.event_id))
                                dispatch(getTicketsByUser(profile._id))
                              }}
                              disabled={loading}
                            />
                          )}
                        </div>
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
