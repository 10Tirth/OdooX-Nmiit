import { Metadata } from 'next';
import ExplorePage from './ExplorePage';

export const metadata: Metadata = {
  title: 'Explore • EcoFinds',
  description: 'Discover sustainable pre-loved items across all categories. Find clothing, home décor, collectibles, and more.',
  openGraph: {
    title: 'Explore • EcoFinds',
    description: 'Discover sustainable pre-loved items across all categories.',
    images: ['https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=630&fit=crop&crop=center'],
  },
};

export default function Explore() {
  return <ExplorePage />;
}
