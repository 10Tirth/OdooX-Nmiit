'use client';

import { useEffect } from 'react';

interface AnalyticsEvent {
  event: string;
  properties?: Record<string, any>;
  userId?: string;
  timestamp?: number;
}

export const trackEvent = async (event: string, properties?: Record<string, any>) => {
  try {
    const eventData: AnalyticsEvent = {
      event,
      properties: {
        ...properties,
        page: window.location.pathname,
        referrer: document.referrer,
        userAgent: navigator.userAgent,
      },
      timestamp: Date.now(),
    };

    // Send to Google Analytics 4 (if configured)
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', event, {
        event_category: 'auth',
        ...properties,
      });
    }

    // Send to Segment (if configured)
    if (typeof window !== 'undefined' && window.analytics) {
      window.analytics.track(event, properties);
    }

    // Send to custom analytics endpoint
    if (process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT) {
      await fetch('/api/analytics/track', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Analytics Event:', eventData);
    }
  } catch (error) {
    console.error('Analytics tracking error:', error);
  }
};

// Auth-specific tracking functions
export const trackAuthView = (page: 'signup' | 'signin' | 'magiclink' | 'password-reset' | 'verify' | 'onboarding') => {
  trackEvent('auth_view', { page });
};

export const trackSignupStarted = (method: 'email' | 'google' | 'apple' | 'magic_link', source?: string) => {
  trackEvent('signup_started', { method, source });
};

export const trackSignupCompleted = (method: 'email' | 'google' | 'apple' | 'magic_link', userId?: string) => {
  trackEvent('signup_completed', { method, userId });
};

export const trackLoginAttempt = (success: boolean, method: 'email' | 'google' | 'apple' | 'magic_link') => {
  trackEvent(success ? 'login_success' : 'login_failed', { method });
};

export const trackPasswordResetRequested = () => {
  trackEvent('password_reset_requested');
};

export const trackMagicLinkSent = () => {
  trackEvent('magiclink_sent');
};

export const trackMagicLinkUsed = () => {
  trackEvent('magiclink_used');
};

export const trackOAuthInitiated = (provider: 'google' | 'apple') => {
  trackEvent('oauth_initiated', { provider });
};

export const trackOAuthCompleted = (provider: 'google' | 'apple', userId?: string) => {
  trackEvent('oauth_completed', { provider, userId });
};

export const trackEmailVerified = (userId?: string) => {
  trackEvent('email_verified', { userId });
};

export const trackOnboardingCompleted = (userId?: string, preferences?: Record<string, any>) => {
  trackEvent('onboarding_completed', { userId, preferences });
};

// Hook for tracking page views
export const usePageTracking = (page: string) => {
  useEffect(() => {
    trackEvent('page_view', { page });
  }, [page]);
};

// Initialize analytics
export const initializeAnalytics = () => {
  // Initialize Google Analytics 4
  if (process.env.NEXT_PUBLIC_GA_TRACKING_ID) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', process.env.NEXT_PUBLIC_GA_TRACKING_ID);
  }

  // Initialize Segment
  if (process.env.NEXT_PUBLIC_SEGMENT_WRITE_KEY) {
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://cdn.segment.com/analytics.js/v1/segment.min.js';
    document.head.appendChild(script);

    window.analytics = window.analytics || [];
    window.analytics.load(process.env.NEXT_PUBLIC_SEGMENT_WRITE_KEY);
  }
};

// Type declarations for global analytics objects
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
    analytics: any;
  }
}
