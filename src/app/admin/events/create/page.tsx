"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaArrowLeft, FaCalendarAlt, FaMapMarkerAlt, FaClock, FaUsers, FaMoneyBill } from 'react-icons/fa';
import Button from '@/app/components/ui/Button';
import { createEvent} from '@/redux/features/eventSlice';
import { getAllClubs } from '@/redux/features/clubSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { toast } from 'react-hot-toast';

interface EventFormData {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  clubId: string;
  maxCapacity: string;
  price: string;
  registrationDeadline: string;
  status: 'draft' | 'published' | 'cancelled';
}


export default function CreateEventPage() {
  const { clubs } = useAppSelector((state) => state.club);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState<EventFormData>({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    clubId: '',
    maxCapacity: '',
    price: '',
    registrationDeadline: '',
    status: 'draft'
  });

  useEffect(() => {
    dispatch(getAllClubs());
  }, [dispatch]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await dispatch(
        createEvent({
          ...formData,
          maxCapacity: parseInt(formData.maxCapacity),
          price: parseFloat(formData.price)
        })
      );

      if (result.meta.requestStatus === 'fulfilled') {
        console.log(formData);
        toast.success('Événement créé avec succès !');
        router.push('/admin/events');
      } else {
        toast.error("Erreur lors de la création de l'événement");
      }
    } catch (error) {
      toast.error("Erreur lors de la création de l'événement");
      console.error('Erreur:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl">
        {/* Bouton retour */}
        <div className="mb-6">
          <Button
            text="Retour"
            icon={<FaArrowLeft />}
            iconPosition="left"
            variant="outline"
            color="secondary"
            onClick={() => router.push('/admin/events')}
          />
        </div>

        {/* Titre de page */}
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Créer un nouvel événement</h1>

        {/* Formulaire */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Titre */}
            <InputWithIcon
              label="Titre"
              name="title"
              type="text"
              icon={<FaCalendarAlt />}
              value={formData.title}
              onChange={handleChange}
              placeholder="Nom de l'événement"
              required
            />

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                id="description"
                name="description"
                required
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                placeholder="Description de l'événement"
              />
            </div>

            {/* Date & Heure */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputWithIcon
                label="Date"
                name="date"
                type="date"
                icon={<FaCalendarAlt />}
                value={formData.date}
                onChange={handleChange}
                required
              />
              <InputWithIcon
                label="Heure"
                name="time"
                type="time"
                icon={<FaClock />}
                value={formData.time}
                onChange={handleChange}
                required
              />
            </div>

            {/* Lieu */}
            <InputWithIcon
              label="Lieu"
              name="location"
              type="text"
              icon={<FaMapMarkerAlt />}
              value={formData.location}
              onChange={handleChange}
              placeholder="Lieu de l'événement"
              required
            />

            {/* Capacité & Prix */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputWithIcon
                label="Capacité maximale"
                name="maxCapacity"
                type="number"
                icon={<FaUsers />}
                value={formData.maxCapacity}
                onChange={handleChange}
                placeholder="Nombre de places"
                min="1"
                required
              />
              <InputWithIcon
                label="Prix"
                name="price"
                type="number"
                icon={<FaMoneyBill />}
                value={formData.price}
                onChange={handleChange}
                placeholder="Prix en euros"
                min="0"
                step="0.01"
                required
              />
            </div>

            {/* Date limite d'inscription */}
            <InputWithIcon
              label="Date limite d'inscription"
              name="registrationDeadline"
              type="date"
              icon={<FaCalendarAlt />}
              value={formData.registrationDeadline}
              onChange={handleChange}
              required
            />

            {/* Statut */}
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
              >
                <option value="draft">Brouillon</option>
                <option value="published">Publié</option>
                <option value="cancelled">Annulé</option>
              </select>
            </div>

            {/* Club */}
            <div>
              <label htmlFor="clubId" className="block text-sm font-medium text-gray-700 mb-1">Club</label>
              <select
                id="clubId"
                name="clubId"
                value={formData.clubId}
                onChange={handleChange}
                className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                required
              >
                <option value="">Sélectionner un club</option>
                {clubs.map((club: { _id: string, name: string }) => (
                  <option key={club._id} value={club._id}>
                    {club.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Boutons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                type="submit"
                text={isLoading ? "Création en cours..." : "Créer l'événement"}
                color="primary"
                disabled={isLoading}
              />
              <Button
                type="button"
                text="Annuler"
                color="secondary"
                variant="outline"
                onClick={() => router.push('/admin/events')}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

/**
 * Composant réutilisable pour un champ avec une icône
 */
interface InputWithIconProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon: React.ReactNode;
  name: string;
}

function InputWithIcon({ label, icon, name, ...props }: InputWithIconProps) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {icon}
        </div>
        <input
          id={name}
          name={name}
          className="w-full pl-10 px-4 py-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
          {...props}
        />
      </div>
    </div>
  );
}
