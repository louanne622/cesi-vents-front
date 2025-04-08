export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-white">
            <div className="bg-white border-b border-gray-200">
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                        Administration
                    </h1>
                </div>
            </div>
            {children}
        </div>
    );
} 