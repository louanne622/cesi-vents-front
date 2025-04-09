"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaArrowLeft, FaUser, FaEnvelope, FaUserTag, FaPencilAlt } from 'react-icons/fa';
import Button from '../../../../components/ui/Button';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getUserById } from '@/redux/features/userSlice';
import { toast } from 'react-hot-toast';

interface PageParams {
  id: string;
}
export default function ViewUserPage({ params }: { params: Promise<PageParams> }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { currentUser, loading, error } = useAppSelector((state) => state.user);
  const resolvedParams = React.use(params);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await dispatch(getUserById(resolvedParams.id));
      } catch (error) {
        toast.error('Erreur lors de la récupération des détails de l\'utilisateur');
      }
    };

    fetchUser();
  }, [dispatch, resolvedParams.id]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#fbe216] mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement des détails de l'utilisateur...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
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
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="flex items-center mb-4 md:mb-0">
            <Button
              text="Retour"
              color="secondary"
              icon={<FaArrowLeft />}
              iconPosition="left"
              onClick={() => router.push('/admin/users')}
              className="mr-4"
            />
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Détails de l'utilisateur</h1>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          {/* User Profile Header */}
          <div className="flex flex-col md:flex-row items-center md:items-start border-b border-gray-200 pb-8 mb-8">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gray-100 flex items-center justify-center mb-4 md:mb-0 md:mr-8">
              {currentUser.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt={`${currentUser.first_name} ${currentUser.last_name}`}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <FaUser className="w-12 h-12 md:w-16 md:h-16 text-gray-400" />
              )}
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {currentUser.first_name} {currentUser.last_name}
              </h2>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#fbe216] text-gray-900">
                {currentUser.role === 'admin' ? 'Administrateur' : 'Utilisateur'}
              </span>
            </div>
          </div>

          {/* User Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Informations de contact</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <FaEnvelope className="w-5 h-5 text-[#fbe216] mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="text-gray-900 font-medium">{currentUser.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <FaUserTag className="w-5 h-5 text-[#fbe216] mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Rôle</p>
                      <p className="text-gray-900 font-medium">
                        {currentUser.role === 'admin' ? 'Administrateur' : 'Utilisateur'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Informations du compte</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Date de création</p>
                    <p className="text-gray-900 font-medium">
                      {new Date(currentUser.createdAt).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Dernière mise à jour</p>
                    <p className="text-gray-900 font-medium">
                      {new Date(currentUser.updatedAt).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
