"use client";

import ChatWindow from "@/components/ChatWindow";
import MessageInput from "@/components/MessageInput";
import SideBar from "@/components/SideBar";
import TopBar from "@/components/TopBar";
import axios from "axios";
import { useEffect } from "react";
import { useSetAtom } from "jotai";
import { assistantIdAtom } from "@/state/atoms";

const ChatPage = () => {
  const setAssistantId = useSetAtom(assistantIdAtom);

  useEffect(() => {
    async function getUserThread() {
      try {
        const response = await axios.get("/api/user-thread");
        const thread = response.data;

        if (thread && thread.id) {
          setAssistantId(thread.id);
        } else {
          console.error("Invalid thread data:", thread);
        }
      } catch (error) {
        console.error("Error fetching user thread:", error);
      }
    }

    getUserThread();
  }, [setAssistantId]);

  return (
    <div className="text-black flex h-screen">
      <SideBar />
      {/* Main Content */}
      <main className="flex flex-col flex-1 w-0 overflow-hidden">
        <TopBar />
        <ChatWindow />
        <MessageInput />
      </main>
    </div>
  );
};

export default ChatPage;
