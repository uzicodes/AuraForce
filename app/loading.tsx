"use client";

import { useEffect } from "react";
import { hatch } from 'ldrs'
import { Orbitron } from "next/font/google"; 

const orbitron = Orbitron({ subsets: ["latin"], weight: "700" });

export default function Loading() {
  useEffect(() => {
    // ldrs requires registration in the browser
    if (typeof window !== "undefined") {
      hatch.register();
    }
  }, []);

  return (
    <div className="flex min-h-[60vh] w-full flex-col items-center justify-center gap-6 bg-zinc-950">
      
      {/* Hatch Loader */}
      <l-hatch
        size="50"       
        stroke="4"
        speed="3.5"
        color="#10b981" // Emerald-500
      ></l-hatch>

      {/* AURA FORCE with Animation */}
      <div className="flex flex-col items-center gap-1">
        <h1 className={`${orbitron.className} text-xl tracking-widest text-white animate-pulse`}>
          AURA <span className="text-emerald-500">FORCE</span>
        </h1>
        <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">
          Loading...
        </p>
      </div>

    </div>
  );
}
