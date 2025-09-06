import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductPage from './ProductPage';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = params;
  
  // Fetch product data
  const seedData = await import('../../../data/explore-seed.json');
  const product = seedData.products.find(p => p.id === id);
  
  if (!product) {
    return {
      title: 'Product Not Found • EcoFinds',
    };
  }

  return {
    title: `${product.title} • EcoFinds`,
    description: product.description,
    openGraph: {
      title: `${product.title} • EcoFinds`,
      description: product.description,
      images: [product.image],
    },
  };
}

export default async function Page({ params }: ProductPageProps) {
  const { id } = params;
  
  // Fetch product data
  const seedData = await import('../../../data/explore-seed.json');
  const product = seedData.products.find((p: any) => p.id === id);
  
  if (!product) {
    notFound();
  }

  return <ProductPage product={product} />;
}
