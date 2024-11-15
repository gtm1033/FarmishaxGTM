

    import { NextRequest, NextResponse } from 'next/server';

    export async function GET(request: NextRequest) {
      // Extract query parameter(s)
      console.log('===========Weather API called')
      const { searchParams } = new URL(request.url);
      const pincode = searchParams.get('pincode');
      console.log('=============',searchParams,'\n', pincode)
    
      // Validate and handle missing queries
      if (!pincode) {
        return NextResponse.json({ message: 'Pincode is required' }, { status: 400 });
      }
    
      try {
        // Use pincode to call an external API, like OpenWeatherMap
        console.log('===============URL here - ')
        const apiKey = '6485203b725c252a2bd92c7b9304a635';
        const url = `https://api.openweathermap.org/data/2.5/weather?zip=${pincode},in&appid=${apiKey}`;
        console.log(url)
        const weatherResponse = await fetch(url, { method: 'GET' });
        
        if (!weatherResponse.ok) {
          return NextResponse.json({ message: 'Failed to fetch weather data' }, { status: 500 });
        }
    
        const weatherData = await weatherResponse.json();
        
        return NextResponse.json({
          message: 'Weather data fetched successfully',
          data: weatherData,
        });
    
      } catch (error) {
        console.error('Error fetching weather data:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
      }
    }
    