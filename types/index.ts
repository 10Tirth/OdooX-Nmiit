// Product Types
export interface Product {
  id: string;
  title: string;
  price: number;
  old_price?: number;
  image_url: string;
  badges: string[];
  rating: number;
  seller: {
    id: string;
    name: string;
    rating: number;
  };
}

export interface ProductCard {
  id: string;
  title: string;
  price: number;
  oldPrice?: number;
  imageUrl: string;
  badges: string[];
  seller: {
    id: string;
    name: string;
    rating: number;
  };
}

// Brand Types
export interface ClearanceBrand {
  id: string;
  name: string;
  logo_url: string;
  sample_product_id: string;
}

// Site Statistics
export interface SiteStats {
  items_sold: number;
  avg_rating: number;
  active_sellers: number;
}

// API Response Types
export interface FeaturedProductsResponse {
  products: Product[];
}

export interface ClearanceBrandsResponse {
  brands: ClearanceBrand[];
}

export interface SiteStatsResponse extends SiteStats {}

export interface NewsletterRequest {
  email: string;
  source: string;
}

export interface NewsletterResponse {
  success: boolean;
  message: string;
}

// Analytics Event Types
export interface AnalyticsEvent {
  name: string;
  payload: Record<string, any>;
}

export type EventName = 
  | 'view_landing'
  | 'click_hero_shop'
  | 'click_hero_sell'
  | 'signup_newsletter'
  | 'view_featured_product'
  | 'click_clearance_brand';

// Component Props Types
export interface HeroProps {
  headline: string;
  subline: string;
  ctaPrimary: string;
  ctaSecondary: string;
  heroImageSrc: string;
}

export interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  oldPrice?: number;
  imageUrl: string;
  badges: string[];
  seller: {
    id: string;
    name: string;
    rating: number;
  };
}

export interface ClearanceCarouselProps {
  brands: ClearanceBrand[];
}

export interface JoinMovementProps {
  bullets: string[];
  ctaText: string;
}
