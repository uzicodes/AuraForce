'use client';

import { createContext, use, useState, useCallback, useEffect, useMemo, useSyncExternalStore } from 'react';
import styles from './GlobalLoader.module.css';

// --- Loader Context ---

interface LoaderContextType {
  isInitialLoading: boolean;
  isRouteLoading: boolean;
  setRouteLoading: (loading: boolean) => void;
}

const LoaderContext = createContext<LoaderContextType>({
  isInitialLoading: true,
  isRouteLoading: false,
  setRouteLoading: () => {},
});

export const useLoader = () => use(LoaderContext);

const subscribeReadyState = (callback: () => void) => {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('load', callback);
  const timer = setTimeout(callback, 15000);
  return () => {
    window.removeEventListener('load', callback);
    clearTimeout(timer);
  };
};

const getReadyStateSnapshot = () => {
  if (typeof document === 'undefined') return true;
  return document.readyState !== 'complete';
};

const getServerReadySnapshot = () => true;

export const LoaderProvider = ({ children }: { children: React.ReactNode }) => {
  const isInitialLoading = useSyncExternalStore(subscribeReadyState, getReadyStateSnapshot, getServerReadySnapshot);
  const [isRouteLoading, setIsRouteLoading] = useState(false);

  const setRouteLoading = useCallback((loading: boolean) => {
    setIsRouteLoading(loading);
  }, []);

  const contextValue = useMemo(() => ({
    isInitialLoading,
    isRouteLoading,
    setRouteLoading,
  }), [isInitialLoading, isRouteLoading, setRouteLoading]);

  return (
    <LoaderContext.Provider value={contextValue}>
      {children}
    </LoaderContext.Provider>
  );
};

// --- Loader UI Component ---

const GlobalLoader = ({ forceShow = false }: { forceShow?: boolean }) => {
  const { isInitialLoading } = useLoader();

  if (!forceShow && !isInitialLoading) return null;

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
