'use client'

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React from 'react';

const SideBar = () => {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64 bg-green border-r border-gray shadow-2xl">
        {/* Sidebar Header */}
        <header className="flex items-center justify-center h-16 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-white shadow-lg border-b-4 border-green-500">
          <Image
            src="/cdata_banner.png"
            alt="Collective Data"
            width={160}
            height={40}
            className="object-contain"
          />
        </header>

        {/* Sidebar Content */}
        <div className="flex flex-col flex-1 overflow-y-auto bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-white shadow-lg">
          <nav className="flex-1 px-2 py-4 space-y-4">
            {/* Dashboard Link */}
            <Link
              href="/"
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition duration-300 ease-in-out
                ${pathname === '/' 
                  ? 'bg-primary text-white shadow-lg transform translate-x-1 -translate-y-1' 
                  : 'bg-green text-primary hover:bg-primary hover:text-white hover:shadow-lg'}`}
            >
              Chat
            </Link>

            {/* Messages Link */}
            {/* <Link
              href="/messages"
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition duration-300 ease-in-out
                ${pathname === '/messages' 
                  ? 'bg-primary text-white shadow-lg transform translate-x-1 -translate-y-1' 
                  : 'bg-green text-primary hover:bg-primary hover:text-white hover:shadow-lg'}`}
            >
              Messages
            </Link> */}

            {/* Profile Link */}
            <Link
              href="/profile"
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition duration-300 ease-in-out
                ${pathname === '/profile' 
                  ? 'bg-primary text-white shadow-lg transform translate-x-1 -translate-y-1' 
                  : 'bg-green text-primary hover:bg-primary hover:text-white hover:shadow-lg'}`}
            >
              Profile
            </Link>
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
