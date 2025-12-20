import React from "react";
import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    // FIXED: Use 'fixed inset-0 z-[9999]' to cover the entire screen including the footer
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-zinc-950">
      
      {/* Animated Logo/Text */}
      <div className="flex flex-col items-center gap-4 animate-pulse">
        <h1 className="text-3xl font-bold tracking-tighter text-white">
          AURA <span className="text-emerald-500">FORCE</span>
        </h1>
        
        <div className="flex items-center gap-2 text-emerald-500/80 text-xs tracking-[0.2em] font-medium uppercase">
           <Loader2 className="w-4 h-4 animate-spin" />
           <span>Loading...</span>
        </div>
      </div>

    </div>
  );
};

export default Loading;