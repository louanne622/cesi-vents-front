import Image from "next/image";
import EventCard from "@/components/EventCard";

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <EventCard 
          title="Prosit Retour 7"
          place="Cesi Arras"
          schedule="14h - 16h"
          date={{
            day: "02",
            month: "Jun"
          }}
        />
      </div>
    </div>
  );
}
