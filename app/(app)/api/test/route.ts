import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../lib/mongodb';

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    return NextResponse.json(
      { message: 'Successfully connected to MongoDB' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Connection error:', error);
    return NextResponse.json(
      { error: 'Failed to connect to MongoDB' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    return NextResponse.json(
      { message: 'Successfully connected to MongoDB' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Connection error:', error);
    return NextResponse.json(
      { error: 'Failed to connect to MongoDB' },
      { status: 500 }
    );
  }
}
