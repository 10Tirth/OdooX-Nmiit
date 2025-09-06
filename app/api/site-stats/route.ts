import { NextResponse } from 'next/server';
import seedData from '../../../data/landing-seed.json';

type SiteStatsResponse = { [key: string]: any };

export async function GET() {
  try {
    const response: SiteStatsResponse = seedData.site_stats;
    
    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'public, max-age=900, stale-while-revalidate=1800',
      },
    });
  } catch (error) {
    console.error('Error fetching site stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch site statistics' },
      { status: 500 }
    );
  }
}
