'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { ClerkProvider } from '@clerk/nextjs';
import AutoLogoutProvider from '@/Components/Shared/AutoLogoutProvider'; 

import Navbar from '@/Components/Shared/Navbar';
import Footer from '@/Components/Shared/Footer';
import '../src/index.css';
import '../src/App.css';
import '../src/button.css';

export default function RootLayout({ children }) {
  const [queryClient] = useState(() => new QueryClient());
  const pathname = usePathname();

  // Hide footer on login and register pages
  const hideFooter = pathname === '/login' || pathname === '/register';

  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <title>AuraForce !</title>
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16" />
          <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          <link rel="manifest" href="/site.webmanifest" />
        </head>
        <body>
          <QueryClientProvider client={queryClient}>
            
            {/* --- ADD THE WATCHER HERE --- */}
            {/* It must be INSIDE ClerkProvider so it knows if the user is logged in */}
            <AutoLogoutProvider>
              
              <Navbar />
              <div className="min-h-[calc(100vh-216px)]">
                {children}
              </div>
              {!hideFooter && <Footer />}
              <Toaster />

            </AutoLogoutProvider>
            {/* ----------------------------- */}

          </QueryClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}