'use client';

import Link from 'next/link';
import Image from 'next/image';
import { HeartIcon, ChatBubbleLeftRightIcon, EyeIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

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

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const handleMessageSeller = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // TODO: Implement message seller functionality
    console.log('Message seller:', product.seller.id);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // TODO: Implement quick view modal
    console.log('Quick view:', product.id);
  };

  const getStockMessage = () => {
    if (product.stock <= 0) return 'Out of stock';
    if (product.stock <= 3) return `Only ${product.stock} left — Limited stock`;
    return null;
  };

  const stockMessage = getStockMessage();
  const isOutOfStock = product.stock <= 0;

  return (
    <Link
      href={`/product/${product.id}`}
      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 relative"
      onMouseEnter={() => setShowQuickActions(true)}
      onMouseLeave={() => setShowQuickActions(false)}
    >
      {/* Image Container */}
      <div className="relative h-48 bg-gray-100">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-wrap gap-1">
          {product.badges.map((badge, index) => (
            <span
              key={index}
              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                badge === 'Most Loved' || badge === 'Trending Now'
                  ? 'bg-pink-100 text-pink-800'
                  : badge === 'Clearance'
                  ? 'bg-red-100 text-red-800'
                  : badge === 'Eco-Friendly' || badge === 'Sustainable'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {badge}
            </span>
          ))}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow"
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          {isWishlisted ? (
            <HeartSolidIcon className="h-5 w-5 text-red-500" />
          ) : (
            <HeartIcon className="h-5 w-5 text-gray-400 hover:text-red-500" />
          )}
        </button>

        {/* Quick Actions */}
        {showQuickActions && !isOutOfStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={handleQuickView}
              className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 flex items-center gap-2"
            >
              <EyeIcon className="h-4 w-4" />
              Quick View
            </button>
            <button
              onClick={handleMessageSeller}
              className="bg-emerald-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-600 flex items-center gap-2"
            >
              <ChatBubbleLeftRightIcon className="h-4 w-4" />
              Message Seller
            </button>
          </div>
        )}

        {/* Out of Stock Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="font-medium text-gray-900 text-sm mb-2 line-clamp-2">
          {product.title}
        </h3>

        {/* Price */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          {product.old_price && (
            <span className="text-sm text-gray-500 line-through">
              ${product.old_price.toFixed(2)}
            </span>
          )}
        </div>

        {/* Seller Info */}
        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
          <span>by {product.seller.name}</span>
          <div className="flex items-center gap-1">
            <span className="text-yellow-400">★</span>
            <span>{product.rating.toFixed(1)}</span>
          </div>
        </div>

        {/* Stock Message */}
        {stockMessage && (
          <div className={`text-xs font-medium ${
            isOutOfStock ? 'text-red-600' : 'text-orange-600'
          }`}>
            {stockMessage}
          </div>
        )}

        {/* Eco Rating */}
        <div className="flex items-center gap-1 mt-2">
          <span className="text-xs text-gray-500">Eco Rating:</span>
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={`text-xs ${
                  i < product.eco_rating ? 'text-green-500' : 'text-gray-300'
                }`}
              >
                ★
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
