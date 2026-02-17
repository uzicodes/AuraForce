"use client";

import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";
import { FaLock, FaShieldAlt } from "react-icons/fa";

interface CheckoutClientProps {
    type: string;
    referenceId: number;
    amount: number;
    itemName: string;
}

export default function CheckoutClient({
    type,
    referenceId,
    amount,
    itemName,
}: CheckoutClientProps) {
    const { user } = useUser();
    const [loading, setLoading] = useState(false);

    const userName =
        `${user?.firstName || ""} ${user?.lastName || ""}`.trim() || "Customer";
    const userEmail =
        user?.emailAddresses?.[0]?.emailAddress || "customer@example.com";

    // ── Readable label for the booking type ──
    const typeLabel =
        type === "membership"
            ? "Membership Plan"
            : type === "class"
                ? "Class Booking"
                : "Trainer Booking";

    // ── Handle payment ──
    const handlePayment = async () => {
        setLoading(true);

        try {
            const res = await fetch("/api/payment/init", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    amount,
                    bookingType: type,
                    referenceId,
                    userName,
                    userEmail,
                }),
            });

            const data = await res.json();

            if (data.url) {
                window.location.href = data.url;
            } else {
                toast.error(data.error || "Failed to initialize payment.");
                setLoading(false);
            }
        } catch (err: any) {
            toast.error(err?.message || "Something went wrong.");
            setLoading(false);
        }
    };

    return (
        <section className="min-h-screen bg-zinc-950 flex items-center justify-center px-4 py-20 relative overflow-hidden">
            {/* ── Background glow ── */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-emerald-500/10 blur-[160px] rounded-full pointer-events-none" />

            <div className="relative z-10 w-full max-w-md">
                {/* ── Checkout Card ── */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl shadow-black/40">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest border border-emerald-500/20 mb-5">
                            <FaShieldAlt className="text-[10px]" />
                            Secure Checkout
                        </div>

                        <h1 className="text-2xl font-bold text-white mb-1 font-heading">
                            {itemName}
                        </h1>
                        <p className="text-sm text-zinc-400">{typeLabel}</p>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-zinc-950/60 border border-zinc-800 rounded-2xl p-5 mb-8">
                        <div className="flex items-center justify-between mb-4 pb-4 border-b border-zinc-800/60">
                            <div className="flex items-center gap-3">
                                <div className="w-11 h-11 bg-emerald-500/10 rounded-xl flex items-center justify-center text-lg">
                                    {type === "membership"
                                        ? "👑"
                                        : type === "class"
                                            ? "🏋️"
                                            : "💪"}
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-white">{itemName}</p>
                                    <p className="text-[11px] text-zinc-500 capitalize">{type}</p>
                                </div>
                            </div>
                            <p className="text-sm font-bold text-emerald-400">
                                ৳{amount.toLocaleString()}
                            </p>
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-white">Total</span>
                            <span className="text-lg font-bold text-emerald-400">
                                ৳{amount.toLocaleString()}
                            </span>
                        </div>
                    </div>

                    {/* Pay Button */}
                    <button
                        onClick={handlePayment}
                        disabled={loading}
                        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-xl transition-all duration-200 shadow-lg shadow-emerald-900/30 flex items-center justify-center gap-2.5 disabled:opacity-60 disabled:cursor-not-allowed transform active:scale-[0.98] text-sm tracking-wide"
                    >
                        {loading ? (
                            <span className="flex items-center gap-2">
                                <svg
                                    className="animate-spin h-4 w-4 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                    />
                                </svg>
                                Redirecting to SSLCommerz…
                            </span>
                        ) : (
                            <>
                                <FaLock className="text-xs" />
                                Pay ৳{amount.toLocaleString()} with SSLCommerz
                            </>
                        )}
                    </button>

                    {/* Trust Badges */}
                    <p className="text-center text-[10px] text-zinc-500 flex items-center justify-center gap-1.5 mt-4">
                        <FaLock className="text-[8px]" />
                        Payments are secure and encrypted via SSLCommerz
                    </p>
                </div>
            </div>
        </section>
    );
}
