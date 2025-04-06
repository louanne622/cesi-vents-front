import React from 'react';

interface FilterBarProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function FilterBar({ categories, selectedCategory, onCategoryChange }: FilterBarProps) {
  return (
    <div className="mt-3 flex overflow-x-auto pb-2 no-scrollbar">
      <div className="flex gap-2">
        {categories.map((category) => (
          <button 
            key={category}
            className={`whitespace-nowrap px-3 py-1.5 ${
              selectedCategory === category 
                ? 'bg-[#fbe216] text-gray-800' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            } rounded-full text-sm font-medium`}
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
} 