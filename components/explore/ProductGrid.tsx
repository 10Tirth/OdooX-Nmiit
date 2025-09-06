'use client';

import { ProductCard } from './ProductCard';
import { ProductCardSkeleton } from './ProductCardSkeleton';
import { NoResults } from './NoResults';

interface Product {
  id: string;
  title: string;
  category: string;
  subcategory: string;
  image: string;
  price: number;
  old_price?: number;
  badges: string[];
  seller: {
    id: string;
    name: string;
    rating: number;
  };
  rating: number;
  stock: number;
  condition: string;
  eco_rating: number;
  brand: string;
  tags: string[];
  description: string;
  created_at: string;
}

interface ProductGridProps {
  products: Product[];
  loading: boolean;
  onLoadMore: () => void;
  hasMore: boolean;
}

export function ProductGrid({ products, loading, onLoadMore, hasMore }: ProductGridProps) {
  if (!loading && (!products || products.length === 0)) {
    return <NoResults />;
  }

  return (
    <div>
      {/* Results Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">
          {products && products.length > 0 ? `${products.length} products found` : 'Products'}
        </h2>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products && products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        
        {/* Loading Skeletons */}
        {loading && Array.from({ length: 8 }).map((_, index) => (
          <ProductCardSkeleton key={`skeleton-${index}`} />
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && !loading && (
        <div className="text-center mt-12">
          <button
            onClick={onLoadMore}
            className="bg-emerald-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-emerald-600 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors"
          >
            Load More Products
          </button>
        </div>
      )}

      {/* Loading More Indicator */}
      {loading && products && products.length > 0 && (
        <div className="text-center mt-8">
          <div className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Loading curated finds...
          </div>
        </div>
      )}
    </div>
  );
}
