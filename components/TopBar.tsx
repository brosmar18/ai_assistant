import React from "react";

const TopBar = () => {
  return (
    <div className="flex items-center justify-between flex-shrink-0 p-4">
      {/* Mobile Menu Button  */}
      <button
        className="text-gray-500 focus:outline-none md:hidden"
        id="mobile-menu-button"
      >
        {" "}
        <svg className="w-6 h-6" fill="none" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
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
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm6-8a6 6 0 11-12 0 6 6 0 0112 0z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
        <img src="https://via.placeholder.com/32" alt="Avatar" className="w-8 h-8 rounded-full" />
      </div>
    </div>
  );
};

export default TopBar;
