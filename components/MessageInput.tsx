import React from 'react';

interface MessageInputProps {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  sendMessage: () => void;
  sending: boolean;
}

const MessageInput = ({
  message,
  setMessage,
  handleKeyDown,
  sendMessage,
  sending,
}: MessageInputProps) => {
  return (
    <div className="p-4 border-t border-gray">
      <div className="flex">
        <input
          type="text"
          className="flex-1 px-4 py-2 border border-gray rounded-l-md focus:outline-none focus:border-primary"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={sending}
        />
        <button
          onClick={sendMessage}
          className={`px-4 py-2 text-white rounded-r-md ${
            sending ? 'bg-gray' : 'bg-primary hover:bg-primary-dark'
          }`}
          disabled={sending}
        >
          {sending ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
