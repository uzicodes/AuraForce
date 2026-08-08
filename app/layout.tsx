import localFont from 'next/font/local';
import { ClerkProvider } from '@clerk/nextjs';
import '../src/index.css';
import '../src/App.css';
import '../src/button.css';
import LayoutInner from './LayoutInner';
import SmoothScrolling from '../src/Components/SmoothScrolling';

// Import Tenada local font (.woff2)
const tenada = localFont({
  src: [
    {
      path: '../public/fonts/Tenada.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-tenada',
});

// Import Slunkyn local font (.woff2) for Headings
const slunkyn = localFont({
  src: [
    {
      path: '../public/fonts/slunkyn.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-slunkyn',
});

// Import BebasNeue local font (.woff2)
const bebas = localFont({
  src: [
    {
      path: '../public/fonts/BebasNeue.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-bebas',
});

// Import SpaceGrotesk local font (.woff2)
const spaceGrotesk = localFont({
  src: [
    {
      path: '../public/fonts/SpaceGrotesk.woff2',
      weight: '400 700',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-space-grotesk',
});

export const metadata = {
  title: 'AuraForce !',
  icons: {
    icon: [
      {
        url: '/favicon.ico',
      },
      {
        url: '/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        url: '/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${tenada.variable} ${bebas.variable} ${slunkyn.variable} ${spaceGrotesk.variable}`}
    >
      <head>
        {/* Preconnect to Clerk frontend API domain for faster connection */}
        <link rel="preconnect" href="https://api.clerk.dev" />
        <link rel="dns-prefetch" href="https://api.clerk.dev" />
        
        {/* Preconnect to Clerk JS bundles */}
        <link rel="preconnect" href="https://cdn.clerk.com" />
        <link rel="dns-prefetch" href="https://cdn.clerk.com" />
      </head>
      <body suppressHydrationWarning className="bg-zinc-950 text-white selection:bg-emerald-500/30 font-space-grotesk"><ClerkProvider
          signInUrl="/login"
          signUpUrl="/register"
          signInFallbackRedirectUrl="/"
          signUpFallbackRedirectUrl="/"
          afterSignOutUrl="/">
          <SmoothScrolling>
            <LayoutInner>{children}</LayoutInner>
          </SmoothScrolling>
        </ClerkProvider></body>
    </html>
  );
}