'use client';

import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface NoResultsProps {
  query?: string;
  onClearFilters?: () => void;
}

export function NoResults({ query, onClearFilters }: NoResultsProps) {
  return (
    <div className="text-center py-12">
      <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
        <MagnifyingGlassIcon className="h-full w-full" />
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {query ? `No results for "${query}"` : 'No items found'}
      </h3>
      
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        {query 
          ? 'Try adjusting your search terms or filters to find what you\'re looking for.'
          : 'Try clearing some filters or check other categories to find what you\'re looking for.'
        }
      </p>
      
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        {onClearFilters && (
          <button
            onClick={onClearFilters}
            className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 text-gray-700 font-medium transition-colors"
          >
            <XMarkIcon className="h-4 w-4" />
            Clear Filters
          </button>
        )}
        
        <Link
          href="/explore"
          className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 font-medium transition-colors"
        >
          <MagnifyingGlassIcon className="h-4 w-4" />
          Browse All Items
        </Link>
      </div>
      
      <div className="mt-8">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Popular Categories</h4>
        <div className="flex flex-wrap justify-center gap-2">
          {['Clothing', 'Home & Décor', 'Collectibles', 'Riding Gear'].map((category) => (
            <Link
              key={category}
              href={`/category/${category.toLowerCase().replace(' & ', '-').replace(' ', '-')}`}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
            >
              {category}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
