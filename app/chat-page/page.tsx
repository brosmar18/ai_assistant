"use client";

import ChatWindow from "@/components/ChatWindow";
import MessageInput from "@/components/MessageInput";
import SideBar from "@/components/SideBar";
import TopBar from "@/components/TopBar";
import axios from "axios";
import { useEffect, useState, useCallback, useRef } from "react";
import { useSetAtom, useAtom } from 'jotai';
import { userThreadAtom, assistantIdAtom } from "../../state/atoms";
import toast from 'react-hot-toast';

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

interface UserThread {
  id: string; // Thread ID from OpenAI
  // Include other properties if needed
}

const POLLING_FREQUENCY_MS = 3000;

const ChatPage = () => {
  const setUserThread = useSetAtom(userThreadAtom);
  const [assistantId] = useAtom(assistantIdAtom);
  const [userThread, setUserThreadState] = useState<UserThread | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState("");

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch Messages
  const fetchMessages = useCallback(async (threadId: string) => {
    if (!threadId) {
      console.warn("No threadId provided.");
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
        return;
      }

      const newMessages = response.data.messages.sort((a, b) => a.created_at - b.created_at);

      setMessages(newMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast.error("Failed to fetch messages.");
    }
  }, []);

  // Fetch User Thread
  useEffect(() => {
    async function getUserThread() {
      try {
        const response = await axios.get("/api/user-thread");
        const thread = response.data;

        if (thread && thread.id) {
          console.log("Thread ID:", thread.id);
          // Set the userThread atom and state
          setUserThread(thread);
          setUserThreadState(thread);

          // Fetch messages after getting the thread
          fetchMessages(thread.id);
        } else {
          console.error("Invalid thread data:", thread);
        }
      } catch (error) {
        console.error("Error fetching user thread:", error);
        setUserThreadState(null);
      }
    }

    getUserThread();
  }, [setUserThread, fetchMessages]);

  // Start a Run
  const startRun = async (threadId: string, assistantId: string): Promise<string> => {
    try {
      const response = await axios.post<{
        success: boolean;
        run?: any;
        error?: string;
      }>("/api/run/create", { threadId, assistantId });

      if (!response.data.success || !response.data.run) {
        console.error(response.data.error);
        toast.error("Failed to start run.");
        return "";
      }

      return response.data.run.id;
    } catch (error) {
      console.error("Failed to start run:", error);
      toast.error("Failed to start run.");
      return "";
    }
  };

  // Poll Run Status
  const pollRunStatus = (threadId: string, runId: string) => {
    const pollStatus = async () => {
      try {
        const response = await axios.post<{
          success: boolean;
          run?: any;
          error?: string;
        }>("/api/run/retrieve", { threadId, runId });

        if (!response.data.success || !response.data.run) {
          console.error(response.data.error);
          toast.error("Failed to poll run status.");
          return;
        }

        if (response.data.run.status === "completed") {
          clearInterval(intervalRef.current!);
          fetchMessages(threadId); // Fetch messages once the run is complete
        } else if (response.data.run.status === "failed") {
          clearInterval(intervalRef.current!);
          toast.error("Run failed.");
        }
      } catch (error) {
        console.error("Failed to poll run status:", error);
        toast.error("Failed to poll run status.");
        clearInterval(intervalRef.current!);
      }
    };

    intervalRef.current = setInterval(pollStatus, POLLING_FREQUENCY_MS);
  };

  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Send Message
  const sendMessage = async () => {
    if (!userThread || sending || !assistantId || !message.trim()) {
      toast.error("Failed to send message. Invalid state.");
      return;
    }

    setSending(true);

    try {
      const response = await axios.post<{
        success: boolean;
        message?: Message;
        error?: string;
      }>("/api/message/create", {
        message,
        threadId: userThread.id, // Updated
        fromUser: true,
      });

      if (!response.data.success || !response.data.message) {
        console.error(response.data.error ?? "No message returned.");
        toast.error("Failed to send message. Please try again.");
        return;
      }

      const newMessage = response.data.message;
      if (newMessage) {
        setMessages((prev) => [...prev, newMessage]);
      }

      setMessage("");
      toast.success("Message sent.");

      const runId = await startRun(userThread.id, assistantId); // Updated
      if (runId) {
        pollRunStatus(userThread.id, runId); // Updated
      }
    } catch (error) {
      console.error("Failed to send message:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setSending(false);
    }
  };

  // Handle Enter Key Press
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="text-black flex h-screen">
      <SideBar />
      {/* Main Content */}
      <main className="flex flex-col flex-1 w-0 overflow-hidden bg-gray-700 text-white">
        <TopBar />
        <ChatWindow messages={messages} />
        <MessageInput
          message={message}
          setMessage={setMessage}
          handleKeyDown={handleKeyDown}
          sendMessage={sendMessage}
          sending={sending}
        />
      </main>
    </div>
  );
};

export default ChatPage;
