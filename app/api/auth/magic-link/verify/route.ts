import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '../../../../lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');
    const redirectTo = searchParams.get('redirect_to') || '/explore';

    if (!token) {
      return NextResponse.redirect(new URL('/signin?error=invalid_token', request.url));
    }

    const supabase = createServerClient();

    // Verify the magic link token
    const { data, error } = await supabase.auth.verifyOtp({
      token_hash: token,
      type: 'email',
    });

    if (error) {
      return NextResponse.redirect(new URL('/signin?error=invalid_token', request.url));
    }

    // Create response with redirect
    const response = NextResponse.redirect(new URL(redirectTo, request.url));

    // Set session cookies
    if (data.session) {
      response.cookies.set('sb-access-token', data.session.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      });

      response.cookies.set('sb-refresh-token', data.session.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      });
    }

    return response;
  } catch (error) {
    console.error('Magic link verification error:', error);
    return NextResponse.redirect(new URL('/signin?error=verification_failed', request.url));
  }
}
