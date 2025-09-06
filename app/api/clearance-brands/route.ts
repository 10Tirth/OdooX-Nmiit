import { NextResponse } from 'next/server';
import seedData from '../../../data/landing-seed.json';
import { ClearanceBrandsResponse } from '../../../types';

export async function GET() {
  try {
    const response: ClearanceBrandsResponse = {
      brands: seedData.clearance_brands
    };
    
    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'public, max-age=600, stale-while-revalidate=1200',
      },
    });
  } catch (error) {
    console.error('Error fetching clearance brands:', error);
    return NextResponse.json(
      { error: 'Failed to fetch clearance brands' },
      { status: 500 }
    );
  }
}
