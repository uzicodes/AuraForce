"use client";

import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";
import { FaLock, FaShieldAlt, FaCheck, FaUserTie, FaClock, FaCalendarAlt } from "react-icons/fa";

interface CheckoutClientProps {
    type: string;
    referenceId: number;
    amount: number;
    itemName: string;
    details: any;
}

export default function CheckoutClient({
    type,
    referenceId,
    amount,
    itemName,
    details,
}: CheckoutClientProps) {
    const { user } = useUser();
    const [loading, setLoading] = useState(false);

    const userName =
        `${user?.firstName || ""} ${user?.lastName || ""}`.trim() || "Customer";
    const userEmail =
        user?.emailAddresses?.[0]?.emailAddress || "customer@example.com";

    const typeLabel =
        type === "membership"
            ? "Membership Plan"
            : type === "class"
                ? "Class Booking"
                : "Trainer Booking";

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
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-emerald-500/10 blur-[160px] rounded-full pointer-events-none" />

            <div className="relative z-10 w-full max-w-md">
                <div className={`relative rounded-none p-8 shadow-2xl shadow-black/40 overflow-hidden group font-satoshi ${type === "membership"
                    ? "bg-zinc-900/40 backdrop-blur-[80px] border border-white/10"
                    : "bg-zinc-900 border border-zinc-800"
                    }`}>

                    {/* BG image for (Trainer / Class) booking */}
                    {details?.image && (
                        <>
                            <div
                                className="absolute inset-0 bg-cover bg-center z-0 transition-transform duration-700 group-hover:scale-105"
                                style={{ backgroundImage: `url(${details.image})` }}
                            />
                            <div className="absolute inset-0 bg-zinc-950/80 backdrop-blur-[2px] z-0" />
                        </>
                    )}

                    {/* Content Wrapper to ensure text is above image */}
                    <div className="relative z-10">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-4 py-1.5 rounded-none text-[11px] font-bold uppercase tracking-widest border border-emerald-500/20 mb-5">
                                <FaShieldAlt className="text-[10px]" />
                                Secure Checkout
                            </div>

                            <h1 className="text-2xl font-bold text-white mb-1 font-heading">
                                {itemName}
                            </h1>
                            <p className="text-sm text-zinc-400 capitalize font-satoshi">{typeLabel}</p>
                        </div>

                        {/* DETAILS SECTION */}
                        <div className="mb-6 space-y-3 font-satoshi">
                            {type === "membership" && details?.features && (
                                <div className="bg-zinc-950/40 p-4 rounded-none border border-zinc-800/50">
                                    <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">Includes:</p>
                                    <ul className="space-y-2">
                                        {details.features.slice(0, 4).map((feat: string, i: number) => (
                                            <li key={i} className="text-xs text-zinc-300 flex items-start gap-2">
                                                <FaCheck className="text-emerald-500 mt-0.5 text-[10px]" /> {feat}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {type === "trainer" && details?.role && (
                                <div className="bg-zinc-950/40 p-4 rounded-none border border-zinc-800/50 flex items-center gap-3">
                                    <div className="w-10 h-10 bg-emerald-500/10 rounded-none flex items-center justify-center text-emerald-500">
                                        <FaUserTie />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Role</p>
                                        <p className="text-sm text-white font-medium">{details.role}</p>
                                    </div>
                                </div>
                            )}

                            {type === "class" && (
                                <div className="bg-zinc-950/40 p-4 rounded-none border border-zinc-800/50 space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-emerald-500/10 rounded-none flex items-center justify-center text-emerald-500 text-xs">
                                            <FaUserTie />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Trainer</p>
                                            <p className="text-xs text-white">{details?.trainer || "Expert Trainer"}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-emerald-500/10 rounded-none flex items-center justify-center text-emerald-500 text-xs">
                                            <FaClock />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Schedule</p>
                                            <p className="text-xs text-white">
                                                {details?.days || "Flexible"} • {details?.time || "Varies"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Order Summary */}
                        <div className="bg-zinc-950/60 border border-zinc-800 rounded-none p-5 mb-8 font-satoshi">
                            <div className="flex items-center justify-between mb-4 pb-4 border-b border-zinc-800/60">
                                <div className="flex items-center gap-3">
                                    <div className="w-11 h-11 bg-emerald-500/10 rounded-none flex items-center justify-center text-lg">
                                        {type === "membership" ? "👑" : type === "class" ? "🏋️" : "💪"}
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
                            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-none transition-all duration-200 shadow-lg shadow-emerald-900/30 flex items-center justify-center gap-2.5 disabled:opacity-60 disabled:cursor-not-allowed transform active:scale-[0.98] text-sm tracking-wide font-satoshi"
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                    Redirecting...
                                </span>
                            ) : (
                                <>
                                    <FaLock className="text-xs" />
                                    Pay ৳{amount.toLocaleString()} with SSLCommerz
                                </>
                            )}
                        </button>

                        <p className="text-center text-[10px] text-zinc-500 flex items-center justify-center gap-1.5 mt-4">
                            <FaLock className="text-[8px]" />
                            Payments are secure and encrypted via SSLCommerz
                        </p>
                    </div> {/* Close relative z-10 wrapper */}
                </div> {/* Close card container */}
            </div> {/* Close max-w-md container */}
        </section>
    );
}
