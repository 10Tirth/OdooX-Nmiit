'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SearchBar } from '../../../components/explore/SearchBar';
import { CategoryGrid } from '../../../components/explore/CategoryGrid';
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

export default function ExplorePage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [facets, setFacets] = useState<Facets>({ brands: [], conditions: [], eco_ratings: [] });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: '',
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
  const [showCategories, setShowCategories] = useState(true);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        const data = await response.json();
        setCategories(data.categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  // Fetch products
  const fetchProducts = async (pageNum = 1, reset = false) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: pageNum.toString(),
        limit: '20',
        sort
      });

      if (searchQuery) params.append('q', searchQuery);
      if (filters.category) params.append('category', filters.category);
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
    setShowCategories(false);
  };

  const handleFilterChange = (newFilters: Partial<typeof filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setShowCategories(false);
  };

  const handleSortChange = (newSort: string) => {
    setSort(newSort);
    setShowCategories(false);
  };

  const loadMore = () => {
    fetchProducts(page + 1, false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Breadcrumbs items={[{ name: 'Explore', href: '/explore' }]} />
          <h1 className="text-4xl font-bold text-gray-900 mt-4">
            Explore Sustainable Finds
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            Discover pre-loved items that are good for you and the planet
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <SearchBar onSearch={handleSearch} />
          <div className="mt-4 flex flex-col sm:flex-row gap-4">
            <FilterBar
              filters={filters}
              facets={facets}
              onFilterChange={handleFilterChange}
            />
            <SortMenu value={sort} onChange={handleSortChange} />
          </div>
        </div>

        {/* Content */}
        {showCategories && !searchQuery ? (
          <CategoryGrid categories={categories} />
        ) : (
          <ProductGrid
            products={products}
            loading={loading}
            onLoadMore={loadMore}
            hasMore={products.length < total}
          />
        )}
      </div>
    </div>
  );
}
