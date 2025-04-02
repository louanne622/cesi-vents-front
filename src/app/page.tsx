import Hero from "./components/Hero";
import EventCard from "./components/Eventcard";

const testEvent = {
  id: 1,
  title: "Soirée d'intégration CESI",
  description: "Rejoignez-nous pour une soirée exceptionnelle pour accueillir les nouveaux étudiants du CESI. Au programme : animations, musique et surprises !",
  date: {
    day: "15",
    month: "Septembre"
  },
  time: "19:00",
  location: "Campus CESI - Hall Principal",
  image: "/img/lan.jpg", // Utilisez une image par défaut si vous n'avez pas encore d'images
  category: "Social",
  organizer: "BDE CESI",
  price: "Gratuit",
  participants: {
    current: 120,
    max: 200
  }
};

export default function Home() {
  return (
    <>
      <Hero />
      <div className="p-6">
        <EventCard 
          title={testEvent.title}
          imageUrl={testEvent.image}
          place={testEvent.location}
          schedule={testEvent.time}
          date={testEvent.date}
        />
      </div>
    </>
  );
}