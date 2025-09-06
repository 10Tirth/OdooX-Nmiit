import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CategoryPage from './CategoryPage';

// Import the seed data
const seedData = require('../../../data/explore-seed.json');

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = params;
  
  // Fetch category data
  const category = seedData.categories.find(cat => cat.slug === slug);
  
  if (!category) {
    return {
      title: 'Category Not Found • EcoFinds',
    };
  }

  return {
    title: `${category.name} • EcoFinds`,
    description: category.description,
    openGraph: {
      title: `${category.name} • EcoFinds`,
      description: category.description,
      images: [category.hero_image],
    },
  };
}

export async function generateStaticParams() {
  return seedData.categories.map((category) => ({
    slug: category.slug,
  }));
}

export default function Page({ params }: CategoryPageProps) {
  const { slug } = params;
  
  // Debug logging
  console.log('=== DEBUG INFO ===');
  console.log('Looking for slug:', slug);
  console.log('Seed data exists:', !!seedData);
  console.log('Categories exist:', !!seedData?.categories);
  console.log('Categories length:', seedData?.categories?.length);
  console.log('Available categories:', seedData?.categories?.map(cat => cat.slug));
  
  // Safety check
  if (!seedData || !seedData.categories) {
    console.error('Seed data or categories not found');
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Data Error</h1>
          <p className="text-gray-600">Unable to load category data.</p>
        </div>
      </div>
    );
  }
  
  const category = seedData.categories.find((cat: any) => cat.slug === slug);
  console.log('Found category:', category);
  console.log('Category subcategories:', category?.subcategories);
  
  if (!category) {
    console.log('Category not found, calling notFound()');
    notFound();
  }

  return <CategoryPage category={category} />;
}
