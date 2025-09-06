'use client';

import Image from 'next/image';
import Link from 'next/link';
type ProductCardProps = {
  id: string | number;
  title: string;
  price: number;
  oldPrice?: number;
  imageUrl: string;
  badges: string[];
  seller: {
    id: string | number;
    name: string;
    rating?: number;
  };
};

export default function ProductCard({
  id,
  title,
  price,
  oldPrice,
  imageUrl,
  badges,
  seller
}: ProductCardProps) {
  const discountPercentage = oldPrice ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;

  return (
    <Link 
      href={`/product/${id}`} 
      className="product-card block group h-full"
      prefetch={false}
    >
      <div className="relative aspect-square overflow-hidden rounded-lg mb-4">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 300px"
          loading="lazy"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        />
        
        {/* Badges */}
        {badges.length > 0 && (
          <div className="absolute top-2 left-2 space-y-1">
            {badges.map((badge, index) => (
              <span
                key={index}
                className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                  badge === 'Most Loved' 
                    ? 'bg-red-100 text-red-800' 
                    : badge === 'Trending Now'
                    ? 'bg-purple-100 text-purple-800'
                    : 'bg-green-100 text-green-800'
                }`}
              >
                {badge}
              </span>
            ))}
          </div>
        )}

        {/* Discount percentage */}
        {discountPercentage > 0 && (
          <div className="absolute top-2 right-2">
            <span className="bg-[#FFB300] text-white px-2 py-1 text-xs font-bold rounded-full">
              -{discountPercentage}%
            </span>
          </div>
        )}

        {/* Hover overlay with quick actions */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 opacity-0 group-hover:opacity-100 flex items-center justify-center space-x-3">
          <button 
            className="bg-white rounded-full p-2 shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
            onClick={(e) => {
              e.preventDefault();
              // Add to wishlist functionality
              console.log('Add to wishlist:', id);
            }}
            aria-label="Add to wishlist"
          >
            <svg className="w-5 h-5 text-[#111827]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
          <button 
            className="bg-white rounded-full p-2 shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
            style={{ transitionDelay: '100ms' }}
            onClick={(e) => {
              e.preventDefault();
              // Message seller functionality
              console.log('Message seller:', seller.id);
            }}
            aria-label="Message seller"
          >
            <svg className="w-5 h-5 text-[#111827]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {/* Title */}
        <h3 className="font-medium text-[#111827] line-clamp-2 group-hover:text-[#0F9D58] transition-colors">
          {title}
        </h3>

        {/* Price */}
        <div className="flex items-center space-x-2">
          <span className="text-lg font-bold text-[#111827]">
            ${price.toFixed(2)}
          </span>
          {oldPrice && (
            <span className="text-sm text-[#6B7280] line-through">
              ${oldPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Seller */}
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-[#0F9D58] rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-medium">
              {seller.name.charAt(0)}
            </span>
          </div>
          <span className="text-sm text-[#6B7280]">{seller.name}</span>
          <div className="flex items-center space-x-1">
            <svg className="w-4 h-4 text-[#FFB300] fill-current" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <span className="text-sm text-[#6B7280]">{seller.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
