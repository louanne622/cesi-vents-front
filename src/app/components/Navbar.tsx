"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaUsers, FaCalendarAlt, FaUser } from "react-icons/fa";

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
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="max-w-7xl mx-auto">
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
      </div>
    </nav>
  );
};

export default Navbar;
