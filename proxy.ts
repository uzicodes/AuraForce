import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Only these routes REQUIRE authentication — everything else is public
const isProtectedRoute = createRouteMatcher([
  '/profile(.*)',
  '/nutrition(.*)',
  '/book-membership(.*)',
  '/book-trainer(.*)',
  '/book-class(.*)',
  '/checkout(.*)',
  '/admin(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
}, {
  signInUrl: '/login',
  signUpUrl: '/register',
});

export const config = {
  matcher: [
    // Skip Next.js internals, static files, and SSLCommerz payment CALLBACK routes
    '/((?!_next|api/payment/success|api/payment/fail|api/payment/cancel|api/payment/ipn|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes EXCEPT SSLCommerz payment callbacks
    '/(api(?!/payment/success|/payment/fail|/payment/cancel|/payment/ipn)|trpc)(.*)',
  ],
};
