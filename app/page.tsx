import ChatWindow from "@/components/ChatWindow";
import MessageInput from "@/components/MessageInput";
import SideBar from "@/components/SideBar";
import TopBar from "@/components/TopBar";

const ChatPage = () => {
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
