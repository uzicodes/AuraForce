'use client';

import { useEffect, useCallback } from 'react';
import { useClerk, useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export const useAutoLogout = (timeoutMinutes = 30) => {
  const { signOut } = useClerk();
  const { isSignedIn } = useAuth();
  const router = useRouter();

  // Convert minutes to milliseconds (30 mins = 1,800,000 ms)
  const TIMEOUT_MS = timeoutMinutes * 60 * 1000;

  const handleLogout = useCallback(async () => {
    try {
      await signOut();
      router.push('/login'); // Redirect to login after logout
    } catch (error) {
      console.error('Logout error:', error);
    }
  }, [signOut, router]);

  useEffect(() => {
    // Only run this logic if the user is actually signed in
    if (!isSignedIn) return;

    let timeoutId: NodeJS.Timeout;

    const resetTimer = () => {
      // Clear existing timer
      if (timeoutId) clearTimeout(timeoutId);
      // Set new timer
      timeoutId = setTimeout(handleLogout, TIMEOUT_MS);
    };

    // Events to listen for (user activity)
    const events = [
      'mousedown',
      'mousemove',
      'keydown',
      'scroll',
      'touchstart',
      'click'
    ];

    // 1. Set initial timer
    resetTimer();

    // 2. Add event listeners
    events.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    // 3. Cleanup: Remove listeners & timer on unmount
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      events.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, [isSignedIn, handleLogout, TIMEOUT_MS]);

  return; // This hook doesn't need to return anything
};