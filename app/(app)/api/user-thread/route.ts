import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { connectToDatabase } from '../../../../lib/mongodb';
import UserThread from '../../../../models/userThread';
import OpenAI from "openai";

export async function GET() {
  const user = await currentUser();

  if (!user) {
    return NextResponse.json(
      {
        success: false,
        message: "Unauthorized",
      },
      { status: 401 }
    );
  }

  await connectToDatabase();

  const userId = user.id;

  try {
    // Get user thread from database
    let userThread = await UserThread.findOne({ userId });

    const openai = new OpenAI();

    if (userThread) {
      // If it exists, retrieve the thread from OpenAI
      const thread = await openai.beta.threads.retrieve(userThread.threadId);

      // Return the thread to the user
      return NextResponse.json(thread, { status: 200 });
    } else {
      // If it doesn't exist, create it from OpenAI
      const thread = await openai.beta.threads.create();

      // Save it to the database
      userThread = new UserThread({
        userId,
        threadId: thread.id,
      });

      await userThread.save();

      // Return the thread to the user
      return NextResponse.json(thread, { status: 201 });
    }
  } catch (error) {
    console.error('Error fetching or creating userThread:', error);
    return NextResponse.json(
      { error: 'Failed to fetch or create user thread' },
      { status: 500 }
    );
  }
}
