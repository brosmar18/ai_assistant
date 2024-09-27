import { NextResponse } from "next/server";
import OpenAI from "openai";

// Define types for message and contentItem
interface ContentItem {
  text?: {
    value: string;
  };
  [key: string]: any; // Adjust based on actual structure if needed
}

interface Message {
  content: ContentItem[];
  [key: string]: any; // Adjust based on actual structure if needed
}

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

    const messages: Message[] = messagesResponse.data; // Ensure this matches your data structure

    // Remove citation markers from all messages
    const sanitizedMessages = messages.map((message: Message) => {
      if (Array.isArray(message.content)) {
        return {
          ...message,
          content: message.content.map((contentItem: ContentItem) => {
            if (contentItem.text && contentItem.text.value) {
              return {
                ...contentItem,
                text: {
                  ...contentItem.text,
                  value: contentItem.text.value.replace(/【\d+:\d+†source】/g, ''),
                },
              };
            }
            return contentItem;
          }),
        };
      }
      return message;
    });

    return NextResponse.json({ messages: sanitizedMessages, success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong", success: false },
      { status: 500 }
    );
  }
}
