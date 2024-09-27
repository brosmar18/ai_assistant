import Image from "next/image";
import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { useUser } from "@clerk/nextjs"; // Import Clerk's useUser hook

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
  const { user } = useUser(); // Get the logged-in user details
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto bg-gray-800 text-white">
      <div className="px-4 py-6">
        {/* Messages */}
        <div className="space-y-6">
          {messages.map((message) => {
            const messageTexts = message.content
              .map((contentItem) => contentItem.text.value)
              .join(' ');

            const time = new Date(message.created_at * 1000).toLocaleTimeString();

            if (message.role === 'assistant') {
              // Incoming Message (Assistant)
              return (
                <div key={message.id} className="flex items-start">
                    <Image
                      src="/cdata_logo.png"
                      alt="Assistant Avatar"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  <div className="ml-3">
                    <div className="px-4 py-3 bg-white text-white rounded-xl shadow-lg shadow-gray-500/50">
                      <div className="text-sm prose">
                        <ReactMarkdown>{messageTexts}</ReactMarkdown>
                      </div>
                    </div>
                    <span className="text-xs text-gray-300">{time}</span>
                  </div>
                </div>
              );
            } else {
              // Outgoing Message (User)
              return (
                <div key={message.id} className="flex justify-end items-start">
                  <div className="mr-3 text-right">
                    <div className="px-4 py-3 bg-primary text-white rounded-xl shadow-lg shadow-gray-500/50">
                      <p className="text-sm">{messageTexts}</p>
                    </div>
                    <span className="text-xs text-gray-300">{time}</span>
                  </div>
                    <Image
                      src={user?.imageUrl || "/user_avatar.png"} // Dynamically set user's avatar
                      alt="User Avatar"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                </div>
              );
            }
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
