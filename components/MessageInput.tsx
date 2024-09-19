import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IoIosSend } from "react-icons/io";

const MessageInput = () => {
  return (
    <div className="flex-shrink-0 p-4 bg-white border-t">
      <form className="relative flex w-full">
        <Input
          type="text"
          placeholder="Type a message"
          className="pr-12" // Add space for the button on the right side
        />
        <Button
          type="submit"
          variant="default" // Or any preferred variant
          className="absolute inset-y-0 right-0 p-2"
        >
          <IoIosSend className="w-5 h-5 text-white" />
        </Button>
      </form>
    </div>
  );
};

export default MessageInput;
