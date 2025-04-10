import { FaUsers } from 'react-icons/fa';
import { MdEventNote } from 'react-icons/md';
import { GiClubs } from 'react-icons/gi';
import DashboardButton from '@/app/components/DashboardButton';

export default function ClubLeaderDashboard() {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8 text-gray-800">Tableau de bord club leader</h1>

        <div className="grid grid-cols-3 gap-6 max-w-4xl mx-auto">
            <DashboardButton 
                title="Utilisateurs"
                href="/clubleader/users"
                icon={FaUsers}
                description="Afficher les membres du club"
            />
            <DashboardButton 
                title="Événements"
                href="/clubleader/events"
                icon={MdEventNote}
                description="Gérez les événements du club"
            />
        </div>
        </div>
        </div>
    );
}