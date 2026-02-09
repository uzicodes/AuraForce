"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function HomeScrollProgress() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  // Hook into scroll position
  const { scrollYProgress } = useScroll();

  // Make the movement smooth (spring physics)
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Only show on Homepage ("/")
  useEffect(() => {
    if (pathname === "/") {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [pathname]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-emerald-500 origin-left z-[100]"
      style={{ scaleX }}
    />
  );
}