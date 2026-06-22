"use client";

import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

export default function BackButton({ className }: { className?: string }) {
    const router = useRouter();
    return (
        <button 
            type="button"
            onClick={() => router.back()} 
            className={`w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center hover:bg-zinc-700 transition-colors text-white shrink-0 ${className || ""}`}
            title="Go Back"
        >
            <FaArrowLeft className="text-xs" />
        </button>
    );
}
