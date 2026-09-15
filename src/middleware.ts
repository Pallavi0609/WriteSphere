
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function middleware(request: NextRequest) {
  const sessionCookie = cookies().get('__session')?.value;

  const isAuthPage = [
    request.nextUrl.pathname.startsWith('/login'),
    request.nextUrl.pathname.startsWith('/signup'),
  ].some(Boolean);

  if (!sessionCookie && !isAuthPage) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (sessionCookie && isAuthPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico)._)',
    '/dashboard/:path*',
    '/settings/:path*',
    '/history/:path*',
    '/draft/:path*',
    '/outline/:path*',
    '/grammar-check/:path*',
    '/improve-style/:path*',
    '/playground/:path*',
    '/saved-drafts/:path*',
    '/login',
    '/signup',
  ],
};
