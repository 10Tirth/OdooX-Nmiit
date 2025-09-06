'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SearchBar } from '../../../components/explore/SearchBar';
import { ProductGrid } from '../../../components/explore/ProductGrid';
import { FilterBar } from '../../../components/explore/FilterBar';
import { SortMenu } from '../../../components/explore/SortMenu';
import { Breadcrumbs } from '../../../components/explore/Breadcrumbs';

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  hero_image: string;
  subcategories: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
}

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

interface Facets {
  brands: Array<{ name: string; count: number }>;
  conditions: Array<{ value: string; label: string; count: number }>;
  eco_ratings: Array<{ value: number; label: string; count: number }>;
}

interface CategoryPageProps {
  category: Category;
}

export default function CategoryPage({ category }: CategoryPageProps) {
  // Safety check for undefined category
  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Category Not Found</h1>
          <p className="text-gray-600">The requested category could not be found.</p>
        </div>
      </div>
    );
  }

  const [products, setProducts] = useState<Product[]>([]);
  const [facets, setFacets] = useState<Facets | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: category.id,
    subcategory: '',
    min_price: '',
    max_price: '',
    condition: '',
    brand: '',
    eco_rating_min: '',
    clearance: false
  });
  const [sort, setSort] = useState('newest');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  // Fetch products
  const fetchProducts = async (pageNum = 1, reset = false) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: pageNum.toString(),
        limit: '20',
        sort,
        category: category.id
      });

      if (searchQuery) params.append('q', searchQuery);
      if (filters.subcategory) params.append('subcategory', filters.subcategory);
      if (filters.min_price) params.append('min_price', filters.min_price);
      if (filters.max_price) params.append('max_price', filters.max_price);
      if (filters.condition) params.append('condition', filters.condition);
      if (filters.brand) params.append('brand', filters.brand);
      if (filters.eco_rating_min) params.append('eco_rating_min', filters.eco_rating_min);
      if (filters.clearance) params.append('clearance', 'true');

      const response = await fetch(`/api/products?${params}`);
      const data = await response.json();
      
      if (reset) {
        setProducts(data.results);
      } else {
        setProducts(prev => [...prev, ...data.results]);
      }
      setFacets(data.facets);
      setTotal(data.total);
      setPage(pageNum);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(1, true);
  }, [searchQuery, filters, sort]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (newFilters: Partial<typeof filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleSortChange = (newSort: string) => {
    setSort(newSort);
  };

  const loadMore = () => {
    fetchProducts(page + 1, false);
  };

  const breadcrumbItems = [
    { name: 'Explore', href: '/explore' },
    { name: category.name, href: `/category/${category.slug}` }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-64 md:h-80 bg-gray-900">
        <Image
          src={category.hero_image}
          alt={category.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div>
            <Breadcrumbs items={breadcrumbItems} />
            <h1 className="text-4xl md:text-5xl font-bold text-white mt-4">
              {category.name}
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mt-2 max-w-2xl">
              {category.description}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <SearchBar onSearch={handleSearch} />
          <div className="mt-4 flex flex-col sm:flex-row gap-4">
            {facets ? (
              <FilterBar
                filters={filters}
                facets={facets}
                onFilterChange={handleFilterChange}
              />
            ) : (
              <div className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white">
                <span className="text-sm text-gray-500">Loading filters...</span>
              </div>
            )}
            <SortMenu value={sort} onChange={handleSortChange} />
          </div>
        </div>

        {/* Subcategories */}
        {category?.subcategories?.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Shop by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {category.subcategories.map((subcategory) => (
                <Link
                  key={subcategory.id}
                  href={`/category/${category.slug}?subcategory=${subcategory.slug}`}
                  className="bg-white rounded-lg p-4 text-center hover:shadow-md transition-shadow"
                >
                  <h3 className="font-medium text-gray-900">{subcategory.name}</h3>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Products */}
        <ProductGrid
          products={products || []}
          loading={loading}
          onLoadMore={loadMore}
          hasMore={(products?.length || 0) < total}
        />
      </div>
    </div>
  );
}
