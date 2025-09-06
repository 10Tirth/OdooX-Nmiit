import { NextRequest, NextResponse } from 'next/server';
import seedData from '../../../data/landing-seed.json';

type FeaturedProductsResponse = {
  products: Array<{
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
  }>;
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '8');
    const sort = searchParams.get('sort') || 'rating_desc';
    
    let products: any[] = [...seedData.featured_products];
    
    // Normalize product shape: ensure `title` exists (map `name` -> `title` if needed)
    products = products.map((p: any) => ({
      ...p,
      title: p.title ?? p.name ?? '',
    }));
    
    // Sort products based on the sort parameter
    if (sort === 'rating_desc') {
      products.sort((a, b) => b.rating - a.rating);
    } else if (sort === 'price_asc') {
      products.sort((a, b) => a.price - b.price);
    } else if (sort === 'price_desc') {
      products.sort((a, b) => b.price - a.price);
    }
    
    // Limit the results
    products = products.slice(0, limit);
    
    const response: FeaturedProductsResponse = {
      products
    };
    
    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'public, max-age=300, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch featured products' },
      { status: 500 }
    );
  }
}
