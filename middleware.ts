import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createServerClient } from './lib/supabase';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // Skip auth checks if Supabase is not configured
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === 'https://placeholder.supabase.co') {
    return response;
  }
  
  // Create Supabase client
  const supabase = createServerClient();
  
  // Get session from cookies
  const { data: { session } } = await supabase.auth.getSession();
  
  // Protected routes that require authentication
  const protectedRoutes = ['/explore', '/profile', '/sell', '/messages'];
  const authRoutes = ['/signin', '/signup', '/password-reset'];
  
  const isProtectedRoute = protectedRoutes.some(route => 
    request.nextUrl.pathname.startsWith(route)
  );
  
  const isAuthRoute = authRoutes.some(route => 
    request.nextUrl.pathname.startsWith(route)
  );
  
  // Redirect to signin if accessing protected route without session
  if (isProtectedRoute && !session) {
    const signInUrl = new URL('/signin', request.url);
    signInUrl.searchParams.set('next', request.nextUrl.pathname);
    return NextResponse.redirect(signInUrl);
  }
  
  // Redirect to explore if accessing auth routes with session
  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL('/explore', request.url));
  }
  
  // Add user info to headers for server components
  if (session) {
    response.headers.set('x-user-id', session.user.id);
    response.headers.set('x-user-email', session.user.email || '');
  }
  
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
