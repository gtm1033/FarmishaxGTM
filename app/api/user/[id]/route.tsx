import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import connectDB from '@/lib/db';
import User from '@/models/User';

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        console.log('Params:', params);

        const { id } = params;
        if (!id || !ObjectId.isValid(id)) {
          console.log('Invalid or missing User ID');
            return NextResponse.json({ message: 'Invalid or missing User ID' }, { status: 400 });
        }

        await connectDB();

        const user = await User.findById(new ObjectId(id));
        if (!user) {
           console.log('User not found');
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        // Fetch weather data
        const apiKey = '6485203b725c252a2bd92c7b9304a635';
        const url = `https://api.openweathermap.org/data/2.5/weather?zip=${user?.PIN},in&appid=${apiKey}`;
        const weather = await fetch(url, { method: 'GET' });

        if (!weather.ok) {
           console.log('Failed to fetch weather data');
            return NextResponse.json({ message: 'Failed to fetch weather data' }, { status: weather.status });
        }

        const weatherData = await weather.json();
        const temperature = weatherData?.main?.temp;

        if (!temperature) {
            console.log('Temperature data unavailable');
            return NextResponse.json({ message: 'Temperature data unavailable' }, { status: 500 });
        }

        return NextResponse.json({ data: user, temperature });
    } catch (error) {
        console.error('Error occurred:', error);
        return NextResponse.json({ message: 'Internal Server Error', error: error }, { status: 500 });
    }
}
