"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Button from '@/app/components/ui/Button';
import { FaArrowLeft, FaLock, FaCheck } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { createTicket } from '@/redux/features/ticketSlice';
import { createTransaction } from '@/redux/features/transactionSlice';
import { fetchEventById, increaseCapacity } from '@/redux/features/eventSlice';
import { getPromotionByCode } from '@/redux/features/promotionSlice';
import { getProfile } from '@/redux/features/authSlice';
import { RootState } from '@/redux/store';
import toast from 'react-hot-toast';

interface PaymentInfo {
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
}

interface Event {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image: string;
  category: string;
  organizer: string;
  price: number;
  participants: {
    current: number;
    max: number;
  };
}

interface Promotion {
  _id: string;
  promotion_code: string;
  validation_date: string;
  max_use: number;
  id_club: string;
  activate: boolean;
  value: number;
}

interface TicketError {
  message: string;
  code?: string;
}

export default function EventPaymentPage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading: ticketLoading, error: ticketError } = useSelector((state: RootState) => state.ticket);
  const eventState = useSelector((state: RootState) => state.events);
  const { profile } = useSelector((state: RootState) => state.auth);
  const event = eventState.selectedEvent;
  const eventLoading = eventState.status === 'loading';
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromotion, setAppliedPromotion] = useState<Promotion | null>(null);
  const [isCheckingPromo, setIsCheckingPromo] = useState(false);

  useEffect(() => {
    if (!profile) {
      toast.error('Vous devez être connecté pour effectuer un paiement');
      router.push('/login');
      return;
    }

    if (params.id) {
      dispatch(fetchEventById(params.id as string) as any);
    }
  }, [params.id, dispatch, profile, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePromoCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPromoCode(e.target.value);
  };

  const applyPromoCode = async () => {
    if (!promoCode.trim()) {
      toast.error('Veuillez entrer un code promo');
      return;
    }

    setIsCheckingPromo(true);
    try {
      const result = await dispatch(getPromotionByCode(promoCode) as any);
      
      if (result.payload) {
        setAppliedPromotion(result.payload);
        toast.success('Code promo appliqué avec succès !');
      } else {
        toast.error('Code promo invalide ou expiré');
      }
    } catch (error) {
      toast.error('Erreur lors de la vérification du code promo');
    } finally {
      setIsCheckingPromo(false);
    }
  };

  const calculateTotal = () => {
    if (!event?.price) return 0;
    
    let total = event.price;
    if (appliedPromotion) {
      total = total * (1 - appliedPromotion.value / 100);
    }
    return total;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!profile) {
      toast.error('Vous devez être connecté pour effectuer un paiement');
      router.push('/login');
      return;
    }

    setIsLoading(true);

    try {
      // Créer la transaction
      const transactionData = {
        userId: profile._id,
        totalAmount: calculateTotal(),
        promoCode: appliedPromotion ? appliedPromotion.promotion_code : '',
        date: new Date()
      };

      const transactionResult = await dispatch(createTransaction(transactionData) as any);
      if (transactionResult.error) {
        throw new Error(transactionResult.error.message);
      }

      // Créer le ticket
      const ticketData = {
        _id: `${event?._id}-${profile._id}-${Date.now()}`,
        event_id: event?._id || '',
        user_id: profile._id || '',
        transaction_id: transactionResult.payload._id,
        purchase_date: new Date(),
        status: "valid",
        qr_code: `${event?._id}-${profile._id}-${Date.now()}`
      };

      await dispatch(createTicket(ticketData) as any);

      // Refresh profile to get updated points
      await dispatch(getProfile() as any);
      setPaymentComplete(true);
      toast.success('Paiement effectué avec succès !');
      router.push('/profile');
    } catch (error: any) {
      console.error('Erreur lors du paiement:', error);
      toast.error(error.message || 'Une erreur est survenue lors du paiement');
    } finally {
      setIsLoading(false);
    }
  };

  if (!profile) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Vous devez être connecté pour effectuer un paiement</p>
          <Button
            text="Se connecter"
            color="primary"
            onClick={() => router.push('/login')}
          />
        </div>
      </div>
    );
  }

  if (eventLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#fbe216]"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Événement non trouvé</p>
          <Button
            text="Retour à la liste des événements"
            color="primary"
            onClick={() => router.push('/events')}
          />
        </div>
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
                <p><span className="font-medium">Montant :</span> {event.price}€</p>
                <p><span className="font-medium">Date :</span> {event?.date} à {event?.time}</p>
                <p><span className="font-medium">Lieu :</span> {event?.location}</p>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <Button
                text="Retour à l'événement"
                color="secondary"
                variant="outline"
                onClick={() => router.push(`/events/${event?._id}`)}
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
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Résumé de l'événement</h2>
            <div className="space-y-3">
              <p><span className="font-medium">Événement :</span> {event.title}</p>
              <p><span className="font-medium">Prix :</span> {event.price}€</p>
              {appliedPromotion && (
                <p className="text-green-600">
                  <span className="font-medium">Réduction :</span> {appliedPromotion.value}%
                </p>
              )}
              <p className="text-xl font-bold">
                <span className="font-medium">Total :</span> {event.price ? calculateTotal().toFixed(2) : '0.00'}€
              </p>
              <p><span className="font-medium">Date :</span> {event?.date} à {event?.time}</p>
              <p><span className="font-medium">Lieu :</span> {event?.location}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Code promotionnel</h2>
              <div className="flex gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={handlePromoCodeChange}
                    placeholder="Entrez votre code promo"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fbe216] focus:border-transparent"
                  />
                </div>
                <Button
                  type="button"
                  text={isCheckingPromo ? "Vérification..." : "Appliquer"}
                  color="secondary"
                  onClick={applyPromoCode}
                  disabled={isCheckingPromo || !promoCode.trim()}
                />
              </div>
              {appliedPromotion && (
                <p className="mt-2 text-sm text-green-600">
                  Code promo appliqué : {appliedPromotion.promotion_code} (-{appliedPromotion.value}%)
                </p>
              )}
            </div>

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
                text={isLoading || ticketLoading ? "Traitement..." : "Payer"}
                icon={<FaLock />}
                color="primary"
                className="w-full"
                disabled={isLoading || ticketLoading}
              />
            </div>

            {ticketError && (
              <div className="text-red-500 text-sm mt-2">
                {typeof ticketError === 'string' ? ticketError : (ticketError as TicketError).message || 'Une erreur est survenue'}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
} 