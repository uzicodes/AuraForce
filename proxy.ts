import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';
import { NextResponse } from 'next/server';

// Initialize Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Initialize rate limiter with unique prefix for shared database in upstash(redis)
const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, '10 s'),
  prefix: 'auraforce_ratelimit',
});

// Only these routes REQUIRE authentication — everything else is public
const isProtectedRoute = createRouteMatcher([
  '/profile(.*)',
  '/nutrition(.*)',
  '/book-membership(.*)',
  '/book-trainer(.*)',
  '/book-class(.*)',
  '/checkout(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  // Rate limit API routes (exclude admin routes — they're behind admin auth)
  if (req.nextUrl.pathname.startsWith('/api/') && !req.nextUrl.pathname.startsWith('/api/admin/')) {
    const ip = req.headers.get('x-forwarded-for') ?? '127.0.0.1';
    const { success } = await ratelimit.limit(ip);

    if (!success) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429 }
      );
    }
  }

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
