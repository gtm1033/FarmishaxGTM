import { NextResponse } from 'next/server';

export async function POST() {
  const response = new NextResponse(JSON.stringify({ message: 'Logout successful!' }), {
    status: 200,
  });

  // Clear the token cookie
  response.cookies.set('token', '', { httpOnly: true, expires: new Date(0), secure: process.env.NODE_ENV === 'production' });

  return response;
}
