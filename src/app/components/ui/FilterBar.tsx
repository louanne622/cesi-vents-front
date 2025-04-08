import React from 'react';
import { FaSearch, FaFilter } from 'react-icons/fa';

interface FilterBarProps {
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
  categories?: string[];
  selectedCategory?: string;
  onCategoryChange?: (category: string) => void;
  filters?: {
    label: string;
    value: string;
    options: { value: string; label: string }[];
    onChange: (value: string) => void;
  }[];
}

const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery = '',
  onSearchChange,
  categories = [],
  selectedCategory = 'Tous',
  onCategoryChange,
  filters = [],
}) => {
  // Version mobile avec catégories
  if (categories && selectedCategory && onCategoryChange) {
    return (
      <div className="overflow-x-auto whitespace-nowrap py-2">
        <div className="flex gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-[#fbe216] text-black'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Version avec barre de recherche et filtres
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Barre de recherche */}
        {searchQuery !== undefined && onSearchChange && (
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fbe216] focus:border-transparent"
            />
          </div>
        )}

        {/* Filtres */}
        {filters?.map((filter, index) => (
          <div key={index} className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaFilter className="h-5 w-5 text-gray-400" />
            </div>
            <select
              value={filter.value}
              onChange={(e) => filter.onChange(e.target.value)}
              className="pl-10 pr-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fbe216] focus:border-transparent"
            >
              <option value="all">{filter.label}</option>
              {filter.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterBar; 