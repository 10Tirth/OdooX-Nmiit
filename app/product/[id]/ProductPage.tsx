'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HeartIcon, ChatBubbleLeftRightIcon, StarIcon, TruckIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { Breadcrumbs } from '../../../components/explore/Breadcrumbs';

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

interface ProductPageProps {
  product: Product;
}

export default function ProductPage({ product }: ProductPageProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [quantity, setQuantity] = useState(1);

  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted);
  };

  const handleMessageSeller = () => {
    // TODO: Implement message seller functionality
    console.log('Message seller:', product.seller.id);
  };

  const handleAddToCart = () => {
    // TODO: Implement add to cart functionality
    console.log('Add to cart:', product.id, quantity);
  };

  const getStockMessage = () => {
    if (product.stock <= 0) return 'Out of stock';
    if (product.stock <= 3) return `Only ${product.stock} left — Limited stock`;
    return `${product.stock} available`;
  };

  const breadcrumbItems = [
    { name: 'Explore', href: '/explore' },
    { name: product.category, href: `/category/${product.category}` },
    { name: product.title, href: `/product/${product.id}` }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumbs items={breadcrumbItems} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
              <Image
                src={selectedImage}
                alt={product.title}
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Image Thumbnails */}
            <div className="grid grid-cols-4 gap-2">
              {[product.image, product.image, product.image, product.image].map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(img)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 ${
                    selectedImage === img ? 'border-emerald-500' : 'border-gray-200'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.title} ${index + 1}`}
                    width={150}
                    height={150}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Title and Badges */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.title}
              </h1>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {product.badges.map((badge, index) => (
                  <span
                    key={index}
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
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
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
              {product.old_price && (
                <span className="text-xl text-gray-500 line-through">
                  ${product.old_price.toFixed(2)}
                </span>
              )}
              {product.old_price && (
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium">
                  {Math.round((1 - product.price / product.old_price) * 100)}% OFF
                </span>
              )}
            </div>

            {/* Rating and Reviews */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-600">
                  {product.rating.toFixed(1)} ({product.seller.rating} seller rating)
                </span>
              </div>
            </div>

            {/* Stock Status */}
            <div className="text-sm">
              <span className={`font-medium ${
                product.stock <= 0 ? 'text-red-600' : 
                product.stock <= 3 ? 'text-orange-600' : 'text-green-600'
              }`}>
                {getStockMessage()}
              </span>
            </div>

            {/* Product Details */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Condition:</span>
                  <span className="ml-2 text-gray-900 capitalize">{product.condition}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Brand:</span>
                  <span className="ml-2 text-gray-900">{product.brand}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Eco Rating:</span>
                  <div className="inline-flex ml-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`h-4 w-4 ${
                          i < product.eco_rating ? 'text-green-500 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Seller:</span>
                  <span className="ml-2 text-gray-900">{product.seller.name}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600">{product.description}</p>
            </div>

            {/* Tags */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  {Array.from({ length: Math.min(product.stock, 10) }, (_, i) => i + 1).map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock <= 0}
                  className="flex-1 bg-emerald-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-emerald-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  {product.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
                
                <button
                  onClick={handleWishlistToggle}
                  className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  {isWishlisted ? (
                    <HeartSolidIcon className="h-6 w-6 text-red-500" />
                  ) : (
                    <HeartIcon className="h-6 w-6 text-gray-400" />
                  )}
                </button>
                
                <button
                  onClick={handleMessageSeller}
                  className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  aria-label="Message seller"
                >
                  <ChatBubbleLeftRightIcon className="h-6 w-6 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Shipping and Return Info */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <TruckIcon className="h-5 w-5" />
                <span>Free shipping on orders over $50</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <ShieldCheckIcon className="h-5 w-5" />
                <span>Not as described? Start a return within 30 days</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
