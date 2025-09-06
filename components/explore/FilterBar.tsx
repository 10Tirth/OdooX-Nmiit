'use client';

import { useState } from 'react';
import { FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface Facets {
  brands: Array<{ name: string; count: number }>;
  conditions: Array<{ value: string; label: string; count: number }>;
  eco_ratings: Array<{ value: number; label: string; count: number }>;
}

interface Filters {
  category: string;
  subcategory: string;
  min_price: string;
  max_price: string;
  condition: string;
  brand: string;
  eco_rating_min: string;
  clearance: boolean;
}

interface FilterBarProps {
  filters: Filters;
  facets: Facets | null;
  onFilterChange: (filters: Partial<Filters>) => void;
}

export function FilterBar({ filters, facets, onFilterChange }: FilterBarProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Safety check for facets
  if (!facets) {
    return (
      <div className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white">
        <span className="text-sm text-gray-500">Loading filters...</span>
      </div>
    );
  }

  const handlePriceChange = (field: 'min_price' | 'max_price', value: string) => {
    onFilterChange({ [field]: value });
  };

  const handleConditionChange = (condition: string) => {
    onFilterChange({ condition: condition === filters.condition ? '' : condition });
  };

  const handleBrandChange = (brand: string) => {
    onFilterChange({ brand: brand === filters.brand ? '' : brand });
  };

  const handleEcoRatingChange = (rating: number) => {
    onFilterChange({ eco_rating_min: rating.toString() === filters.eco_rating_min ? '' : rating.toString() });
  };

  const handleClearanceChange = (checked: boolean) => {
    onFilterChange({ clearance: checked });
  };

  const clearAllFilters = () => {
    onFilterChange({
      subcategory: '',
      min_price: '',
      max_price: '',
      condition: '',
      brand: '',
      eco_rating_min: '',
      clearance: false
    });
  };

  const hasActiveFilters = Object.values(filters).some(value => 
    value !== '' && value !== false && value !== filters.category
  );

  const FilterPanel = () => (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price Range
          </label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Min Price</label>
              <input
                type="number"
                value={filters.min_price}
                onChange={(e) => handlePriceChange('min_price', e.target.value)}
                placeholder="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Max Price</label>
              <input
                type="number"
                value={filters.max_price}
                onChange={(e) => handlePriceChange('max_price', e.target.value)}
                placeholder="1000"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Condition */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Condition
          </label>
          <div className="space-y-2">
            {facets?.conditions?.map((condition) => (
              <label key={condition.value} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.condition === condition.value}
                  onChange={() => handleConditionChange(condition.value)}
                  className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">
                  {condition.label} ({condition.count})
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Eco Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Eco Rating
          </label>
          <div className="space-y-2">
            {facets?.eco_ratings?.map((rating) => (
              <label key={rating.value} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.eco_rating_min === rating.value.toString()}
                  onChange={() => handleEcoRatingChange(rating.value)}
                  className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">
                  {rating.label} ({rating.count})
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Brand */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Brand
          </label>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {facets?.brands?.map((brand) => (
              <label key={brand.name} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.brand === brand.name}
                  onChange={() => handleBrandChange(brand.name)}
                  className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">
                  {brand.name} ({brand.count})
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Clearance */}
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.clearance}
              onChange={(e) => handleClearanceChange(e.target.checked)}
              className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm font-medium text-gray-700">
              Clearance Items
            </span>
          </label>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative">
      {/* Mobile Filter Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50"
      >
        <FunnelIcon className="h-5 w-5" />
        <span>Filters</span>
        {hasActiveFilters && (
          <span className="bg-emerald-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {Object.values(filters).filter(v => v !== '' && v !== false && v !== filters.category).length}
          </span>
        )}
      </button>

      {/* Desktop Filter Panel */}
      <div className="hidden lg:block">
        <FilterPanel />
      </div>

      {/* Mobile Filter Drawer */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsOpen(false)} />
          <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="p-4">
              <FilterPanel />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
