"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaArrowLeft, FaUser } from 'react-icons/fa';
import Button from '../../../components/ui/Button';
import { useAppDispatch } from '@/redux/hooks';
import { toast } from 'react-hot-toast';
import { UserCreatePayload } from '@/app/types/User';
import { addUser } from '@/redux/features/userSlice';

export default function CreateUserPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  
  const [userData, setUserData] = useState<UserCreatePayload>({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    phone: '',
    campus: '',
    role: 'user',
    bde_member: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Créer un objet qui correspond à ce que l'API attend
      const userDataToSend = {
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email,
        phone: userData.phone,
        campus: userData.campus,
        role: userData.role,
        bde_member: userData.bde_member,
        password: userData.password
      };

      console.log("Data envoyée au backend :", userDataToSend);
      await dispatch(addUser(userDataToSend)).unwrap();
      toast.success("Utilisateur créé avec succès !");
      router.push('/admin/users');
    } catch (error: any) {
      toast.error(error.message || "Erreur lors de la création de l'utilisateur");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

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
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Créer un nouvel utilisateur</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-1">
                Prénom
              </label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={userData.first_name}
                onChange={handleChange}
                className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                placeholder="John"
                required
              />
            </div>

            <div>
              <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-1">
                Nom
              </label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={userData.last_name}
                onChange={handleChange}
                className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                placeholder="Doe"
                required
              />
            </div>

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
                  value={userData.email}
                  onChange={handleChange}
                  className="w-full pl-10 px-4 py-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                  placeholder="john.doe@cesi.fr"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Mot de passe
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                required
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Téléphone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={userData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                placeholder="0612345678"
              />
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                Rôle
              </label>
              <select
                id="role"
                name="role"
                value={userData.role}
                onChange={handleChange}
                className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                required
              >
                <option value="">Sélectionner un rôle</option>
                <option value="user">Utilisateur</option>
                <option value="moderator">Modérateur</option>
                <option value="admin">Administrateur</option>
              </select>
            </div>

            <div>
              <label htmlFor="campus" className="block text-sm font-medium text-gray-700 mb-1">
                Campus
              </label>
              <select
                id="campus"
                name="campus"
                value={userData.campus}
                onChange={handleChange}
                className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                required
              >
                <option value="">Sélectionner un campus</option>
                <option value="Lille">Lille</option>
                <option value="Paris">Paris</option>
                <option value="Arras">Arras</option>
                <option value="Rouen">Rouen</option>
              </select>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="bde_member"
                name="bde_member"
                checked={userData.bde_member}
                onChange={(e) => setUserData(prev => ({ ...prev, bde_member: e.target.checked }))}
                className="h-4 w-4 text-[#fbe216] border-gray-300 rounded"
              />
              <label htmlFor="bde_member" className="ml-2 block text-sm text-gray-900">
                Membre du BDE
              </label>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                type="submit"
                text={isLoading ? "Création en cours..." : "Créer l'utilisateur"}
                color="primary"
                disabled={isLoading}
              />
              <Button
                type="button"
                text="Annuler"
                color="secondary"
                variant="outline"
                onClick={() => router.push('/admin/users')}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}


