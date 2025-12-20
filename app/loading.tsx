"use client";

import React from "react";
// Adjust the path if your component is in a different folder
import LoadingSpinner from "@/Components/Shared/LoadingSpinner";

const Loading = () => {
  return (
    // Outer container: Fixed position to hide the footer (Grey Bar)
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-zinc-950 gap-2">
      
      {/*  The Text Logo */}
      <h1 className="text-3xl md:text-4xl font-bold tracking-tighter text-white animate-pulse">
        AURA <span className="text-emerald-500">FORCE</span>
      </h1>

      {/* Custom Spinner */}
      <LoadingSpinner smallHeight />
      
    </div>
  );
};

export default Loading;