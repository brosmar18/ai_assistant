"use client";

import React from "react";
import Image from "next/image";
import { useAtom } from "jotai";
import { assistantIdAtom } from "@/state/atoms";

const ChatWindow = () => {
  const [assistantId] = useAtom(assistantIdAtom);

  return (
    <main className="flex-1 overflow-y-auto">
      <div className="px-4 py-6">
        {/* Messages */}
        <div className="space-y-4">
          {/* Incoming Message */}
          <div className="flex">
            <Image
              src="/profile1.png"
              alt="User Avatar"
              width={40}
              height={40}
              className="w-10 h-10 rounded-full"
            />
            <div className="ml-3">
              <div className="px-4 py-2 bg-white rounded-lg shadow">
                <p className="text-sm text-gray-700">
                  Hello! How can I help you today?
                </p>
              </div>
              <span className="text-xs text-gray-500">9:30 AM</span>
            </div>
          </div>
          {/* Outgoing Message */}
          <div className="flex justify-end">
            <div className="mr-3 text-right">
              <div className="px-4 py-2 text-white bg-blue-600 rounded-lg shadow">
                <p className="text-sm">I have a question about my account.</p>
              </div>
              <span className="text-xs text-gray-500">9:31 AM</span>
            </div>
            <Image
              src="/profile1.png"
              alt="User Avatar"
              width={40}
              height={40}
              className="w-10 h-10 rounded-full"
            />
          </div>
        </div>
      </div>
      <div className="px-4 py-2">
        <h2 className="text-lg font-semibold">Assistant ID:</h2>
        <p className="text-sm text-gray-700">{assistantId || "Loading..."}</p>
      </div>
    </main>
  );
};

export default ChatWindow;
