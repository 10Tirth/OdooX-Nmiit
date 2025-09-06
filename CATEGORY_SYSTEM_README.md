# EcoFinds Category Page System

## Overview

This document describes the complete Category page system implemented for EcoFinds, a sustainable marketplace for pre-loved items. The system includes both design specifications and a production-ready Next.js implementation.

## Features Implemented

### ✅ Core Features
- **Category Browsing**: Browse products by category and subcategory
- **Search Functionality**: Search within categories with typeahead suggestions
- **Advanced Filtering**: Filter by price, condition, eco-rating, brand, and clearance status
- **Sorting Options**: Sort by newest, price (low to high/high to low), rating, and most loved
- **Responsive Design**: Mobile-first design with tablet and desktop breakpoints
- **Product Cards**: Interactive product cards with quick actions
- **Infinite Scroll**: Load more products seamlessly
- **SEO Optimization**: Server-side rendering with proper meta tags

### ✅ Pages & Routes
- `/explore` - Main explore page with category overview
- `/category/[slug]` - Individual category pages
- `/product/[id]` - Product detail pages

### ✅ Components
- `SearchBar` - Search with typeahead suggestions
- `CategoryGrid` - Category overview grid
- `ProductGrid` - Product listing with infinite scroll
- `ProductCard` - Individual product cards
- `FilterBar` - Advanced filtering interface
- `SortMenu` - Sorting options
- `Breadcrumbs` - Navigation breadcrumbs
- `NoResults` - Empty state handling

## Design System

### Color Tokens
- **Primary Green**: `#10B981` (emerald-500)
- **Secondary Blue**: `#3B82F6` (blue-500)
- **Neutral 900**: `#111827` (gray-900)
- **Neutral 700**: `#374151` (gray-700)
- **Neutral 500**: `#6B7280` (gray-500)

### Typography Scale
- **H1**: `text-4xl font-bold` (36px)
- **H2**: `text-3xl font-semibold` (28px)
- **H3**: `text-xl font-semibold` (22px)
- **Body**: `text-base` (16px)
- **Small**: `text-sm` (14px)

### Spacing Scale
- **xs**: `4px` (1 unit)
- **sm**: `8px` (2 units)
- **md**: `12px` (3 units)
- **lg**: `16px` (4 units)
- **xl**: `24px` (6 units)
- **2xl**: `32px` (8 units)

## API Endpoints

### GET /api/products
Query products with filters and pagination.

**Query Parameters:**
- `category` - Filter by category
- `subcategory` - Filter by subcategory
- `q` - Search query
- `min_price` - Minimum price
- `max_price` - Maximum price
- `condition` - Product condition
- `brand` - Brand filter
- `eco_rating_min` - Minimum eco rating
- `clearance` - Clearance items only
- `sort` - Sort order (newest, price_asc, price_desc, rating, most_loved)
- `page` - Page number
- `limit` - Items per page

**Response:**
```json
{
  "results": [...],
  "facets": {
    "brands": [...],
    "conditions": [...],
    "eco_ratings": [...]
  },
  "total": 100,
  "page": 1,
  "limit": 20,
  "totalPages": 5
}
```

### GET /api/categories
Get all available categories.

**Response:**
```json
{
  "categories": [
    {
      "id": "clothing",
      "name": "Clothing",
      "slug": "clothing",
      "description": "Sustainable fashion for every style",
      "hero_image": "...",
      "subcategories": [...]
    }
  ]
}
```

## Data Structure

### Product Model
```typescript
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
```

### Category Model
```typescript
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
```

## Accessibility Features

### Keyboard Navigation
- All interactive elements are keyboard accessible
- Tab order is logical and intuitive
- Focus indicators are clearly visible

### Screen Reader Support
- Proper ARIA labels and roles
- Semantic HTML structure
- Alt text for all images

### Color Contrast
- All text meets WCAG AA contrast requirements (4.5:1)
- Interactive elements meet WCAG AA contrast requirements (3:1)

## Performance Optimizations

### Image Optimization
- Next.js Image component with lazy loading
- WebP format with fallbacks
- Responsive image sizing

### Caching Strategy
- Server-side rendering for SEO
- Client-side caching with React state
- API response caching

### Bundle Optimization
- Code splitting by route
- Dynamic imports for heavy components
- Tree shaking for unused code

## SEO Features

### Meta Tags
- Dynamic page titles
- Open Graph tags
- Twitter Card tags
- Meta descriptions

### Structured Data
- JSON-LD for product listings
- Breadcrumb structured data
- Product schema markup

### URL Structure
- Clean, SEO-friendly URLs
- Query parameters for filters
- Canonical URLs

## Mobile Responsiveness

### Breakpoints
- **Mobile**: 375px (1 column)
- **Tablet**: 768px (2 columns)
- **Desktop**: 1200px (4 columns)

### Mobile Features
- Touch-friendly interface
- Swipe gestures for filters
- Optimized image sizes
- Mobile-first CSS

## Testing

### Manual Testing Checklist
- [ ] Category pages load correctly
- [ ] Search functionality works
- [ ] Filters apply correctly
- [ ] Sorting works as expected
- [ ] Infinite scroll loads more products
- [ ] Product cards are interactive
- [ ] Mobile responsive design
- [ ] Accessibility features work
- [ ] SEO meta tags are present

### Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Deployment

### Environment Variables
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### Build Commands
```bash
npm run build
npm run start
```

### Vercel Deployment
The application is optimized for Vercel deployment with:
- Automatic builds on git push
- Edge functions for API routes
- Image optimization
- CDN distribution

## Future Enhancements

### Planned Features
- [ ] Advanced search with filters
- [ ] Product comparison
- [ ] Wishlist functionality
- [ ] Product reviews and ratings
- [ ] Seller profiles
- [ ] Chat functionality
- [ ] Push notifications
- [ ] Analytics integration

### Performance Improvements
- [ ] Redis caching
- [ ] Database query optimization
- [ ] Image CDN
- [ ] Service worker for offline support

## Support

For questions or issues with the category system, please refer to:
- Component documentation in `/components/explore/`
- API documentation in `/app/api/`
- Design system in `DESIGN_SYSTEM.md`

## License

This project is part of the EcoFinds marketplace and follows the same licensing terms.
