"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Button from '../components/ui/Button';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Image from 'next/image';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Logique d'inscription à implémenter
  };

  return (
    <div className="min-h-screen bg-white pb-16 md:pb-0">
      <div className="container mx-auto px-4 py-8">
        <div className="w-full max-w-md mx-auto">
          

          <div className="w-full" style={{ marginTop: '10px' }}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Inscription</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Nom */}
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Nom
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-gray-900"
                  required
                />
              </div>

              {/* Prénom */}
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  Prénom
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-gray-900"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Adresse email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-gray-900"
                  placeholder="exemple@email.com"
                  required
                />
              </div>

              {/* Mot de passe */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Mot de passe
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-gray-900 pr-10"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-yellow-400 focus:outline-none"
                  >
                    {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                  </button>
                </div>
              </div>

              {/* Confirmation du mot de passe */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirmer le mot de passe
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-gray-900 pr-10"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-yellow-400 focus:outline-none"
                  >
                    {showConfirmPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                  </button>
                </div>
              </div>

              {/* Campus */}
              <div>
                <label htmlFor="campus" className="block text-sm font-medium text-gray-700 mb-1">
                  Campus
                </label>
                <select
                  id="campus"
                  name="campus"
                  className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-gray-900"
                  required
                >
                  <option value="">Sélectionnez votre campus</option>
                  <option value="arras">Arras</option>
                  <option value="lille">Lille</option>
                  <option value="paris">Paris</option>
                  {/* Ajouter d'autres campus selon besoin */}
                </select>
              </div>

              {/* Conditions d'utilisation */}
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  className="h-4 w-4 mt-1 text-yellow-400 focus:ring-yellow-400 border-gray-300 rounded"
                  required
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                  J'accepte les{' '}
                  <Link href="/terms" className="text-yellow-500 hover:text-yellow-400">
                    conditions d'utilisation
                  </Link>
                  {' '}et la{' '}
                  <Link href="/privacy" className="text-yellow-500 hover:text-yellow-400">
                    politique de confidentialité
                  </Link>
                </label>
              </div>

              {/* Bouton d'inscription */}
              <div className="mt-6">
                <Button
                  text="S'inscrire"
                  color="primary"
                  type="submit"
                  onClick={() => {}}
                  fullWidth
                />
              </div>

              {/* Lien vers la connexion */}
              <div className="text-center text-sm text-gray-600">
                Déjà inscrit ?{' '}
                <Link href="/login" className="text-yellow-500 hover:text-yellow-400 font-medium">
                  Se connecter
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
