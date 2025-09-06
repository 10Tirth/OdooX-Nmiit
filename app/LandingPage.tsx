'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../components/Header';
import Hero from '../components/Hero';
import BrandStory from '../components/BrandStory';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';

// Simple components for sections not yet created
function ClearanceCarousel() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#111827] mb-4">
            Big brands. Small prices.
          </h2>
          <p className="text-lg text-[#6B7280] mb-8">
            Shop clearance items from top labels before they're gone forever.
          </p>
          <button className="btn-primary">
            Shop Clearance
          </button>
        </div>
        
        <div className="flex justify-center space-x-8 overflow-x-auto pb-4">
          {['Patagonia', 'West Elm', 'Everlane', 'CB2', 'Reformation', 'Anthropologie'].map((brand) => (
            <div key={brand} className="flex-shrink-0 bg-white rounded-lg p-4 shadow-md min-w-[120px] text-center">
              <div className="h-12 bg-gray-200 rounded mb-2 flex items-center justify-center">
                <span className="text-sm font-medium text-gray-600">{brand}</span>
              </div>
              <span className="text-xs text-gray-500">Up to 60% off</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function JoinMovement() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'landing_band' }),
      });
      
      const data = await response.json();
      setMessage(data.message);
      if (data.success) setEmail('');
    } catch (error) {
      setMessage('Failed to subscribe. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-r from-[#0F9D58] to-[#0d8a4d]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">
          Be part of the sustainable revolution.
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="text-white">
            <div className="text-2xl mb-2">🔔</div>
            <h3 className="font-semibold mb-2">Exclusive clearance alerts</h3>
          </div>
          <div className="text-white">
            <div className="text-2xl mb-2">♻️</div>
            <h3 className="font-semibold mb-2">Sustainability tips & upcycling guides</h3>
          </div>
          <div className="text-white">
            <div className="text-2xl mb-2">💰</div>
            <h3 className="font-semibold mb-2">Seller tools & low fees</h3>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
              required
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#FFB300] hover:bg-[#e6a000] text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Signing up...' : 'Sign Up & Save 10%'}
            </button>
          </div>
          {message && (
            <p className="mt-4 text-white text-sm">{message}</p>
          )}
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#111827] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-[#0F9D58] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <span className="font-bold text-xl">EcoFinds</span>
            </div>
            <p className="text-gray-400 text-sm">
              Style that lives twice. Sustainable, affordable, accessible.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/about" className="hover:text-white transition-colors">About</a></li>
              <li><a href="/careers" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="/press" className="hover:text-white transition-colors">Press</a></li>
              <li><a href="/blog" className="hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/help" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="/shipping" className="hover:text-white transition-colors">Shipping</a></li>
              <li><a href="/returns" className="hover:text-white transition-colors">Returns</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/privacy" className="hover:text-white transition-colors">Privacy</a></li>
              <li><a href="/terms" className="hover:text-white transition-colors">Terms</a></li>
              <li><a href="/cookies" className="hover:text-white transition-colors">Cookies</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 flex justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 EcoFinds. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <span className="text-xs text-gray-500">🔒 SSL Secured</span>
            <span className="text-xs text-gray-500">💳 Secure Payments</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function LandingPage() {
  const router = useRouter();
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Track page view
    console.log('Analytics: view_landing');
    
    // Fetch featured products
    fetch('/api/featured-products?limit=8&sort=rating_desc')
      .then(res => res.json())
      .then(data => {
        setFeaturedProducts(data.products || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Failed to fetch featured products:', error);
        setError("We're loading popular finds — try refreshing");
        setLoading(false);
      });
  }, []);

  const handleShopNowClick = () => {
    console.log('Analytics: click_hero_shop', { source: 'hero' });
    // Scroll to featured products section
    document.getElementById('featured-products')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  const handleSellWithUsClick = () => {
    console.log('Analytics: click_hero_sell', { source: 'hero' });
    router.push('/sell');
  };

  const handleSignUpClick = () => {
    console.log('Analytics: signup_newsletter', { source: 'landing-hero' });
    // In a real app, this would open a signup modal
    document.getElementById('join-movement')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <>
      <Header />
      
      <main>
        {/* Hero Section */}
        <Hero {...({
          headline: "Style that lives twice.",
          subline: "Discover eco-friendly fashion, home décor, and collectibles — without the luxury price tag.",
          ctaPrimary: "Shop Now",
          ctaSecondary: "Sell With Us",
          heroImageSrc: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=600&q=80",
          onShopNowClick: handleShopNowClick,
          onSellWithUsClick: handleSellWithUsClick,
          onSignUpClick: handleSignUpClick,
        } as any)} />

        {/* Brand Story */}
        <BrandStory />

        {/* Featured Products Section */}
        <section id="featured-products" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] mb-4">
                Highly Rated Products
              </h2>
              <p className="text-lg text-[#6B7280]">
                Discover what our community loves most
              </p>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="bg-white rounded-lg p-4">
                    <div className="skeleton aspect-square mb-4"></div>
                    <div className="skeleton h-4 mb-2"></div>
                    <div className="skeleton h-4 w-2/3 mb-2"></div>
                    <div className="skeleton h-4 w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-[#6B7280] mb-4">{error}</p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="btn-primary"
                >
                  Try Again
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    title={product.title}
                    price={product.price}
                    oldPrice={product.old_price}
                    imageUrl={product.image_url}
                    badges={product.badges}
                    seller={product.seller}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Clearance Carousel */}
        <ClearanceCarousel />

        {/* Join Movement */}
        <div id="join-movement">
          <JoinMovement />
        </div>
      </main>

      <Footer />
    </>
  );
}
