"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Button from '@/app/components/ui/Button';
import { FaArrowLeft, FaLock, FaCheck } from 'react-icons/fa';

// Données de démonstration (à remplacer par un appel API)
const eventsListData = [
  {
    id: 1,
    title: "Soirée d'intégration CESI",
    description: "Rejoignez-nous pour une soirée exceptionnelle pour accueillir les nouveaux étudiants du CESI. Au programme : animations, musique et surprises !",
    date: {
      day: "15",
      month: "Septembre"
    },
    time: "19:00",
    location: "Campus CESI - Hall Principal",
    image: "/img/lan.jpg",
    category: "Social",
    organizer: "BDE CESI",
    price: "Gratuit",
    participants: {
      current: 120,
      max: 200
    }
  },
  // ... autres événements ...
];

interface PaymentInfo {
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
}

export default function EventPaymentPage() {
  const params = useParams();
  const router = useRouter();
  const [event, setEvent] = useState<any>(null);
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);

  useEffect(() => {
    const eventId = parseInt(params.id as string);
    const foundEvent = eventsListData.find(e => e.id === eventId);
    setEvent(foundEvent);
  }, [params.id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simuler un délai de traitement
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simuler un paiement réussi
    setPaymentComplete(true);
    setIsLoading(false);
  };

  if (!event) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-500">Événement non trouvé</p>
      </div>
    );
  }

  if (paymentComplete) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCheck className="text-green-500 text-2xl" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Paiement réussi !</h1>
              <p className="text-gray-600">Votre inscription à l'événement a été confirmée</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Récapitulatif</h2>
              <div className="space-y-3 text-left">
                <p><span className="font-medium">Événement :</span> {event.title}</p>
                <p><span className="font-medium">Montant :</span> {event.price}</p>
                <p><span className="font-medium">Date :</span> {event.date.day} {event.date.month} à {event.time}</p>
                <p><span className="font-medium">Lieu :</span> {event.location}</p>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <Button
                text="Retour à l'événement"
                color="secondary"
                variant="outline"
                onClick={() => router.push(`/events/${event.id}`)}
              />
              <Button
                text="Voir mes inscriptions"
                color="primary"
                onClick={() => router.push('/profile/registrations')}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* En-tête avec bouton retour */}
        <div className="flex items-center mb-8">
          <Button
            text="Retour"
            color="secondary"
            variant="outline"
            icon={<FaArrowLeft />}
            iconPosition="left"
            onClick={() => router.back()}
          />
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Résumé de l'événement */}
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Résumé de l'événement</h2>
            <div className="space-y-3">
              <p><span className="font-medium">Événement :</span> {event.title}</p>
              <p><span className="font-medium">Prix :</span> {event.price}</p>
              <p><span className="font-medium">Date :</span> {event.date.day} {event.date.month} à {event.time}</p>
              <p><span className="font-medium">Lieu :</span> {event.location}</p>
            </div>
          </div>

          {/* Formulaire de paiement */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center text-gray-600 mb-4">
              <FaLock className="mr-2 text-[#fbe216]" />
              <span>Paiement sécurisé</span>
            </div>

            <div>
              <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Numéro de carte *
              </label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                required
                value={paymentInfo.cardNumber}
                onChange={handleInputChange}
                placeholder="1234 5678 9012 3456"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fbe216] focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                Nom sur la carte *
              </label>
              <input
                type="text"
                id="cardName"
                name="cardName"
                required
                value={paymentInfo.cardName}
                onChange={handleInputChange}
                placeholder="JEAN DUPONT"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fbe216] focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Date d'expiration *
                </label>
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  required
                  value={paymentInfo.expiryDate}
                  onChange={handleInputChange}
                  placeholder="MM/AA"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fbe216] focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                  CVV *
                </label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  required
                  value={paymentInfo.cvv}
                  onChange={handleInputChange}
                  placeholder="123"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fbe216] focus:border-transparent"
                />
              </div>
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                text={isLoading ? "Traitement..." : "Payer"}
                color="primary"
                className="w-full"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 