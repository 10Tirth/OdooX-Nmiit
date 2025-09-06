import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const seedData = await import('../../data/explore-seed.json');
    
    return NextResponse.json({
      categories: seedData.categories
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}
