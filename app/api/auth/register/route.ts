import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/db';
import User from '@/models/User';

export async function POST(request: Request) {
  // Set CORS headers manually
  const responseHeaders = new Headers();
  responseHeaders.set('Access-Control-Allow-Origin', '*'); // Use specific origin in production
  responseHeaders.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  responseHeaders.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  try {
    const { fullName, phone, password, PIN } = await request.json();
    console.log('Received data:', { fullName, phone, password, PIN });

    if (!fullName || !phone || !password || !PIN) {
      return new NextResponse(JSON.stringify({ message: 'All fields are required' }), {
        status: 400,
        headers: responseHeaders,
      });
    }

    await connectDB();

    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return new NextResponse(JSON.stringify({ message: 'User already exists' }), {
        status: 409,
        headers: responseHeaders,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ fullName, phone, password: hashedPassword, PIN });
    await user.save();

    return new NextResponse(JSON.stringify({ message: 'User registered successfully' }), {
      status: 200,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error('Registration error:', error); // Log the error
    return new NextResponse(JSON.stringify({ message: 'Registration failed', error: error }), {
      status: 500,
      headers: responseHeaders,
    });
  }
}

// Handle OPTIONS preflight request
export async function OPTIONS() {
  const responseHeaders = new Headers();
  responseHeaders.set('Access-Control-Allow-Origin', '*'); // Use specific origin in production
  responseHeaders.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  responseHeaders.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  return new NextResponse(null, {
    status: 204,
    headers: responseHeaders,
  });
}
