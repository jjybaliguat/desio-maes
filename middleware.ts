// app/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const cookies = request.cookies; // Get all cookies
//   console.log('Cookies:', cookies); // Log cookies for debugging
  const isAuthenticated = cookies.get('isAuthenticated')?.value; // Get the specific cookie

   // Redirect authenticated users to the root path if they access the login page
   if (request.nextUrl.pathname === '/auth/login' && isAuthenticated) {
    return NextResponse.redirect(new URL('/', request.url)); // Redirect to root path
  }

  // Check if the request is for the root path or dashboard and the user is not authenticated
  if ((request.nextUrl.pathname === '/') && !isAuthenticated) {
    return NextResponse.redirect(new URL('/auth/login', request.url)); // Redirect to login page
  }

  return NextResponse.next(); // Allow the request to continue
}

// Apply middleware only to the root path and dashboard route
export const config = {
  matcher: ['/', '/auth/login'], // Protect the root path and all paths under /dashboard
};
