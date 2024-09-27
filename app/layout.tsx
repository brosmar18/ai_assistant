import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import {
  ClerkProvider,
} from '@clerk/nextjs'




export const metadata: Metadata = {
  title: "Create Next App",
  description: "Collective Data UserGuide Assistant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className="bg-gray-100">
        {children}
      </body>
    </html>
  </ClerkProvider>
  );
}
