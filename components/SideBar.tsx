import Link from 'next/link';
import React from 'react';

const SideBar = () => {
  return (
    <aside className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64 bg-white border-r">
        {/* Sidebar Header */}
        <header className="flex items-center h-16 px-4 bg-blue-600 text-white">
          <h1 className="text-lg font-semibold">Chat Dashboard</h1>
        </header>

        {/* Sidebar Content */}
        <div className="flex flex-col flex-1 overflow-y-auto">
          <nav className="flex-1 px-2 py-4 space-y-2">
            <Link
              href="/"
              className="flex items-center px-2 py-2 text-sm font-medium text-gray-700 rounded hover:bg-gray-200"
            >
              Dashboard
            </Link>
            <Link
              href="/"
              className="flex items-center px-2 py-2 text-sm font-medium text-gray-700 rounded hover:bg-gray-200"
            >
              Messages
            </Link>
            <Link
              href="/"
              className="flex items-center px-2 py-2 text-sm font-medium text-gray-700 rounded hover:bg-gray-200"
            >
              Settings
            </Link>
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
