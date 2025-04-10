"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchEventById, updateEvent } from "@/redux/features/eventSlice";
import Button from '@/app/components/ui/Button';
import { toast } from "react-hot-toast";
import { FaSave, FaArrowLeft } from "react-icons/fa";

interface EditEventPageProps {
  id:string;
}

export default function EditEventPage({ params }: { params: Promise<EditEventPageProps> }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { selectedEvent, status, error } = useAppSelector((state) => state.events);
  const [isSubmitting, setIsSubmitting] = useState(false);
  

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    maxCapacity: 0,
    price: 0,
    registrationDeadline: "",
    status: "draft" as "draft" | "published" | "cancelled",
  });

  const [forceUpdate, setForceUpdate] = useState(false);
  const resolvedParams = React.use(params);
  const eventId = resolvedParams.id;
  // Fetch event on mount
  useEffect(() => {
    dispatch(fetchEventById(eventId));
  }, [dispatch, eventId]);

  // Update form when event is loaded
  useEffect(() => {
    if (selectedEvent) {
      setFormData({
        title: selectedEvent.title,
        description: selectedEvent.description,
        date: selectedEvent.date.split("T")[0],
        time: selectedEvent.time,
        location: selectedEvent.location,
        maxCapacity: selectedEvent.maxCapacity,
        price: selectedEvent.price,
        registrationDeadline: selectedEvent.registrationDeadline.split("T")[0],
        status: selectedEvent.status,
      });
    }
  }, [selectedEvent]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await dispatch(
        updateEvent({
          id: eventId,
          eventData: { ...formData, forceUpdate },
        })
      );

      if (result.meta.requestStatus === "fulfilled") {
        toast.success("Événement modifié avec succès");
        router.push("/admin/events");
      } else {
        toast.error("Erreur lors de la modification de l'événement");
      }
    } catch (error: any) {
      toast.error(error.message || "Erreur lors de la modification de l'événement");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#fbe216] mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement des données de l'événement...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Erreur : {error}</p>
          <Button
            text="Retour"
            color="secondary"
            icon={<FaArrowLeft />}
            iconPosition="left"
            onClick={() => router.push('/admin/events')}
            className="mt-4"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-3xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <Button
            text="Retour"
            color="secondary"
            icon={<FaArrowLeft />}
            onClick={() => router.push("/admin/events")}
          />
          <h1 className="text-2xl md:text-3xl font-bold text-center flex-1">Modifier l'événement</h1>
          <div className="w-10" /> {/* Spacer */}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <Input label="Titre" name="title" type="text" value={formData.title} onChange={handleInputChange} />

            {/* Date */}
            <Input label="Date" name="date" type="date" value={formData.date} onChange={handleInputChange} />

            {/* Time */}
            <Input label="Heure" name="time" type="time" value={formData.time} onChange={handleInputChange} />

            {/* Location */}
            <Input label="Lieu" name="location" type="text" value={formData.location} onChange={handleInputChange} />

            {/* Max Capacity */}
            <Input
              label="Capacité maximale"
              name="maxCapacity"
              type="number"
              value={formData.maxCapacity}
              onChange={handleInputChange}
              min="1"
            />

            {/* Price */}
            <Input
              label="Prix"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleInputChange}
              min="0"
              step="0.01"
            />

            {/* Registration Deadline */}
            <Input
              label="Date limite d'inscription"
              name="registrationDeadline"
              type="date"
              value={formData.registrationDeadline}
              onChange={handleInputChange}
            />

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Statut</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#fbe216] focus:border-transparent"
              >
                <option value="draft">Brouillon</option>
                <option value="published">Publié</option>
                <option value="cancelled">Annulé</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#fbe216] focus:border-transparent"
              required
            />
          </div>

          {/* Force Update */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="forceUpdate"
              checked={forceUpdate}
              onChange={(e) => setForceUpdate(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="forceUpdate" className="text-sm text-gray-600">
              Forcer la mise à jour (même s'il y a des participants)
            </label>
          </div>

          {/* Boutons d'action */}
          <div className="flex justify-end space-x-4">
            <Button
              text="Annuler"
              color="secondary"
              variant="outline"
              onClick={() => router.back()}
              disabled={isSubmitting}
            />
            <Button
              text={isSubmitting ? "Enregistrement..." : "Enregistrer"}
              color="primary"
              type="submit"
              disabled={isSubmitting}
            />
          </div>
      </form>
      </div>
    </div>
  );
}

// Input field component for reuse
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
}
const Input: React.FC<InputProps> = ({ label, name, ...rest }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <input
      id={name}
      name={name}
      {...rest}
      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#fbe216] focus:border-transparent"
      required
    />
  </div>
);
