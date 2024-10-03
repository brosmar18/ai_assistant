"use client";

import React, { useState } from "react";
import { IoIosSearch, IoMdMenu } from "react-icons/io";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs"; 
import Image from "next/image";
import { usePathname } from 'next/navigation';

const TopBar = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const toggleSheet = () => setOpen(!open);

  return (
    <header className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-white shadow-md border-b-2 border-green h-16">
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        className="md:hidden p-2 text-green"
        onClick={toggleSheet}
        id="mobile-menu-button"
      >
        <IoMdMenu className="w-6 h-6" />
      </Button>

      {/* Sidebar for Mobile */}
      <Sheet open={open} onOpenChange={toggleSheet}>
        <SheetContent
          side="left"
          className="w-72 bg-gradient-to-b from-gray-700 via-gray-800 to-gray-900 text-white shadow-xl flex flex-col"
        >
          {/* Sidebar Header */}
          <SheetHeader className="flex items-center justify-end p-4 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-white shadow-lg border-b-2 border-gray relative mt-5">
            <div className="flex-1 flex items-center">
              <Image
                src="/cdata_banner.png"
                alt="Collective Data"
                width={140}
                height={35}
                className="object-contain"
              />
            </div>
          </SheetHeader>

          {/* Sidebar Content */}
          <nav className="flex-1 px-4 py-6 space-y-6 overflow-y-auto">
            {/* Chat Link */}
            <Link
              href="/"
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition duration-300 ease-in-out
                ${pathname === '/' 
                  ? 'bg-primary text-white shadow-lg transform translate-x-1 -translate-y-1' 
                  : 'bg-green text-primary hover:bg-primary hover:text-white hover:shadow-lg'}`}
            >
              Chat
            </Link>

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
        </SheetContent>
      </Sheet>

      {/* Search and Profile on the Right */}
      <div className="hidden md:flex items-center space-x-4 ml-auto">
        {/* Search Input with Icon */}
        <div className="relative">
          <Input
            type="text"
            placeholder="Search..."
            className="pr-10 bg-white text-primary border border-gray rounded-lg focus:ring-primary focus:border-primary"
          />
          <Button
            variant="ghost"
            className="absolute inset-y-0 right-0 p-2 text-primary"
          >
            <IoIosSearch className="w-5 h-5" />
          </Button>
        </div>
        <UserButton />
      </div>
    </header>
  );
};

export default TopBar;
