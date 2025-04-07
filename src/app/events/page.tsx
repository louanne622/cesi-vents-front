"use client";  // Convertir en composant client pour utiliser des états

import React, { useState, useEffect } from 'react';
import EventCard from '../components/Eventcard';
import FilterBar from '@/app/components/ui/FilterBar';
import SearchBar from '../components/events/SearchBar';
import Button from '@/app/components/ui/Button';
import { FaSearch } from 'react-icons/fa';

// Données de démonstration (à remplacer par un appel API)
const eventsListData = [
  {
    id: "1",
    title: "Soirée d'intégration CESI",
    description: "Rejoignez-nous pour une soirée exceptionnelle pour accueillir les nouveaux étudiants du CESI. Au programme : animations, musique et surprises !",
    date: "2024-09-15",
    time: "19:00",
    location: "Campus CESI - Hall Principal",
    image: "/img/lan.jpg",
    category: "Social",
    organizer: "BDE CESI",
    price: "Gratuit",
    currentParticipants: 120,
    maxParticipants: 200
  },
  {

    id: 2,
    title: "Tournoi de Jeux Vidéo",
    description: "Participez à notre tournoi de jeux vidéo ! Au programme : League of Legends, Valorant, et bien d'autres. Des lots à gagner !",
    date: {
      day: "22",
      month: "Septembre"
    },
    time: "14:00",
    location: "Salle Multimédia CESI",
    image: "/img/lan.jpg",
    category: "Gaming",
    organizer: "Club Gaming CESI",
    price: "5€",
    participants: {
      current: 45,
      max: 50
    }
  },
  {
    id: 3,
    title: "Atelier Développement Web",
    description: "Apprenez les bases du développement web avec nos experts. HTML, CSS, JavaScript et plus encore !",
    date: {
      day: "30",
      month: "Septembre"
    },
    time: "10:00",
    location: "Salle Informatique CESI",
    image: "/img/lan.jpg",
    category: "Formation",
    organizer: "Club Tech CESI",
    price: "Gratuit",
    participants: {
      current: 15,
      max: 30
    }
  }
];

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous');
  const [filteredEvents, setFilteredEvents] = useState(eventsListData);
  const [showFilters, setShowFilters] = useState(false);

  // Catégories disponibles
  const categories = ['Tous', ...Array.from(new Set(eventsListData.map(event => event.category)))];

  // Fonction pour filtrer les événements
  useEffect(() => {
    let result = eventsListData;
    
    // Filtrer par catégorie
    if (selectedCategory !== 'Tous') {
      result = result.filter(event => event.category === selectedCategory);
    }
    
    // Filtrer par recherche
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = result.filter(event => 
        event.title.toLowerCase().includes(query) || 
        event.description.toLowerCase().includes(query) ||
        event.location.toLowerCase().includes(query)
      );
    }
    
    setFilteredEvents(result);
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* En-tête */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Événements</h1>
          <p className="text-gray-600">Découvrez tous les événements à venir</p>
        </div>

        {/* Barre de recherche et filtres */}
        <div className="mb-8 space-y-4">
          {/* SearchBar */}
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Rechercher un événement..."
            onFilterClick={() => setShowFilters(!showFilters)}
          />

          {/* FilterBar (visible uniquement sur mobile ou quand showFilters est true) */}
          <div className={`${showFilters ? 'block' : 'hidden md:block'}`}>
            <FilterBar
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>
        </div>

        {/* Liste des événements */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map(event => (
              <EventCard
                key={event.id}
                id={event.id}
                title={event.title}
                imageUrl={event.image}
                place={event.location}
                schedule={event.time}
                date={event.date}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">Aucun événement ne correspond à vos critères</p>
            <Button
              text="Réinitialiser les filtres"
              color="secondary"
              variant="outline"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('Tous');
              }}
            />

          </div>
        )}
      </div>
    </div>
  );
} 