'use client';

import { useEffect, useCallback, useRef } from 'react';
import { useClerk, useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export const useAutoLogout = (timeoutMinutes = 30, absoluteExpiryHours = 24) => {
  const { signOut } = useClerk();
  const { isSignedIn } = useAuth();
  const router = useRouter();

  // Constants
  const TIMEOUT_MS = timeoutMinutes * 60 * 1000;
  const ABSOLUTE_TIMEOUT_MS = absoluteExpiryHours * 60 * 60 * 1000;
  
  const STORAGE_KEY_LAST_ACTIVE = 'auraforce_last_active';
  const STORAGE_KEY_SESSION_START = 'auraforce_session_start';

  const handleLogout = useCallback(async () => {
    try {
      // Clear tracking data
      localStorage.removeItem(STORAGE_KEY_LAST_ACTIVE);
      localStorage.removeItem(STORAGE_KEY_SESSION_START);
      
      await signOut();
      router.push('/login'); 
    } catch (error) {
      console.error('Logout error:', error);
    }
  }, [signOut, router]);

  useEffect(() => {
    // run this if the user is actually signed in
    if (!isSignedIn) return;

    const now = Date.now();


    
    // Check Inactivity (Persistence check for tab close/reopen)
    const storedLastActive = localStorage.getItem(STORAGE_KEY_LAST_ACTIVE);
    if (storedLastActive) {
      const lastActiveTime = parseInt(storedLastActive, 10);
      // If time since last active > inactivity limit
      if (now - lastActiveTime >= TIMEOUT_MS) {
        // eslint-disable-next-line no-console
        console.log("Session expired due to inactivity, Please login again.");
        handleLogout();
        return;
      }
    }

    // Check Absolute Limit (24h)
    let sessionStart = localStorage.getItem(STORAGE_KEY_SESSION_START);
    if (!sessionStart) {
      // Initialize validation start time if missing
      sessionStart = now.toString();
      localStorage.setItem(STORAGE_KEY_SESSION_START, sessionStart);
    }
    
    const sessionStartTime = parseInt(sessionStart, 10);
    const msSinceStart = now - sessionStartTime;

    // If total session length exceeded
    if (msSinceStart >= ABSOLUTE_TIMEOUT_MS) {
      // eslint-disable-next-line no-console
      console.log("Session expired, Please login again.");
      handleLogout();
      return;
    }



    // Absolute Timer (Independent of activity)

    const timeRemainingAbsolute = ABSOLUTE_TIMEOUT_MS - msSinceStart;
    const absoluteTimer = setTimeout(() => {
      handleLogout();
    }, timeRemainingAbsolute);

    // Inactivity Timer (Resets on activity)
    let inactivityTimer: NodeJS.Timeout;
    
    // localStorage writes (avoid performance hit)
    let lastStorageWrite = now;

    const onUserActivity = () => {
      //Reset the logout timer
      if (inactivityTimer) clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(handleLogout, TIMEOUT_MS);

      // Update 'lastActive' in storage (max once every 5 seconds)
      const currentNow = Date.now();
      if (currentNow - lastStorageWrite > 5000) {
        localStorage.setItem(STORAGE_KEY_LAST_ACTIVE, currentNow.toString());
        lastStorageWrite = currentNow;
      }
    };

    // Events that count as activity
    const events = [
      'mousedown',
      'mousemove',
      'keydown',
      'scroll',
      'touchstart',
      'click'
    ];

    // Initialize the inactivity timer first time
    onUserActivity();

    // Attach listeners
    events.forEach((event) => {
      window.addEventListener(event, onUserActivity);
    });

    // Cleanup function
    return () => {
      if (absoluteTimer) clearTimeout(absoluteTimer);
      if (inactivityTimer) clearTimeout(inactivityTimer);
      events.forEach((event) => {
        window.removeEventListener(event, onUserActivity);
      });
    };
  }, [isSignedIn, handleLogout, TIMEOUT_MS, ABSOLUTE_TIMEOUT_MS]);
};