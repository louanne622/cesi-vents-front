"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaUsers, FaCalendarAlt, FaUser, FaBell, FaCog } from "react-icons/fa";
import Image from "next/image";

const Navbar = () => {
  const pathname = usePathname();

  const navItems = [
    {
      href: "/",
      label: "Accueil",
      icon: FaHome,
    },
    {
      href: "/clubs",
      label: "Clubs",
      icon: FaUsers,
    },
    {
      href: "/events",
      label: "Événements",
      icon: FaCalendarAlt,
    },
    {
      href: "/profile",
      label: "Profil",
      icon: FaUser,
    },
  ];

  return (
    <>
      {/* Version mobile nav */}
      <nav className="fixed md:hidden bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.href}
                href={item.href} 
                className={`flex flex-col items-center px-3 py-2 transition-colors duration-200
                  ${isActive 
                    ? 'text-[#fbe216]' 
                    : 'text-gray-600 hover:text-[#fbe216]'
                  }`}
              >
                <item.icon className="h-6 w-6" />
                <span className="text-xs mt-1">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Version desktop - Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-gray-200 z-50 flex-col">
        {/* Logo et titre - Modifié pour être plus grand et centré */}
        <div className="border-b border-gray-200 flex flex-col items-center">
          <Link href="/" className="flex flex-col items-center space-y-4">
            <Image
              src="/img/cesi4.png"
              alt="CESI Logo"
              width={100}
              height={100}
              className="object-contain"
              priority
            />
          </Link>
        </div>

        {/* Menu principal */}
        <div className="flex-1 py-8 px-4"> {/* Augmenté le padding vertical */}
          <div className="space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200
                    ${isActive 
                      ? 'text-[#fbe216]' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-[#fbe216]'
                    }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Actions secondaires */}
        <div className="p-4 border-t border-gray-200">
          <div className="space-y-2">
            <Link
              href="/settings"
              className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-[#fbe216] transition-colors duration-200"
            >
              <FaCog className="h-5 w-5" />
              <span className="font-medium">Paramètres</span>
            </Link>
          </div>
        </div>

        {/* Section connexion */}
        <div className="p-4 border-t border-gray-200">
          <Link
            href="/login"
            className="flex items-center justify-center space-x-2 px-4 py-3 bg-[#fbe216] text-gray-900 rounded-lg hover:bg-[#e6cf14] transition-colors duration-200"
          >
            <FaUser className="h-5 w-5" />
            <span className="font-medium">Connexion</span>
          </Link>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
