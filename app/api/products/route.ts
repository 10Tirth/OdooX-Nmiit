import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '../../../lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const subcategory = searchParams.get('subcategory');
    const q = searchParams.get('q');
    const min_price = searchParams.get('min_price');
    const max_price = searchParams.get('max_price');
    const condition = searchParams.get('condition');
    const brand = searchParams.get('brand');
    const eco_rating_min = searchParams.get('eco_rating_min');
    const clearance = searchParams.get('clearance');
    const sort = searchParams.get('sort') || 'newest';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    // For now, we'll use the seed data since we don't have a real database
    const seedData = await import('../../data/explore-seed.json');
    let products = [...seedData.products];

    // Apply filters
    if (category) {
      products = products.filter(p => p.category === category);
    }
    if (subcategory) {
      products = products.filter(p => p.subcategory === subcategory);
    }
    if (q) {
      const query = q.toLowerCase();
      products = products.filter(p => 
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    if (min_price) {
      products = products.filter(p => p.price >= parseFloat(min_price));
    }
    if (max_price) {
      products = products.filter(p => p.price <= parseFloat(max_price));
    }
    if (condition) {
      products = products.filter(p => p.condition === condition);
    }
    if (brand) {
      products = products.filter(p => p.brand === brand);
    }
    if (eco_rating_min) {
      products = products.filter(p => p.eco_rating >= parseInt(eco_rating_min));
    }
    if (clearance === 'true') {
      products = products.filter(p => p.badges.includes('Clearance'));
    }

    // Apply sorting
    switch (sort) {
      case 'newest':
        products.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      case 'price_asc':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        products.sort((a, b) => b.rating - a.rating);
        break;
      case 'most_loved':
        products.sort((a, b) => {
          const aLoved = a.badges.includes('Most Loved') ? 1 : 0;
          const bLoved = b.badges.includes('Most Loved') ? 1 : 0;
          return bLoved - aLoved;
        });
        break;
      default:
        products.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }

    // Apply pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = products.slice(startIndex, endIndex);

    // Calculate facets
    const facets = {
      brands: seedData.brands,
      conditions: seedData.conditions,
      eco_ratings: seedData.eco_ratings
    };

    return NextResponse.json({
      results: paginatedProducts,
      facets,
      total: products.length,
      page,
      limit,
      totalPages: Math.ceil(products.length / limit)
    });

  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
