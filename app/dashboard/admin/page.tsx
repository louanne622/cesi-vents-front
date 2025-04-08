import DashboardButton from '@/components/ui/DashboardButton';
import { FaUsers } from 'react-icons/fa';
import { MdEventNote } from 'react-icons/md';
import { GiClubs } from 'react-icons/gi';
import { FaMoneyBillWave } from 'react-icons/fa';

export default function AdminDashboard() {
    return (
        <div className="min-h-screen bg-white">
            {/* Header Section */}
            <div className="bg-white border-b border-gray-200">
                <div className="container mx-auto px-6 py-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                        Administration
                    </h1>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-6 py-8">
                {/* Actions Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                    <DashboardButton 
                        title="Utilisateurs"
                        description="Gérez les comptes et les permissions"
                        href="/admin/users"
                        icon={FaUsers}
                    />
                    <DashboardButton 
                        title="Événements"
                        description="Gérez les événements et inscriptions"
                        href="/admin/events"
                        icon={MdEventNote}
                    />
                    <DashboardButton 
                        title="Clubs"
                        description="Administrez les clubs et activités"
                        href="/admin/clubs"
                        icon={GiClubs}
                    />
                    <DashboardButton 
                        title="Finances"
                        description="Suivez les transactions"
                        href="/admin/finances"
                        icon={FaMoneyBillWave}
                    />
                </div>
            </div>
        </div>
    );
} 