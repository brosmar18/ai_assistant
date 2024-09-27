"use client";

import { useAuth, RedirectToSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push("/chat-page");
    }
  }, [isLoaded, isSignedIn, router]);

  // Don't render anything until Clerk has finished loading the authentication state
  if (!isLoaded) {
    return null; // Optionally, return a loading spinner or placeholder
  }

  // If the user is not signed in, redirect them to Clerk's sign-in page
  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  // Optionally return null or a placeholder since the component shouldn't render if the user is already signed in
  return null;
}
