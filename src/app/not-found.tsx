"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { FaHome, FaArrowLeft } from 'react-icons/fa';
import Button from './components/ui/Button';
import Image from 'next/image';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-12">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <Image
            src="/img/cesi4.png"
            alt="CESI Logo"
            width={120}
            height={120}
            className="mx-auto"
          />
        </div>
        
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Page non trouvée</h2>
        
        <div className="bg-gray-50 rounded-lg p-6 mb-8 shadow-sm">
          <p className="text-gray-600 mb-4">
            La page que vous recherchez n'existe pas ou a été déplacée.
          </p>
          <div className="w-16 h-1 bg-[#fbe216] mx-auto my-4"></div>
          <p className="text-gray-500 text-sm">
            Vérifiez l'URL ou retournez à la page d'accueil.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            text="Retour"
            color="secondary"
            icon={<FaArrowLeft />}
            iconPosition="left"
            onClick={() => router.back()}
          />
          <Button
            text="Accueil"
            color="primary"
            icon={<FaHome />}
            iconPosition="left"
            onClick={() => router.push('/')}
          />
        </div>
      </div>
    </div>
  );
} 