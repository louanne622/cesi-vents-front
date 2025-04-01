import Image from "next/image";
import TicketCard from "./components/TicketCard";

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Événements</h1>
      
      {/* Exemple d'utilisation du TicketCard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <TicketCard
          date="26 Mai 2025"
          eventName="Tournoi League of Legends"
          location="Cesi, ARRAS"
          ticketLink="/tickets/1"
          qrCodeUrl="https://media.printables.com/media/prints/247155/images/2225599_87136d16-b57a-476f-8829-26393fa25aeb/thumbs/inside/1280x960/png/large_display_eicar_247155.webp"
        />
        
        {/* Vous pouvez ajouter d'autres TicketCard ici */}
      </div>
    </main>
  );
}
