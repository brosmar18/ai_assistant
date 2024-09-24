import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../lib/mongodb';
import UserThread from '../../../../models/userThread';

export async function POST(request: NextRequest) {
  await connectToDatabase();

  try {
    const { userId, threadId } = await request.json();
    const userThread = new UserThread({ userId, threadId });
    await userThread.save();
    return NextResponse.json(userThread, { status: 201 });
  } catch (error) {
    console.error('Error creating userThread:', error);
    return NextResponse.json(
      { error: 'Failed to create userThread' },
      { status: 500 }
    );
  }
}

