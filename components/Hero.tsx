'use client';

import Image, { StaticImageData } from 'next/image';
interface HeroProps {
  headline: string;
  subline?: string;
  ctaPrimary: string;
  ctaSecondary: string;
  heroImageSrc: string | StaticImageData;
}

interface HeroComponentProps extends HeroProps {
  onShopNowClick: () => void;
  onSellWithUsClick: () => void;
  onSignUpClick: () => void;
}

export default function Hero({
  headline,
  subline,
  ctaPrimary,
  ctaSecondary,
  heroImageSrc,
  onShopNowClick,
  onSellWithUsClick,
  onSignUpClick
}: HeroComponentProps) {
  return (
    <section className="relative bg-gradient-to-br from-green-50 to-blue-50 pt-20 pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Content */}
          <div className="space-y-8 animate-slide-up">
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#111827] leading-tight">
                {headline}
              </h1>
              <p className="text-xl text-[#6B7280] max-w-lg">
                {subline}
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onShopNowClick}
                className="btn-primary text-lg px-8 py-4 inline-flex items-center justify-center"
                aria-label="Browse featured products and start shopping"
              >
                {ctaPrimary}
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
              
              <button
                onClick={onSellWithUsClick}
                className="btn-secondary text-lg px-8 py-4 inline-flex items-center justify-center"
                aria-label="Start selling your items on EcoFinds"
              >
                {ctaSecondary}
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
            </div>

            {/* Microcopy */}
            <div className="text-sm text-[#6B7280]">
              <button
                onClick={onSignUpClick}
                className="text-[#0F9D58] hover:text-[#0d8a4d] underline underline-offset-2 transition-colors focus:outline-none focus:ring-2 focus:ring-[#0F9D58] focus:ring-offset-2 rounded-sm"
                aria-label="Sign up for EcoFinds and get 10% discount"
              >
                Sign up & save 10%
              </button>
            </div>
          </div>

          {/* Right column - Hero Image */}
          <div className="relative lg:h-[600px] h-[400px] animate-fade-in">
            <div className="relative h-full rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={heroImageSrc}
                alt="Living room vignette with pre-loved clothing, vintage lamp, and accessories showcasing sustainable lifestyle products"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              />
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#FFB300] rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#0F9D58] rounded-full opacity-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            {/* Floating badges */}
            <div className="absolute top-4 left-4 bg-white rounded-full px-3 py-1 shadow-lg">
              <span className="text-sm font-medium text-[#0F9D58]">♻️ Sustainable</span>
            </div>
            <div className="absolute bottom-4 right-4 bg-white rounded-full px-3 py-1 shadow-lg">
              <span className="text-sm font-medium text-[#FFB300]">💰 Save 30-70%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-[#0F9D58]/10 to-[#FFB300]/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-gradient-to-tr from-[#FFB300]/10 to-[#0F9D58]/10 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
}
