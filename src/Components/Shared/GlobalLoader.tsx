'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import styles from './GlobalLoader.module.css';

const GlobalLoader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  // Handle initial page load
  useEffect(() => {
    if (document.readyState === 'complete') {
      setIsLoading(false);
      return;
    }

    const handleLoad = () => {
      setIsLoading(false);
    };

    window.addEventListener('load', handleLoad);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => {
      window.removeEventListener('load', handleLoad);
      clearTimeout(timer);
    };
  }, []);

  // Handle navigation between pages
  useEffect(() => {
    setIsLoading(true);

    // Add a small delay to ensure new content is rendering
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [pathname]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-zinc-950 pointer-events-auto">
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
