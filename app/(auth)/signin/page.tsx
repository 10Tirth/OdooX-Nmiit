'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthForm from '../../../components/auth/AuthForm';
import Image from 'next/image';

export default function SignInPage() {
  const router = useRouter();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [showMagicLink, setShowMagicLink] = useState(false);
  const [error, setError] = useState<string>('');

  const handleSuccess = () => {
    // Redirect to home or intended page
    const next = new URLSearchParams(window.location.search).get('next');
    router.push(next || '/explore');
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
  };

  const handleModeChange = (newMode: 'signin' | 'signup') => {
    setMode(newMode);
    setError('');
    if (newMode === 'signup') {
      router.push('/signup');
    }
  };

  const handleMagicLink = () => {
    setShowMagicLink(true);
  };

  const handleForgotPassword = () => {
    router.push('/password-reset');
  };

  if (showMagicLink) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Magic link sent</h1>
              <p className="text-gray-600">
                Click the link in your inbox to sign in. If you don't see it, check spam or resend.
              </p>
            </div>
            
            <div className="space-y-4">
              <button
                onClick={() => setShowMagicLink(false)}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Back to sign in
              </button>
              
              <button
                onClick={() => {/* TODO: Implement resend magic link */}}
                className="w-full text-blue-600 hover:text-blue-500 underline text-sm"
              >
                Resend magic link
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Illustration */}
        <div className="hidden lg:block">
          <div className="relative">
            <Image
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=800&q=80"
              alt="EcoFinds signin illustration"
              width={600}
              height={800}
              className="rounded-2xl shadow-2xl"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
            <div className="absolute bottom-8 left-8 right-8 text-white">
              <h2 className="text-2xl font-bold mb-2">Welcome back to EcoFinds</h2>
              <p className="text-lg opacity-90">
                Continue your sustainable shopping journey
              </p>
            </div>
          </div>
        </div>

        {/* Right side - Auth Form */}
        <div className="flex items-center justify-center">
          <div className="w-full">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-red-800 text-sm">{error}</p>
                </div>
              </div>
            )}
            
            <AuthForm
              mode={mode}
              onSuccess={handleSuccess}
              onError={handleError}
              onModeChange={handleModeChange}
              onMagicLink={handleMagicLink}
              onForgotPassword={handleForgotPassword}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
