import RequireClubLeader from "../components/auth/RequireClubLeader";

export default function ClubLeaderLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <RequireClubLeader>
        <div className="min-h-screen bg-white">
            <div className="bg-white border-b border-gray-200">
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                        Représentant du club
                    </h1>
                </div>
            </div>
            {children}
        </div>
        </RequireClubLeader>
    );
} 