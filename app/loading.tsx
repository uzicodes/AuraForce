"use client";

import { useEffect } from "react";
import GlobalLoader, { useLoader } from "@/Components/Shared/GlobalLoader";

// Next.js Suspense fallback — shown while page server components are loading.
export default function Loading() {
  const { setRouteLoading } = useLoader();

  useEffect(() => {
    setRouteLoading(true);
    return () => setRouteLoading(false);
  }, [setRouteLoading]);

  return <GlobalLoader forceShow />;
}