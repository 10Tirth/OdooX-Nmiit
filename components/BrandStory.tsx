'use client';

import { useEffect, useState } from 'react';

interface SiteStats {
  items_sold: number;
  avg_rating: number | string;
}

export default function BrandStory() {
  const [stats, setStats] = useState<SiteStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/site-stats')
      .then(res => res.json())
      .then(data => {
        setStats(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Failed to fetch site stats:', error);
        setLoading(false);
      });
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Circular economy illustration */}
          <div className="relative">
            <div className="relative z-10">
              {/* Circular Economy SVG */}
              <svg viewBox="0 0 400 400" className="w-full max-w-md mx-auto">
                <defs>
                  <linearGradient id="circularGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0F9D58" />
                    <stop offset="100%" stopColor="#FFB300" />
                  </linearGradient>
                </defs>
                
                {/* Main circle */}
                <circle
                  cx="200"
                  cy="200"
                  r="150"
                  fill="none"
                  stroke="url(#circularGradient)"
                  strokeWidth="3"
                  strokeDasharray="10,5"
                  className="animate-spin"
                  style={{ animationDuration: '20s' }}
                />
                
                {/* Buy node */}
                <g transform="translate(200, 80)">
                  <circle cx="0" cy="0" r="40" fill="#0F9D58" />
                  <svg x="-12" y="-12" width="24" height="24" fill="white" viewBox="0 0 24 24">
                    <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z"/>
                  </svg>
                  <text x="0" y="60" textAnchor="middle" className="text-sm font-semibold fill-[#111827]">Buy</text>
                </g>
                
                {/* Use node */}
                <g transform="translate(320, 200)">
                  <circle cx="0" cy="0" r="40" fill="#FFB300" />
                  <svg x="-12" y="-12" width="24" height="24" fill="white" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z"/>
                  </svg>
                  <text x="0" y="60" textAnchor="middle" className="text-sm font-semibold fill-[#111827]">Use</text>
                </g>
                
                {/* Resell node */}
                <g transform="translate(80, 200)">
                  <circle cx="0" cy="0" r="40" fill="#6366F1" />
                  <svg x="-12" y="-12" width="24" height="24" fill="white" viewBox="0 0 24 24">
                    <path d="M12 2L13.09 8.26L22 9L17 14L18.18 23L12 19L5.82 23L7 14L2 9L10.91 8.26L12 2Z"/>
                  </svg>
                  <text x="0" y="60" textAnchor="middle" className="text-sm font-semibold fill-[#111827]">Resell</text>
                </g>
                
                {/* Arrows */}
                <defs>
                  <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#6B7280" />
                  </marker>
                </defs>
                
                <path d="M 240 120 Q 280 160 280 160" stroke="#6B7280" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />
                <path d="M 280 240 Q 240 280 160 280 Q 120 240 120 240" stroke="#6B7280" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />
                <path d="M 120 160 Q 160 120 160 120" stroke="#6B7280" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />
              </svg>
            </div>
            
            {/* Stats badges */}
            {loading ? (
              <div className="flex justify-center space-x-4 mt-8">
                <div className="skeleton h-16 w-24"></div>
                <div className="skeleton h-16 w-24"></div>
              </div>
            ) : stats && (
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <div className="bg-white rounded-lg shadow-md px-4 py-3 border border-gray-100">
                  <div className="text-2xl font-bold text-[#0F9D58]">
                    {stats.items_sold.toLocaleString()}+
                  </div>
                  <div className="text-sm text-[#6B7280]">Items Sold</div>
                </div>
                <div className="bg-white rounded-lg shadow-md px-4 py-3 border border-gray-100">
                  <div className="text-2xl font-bold text-[#FFB300] flex items-center">
                    {stats.avg_rating}
                    <svg className="w-5 h-5 ml-1 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                  <div className="text-sm text-[#6B7280]">Avg Rating</div>
                </div>
              </div>
            )}
          </div>

          {/* Right side - Content */}
          <div className="space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#111827]">
              Not Just Products. A Lifestyle.
            </h2>
            
            <p className="text-lg text-[#6B7280] leading-relaxed">
              We believe luxury shouldn't cost the earth — or your pocket. Our platform lets you buy and sell lifestyle items that are stylish, sustainable, and affordable. From fashion to collectibles, we make eco-friendly living accessible to everyone.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-[#0F9D58]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.58.66C6.91 17.64 9.14 12.39 17 11V8z"/>
                    <path d="M12.8 3c-3.8 1-6.8 4.1-7.8 8h2.1c.8-2.7 2.8-4.9 5.7-5.8V3z"/>
                  </svg>
                </div>
                <h3 className="font-semibold text-[#111827]">Sustainable</h3>
                <p className="text-sm text-[#6B7280]">Circular economy in action</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-[#FFB300]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
                  </svg>
                </div>
                <h3 className="font-semibold text-[#111827]">Affordable</h3>
                <p className="text-sm text-[#6B7280]">Save 30-70% on brands</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
                  </svg>
                </div>
                <h3 className="font-semibold text-[#111827]">Curated</h3>
                <p className="text-sm text-[#6B7280]">Quality verified items</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
