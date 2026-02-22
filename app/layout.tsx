'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { ClerkProvider } from '@clerk/nextjs';
import AutoLogoutProvider from '@/Components/Shared/AutoLogoutProvider';
import HomeScrollProgress from '@/Components/Shared/HomeScrollProgress';
import ScrollToTop from '@/Components/Helpers/ScrollToTop';

import Navbar from '@/Components/Shared/Navbar';
import Footer from '@/Components/Shared/Footer';
import '../src/index.css';
import '../src/App.css';
import '../src/button.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const pathname = usePathname();

  // Hide footer on login and register pages
  const hideFooter = pathname === '/login' || pathname === '/register' || pathname?.startsWith('/admin');
  const hideNavbar = pathname?.startsWith('/admin');

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

        {/* Added bg-zinc-950 here to ensure base is always dark */}
        <body className="bg-zinc-950 text-white selection:bg-emerald-500/30">
          <QueryClientProvider client={queryClient}>

            <AutoLogoutProvider>

              {/* --- AMBIENT GLOW BACKGROUND (Applied to All Pages except admin) --- */}
              {!hideNavbar && (
                <div className="fixed inset-0 -z-50 pointer-events-none overflow-hidden">
                  {/* Top Left Glow */}
                  <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px]" />
                  {/* Bottom Right Glow */}
                  <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px]" />
                </div>
              )}

              {!hideNavbar && <ScrollToTop />}
              {!hideNavbar && <HomeScrollProgress />}

              {!hideNavbar && <Navbar />}

              <div className={hideNavbar ? '' : 'min-h-[calc(100vh-216px)] relative z-0'}>
                {children}
              </div>

              {!hideFooter && <Footer />}
              <Toaster />

            </AutoLogoutProvider>

          </QueryClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}