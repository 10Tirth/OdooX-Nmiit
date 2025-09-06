'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isMounted && isScrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-sm'
    }`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[#0F9D58] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <span className="font-bold text-xl text-[#111827]">EcoFinds</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link 
                href="/explore" 
                className="text-[#111827] hover:text-[#0F9D58] px-3 py-2 text-sm font-medium transition-colors"
              >
                Explore
              </Link>
              <div className="relative group">
                <button className="text-[#111827] hover:text-[#0F9D58] px-3 py-2 text-sm font-medium transition-colors flex items-center">
                  Categories
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="py-2">
                    <Link href="/category/clothing" className="block px-4 py-2 text-sm text-[#111827] hover:bg-gray-50 hover:text-[#0F9D58]">Clothing</Link>
                    <Link href="/category/home" className="block px-4 py-2 text-sm text-[#111827] hover:bg-gray-50 hover:text-[#0F9D58]">Home & Décor</Link>
                    <Link href="/category/collectibles" className="block px-4 py-2 text-sm text-[#111827] hover:bg-gray-50 hover:text-[#0F9D58]">Collectibles</Link>
                    <Link href="/category/riding-gear" className="block px-4 py-2 text-sm text-[#111827] hover:bg-gray-50 hover:text-[#0F9D58]">Riding Gear</Link>
                    <Link href="/category/clearance" className="block px-4 py-2 text-sm text-[#111827] hover:bg-gray-50 hover:text-[#0F9D58]">Clearance</Link>
                  </div>
                </div>
              </div>
              <Link 
                href="/blog" 
                className="text-[#111827] hover:text-[#0F9D58] px-3 py-2 text-sm font-medium transition-colors"
              >
                Blog
              </Link>
              <Link 
                href="/sell" 
                className="text-[#111827] hover:text-[#0F9D58] px-3 py-2 text-sm font-medium transition-colors"
              >
                Sell
              </Link>
            </div>
          </div>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-[#111827] hover:text-[#0F9D58] px-3 py-2 text-sm font-medium transition-colors">
              Sign In
            </button>
            <button className="relative p-2 text-[#111827] hover:text-[#0F9D58] transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5l2.5 5m-2.5-5l2.5-5" />
              </svg>
              <span className="absolute -top-2 -right-2 bg-[#FFB300] text-xs text-white rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-[#111827] hover:text-[#0F9D58] p-2 rounded-md transition-colors"
              aria-label="Toggle mobile menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
              <Link href="/explore" className="block px-3 py-2 text-base font-medium text-[#111827] hover:text-[#0F9D58] hover:bg-gray-50 rounded-md transition-colors">Explore</Link>
              <Link href="/category/clothing" className="block px-3 py-2 text-base font-medium text-[#111827] hover:text-[#0F9D58] hover:bg-gray-50 rounded-md transition-colors">Clothing</Link>
              <Link href="/category/home" className="block px-3 py-2 text-base font-medium text-[#111827] hover:text-[#0F9D58] hover:bg-gray-50 rounded-md transition-colors">Home & Décor</Link>
              <Link href="/category/collectibles" className="block px-3 py-2 text-base font-medium text-[#111827] hover:text-[#0F9D58] hover:bg-gray-50 rounded-md transition-colors">Collectibles</Link>
              <Link href="/category/riding-gear" className="block px-3 py-2 text-base font-medium text-[#111827] hover:text-[#0F9D58] hover:bg-gray-50 rounded-md transition-colors">Riding Gear</Link>
              <Link href="/category/clearance" className="block px-3 py-2 text-base font-medium text-[#111827] hover:text-[#0F9D58] hover:bg-gray-50 rounded-md transition-colors">Clearance</Link>
              <Link href="/blog" className="block px-3 py-2 text-base font-medium text-[#111827] hover:text-[#0F9D58] hover:bg-gray-50 rounded-md transition-colors">Blog</Link>
              <Link href="/sell" className="block px-3 py-2 text-base font-medium text-[#111827] hover:text-[#0F9D58] hover:bg-gray-50 rounded-md transition-colors">Sell</Link>
              <div className="border-t border-gray-200 pt-4 mt-4">
                <button className="block w-full text-left px-3 py-2 text-base font-medium text-[#111827] hover:text-[#0F9D58] hover:bg-gray-50 rounded-md transition-colors">Sign In</button>
                <button className="block w-full text-left px-3 py-2 text-base font-medium text-[#111827] hover:text-[#0F9D58] hover:bg-gray-50 rounded-md transition-colors">Cart (0)</button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
