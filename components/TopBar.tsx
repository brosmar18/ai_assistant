"use client";

import React, { useState } from "react";
import { IoIosSearch, IoMdMenu } from "react-icons/io";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs"; 
import Image from "next/image";

const TopBar = () => {
  const [open, setOpen] = useState(false);

  const toggleSheet = () => setOpen(!open);

  return (
    <header className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-white shadow-lg border-b-4 border-green-500 h-16">
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        className="md:hidden p-2 text-primary"
        onClick={toggleSheet}
        id="mobile-menu-button"
      >
        <IoMdMenu className="w-6 h-6" />
      </Button>

      {/* Sidebar for Mobile */}
      <Sheet open={open} onOpenChange={toggleSheet}>
        <SheetContent side="left" className="bg-green p-4">
          <SheetHeader>
            <SheetTitle className="text-lg font-bold text-primary">
              <Image
                src="/cdata_banner.png"
                alt="Collective Data"
                width={160}
                height={40}
                className="object-contain"
              />
            </SheetTitle>
          </SheetHeader>
          <nav className="space-y-4 mt-4">
            <Link
              href="/"
              className="block text-primary text-base font-medium hover:bg-primary hover:text-white p-2 rounded transition"
            >
              Dashboard
            </Link>
            <Link
              href="/messages"
              className="block text-primary text-base font-medium hover:bg-primary hover:text-white p-2 rounded transition"
            >
              Messages
            </Link>
            <Link
              href="/settings"
              className="block text-primary text-base font-medium hover:bg-primary hover:text-white p-2 rounded transition"
            >
              Settings
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
        {/* Replace Image with Clerk UserButton for account management */}
        <UserButton />
      </div>
    </header>
  );
};

export default TopBar;
