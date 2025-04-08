"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getClubById } from '@/redux/features/clubSlice';
import { toast } from 'react-hot-toast';
import ClubDetails from '@/app/components/clubs/ClubDetails';
import Button from '@/app/components/ui/Button';

interface PageParams {
  id: string;
}

export default function ViewClubPage({ params }: { params: Promise<PageParams> }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { currentClub, loading, error } = useAppSelector((state) => state.club);
  const resolvedParams = React.use(params);

  useEffect(() => {
    const fetchClub = async () => {
      try {
        await dispatch(getClubById(resolvedParams.id));
      } catch (error) {
        toast.error('Erreur lors de la récupération des détails du club');
      }
    };

    fetchClub();
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
          <p className="mt-4 text-gray-600">Chargement des détails du club...</p>
        </div>
      </div>
    );
  }

  if (!currentClub) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Club non trouvé</p>
          <Button
            text="Retour"
            color="secondary"
            icon={<FaArrowLeft />}
            iconPosition="left"
            onClick={() => router.push('/clubs')}
            className="mt-4"
          />
        </div>
      </div>
    );
  }

  return (
    <ClubDetails
      clubId={currentClub._id}
      onBack={() => router.push('/clubs')}
    />
  );
}
