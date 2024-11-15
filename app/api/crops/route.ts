import { NextResponse } from 'next/server';
import crops from '@/data/crops.json';

export async function GET() {

// console.log(crops)    
    return NextResponse.json(crops);
  }