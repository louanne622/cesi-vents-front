"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Button from './ui/Button';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Logique de connexion à implémenter
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Connexion</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4" style={{ marginLeft: '20px', marginRight: '20px' }}>
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
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-yellow-400 focus:outline-none"
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember"
              name="remember"
              className="h-4 w-4 text-yellow-400 focus:ring-yellow-400 border-gray-300 rounded"
            />
            <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
              Se souvenir de moi
            </label>
          </div>
          <Link
            href="/forgot-password"
            className="text-sm text-yellow-500 hover:text-yellow-400"
          >
            Mot de passe oublié ?
          </Link>
        </div>

        <div className="mt-6">
          <Button
            text="Se connecter"
            color="primary"
            type="submit"
            onClick={() => {}}
            fullWidth
          />
        </div>

        <div className="text-center text-sm text-gray-600">
          Pas encore de compte ?{' '}
          <Link href="/register" className="text-yellow-500 hover:text-yellow-400 font-medium">
            S'inscrire
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm; 