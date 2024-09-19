import React from "react";
import Image from "next/image";

const TopBar = () => {
  return (
    <header className="flex items-center justify-between flex-shrink-0 p-4 bg-white border-b">
      {/* Mobile Menu Button */}
      <button
        className="text-gray-500 focus:outline-none md:hidden"
        id="mobile-menu-button"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <input
            type="text"
            className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none"
            placeholder="Search..."
          />
          <button className="absolute inset-y-0 right-0 flex items-center pr-3">
            <svg className="w-5 h-5 text-gray-500" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm6-8a6 6 0 11-12 0 6 6 0 0112 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <Image
          src="/profile1.png"
          alt="Avatar"
          width={32}
          height={32}
          className="w-8 h-8 rounded-full"
        />
      </div>
    </header>
  );
};

export default TopBar;
