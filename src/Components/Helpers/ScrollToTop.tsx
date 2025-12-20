"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Force window to top instantly whenever the path changes
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}