"use client";

import ChatWindow from "@/components/ChatWindow";
import MessageInput from "@/components/MessageInput";
import SideBar from "@/components/SideBar";
import TopBar from "@/components/TopBar";
import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { useSetAtom } from 'jotai';
import { userThreadAtom } from "../../state/atoms";
import toast from 'react-hot-toast';

// Define ContentItem interface
interface ContentItem {
  type: string;
  text: {
    value: string;
    annotations: any[];
  };
}

// Update Message interface
interface Message {
  id: string;
  content: ContentItem[];
  created_at: number;
  role: 'user' | 'assistant';
}

const ChatPage = () => {
  const setUserThread = useSetAtom(userThreadAtom);
  const [messages, setMessages] = useState<Message[]>([]);
  const [fetching, setFetching] = useState(false);

  const fetchMessages = useCallback(async (threadId: string) => {
    if (!threadId) {
      console.warn("No threadId provided.");
      setFetching(false);
      return;
    }

    console.log("Fetching messages for threadId:", threadId);

    try {
      const response = await axios.post<{ success: boolean; messages: Message[]; error?: string }>(
        "/api/message/list",
        { threadId }
      );

      if (!response.data.success || !response.data.messages) {
        console.error(response.data.error ?? "Unknown error.");
        toast.error("Failed to fetch messages.");
        setFetching(false);
        return;
      }

      const newMessages = response.data.messages.sort((a, b) => a.created_at - b.created_at);

      setMessages(newMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast.error("Failed to fetch messages.");
    } finally {
      setFetching(false);
    }
  }, []);

  useEffect(() => {
    async function getUserThread() {
      try {
        const response = await axios.get("/api/user-thread");
        const thread = response.data;

        if (thread && thread.id) {
          console.log("Thread ID:", thread.id);
          // Set the userThread atom
          setUserThread(thread);

          // Fetch messages
          setFetching(true);
          fetchMessages(thread.id);
        } else {
          console.error("Invalid thread data:", thread);
        }
      } catch (error) {
        console.error("Error fetching user thread:", error);
      }
    }

    getUserThread();
  }, [setUserThread, fetchMessages]);

  return (
    <div className="text-black flex h-screen">
      <SideBar />
      {/* Main Content */}
      <main className="flex flex-col flex-1 w-0 overflow-hidden">
        <TopBar />
        <ChatWindow messages={messages} />
        <MessageInput />
      </main>
    </div>
  );
};

export default ChatPage;
