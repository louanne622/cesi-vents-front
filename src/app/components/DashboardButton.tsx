import { IconType } from 'react-icons';
import Link from 'next/link';

interface DashboardButtonProps {
    title: string;
    description: string;
    href: string;
    icon: IconType;
}

const DashboardButton = ({ title, description, href, icon: Icon }: DashboardButtonProps) => {
    return (
        <Link 
            href={href}
            className="group aspect-square bg-white rounded-xl border border-gray-200 
                     hover:border-[#fbe216] flex flex-col"
        >
            {/* Icon Header */}
            <div className="flex-1 flex items-center justify-center p-4">
                <div className="p-4 bg-gray-50 rounded-full group-hover:bg-[#fbe216]/10 transition-colors duration-300">
                    <Icon className="w-12 h-12 text-gray-600 group-hover:text-[#fbe216]" />
                </div>
            </div>

            {/* Content */}
            <div className="p-4 text-center border-t border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-[#fbe216]">
                    {title}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2">
                    {description}
                </p>
            </div>
        </Link>
    );
};

export default DashboardButton; 