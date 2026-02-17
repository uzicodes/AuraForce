import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware();

export const config = {
  matcher: [
    // Skip Next.js internals, static files, and SSLCommerz payment CALLBACK routes
    '/((?!_next|api/payment/success|api/payment/fail|api/payment/cancel|api/payment/ipn|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes EXCEPT SSLCommerz payment callbacks
    '/(api(?!/payment/success|/payment/fail|/payment/cancel|/payment/ipn)|trpc)(.*)',
  ],
};
