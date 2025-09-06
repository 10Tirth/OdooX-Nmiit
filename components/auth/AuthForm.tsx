'use client';

import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import PasswordStrengthMeter from './PasswordStrengthMeter';
import OAuthButtons from './OAuthButtons';

interface AuthFormProps {
  mode: 'signin' | 'signup';
  onSuccess?: () => void;
  onError?: (error: string) => void;
  onModeChange?: (mode: 'signin' | 'signup') => void;
  onMagicLink?: () => void;
  onForgotPassword?: () => void;
}

export default function AuthForm({ 
  mode, 
  onSuccess, 
  onError, 
  onModeChange, 
  onMagicLink, 
  onForgotPassword 
}: AuthFormProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    newsletterOptIn: false,
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (mode === 'signup' && passwordStrength < 3) {
      newErrors.password = 'Password must be at least 8 characters and include a number and a symbol';
    }

    // Confirm password validation (signup only)
    if (mode === 'signup' && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Terms agreement validation (signup only)
    if (mode === 'signup' && !formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the Terms & Privacy Policy';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      // Debug: Log the attempt
      console.log('🔐 Attempting authentication for:', formData.email);
      // Removed direct access to supabase.supabaseUrl as it is protected
      
      if (mode === 'signup') {
        console.log('📝 Signup attempt with data:', {
          email: formData.email,
          fullName: formData.fullName,
          newsletterOptIn: formData.newsletterOptIn
        });
        
        const { data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              full_name: formData.fullName,
              newsletter_opt_in: formData.newsletterOptIn,
            },
          },
        });

        console.log('📊 Signup result:', { data, error });

        if (error) {
          console.error('❌ Signup error:', error);
          onError?.(error.message);
        } else {
          console.log('✅ Signup successful:', data);
          onSuccess?.();
        }
      } else {
        console.log('🔑 Signin attempt for:', formData.email);
        
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        console.log('📊 Signin result:', { data, error });

        if (error) {
          console.error('❌ Signin error:', error);
          onError?.('We couldn\'t sign you in. Check your email and password.');
        } else {
          console.log('✅ Signin successful:', data);
          onSuccess?.();
        }
      }
    } catch (error) {
      console.error('💥 Authentication catch block error:', error);
      onError?.('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {mode === 'signup' ? 'Create your EcoFinds account' : 'Welcome back. Sign in to EcoFinds.'}
          </h1>
          <p className="text-gray-600">
            {mode === 'signup' 
              ? 'Sign up & save 10% — sell or discover pre-loved style.'
              : 'Access your saved items, chat with sellers and manage listings.'
            }
          </p>
        </div>

        {/* OAuth Buttons */}
        <OAuthButtons mode={mode} onSuccess={onSuccess} onError={onError} />

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">or {mode === 'signup' ? 'sign up' : 'sign in'} with email</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name (signup only) */}
          {mode === 'signup' && (
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                Full name (optional)
              </label>
              <input
                id="fullName"
                type="text"
                placeholder="Your name (optional)"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          )}

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
                {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder={mode === 'signup' ? 'Create a strong password' : 'Enter your password'}
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className={`w-full px-3 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
                aria-describedby={errors.password ? 'password-error' : undefined}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && (
              <p id="password-error" className="mt-1 text-sm text-red-600" role="alert">
                {errors.password}
              </p>
            )}
            
            {/* Password Strength Meter (signup only) */}
            {mode === 'signup' && formData.password && (
              <div className="mt-2">
                <PasswordStrengthMeter 
                  password={formData.password} 
                  onStrengthChange={setPasswordStrength}
                />
              </div>
            )}
          </div>

          {/* Confirm Password (signup only) */}
          {mode === 'signup' && (
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className={`w-full px-3 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                  }`}
                  aria-describedby={errors.confirmPassword ? 'confirm-password-error' : undefined}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? (
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p id="confirm-password-error" className="mt-1 text-sm text-red-600" role="alert">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          )}

          {/* Newsletter Opt-in (signup only) */}
          {mode === 'signup' && (
            <div className="flex items-start">
              <input
                id="newsletterOptIn"
                type="checkbox"
                checked={formData.newsletterOptIn}
                onChange={(e) => handleInputChange('newsletterOptIn', e.target.checked)}
                className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="newsletterOptIn" className="ml-2 text-sm text-gray-700">
                I want clearance alerts & tips (newsletter opt-in)
              </label>
            </div>
          )}

          {/* Terms Agreement (signup only) */}
          {mode === 'signup' && (
            <div className="flex items-start">
              <input
                id="agreeToTerms"
                type="checkbox"
                checked={formData.agreeToTerms}
                onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                className={`mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded ${
                  errors.agreeToTerms ? 'border-red-500' : ''
                }`}
                aria-describedby={errors.agreeToTerms ? 'terms-error' : undefined}
              />
              <label htmlFor="agreeToTerms" className="ml-2 text-sm text-gray-700">
                I agree to the{' '}
                <a href="/terms" className="text-blue-600 hover:text-blue-500 underline">
                  Terms
                </a>{' '}
                &{' '}
                <a href="/privacy" className="text-blue-600 hover:text-blue-500 underline">
                  Privacy Policy
                </a>
              </label>
            </div>
          )}
          {errors.agreeToTerms && (
            <p id="terms-error" className="text-sm text-red-600" role="alert">
              {errors.agreeToTerms}
            </p>
          )}

          {/* Forgot Password (signin only) */}
          {mode === 'signin' && (
            <div className="text-right">
              <button
                type="button"
                onClick={onForgotPassword}
                className="text-sm text-blue-600 hover:text-blue-500 underline"
              >
                Forgot password?
              </button>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                {mode === 'signup' ? 'Creating account...' : 'Signing in...'}
              </div>
            ) : (
              mode === 'signup' ? 'Create account' : 'Sign in'
            )}
          </button>

          {/* Magic Link Option */}
          <div className="text-center">
            <button
              type="button"
              onClick={onMagicLink}
              className="text-sm text-blue-600 hover:text-blue-500 underline"
            >
              Email me a magic sign-in link instead
            </button>
          </div>

          {/* Mode Switch */}
          <div className="text-center text-sm text-gray-600">
            {mode === 'signup' ? (
              <>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => onModeChange?.('signin')}
                  className="text-blue-600 hover:text-blue-500 underline"
                >
                  Sign in
                </button>
              </>
            ) : (
              <>
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => onModeChange?.('signup')}
                  className="text-blue-600 hover:text-blue-500 underline"
                >
                  Create account
                </button>
              </>
            )}
          </div>
        </form>

        {/* Trust microcopy */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Passwords are stored securely. You can also sign in with Google or a magic link.
          </p>
        </div>
      </div>
    </div>
  );
}
