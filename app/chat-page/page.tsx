"use client";

import ChatWindow from "@/components/ChatWindow";
import MessageInput from "@/components/MessageInput";
import SideBar from "@/components/SideBar";
import TopBar from "@/components/TopBar";
import axios from "axios";
import { useEffect } from "react";

const ChatPage = () => {
  useEffect(() => {
    async function getUserThread() {
      try {
        const response = await axios.get("/api/user-thread");
        const thread = response.data;

        if (thread && thread.id) {
          console.log("Thread ID:", thread.id);
        } else {
          console.error("Invalid thread data:", thread);
        }
      } catch (error) {
        console.error("Error fetching user thread:", error);
      }
    }

    getUserThread();
  }, []);

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
