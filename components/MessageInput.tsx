import React from 'react';

const MessageInput = () => {
  return (
    <div className="flex-shrink-0 p-4 bg-white border-t">
      <form className="relative flex">
        <input
          type="text"
          placeholder="Type a message"
          className="w-full px-4 py-2 border rounded-md focus:outline-none"
        />
        <button
          type="submit"
          className="absolute inset-y-0 right-0 flex items-center px-4 text-white bg-blue-600 rounded-r-md hover:bg-blue-700"
        >
          <svg className="w-5 h-5" fill="currentColor">
            <path d="M2.003 5.884l10-3a1 1 0 011.265 1.265l-3 10a1 1 0 01-1.88.163L6.5 13.5l-2.516 2.516a1 1 0 01-1.414-1.414L5.086 12l-1.797-4.386a1 1 0 01.714-1.73z" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
