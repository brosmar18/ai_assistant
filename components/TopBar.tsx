"use client";


import React, { useState } from "react";
import Image from "next/image";
import { IoIosSearch, IoMdMenu } from "react-icons/io";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import Link from "next/link";

const TopBar = () => {
  const [open, setOpen] = useState(false);

  const toggleSheet = () => setOpen(!open);

  return (
    <header className="flex items-center justify-between flex-shrink-0 p-4 bg-white border-b">
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        className="md:hidden p-2"
        onClick={toggleSheet}
        id="mobile-menu-button"
      >
        <IoMdMenu className="w-6 h-6 text-black" />
      </Button>

      {/* Sidebar for Mobile */}
      <Sheet open={open} onOpenChange={toggleSheet}>
        <SheetContent side="left" className="bg-white p-4">
          <SheetHeader>
            <SheetTitle className="text-lg font-bold text-black">
              Menu
            </SheetTitle>
          </SheetHeader>
          <nav className="space-y-4 mt-4">
            <Link
              href="/"
              className="block text-gray-700 text-base font-medium hover:bg-gray-200 p-2 rounded"
            >
              Dashboard
            </Link>
            <Link
              href="/messages"
              className="block text-gray-700 text-base font-medium hover:bg-gray-200 p-2 rounded"
            >
              Messages
            </Link>
            <Link
              href="/settings"
              className="block text-gray-700 text-base font-medium hover:bg-gray-200 p-2 rounded"
            >
              Settings
            </Link>
          </nav>
        </SheetContent>
      </Sheet>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search..."
            className="pr-10" // Add padding for the button overlap
          />
          <Button variant="ghost" className="absolute inset-y-0 right-0 p-2">
            <IoIosSearch className="w-5 h-5 text-black" />
          </Button>
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
