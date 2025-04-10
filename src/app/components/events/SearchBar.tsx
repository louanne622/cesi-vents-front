import React from 'react';
import { FaSearch, FaFilter } from 'react-icons/fa';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  showFilterButton?: boolean;
  onFilterClick?: () => void;
}

export default function SearchBar({ 
  value, 
  onChange, 
  placeholder = "Rechercher...",
  showFilterButton = true,
  onFilterClick
}: SearchBarProps) {
  return (
    <div className="flex items-center gap-2 bg-white rounded-xl shadow-md p-3">
      <div className="relative flex-grow">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FaSearch className="h-4 w-4 text-gray-400" />
        </div>
        <input 
          type="text" 
          placeholder={placeholder}
          className="pl-9 pr-3 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fbe216] focus:border-transparent transition-all text-gray-700 text-sm"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
      {showFilterButton && (
        <button 
          className="bg-[#fbe216] hover:bg-[#e6cf14] transition-colors p-2 rounded-lg"
          onClick={onFilterClick}
        >
          <FaFilter className="h-5 w-5 text-gray-700" />
        </button>
      )}
    </div>
  );
} 