'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import AutoLogoutProvider from '@/Components/Shared/AutoLogoutProvider';
import HomeScrollProgress from '@/Components/Shared/HomeScrollProgress';
import ScrollToTop from '@/Components/Helpers/ScrollToTop';
import GlobalLoader, { LoaderProvider, useLoader } from '@/Components/Shared/GlobalLoader';
import Navbar from '@/Components/Shared/Navbar';
import Footer from '@/Components/Shared/Footer';

/** Inner layout that can access LoaderContext */
function LayoutInnerContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isInitialLoading, isRouteLoading } = useLoader();

  const isLoading = isInitialLoading || isRouteLoading;

  // Hide footer on login and register pages
  const hideFooter = pathname === '/login' || pathname === '/register' || pathname?.startsWith('/admin');
  const hideNavbar = pathname?.startsWith('/admin');

  return (
    <>
      <GlobalLoader />

      {/* --- AMBIENT GLOW BACKGROUND  --- */}
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

      {!hideFooter && !isLoading && <Footer />}
      <Toaster />
    </>
  );
}

export default function LayoutInner({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <LoaderProvider>
      <QueryClientProvider client={queryClient}>
        <AutoLogoutProvider>
          <LayoutInnerContent>{children}</LayoutInnerContent>
        </AutoLogoutProvider>
      </QueryClientProvider>
    </LoaderProvider>
  );
}
