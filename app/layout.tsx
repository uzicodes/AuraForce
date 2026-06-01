import { Ubuntu } from 'next/font/google';
import localFont from 'next/font/local';
import { ClerkProvider } from '@clerk/nextjs';
import '../src/index.css';
import '../src/App.css';
import '../src/button.css';
import LayoutInner from './LayoutInner';

// Import Ubuntu from Google Fonts with optimization
const ubuntu = Ubuntu({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-ubuntu',
});

// Import Satoshi local font (.woff2)
const satoshi = localFont({
  src: [
    {
      path: '../public/fonts/Satoshi-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Satoshi-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/Satoshi-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-satoshi',
});

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

// Import Parket local font (.woff2)
const parket = localFont({
  src: [
    {
      path: '../public/fonts/Parket.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-parket',
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
    <ClerkProvider
      signInUrl="/login"
      signUpUrl="/register"
      signInFallbackRedirectUrl="/"
      signUpFallbackRedirectUrl="/"
      afterSignOutUrl="/"
    >
      <html
        lang="en"
        className={`${ubuntu.variable} ${satoshi.variable} ${tenada.variable} ${parket.variable}`}
      >
        <head>
          {/* Preconnect to Clerk frontend API domain for faster connection */}
          <link rel="preconnect" href="https://api.clerk.dev" />
          <link rel="dns-prefetch" href="https://api.clerk.dev" />
          
          {/* Preconnect to Clerk JS bundles */}
          <link rel="preconnect" href="https://cdn.clerk.com" />
          <link rel="dns-prefetch" href="https://cdn.clerk.com" />
        </head>
        <body className="bg-zinc-950 text-white selection:bg-emerald-500/30">
          <LayoutInner>{children}</LayoutInner>
        </body>
      </html>
    </ClerkProvider>
  );
}