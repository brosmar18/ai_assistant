import ChatWindow from "@/components/ChatWindow"
import SideBar from "@/components/SideBar"
import TopBar from "@/components/TopBar"

const page = () => {
  return (
    <div className='text-black flex h-screen'>
      <SideBar />
      <ChatWindow />
      <TopBar />
    </div>
  )
}

export default page