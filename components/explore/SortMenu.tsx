'use client';

import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

interface SortMenuProps {
  value: string;
  onChange: (value: string) => void;
}

const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'most_loved', label: 'Most Loved' },
];

export function SortMenu({ value, onChange }: SortMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = sortOptions.find(option => option.value === value) || sortOptions[0];

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="text-sm font-medium text-gray-700">Sort by:</span>
        <span className="text-sm text-gray-900">{selectedOption.label}</span>
        <ChevronDownIcon className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 top-full mt-1 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
            <div className="py-1" role="listbox">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 focus:bg-gray-50 focus:outline-none ${
                    option.value === value ? 'bg-emerald-50 text-emerald-700' : 'text-gray-700'
                  }`}
                  role="option"
                  aria-selected={option.value === value}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
