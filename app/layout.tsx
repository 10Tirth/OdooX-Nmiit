import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s | EcoFinds',
    default: 'EcoFinds — Style that lives twice.',
  },
  description: 'Discover eco-friendly fashion, home décor, and collectibles — without the luxury price tag.',
  keywords: ['sustainable fashion', 'eco-friendly', 'secondhand', 'vintage', 'circular economy', 'marketplace'],
  authors: [{ name: 'EcoFinds', url: 'https://ecofinds.com' }],
  creator: 'EcoFinds',
  publisher: 'EcoFinds',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://ecofinds.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ecofinds.com',
    siteName: 'EcoFinds',
    title: 'EcoFinds — Style that lives twice.',
    description: 'Discover eco-friendly fashion, home décor, and collectibles — without the luxury price tag.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=630&q=80',
        width: 1200,
        height: 630,
        alt: 'EcoFinds - Sustainable lifestyle marketplace',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EcoFinds — Style that lives twice.',
    description: 'Discover eco-friendly fashion, home décor, and collectibles — without the luxury price tag.',
    images: ['/images/hero-lifestyle.jpg'],
    creator: '@EcoFinds',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'EcoFinds',
              url: 'https://ecofinds.com',
              logo: 'https://ecofinds.com/images/logo.svg',
              description: 'Sustainable lifestyle marketplace for eco-friendly fashion, home décor, and collectibles',
              foundingDate: '2024',
              founders: [
                {
                  '@type': 'Person',
                  name: 'EcoFinds Team',
                },
              ],
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'US',
              },
              sameAs: [
                'https://twitter.com/EcoFinds',
                'https://instagram.com/EcoFinds',
                'https://facebook.com/EcoFinds',
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebPage',
              name: 'EcoFinds — Style that lives twice.',
              description: 'Discover eco-friendly fashion, home décor, and collectibles — without the luxury price tag.',
              url: 'https://ecofinds.com',
              mainEntity: {
                '@type': 'WebSite',
                name: 'EcoFinds',
                url: 'https://ecofinds.com',
                potentialAction: {
                  '@type': 'SearchAction',
                  target: 'https://ecofinds.com/search?q={search_term_string}',
                  'query-input': 'required name=search_term_string',
                },
              },
            }),
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
