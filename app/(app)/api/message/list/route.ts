import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: Request) {
  const { threadId } = await req.json();

  if (!threadId) {
    return NextResponse.json(
      { error: "ThreadId is required", success: false },
      { status: 400 }
    );
  }

  const openai = new OpenAI();

  try {
    const messagesResponse = await openai.beta.threads.messages.list(threadId);
    console.log("from openai messages", messagesResponse);

    const messages = messagesResponse.data; // Ensure this matches your data structure

    return NextResponse.json({ messages, success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong", success: false },
      { status: 500 }
    );
  }
}
