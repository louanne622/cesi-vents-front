"use client";

import Hero from "./components/Hero";
import ClubCard from "./components/clubs/ClubCard";
import EventCard from "./components/Eventcard";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchEvents } from "@/redux/features/eventSlice";
import { getAllClubs } from "@/redux/features/clubSlice";
import { useEffect } from "react";
import { FaChevronRight } from "react-icons/fa";

export default function Home() {
  const dispatch = useAppDispatch();
  const { events, status: eventsStatus } = useAppSelector((state) => state.events);
  const { clubs, loading: clubsLoading } = useAppSelector((state) => state.club);

  useEffect(() => {
    dispatch(fetchEvents());
    dispatch(getAllClubs());
  }, [dispatch]);

  return (
    <>
      <Hero />
      
      {/* Section Clubs */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Nos Clubs</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clubsLoading ? (
              <div className="col-span-full text-center py-8">Chargement des clubs...</div>
            ) : clubs && clubs.length > 0 ? (
              clubs.slice(0, 6).map((club) => (
                <ClubCard 
                  key={club._id} 
                  club={{
                    _id: club._id,
                    name: club.name,
                    description: club.description,
                    logo: {
                      url: club.logo?.url || "",
                      alt: club.logo?.alt || ""
                    },
                    email: club.email || "",
                    campus: club.campus || "",
                    category: club.category || ""
                  }} 
                />
              ))
            ) : (
              <div className="col-span-full text-center py-8">Aucun club disponible pour le moment</div>
            )}
          </div>
        </div>
      </section>

      {/* Section Événements */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Événements à venir</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventsStatus === 'loading' ? (
              <div className="col-span-full text-center py-8">Chargement des événements...</div>
            ) : events && events.length > 0 ? (
              events.slice(0, 6).map((event) => (
                <EventCard 
                  key={event._id}
                  id={event._id}
                  title={event.title}
                  imageUrl=""
                  place={event.location}
                  schedule={event.time}
                  date={{
                    day: new Date(event.date).getDate().toString(),
                    month: new Date(event.date).toLocaleString('fr-FR', { month: 'long' })
                  }}
                  price={event.price}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-8">Aucun événement à venir pour le moment</div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}