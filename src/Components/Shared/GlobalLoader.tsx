'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './GlobalLoader.module.css';

const GlobalLoader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if the page has already finished loading on initial mount
    if (document.readyState === 'complete') {
      setIsLoading(false);
      return;
    }

    // Listen for the initial load event
    const handleLoad = () => {
      setIsLoading(false);
    };

    window.addEventListener('load', handleLoad);

    // Fallback timeout for initial load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => {
      window.removeEventListener('load', handleLoad);
      clearTimeout(timer);
    };
  }, []);

  // Handle client-side navigation
  useEffect(() => {
    const handleRouteChangeStart = () => {
      setIsLoading(true);
    };

    const handleRouteChangeEnd = () => {
      setIsLoading(false);
    };

    // Listen for Next.js router events
    window.addEventListener('routeChangeStart', handleRouteChangeStart);
    window.addEventListener('routeChangeEnd', handleRouteChangeEnd);

    return () => {
      window.removeEventListener('routeChangeStart', handleRouteChangeStart);
      window.removeEventListener('routeChangeEnd', handleRouteChangeEnd);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950">
      <div className="flex flex-col items-center justify-center gap-8">
        {/* Square Grid Loader Animation */}
        <div className={styles.loaderContainer}>
          <div className={`${styles.square} ${styles.sq1}`}></div>
          <div className={`${styles.square} ${styles.sq2}`}></div>
          <div className={`${styles.square} ${styles.sq3}`}></div>
          <div className={`${styles.square} ${styles.sq4}`}></div>
          <div className={`${styles.square} ${styles.sq5}`}></div>
          <div className={`${styles.square} ${styles.sq6}`}></div>
          <div className={`${styles.square} ${styles.sq7}`}></div>
          <div className={`${styles.square} ${styles.sq8}`}></div>
          <div className={`${styles.square} ${styles.sq9}`}></div>
        </div>
        
        {/* Brand text */}
        <p className="text-3xl font-bold text-white" style={{ fontFamily: 'Tenada, sans-serif' }}>
          AURA<span className="text-emerald-400">FORCE</span>
        </p>
      </div>
    </div>
  );
};

export default GlobalLoader;
