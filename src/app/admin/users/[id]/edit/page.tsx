"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaArrowLeft, FaUser, FaLock } from 'react-icons/fa';
import Button from '@/app/components/ui/Button';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getUserById, updateUser } from '@/redux/features/userSlice';
import { toast } from 'react-hot-toast';

interface PageParams {
  id: string;
}

export default function EditUserPage({ params }: { params: Promise<PageParams> }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { currentUser, loading, error } = useAppSelector((state) => state.user);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    role: '',
    password: '',
    confirmPassword: '',
    avatar: { url: '', alt: '' }
  });

  const resolvedParams = React.use(params);
  const userId = resolvedParams.id;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await dispatch(getUserById(userId));
      } catch (error) {
        toast.error('Erreur lors de la récupération des données de l\'utilisateur');
      }
    };

    fetchUser();
  }, [dispatch, userId]);

  useEffect(() => {
    if (currentUser) {
      setFormData({
        first_name: currentUser.first_name,
        last_name: currentUser.last_name,
        email: currentUser.email,
        role: currentUser.role,
        password: '',
        confirmPassword: '',
        avatar: typeof currentUser.avatar === 'string' 
          ? { url: currentUser.avatar, alt: currentUser.first_name } 
          : currentUser.avatar || { url: '', alt: '' }
      });
    }
  }, [currentUser]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (formData.password !== formData.confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas');
      setIsSubmitting(false);
      return;
    }

    try {
      if (!currentUser) {
        toast.error('Données utilisateur non disponibles');
        setIsSubmitting(false);
        return;
      }

      const data = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        role: formData.role,
        avatar: formData.avatar,
        ...(formData.password && { password: formData.password }),
        phone: currentUser.phone,
        campus: currentUser.campus
      };

      const result = await dispatch(updateUser({ id: userId, data })).unwrap();
      
      if (result.success) {
        toast.success('Utilisateur mis à jour avec succès');
        router.push('/admin/users');
      } else {
        throw new Error(result.message || 'Erreur lors de la mise à jour');
      }
    } catch (error: any) {
      toast.error(error.message || 'Erreur lors de la mise à jour de l\'utilisateur');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#fbe216] mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement des données de l'utilisateur...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Utilisateur non trouvé</p>
          <Button
            text="Retour"
            color="secondary"
            icon={<FaArrowLeft />}
            iconPosition="left"
            onClick={() => router.push('/admin/users')}
            className="mt-4"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button
            text="Retour"
            color="secondary"
            icon={<FaArrowLeft />}
            iconPosition="left"
            onClick={() => router.push('/admin/users')}
          />
        </div>

        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Modifier l'utilisateur</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Prénom */}
            <div>
              <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-1">
                Prénom
              </label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fbe216] focus:border-transparent"
                placeholder="Ex: John"
              />
            </div>

            {/* Nom */}
            <div>
              <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-1">
                Nom
              </label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fbe216] focus:border-transparent"
                placeholder="Ex: Doe"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fbe216] focus:border-transparent"
                  placeholder="email@example.com"
                />
              </div>
            </div>

            {/* Mot de passe */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Nouveau mot de passe
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fbe216] focus:border-transparent"
                  placeholder="Laisser vide pour ne pas modifier"
                />
              </div>
            </div>

            {/* Confirmation du mot de passe */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirmer le nouveau mot de passe
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full pl-10 px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fbe216] focus:border-transparent"
                  placeholder="Confirmer le nouveau mot de passe"
                />
              </div>
            </div>

            {/* Rôle */}
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                Rôle
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fbe216] focus:border-transparent"
              >
                <option value="user">Utilisateur</option>
                <option value="admin">Administrateur</option>
              </select>
            </div>

            {/* Avatar */}
            <div>
              <label htmlFor="avatar" className="block text-sm font-medium text-gray-700 mb-1">
                Avatar
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="file"
                  id="avatar"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setFormData(prev => ({
                          ...prev,
                          avatar: {
                            url: reader.result as string,
                            alt: file.name
                          }
                        }));
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="hidden"
                />
                <label
                  htmlFor="avatar"
                  className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-gray-700"
                >
                  Changer l'avatar
                </label>
                {formData.avatar.url && (
                  <div className="relative h-20 w-20">
                    <img
                      src={formData.avatar.url}
                      alt={formData.avatar.alt}
                      className="object-cover rounded-full"
                    />
                  </div>
                )}
              </div>
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
    </div>
  );
}