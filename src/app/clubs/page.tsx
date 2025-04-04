"use client";

import React, { useState, useEffect } from 'react';
import ClubCard from '../components/clubs/ClubCard';
import FilterBar from '../components/events/FilterBar';
import SearchBar from '../components/events/SearchBar';
import Button from '../components/ui/Button';
import { FaSearch, FaFilter } from 'react-icons/fa';

const clubs = [
  {
    id: 1,
    name: 'Club Photo',
    description: 'Capturez les moments forts de la vie étudiante',
    category: 'culture',
    members: 45,
    image: '/images/clubs/photo-club.jpg',
    campus: 'Lille',
    nextEvent: '15 Septembre 2023',
  },
  {
    id: 2,
    name: 'Club Robotique',
    description: 'Concevez et construisez des robots',
    category: 'tech',
    members: 30,
    image: '/images/clubs/robot-club.jpg',
    campus: 'Lille',
    nextEvent: '20 Septembre 2023',
  },
  {
    id: 3,
    name: 'Club Football',
    description: 'Participez aux compétitions inter-campus',
    category: 'sport',
    members: 25,
    image: '/images/clubs/football-club.jpg',
    campus: 'Lille',
    nextEvent: '10 Septembre 2023',
  },
  {
    id: 4,
    name: 'Club Théâtre',
    description: 'Montez sur scène et exprimez-vous',
    category: 'culture',
    members: 35,
    image: '/images/clubs/theatre-club.jpg',
    campus: 'Lille',
    nextEvent: '25 Septembre 2023',
  },
];

export default function ClubsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [filteredClubs, setFilteredClubs] = useState(clubs);

  const categories = ["Tous", "Culture", "Tech", "Sport", "Social"];

  // Fonction pour filtrer les clubs en fonction des critères
  useEffect(() => {
    let result = clubs;
    
    // Filtrer par catégorie
    if (selectedCategory !== "Tous") {
      result = result.filter(club => club.category === selectedCategory.toLowerCase());
    }
    
    // Filtrer par recherche
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(club => 
        club.name.toLowerCase().includes(query) || 
        club.description.toLowerCase().includes(query) ||
        club.campus.toLowerCase().includes(query)
      );
    }
    
    setFilteredClubs(result);
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* En-tête */}
        <div className="flex flex-col md:flex-row justify-center items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Clubs CESI</h1>
        </div>

        {/* Filtres et recherche pour mobile et desktop */}
        <div className="mb-8">
          {/* Version mobile - design plus compact */}
          <div className="md:hidden">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Rechercher un club..."
            />
            
            {/* Catégories en chips horizontales défilables */}
            <FilterBar
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>
          
          {/* Version desktop */}
          <div className="hidden md:block p-5 bg-white rounded-xl shadow-md">
            <div className="flex items-center gap-4">
              {/* Barre de recherche avec icône */}
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input 
                  type="text" 
                  placeholder="Rechercher un club..." 
                  className="pl-10 pr-4 py-3 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fbe216] focus:border-transparent transition-all text-gray-700"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              {/* Filtre avec style assorti */}
              <div className="relative">
                <select 
                  className="pl-10 pr-8 py-3 border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-[#fbe216] focus:border-transparent transition-all bg-white text-gray-700"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category === "Tous" ? "Toutes les catégories" : category}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaFilter className="h-5 w-5 text-gray-400" />
                </div>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Liste des clubs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClubs.map((club) => (
            <ClubCard key={club.id} club={club} />
          ))}
        </div>

        {/* Message si aucun club trouvé */}
        {filteredClubs.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">Aucun club ne correspond à vos critères.</p>
            <Button
              text="Réinitialiser les filtres"
              color="primary"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("Tous");
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
} 