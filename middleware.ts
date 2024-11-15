import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export default function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    const JWT_SECRET = process.env.JWT_SECRET as string;
    jwt.verify(token, JWT_SECRET);
    return NextResponse.next(); // Proceed to the requested route if token is valid
  } catch (error) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/protected-route/:path*'], // Adjust to the paths you want to protect
};
