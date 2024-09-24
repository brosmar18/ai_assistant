import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher(['/chatPage(.*)']); // Protect only chatPage and its subroutes

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect(); // Protect only the routes that match
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)', // Protect API routes
    '/chatPage(.*)',    // Add chatPage as protected
  ],
};
