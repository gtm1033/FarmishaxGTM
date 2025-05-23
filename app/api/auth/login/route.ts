import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/db';
import User from '@/models/User';

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function POST(request: Request) {
  // Set CORS headers manually
  const responseHeaders = new Headers();
  responseHeaders.set('Access-Control-Allow-Origin', '*'); // Replace '*' with your frontend URL in production
  responseHeaders.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  responseHeaders.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  try {
    // console.log('Login API try block called')
    const { phone, password } = await request.json();
    await connectDB();

    const user = await User.findOne({ phone });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return new NextResponse(JSON.stringify({ message: 'Invalid credentials.' }), {
        status: 401,
        headers: responseHeaders,
      });
    }

    // console.log(user)

    const token = jwt.sign({ id: user._id, phone: user.phone }, JWT_SECRET, { expiresIn: '1d' });
    // console.log('weather data fetch')

    //--------------WEATHER / TEMPERATURE DATA IDHAR--------------------
    const apiKey = '6485203b725c252a2bd92c7b9304a635';
    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${user?.PIN},in&appid=${apiKey}`;
    const weather = await fetch(url, { method: 'GET' })
    //  console.log(weather)
    const weatherData = await weather.json()
    //  console.log(weatherData)
    
    const userDetails = {
  id: user?._id?.toString(),
  name: user?.fullName,
  // email: user?.email,
  phone: user?.phone,
  PIN: user?.PIN,
  weather: {
    description: weatherData?.weather[0]?.description, // Weather description
    temperature: weatherData?.main?.temp, // Temperature
    max_temp : weatherData?.main?.temp_max, // Max temperature
    min_temp : weatherData?.main?.temp_min, // Min temperature
    humidity: weatherData?.main?.humidity, // Humidity 
    area: weatherData?.name, // area name
  },
};
console.log(userDetails?.id , typeof userDetails?.id)
console.log(user?._id, typeof user?._id)

    const response = new NextResponse(JSON.stringify(
      {
        data: userDetails,
        message: 'Login successful!',
        weather: weatherData,
        temperature: weatherData.main.temp,
        // crops : favourableCrops
      }
    ), { status: 200, headers: responseHeaders, });

    response.cookies.set('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    return response;
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: 'Login failed' }), {
      status: 500,
      headers: responseHeaders,
    });
  }
}


// export async function GET() {
//   await connectDB();
//   const users = await User.find(); // Example operation
//   return NextResponse.json(users);
// }

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
