"use client";

import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { SignInButton } from '@clerk/nextjs';

export default function HomePage() {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push('/chat-page');
    }
  }, [isLoaded, isSignedIn, router]);

  // Don't render anything until Clerk has finished loading the authentication state
  if (!isLoaded) {
    return null; // Optionally, return a loading spinner or placeholder
  }

  // Render only if the user is not signed in
  if (!isSignedIn) {
    return (
      <div className="relative flex justify-center items-center h-screen flex-col bg-gradient-to-r from-[#181F67] via-[#7BB837] to-[#939498] transition-all duration-500">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md z-20">
          <h1 className="text-4xl font-bold mb-4 text-[#181F67]">Welcome to the Home Page</h1>
          <p className="mb-6 text-[#939498] text-lg">Please log in to continue to the chat page.</p>

          {/* Sign In Button */}
          <SignInButton mode="modal">
            <button className="px-6 py-3 bg-[#7BB837] text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75">
              Sign In
            </button>
          </SignInButton>
        </div>
      </div>
    );
  }

  return null; // Prevent any rendering if the user is already signed in
}
