export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm animate-pulse">
      {/* Image Skeleton */}
      <div className="h-48 bg-gray-200" />
      
      {/* Content Skeleton */}
      <div className="p-4">
        {/* Title Skeleton */}
        <div className="h-4 bg-gray-200 rounded mb-2" />
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-4" />
        
        {/* Price Skeleton */}
        <div className="h-6 bg-gray-200 rounded w-1/2 mb-2" />
        
        {/* Seller Info Skeleton */}
        <div className="flex justify-between items-center mb-2">
          <div className="h-4 bg-gray-200 rounded w-1/3" />
          <div className="h-4 bg-gray-200 rounded w-12" />
        </div>
        
        {/* Eco Rating Skeleton */}
        <div className="flex items-center gap-1">
          <div className="h-3 bg-gray-200 rounded w-16" />
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-3 w-3 bg-gray-200 rounded" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
