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
            className="group aspect-[5/1] bg-white rounded-lg border border-gray-200 
                     hover:border-[#fbe216] flex flex-row items-center"
        >
            {/* Icon */}
            <div className="flex items-center justify-center p-1.5 md:p-2">
                <div className="p-1.5 md:p-2 bg-gray-50 rounded-full group-hover:bg-[#fbe216]/10 transition-colors duration-300">
                    <Icon className="w-5 h-5 md:w-6 md:h-6 text-gray-600 group-hover:text-[#fbe216]" />
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-1.5 md:p-2 border-l border-gray-100">
                <h3 className="text-sm font-semibold text-gray-800 group-hover:text-[#fbe216]">
                    {title}
                </h3>
                <p className="text-xs text-gray-500 line-clamp-1">
                    {description}
                </p>
            </div>
        </Link>
    );
};

export default DashboardButton; 