import { Metadata } from 'next';
import LandingPage from './LandingPage';

export const metadata: Metadata = {
  title: 'EcoFinds — Style that lives twice.',
  description: 'Discover eco-friendly fashion, home décor, and collectibles — without the luxury price tag.',
  keywords: ['sustainable fashion', 'eco-friendly', 'secondhand', 'vintage', 'circular economy'],
  authors: [{ name: 'EcoFinds' }],
  openGraph: {
    title: 'EcoFinds — Style that lives twice.',
    description: 'Discover eco-friendly fashion, home décor, and collectibles — without the luxury price tag.',
    url: 'https://ecofinds.com',
    siteName: 'EcoFinds',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=630&q=80',
        width: 1200,
        height: 630,
        alt: 'EcoFinds - Sustainable lifestyle marketplace',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EcoFinds — Style that lives twice.',
    description: 'Discover eco-friendly fashion, home décor, and collectibles — without the luxury price tag.',
    images: ['/images/hero-lifestyle.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Home() {
  return <LandingPage />;
}
