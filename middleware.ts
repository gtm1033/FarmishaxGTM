import { i18nRouter } from 'next-i18n-router';
import i18nConfig from './i18nConfig';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token')?.value;

  // 1. Handle root path (`/`) to redirect to default locale (`/en`)
  // if (pathname === '/') {
  //   const defaultLocale = i18nConfig.defaultLocale || 'en';
  //   return NextResponse.redirect(`${request.nextUrl.origin}/${defaultLocale}`);
  // }

  // 2. Handle JWT-protected routes
  const protectedRoutes = ['/protected-route']; // Define your protected routes
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

  if (isProtectedRoute) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      const JWT_SECRET = process.env.JWT_SECRET as string;
      jwt.verify(token, JWT_SECRET);
    } catch (error) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // 3. Handle i18n routing for other cases
  return i18nRouter(request, i18nConfig);
}

// Apply middleware to all app routes, excluding static files, `_next`, etc.
export const config = {
  matcher: [
    '/((?!api|static|.*\\..*|_next).*)', // All app routes
    '/protected-route/:path*', // Add matcher for your protected routes
  ],
};



// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// import jwt from 'jsonwebtoken';

// export default function middleware(request: NextRequest) {
//   const token = request.cookies.get('token')?.value;

//   if (!token) {
//     return NextResponse.redirect(new URL('/login', request.url));
//   }

//   try {
//     const JWT_SECRET = process.env.JWT_SECRET as string;
//     jwt.verify(token, JWT_SECRET);
//     return NextResponse.next(); // Proceed to the requested route if token is valid
//   } catch (error) {
//     return NextResponse.redirect(new URL('/login', request.url));
//   }
// }

// export const config = {
//   matcher: ['/protected-route/:path*'], // Adjust to the paths you want to protect
// };
