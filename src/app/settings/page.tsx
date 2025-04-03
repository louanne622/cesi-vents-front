"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Button from '../components/ui/Button';
import { FaBell, FaLock, FaUser, FaPalette, FaLanguage, FaSignOutAlt } from 'react-icons/fa';

const SettingsPage = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('fr');

  return (
    <div className="min-h-screen bg-white pb-16 md:pb-0">
      <div className="container mx-auto px-4 py-8">
        <div className="w-full max-w-2xl mx-auto">
          {/* En-tête */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Paramètres</h1>
            <div className="flex items-center space-x-4">
              <Image
                src="/img/cesi4.png"
                alt="CESI Logo"
                width={60}
                height={60}
                className="object-contain"
              />
            </div>
          </div>

          {/* Profil */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                <FaUser className="h-8 w-8 text-gray-500" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">John Doe</h2>
                <p className="text-sm text-gray-500">Étudiant CESI</p>
              </div>
            </div>
            <Button
              text="Modifier le profil"
              color="primary"
              variant="outline"
              onClick={() => {}}
            />
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <FaBell className="h-5 w-5 text-gray-500" />
                <h3 className="text-lg font-medium text-gray-900">Notifications</h3>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={notifications}
                  onChange={() => setNotifications(!notifications)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
              </label>
            </div>
            <p className="text-sm text-gray-500">Recevoir des notifications pour les nouveaux événements et messages</p>
          </div>

          {/* Sécurité */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-center space-x-3 mb-4">
              <FaLock className="h-5 w-5 text-gray-500" />
              <h3 className="text-lg font-medium text-gray-900">Sécurité</h3>
            </div>
            <div className="space-y-4">
              <Button
                text="Changer le mot de passe"
                color="primary"
                variant="outline"
                onClick={() => {}}
                fullWidth
              />
              <Button
                text="Gérer les appareils connectés"
                color="secondary"
                variant="outline"
                onClick={() => {}}
                fullWidth
              />
            </div>
          </div>

          {/* Apparence */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <FaPalette className="h-5 w-5 text-gray-500" />
                <h3 className="text-lg font-medium text-gray-900">Mode sombre</h3>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={darkMode}
                  onChange={() => setDarkMode(!darkMode)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
              </label>
            </div>
          </div>

          {/* Langue */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-center space-x-3 mb-4">
              <FaLanguage className="h-5 w-5 text-gray-500" />
              <h3 className="text-lg font-medium text-gray-900">Langue</h3>
            </div>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            >
              <option value="fr">Français</option>
              <option value="en">English</option>
            </select>
          </div>

          {/* Déconnexion */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <Button
              text="Déconnexion"
              color="danger"
              variant="outline"
              onClick={() => {}}
              fullWidth
              icon={<FaSignOutAlt />}
              iconPosition="left"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage; 