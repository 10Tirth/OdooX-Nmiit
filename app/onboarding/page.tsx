'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '../../lib/supabase';
import Image from 'next/image';

export default function OnboardingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [preferences, setPreferences] = useState({
    sellerIntent: '',
    interests: [] as string[],
    newsletterOptIn: true,
  });

  const interests = [
    'Fashion & Clothing',
    'Home & Garden',
    'Electronics',
    'Books & Media',
    'Sports & Fitness',
    'Beauty & Health',
    'Kids & Baby',
    'Art & Collectibles',
  ];

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  const handleInterestToggle = (interest: string) => {
    setPreferences(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Update user metadata with preferences
      const { error } = await supabase.auth.updateUser({
        data: {
          seller_intent: preferences.sellerIntent,
          interests: preferences.interests,
          newsletter_opt_in: preferences.newsletterOptIn,
          onboarding_completed: true,
        }
      });

      if (error) {
        console.error('Error updating user preferences:', error);
      }

      // Redirect to explore page
      router.push('/explore');
    } catch (error) {
      console.error('Onboarding error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
            </div>
            <p className="text-gray-600">Loading your profile...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to EcoFinds!</h1>
          <p className="text-lg text-gray-600 mb-4">
            Let's personalize your experience and get you started
          </p>
          <div className="bg-green-100 border border-green-200 rounded-lg p-4 max-w-md mx-auto">
            <p className="text-green-800 font-medium">
              🎉 You've earned a 10% discount coupon! Use code: <span className="font-mono bg-green-200 px-2 py-1 rounded">WELCOME10</span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left side - Illustration */}
          <div className="hidden lg:block">
            <div className="relative">
              <Image
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=800&q=80"
                alt="EcoFinds onboarding"
                width={600}
                height={800}
                className="rounded-2xl shadow-2xl"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <h2 className="text-2xl font-bold mb-2">Start your sustainable journey</h2>
                <p className="text-lg opacity-90">
                  Discover amazing pre-loved items and give your belongings a second life
                </p>
              </div>
            </div>
          </div>

          {/* Right side - Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Seller Intent */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Are you interested in selling items on EcoFinds?
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="sellerIntent"
                      value="yes"
                      checked={preferences.sellerIntent === 'yes'}
                      onChange={(e) => setPreferences(prev => ({ ...prev, sellerIntent: e.target.value }))}
                      className="mr-3 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">Yes, I'd like to sell items</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="sellerIntent"
                      value="maybe"
                      checked={preferences.sellerIntent === 'maybe'}
                      onChange={(e) => setPreferences(prev => ({ ...prev, sellerIntent: e.target.value }))}
                      className="mr-3 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">Maybe, I'm not sure yet</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="sellerIntent"
                      value="no"
                      checked={preferences.sellerIntent === 'no'}
                      onChange={(e) => setPreferences(prev => ({ ...prev, sellerIntent: e.target.value }))}
                      className="mr-3 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">No, I'm just here to buy</span>
                  </label>
                </div>
              </div>

              {/* Interests */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  What categories interest you most? (Select all that apply)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {interests.map((interest) => (
                    <label key={interest} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={preferences.interests.includes(interest)}
                        onChange={() => handleInterestToggle(interest)}
                        className="mr-2 text-blue-600 focus:ring-blue-500 rounded"
                      />
                      <span className="text-sm text-gray-700">{interest}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Newsletter Opt-in */}
              <div className="flex items-start">
                <input
                  id="newsletterOptIn"
                  type="checkbox"
                  checked={preferences.newsletterOptIn}
                  onChange={(e) => setPreferences(prev => ({ ...prev, newsletterOptIn: e.target.checked }))}
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="newsletterOptIn" className="ml-2 text-sm text-gray-700">
                  Send me updates about new features, sustainability tips, and special offers
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Setting up your profile...
                  </div>
                ) : (
                  'Complete setup & start exploring'
                )}
              </button>

              {/* Skip Option */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => router.push('/explore')}
                  className="text-sm text-gray-500 hover:text-gray-700 underline"
                >
                  Skip for now
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
