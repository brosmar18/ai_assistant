import Image from "next/image";
import { useEffect, useRef } from "react";

interface ContentItem {
  type: string;
  text: {
    value: string;
    annotations: any[];
  };
}

interface Message {
  id: string;
  content: ContentItem[];
  created_at: number;
  role: 'user' | 'assistant';
}

interface ChatWindowProps {
  messages: Message[];
}

const ChatWindow = ({ messages }: ChatWindowProps) => {
  console.log("Messages", messages);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <main className="flex-1 overflow-y-auto">
      <div className="px-4 py-6">
        {/* Messages */}
        <div className="space-y-4">
          {messages.map((message) => {
            const messageTexts = message.content
              .map((contentItem) => contentItem.text.value)
              .join(' ');

            const time = new Date(message.created_at * 1000).toLocaleTimeString();

            if (message.role === 'assistant') {
              // Incoming Message
              return (
                <div key={message.id} className="flex">
                  <Image
                    src="/profile1.png"
                    alt="Assistant Avatar"
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="ml-3">
                    <div className="px-4 py-2 bg-white rounded-lg shadow">
                      <p className="text-sm text-gray-700">{messageTexts}</p>
                    </div>
                    <span className="text-xs text-gray-500">{time}</span>
                  </div>
                </div>
              );
            } else {
              // Outgoing Message
              return (
                <div key={message.id} className="flex justify-end">
                  <div className="mr-3 text-right">
                    <div className="px-4 py-2 text-white bg-blue-600 rounded-lg shadow">
                      <p className="text-sm">{messageTexts}</p>
                    </div>
                    <span className="text-xs text-gray-500">{time}</span>
                  </div>
                  <Image
                    src="/profile1.png"
                    alt="User Avatar"
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full"
                  />
                </div>
              );
            }
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>
    </main>
  );
};

export default ChatWindow;
