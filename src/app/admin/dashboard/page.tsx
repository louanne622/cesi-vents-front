import { FaUsers } from 'react-icons/fa';
import { MdEventNote } from 'react-icons/md';
import { GiClubs } from 'react-icons/gi';
import { FaMoneyBillWave } from 'react-icons/fa';
import { FaTicketAlt } from 'react-icons/fa';
import DashboardButton from '@/app/components/DashboardButton';

export default function AdminDashboard() {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8 text-gray-800">Tableau de bord administrateur</h1>

        <div className="grid grid-cols-3 gap-6 max-w-4xl mx-auto">
            <DashboardButton 
                title="Utilisateurs"
                href="/admin/users"
                icon={FaUsers}
                description="Gérez les comptes et les permissions"
            />
            <DashboardButton 
                title="Événements"
                href="/admin/events"
                icon={MdEventNote}
                description="Gérez les événements et les inscriptions"
            />
            <DashboardButton 
                title="Clubs"
                href="/admin/clubs"
                icon={GiClubs}
                description="Administrez les clubs et activités"
            />
            <DashboardButton 
                title="Finances"
                href="/admin/finances"
                icon={FaMoneyBillWave}
                description="Suivez les transactions et retrouvez toutes les données"
            />
            <DashboardButton 
                title="Coupons"
                href="/admin/coupons"
                icon={FaTicketAlt}
                description="Gérez les codes promo et réductions"
            />
        </div>
        </div>
        </div>
    );
}