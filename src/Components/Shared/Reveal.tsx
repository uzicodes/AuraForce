"use client";

import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

interface Props {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  delay?: number; // Optional delay
}

export const Reveal = ({ children, width = "100%", delay = 0 }: Props) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-75px" }); // Trigger when 75px of element is visible
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  return (
    <div ref={ref} style={{ position: "relative", width, overflow: "hidden" }}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 }, // Start 75px lower and invisible
          visible: { opacity: 1, y: 0 }, // End at normal position and visible
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.5, delay: delay, ease: "easeOut" }} // Smooth easing
      >
        {children}
      </motion.div>
    </div>
  );
};