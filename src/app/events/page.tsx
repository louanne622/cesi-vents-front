"use client";  // Convertir en composant client pour utiliser des états

import React, { useState, useEffect } from 'react';
import EventCard from '../components/Eventcard';
import { FaSearch, FaFilter } from 'react-icons/fa';

// Ajout d'une nouvelle catégorie "Formation" dans certains événements
const eventsListData = [
  {
    id: 1,
    title: "Soirée d'intégration CESI",
    description: "Rejoignez-nous pour une soirée exceptionnelle pour accueillir les nouveaux étudiants du CESI. Au programme : animations, musique et surprises !",
    date: {
      day: "15",
      month: "Septembre"
    },
    time: "19:00",
    location: "Campus CESI - Hall Principal",
    image: "/img/lan.jpg",
    category: "Social",
    organizer: "BDE CESI",
    price: "Gratuit",
    participants: {
      current: 120,
      max: 200
    }
  },
  {
    id: 2,
    title: "Hackathon IA & Innovation",
    description: "48h pour créer des solutions innovantes basées sur l'intelligence artificielle. Ouvert à tous les niveaux.",
    date: {
      day: "22",
      month: "Octobre"
    },
    time: "09:00",
    location: "Campus CESI - Labo Tech",
    image: "/img/lan.jpg",
    category: "Technologie",
    organizer: "Club Tech CESI",
    price: "Gratuit",
    participants: {
      current: 45,
      max: 60
    }
  },
  {
    id: 3,
    title: "Atelier CV & LinkedIn",
    description: "Optimisez votre CV et votre profil LinkedIn pour maximiser vos chances lors de vos recherches de stage et d'emploi.",
    date: {
      day: "05",
      month: "Novembre"
    },
    time: "14:30",
    location: "Campus CESI - Salle 103",
    image: "/img/lan.jpg",
    category: "Carrière",
    organizer: "Service Carrière CESI",
    price: "Gratuit",
    participants: {
      current: 30,
      max: 40
    }
  },
  {
    id: 4,
    title: "Tournoi e-sport inter-écoles",
    description: "Venez représenter CESI lors du plus grand tournoi e-sport inter-écoles de la région ! Jeux: LOL, CS:GO, et Rocket League.",
    date: {
      day: "12",
      month: "Décembre"
    },
    time: "10:00",
    location: "Salle de conférence CESI",
    image: "/img/lan.jpg",
    category: "Loisirs",
    organizer: "Club Gaming CESI",
    price: "5€",
    participants: {
      current: 80,
      max: 100
    }
  },
  {
    id: 5,
    title: "Conférence Cybersécurité",
    description: "Une conférence passionnante sur les enjeux actuels de la cybersécurité avec des experts du domaine.",
    date: {
      day: "18",
      month: "Janvier"
    },
    time: "14:00",
    location: "Amphi CESI",
    image: "/img/lan.jpg",
    category: "Technologie",
    organizer: "Club Sécurité CESI",
    price: "Gratuit",
    participants: {
      current: 65,
      max: 120
    }
  },
  {
    id: 6,
    title: "Soirée Réseautage Entreprises",
    description: "Rencontrez des professionnels de diverses entreprises partenaires du CESI dans une ambiance conviviale.",
    date: {
      day: "26",
      month: "Janvier"
    },
    time: "18:30",
    location: "Campus CESI - Espace Carrière",
    image: "/img/lan.jpg",
    category: "Carrière",
    organizer: "Service Relations Entreprises",
    price: "Gratuit",
    participants: {
      current: 55,
      max: 80
    }
  },
  {
    id: 7,
    title: "Workshop Design Thinking",
    description: "Atelier pratique pour apprendre la méthodologie du design thinking et l'appliquer à vos projets.",
    date: {
      day: "03",
      month: "Février"
    },
    time: "13:00",
    location: "Salle Créative CESI",
    image: "/img/lan.jpg",
    category: "Technologie",
    organizer: "Club Innovation CESI",
    price: "Gratuit",
    participants: {
      current: 25,
      max: 30
    }
  },
  {
    id: 8,
    title: "Gala annuel CESI",
    description: "Le gala annuel du CESI. Soirée élégante avec dîner, spectacle et soirée dansante.",
    date: {
      day: "14",
      month: "Février"
    },
    time: "19:30",
    location: "Hôtel Le Grand Palace",
    image: "/img/lan.jpg",
    category: "Social",
    organizer: "BDE CESI",
    price: "45€",
    participants: {
      current: 180,
      max: 250
    }
  },
  {
    id: 9,
    title: "Journée Portes Ouvertes",
    description: "Visitez le campus, rencontrez les enseignants et découvrez les formations proposées par CESI.",
    date: {
      day: "25",
      month: "Février"
    },
    time: "10:00",
    location: "Campus CESI",
    image: "/img/lan.jpg",
    category: "Information",
    organizer: "Administration CESI",
    price: "Gratuit",
    participants: {
      current: 0,
      max: 500
    }
  },
  {
    id: 10,
    title: "Challenge Robotique",
    description: "Compétition de robotique entre équipes d'étudiants : construisez, programmez et faites concourir votre robot.",
    date: {
      day: "07",
      month: "Mars"
    },
    time: "09:00",
    location: "Campus CESI - Gymnase",
    image: "/img/lan.jpg",
    category: "Technologie",
    organizer: "Club Robotique CESI",
    price: "10€ par équipe",
    participants: {
      current: 12,
      max: 20
    }
  },
  {
    id: 11,
    title: "Marathon de Programmation",
    description: "24h de code non-stop : relevez des défis de programmation en équipe et gagnez des prix.",
    date: {
      day: "15",
      month: "Mars"
    },
    time: "18:00",
    location: "Campus CESI - Espace Coworking",
    image: "/img/lan.jpg",
    category: "Technologie",
    organizer: "Club Dev CESI",
    price: "Gratuit",
    participants: {
      current: 40,
      max: 60
    }
  },
  {
    id: 12,
    title: "Forum des Associations",
    description: "Découvrez tous les clubs et associations du campus, rencontrez leurs membres et inscrivez-vous.",
    date: {
      day: "21",
      month: "Mars"
    },
    time: "12:00",
    location: "Campus CESI - Hall Principal",
    image: "/img/lan.jpg",
    category: "Social",
    organizer: "Bureau des Associations",
    price: "Gratuit",
    participants: {
      current: 0,
      max: 300
    }
  },
  {
    id: 13,
    title: "Conférence Développement Durable",
    description: "Conférence sur les enjeux du développement durable dans l'ingénierie et comment construire un avenir plus vert.",
    date: {
      day: "04",
      month: "Avril"
    },
    time: "15:30",
    location: "Amphi CESI",
    image: "/img/lan.jpg",
    category: "Information",
    organizer: "Green CESI",
    price: "Gratuit",
    participants: {
      current: 50,
      max: 120
    }
  },
  {
    id: 14,
    title: "Tournoi Sportif Inter-Promotions",
    description: "Compétition sportive entre les différentes promotions du CESI : football, basketball, volleyball et bien plus.",
    date: {
      day: "12",
      month: "Avril"
    },
    time: "10:00",
    location: "Complexe Sportif CESI",
    image: "/img/lan.jpg",
    category: "Loisirs",
    organizer: "Bureau des Sports",
    price: "Gratuit",
    participants: {
      current: 80,
      max: 200
    }
  },
  // Nouveaux événements avec la catégorie Formation
  {
    id: 15,
    title: "Formation Docker pour débutants",
    description: "Apprenez les bases de Docker et de la conteneurisation pour améliorer vos déploiements d'applications.",
    date: {
      day: "20",
      month: "Avril"
    },
    time: "09:30",
    location: "Salle Informatique CESI",
    image: "/img/lan.jpg",
    category: "Formation",
    organizer: "Département Informatique",
    price: "Gratuit pour les étudiants",
    participants: {
      current: 15,
      max: 25
    }
  },
  {
    id: 16,
    title: "Workshop React.js avancé",
    description: "Formation pratique sur les concepts avancés de React.js : hooks, context API, et optimisation des performances.",
    date: {
      day: "28",
      month: "Avril"
    },
    time: "14:00",
    location: "Lab Digital CESI",
    image: "/img/lan.jpg",
    category: "Formation",
    organizer: "Club Web Development",
    price: "Gratuit",
    participants: {
      current: 18,
      max: 20
    }
  },
  {
    id: 17,
    title: "Atelier Management de Projet",
    description: "Formation complète sur les méthodologies agiles et leur application dans vos projets d'études et professionnels.",
    date: {
      day: "05",
      month: "Mai"
    },
    time: "10:00",
    location: "Campus CESI - Salle 205",
    image: "/img/lan.jpg",
    category: "Formation",
    organizer: "Département Management",
    price: "Gratuit pour les étudiants",
    participants: {
      current: 22,
      max: 30
    }
  }
];

// Liste des catégories disponibles
const categories = ["Tous", "Social", "Technologie", "Carrière", "Loisirs", "Information", "Formation"];

export default function EventsPage() {
  // États pour gérer les filtres et la recherche
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [filteredEvents, setFilteredEvents] = useState(eventsListData);

  // Fonction pour filtrer les événements en fonction des critères
  useEffect(() => {
    let result = eventsListData;
    
    // Filtrer par catégorie
    if (selectedCategory !== "Tous") {
      result = result.filter(event => event.category === selectedCategory);
    }
    
    // Filtrer par recherche
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(event => 
        event.title.toLowerCase().includes(query) || 
        event.description.toLowerCase().includes(query) ||
        event.location.toLowerCase().includes(query) ||
        event.organizer.toLowerCase().includes(query)
      );
    }
    
    setFilteredEvents(result);
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 pt-8 pb-24 md:pb-8 flex-grow">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Événements à venir</h1>
          <p className="text-gray-600">Découvrez tous les événements organisés par la communauté CESI.</p>
        </div>
        
        {/* Filtres et recherche pour mobile et desktop */}
        <div className="mb-8">
          {/* Version mobile - design plus compact */}
          <div className="md:hidden">
            <div className="flex items-center gap-2 bg-white rounded-xl shadow-md p-3">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="h-4 w-4 text-gray-400" />
                </div>
                <input 
                  type="text" 
                  placeholder="Rechercher..." 
                  className="pl-9 pr-3 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fbe216] focus:border-transparent transition-all text-gray-700 text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button className="bg-[#fbe216] hover:bg-[#e6cf14] transition-colors p-2 rounded-lg">
                <FaFilter className="h-5 w-5 text-gray-700" />
              </button>
            </div>
            
            {/* Catégories en chips horizontales défilables */}
            <div className="mt-3 flex overflow-x-auto pb-2 no-scrollbar">
              <div className="flex gap-2">
                {categories.map((category) => (
                  <button 
                    key={category}
                    className={`whitespace-nowrap px-3 py-1.5 ${selectedCategory === category ? 'bg-[#fbe216] text-gray-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} rounded-full text-sm font-medium`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
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
                  placeholder="Rechercher un événement..." 
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
        
        {/* Grille d'événements - centrée sur mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <div key={event.id} className="w-full max-w-xs mx-auto">
                <EventCard 
                  title={event.title}
                  imageUrl={event.image}
                  place={event.location}
                  schedule={event.time}
                  date={event.date}
                />
              </div>
            ))
          ) : (
            <div className="col-span-full py-16 text-center">
              <p className="text-gray-500 text-lg">Aucun événement ne correspond à vos critères.</p>
              <button 
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("Tous");
                }}
                className="mt-4 px-4 py-2 bg-[#fbe216] text-gray-800 rounded-lg hover:bg-[#e6cf14] transition-colors"
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </div>
        
        {/* Message indiquant le nombre d'événements trouvés */}
        {filteredEvents.length > 0 && (
          <div className="mt-6 text-center text-sm text-gray-500">
            {filteredEvents.length} événement{filteredEvents.length > 1 ? 's' : ''} trouvé{filteredEvents.length > 1 ? 's' : ''}
          </div>
        )}
      </div>
    </div>
  );
} 