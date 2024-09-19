import ChatWindow from "@/components/ChatWindow"
import SideBar from "@/components/SideBar"
import TopBar from "@/components/TopBar"

const page = () => {
  return (
    <div className='text-black flex h-screen'>
      <SideBar />
      {/* Main Content  */}
      <div className="flex flex-col flex-1 w-0 overflow-hidden">
      <TopBar />
      <ChatWindow />
      </div>
    </div>
  )
}

export default page