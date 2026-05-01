import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// All routes that require the user to be logged in
const PROTECTED_ROUTES = ['/portal'];

// Routes that logged-in users should NOT access (e.g. login page)
const AUTH_ROUTES = ['/login', '/register'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token')?.value;

  const isProtected = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route),
  );
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));

  // 1. User is NOT logged in and tries to access a protected route → redirect to /login
  if (isProtected && !token) {
    const loginUrl = new URL('/login', request.url);
    // Pass the original URL so we can redirect back after login
    loginUrl.searchParams.set('redirectTo', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 2. User IS logged in and tries to access /login → redirect to portal
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL('/portal/dashboard', request.url));
  }

  return NextResponse.next();
}

// Tell Next.js which paths this middleware should run on.
// This avoids running it on static files (_next, images, etc.)
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|public).*)'],
};
