"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { FaCrown, FaCalendarAlt, FaMoneyBillWave, FaInfoCircle, FaCheck } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface MembershipPlan {
    id: number;
    name: string;
    price: number;
    features: string[];
}

const descriptionMap: Record<string, string> = {
    Basic: "Essential access for the casual gym-goer.",
    Standard: "Perfect for dedicated fitness enthusiasts.",
    Premium: "The ultimate all-inclusive experience.",
};

export default function MembershipBookingForm({ plan }: { plan: MembershipPlan }) {
    const router = useRouter();
    const [isPending, setIsPending] = useState(false);
    const [selectedDate, setSelectedDate] = useState<string>("");

    // Calculate end date (1 month after start)
    const getEndDate = (startDateStr: string) => {
        if (!startDateStr) return "";
        const start = new Date(startDateStr);
        const end = new Date(start);
        end.setMonth(start.getMonth() + 1);
        // Subtract one day - last day of the cycle
        end.setDate(end.getDate() - 1);
        return format(end, "MMMM d, yyyy");
    };

    const endDateFormatted = getEndDate(selectedDate);

    // Get today's date formatted for the input min attribute (YYYY-MM-DD)
    const today = new Date().toISOString().split('T')[0];

    const handleBooking = () => {
        if (!selectedDate) {
            toast.error("Please select a start date.");
            return;
        }

        setIsPending(true);
        // Redirect to the generic checkout page → SSLCommerz payment flow
        router.push(`/checkout?type=membership&id=${plan.id}`);
    };

    return (
        <div className="bg-zinc-900 border border-zinc-800 p-8 shadow-2xl rounded-none max-w-lg w-full">
            <h3 className="text-3xl font-bold text-white mb-2 font-heading">
                Book Membership
            </h3>
            <p className="text-zinc-400 text-sm mb-5 font-satoshi">
                Configure your plan and select your start date.
            </p>

            <div className="space-y-5">
                {/* PLAN DETAILS SUMMARY */}
                <div className="bg-zinc-950 p-6 border border-zinc-800/50">
                    <div className="space-y-4">
                        <div className="flex items-start justify-between">
                            <div>
                                <label className="flex items-center gap-2 text-zinc-500 text-xs font-bold uppercase tracking-wider mb-1 font-satoshi">
                                    <FaCrown className="text-emerald-500" /> Plan Name
                                </label>
                                <div className="text-yellow-400 text-xl font-bold font-satoshi">{plan.name}</div>
                            </div>
                            <div className="text-right">
                                <label className="block text-zinc-500 text-xs font-bold uppercase tracking-wider mb-1 font-satoshi">
                                    Duration
                                </label>
                                <div className="text-zinc-300 font-mono text-sm">1 Month</div>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-zinc-900">
                            <label className="flex items-center gap-2 text-zinc-500 text-xs font-bold uppercase tracking-wider mb-2 font-satoshi">
                                <FaInfoCircle className="text-emerald-500" /> Description
                            </label>
                            <p className="text-zinc-300 text-sm leading-relaxed font-satoshi">
                                {descriptionMap[plan.name] || "Full access membership plan."}
                            </p>
                        </div>

                        {/* FEATURES LIST */}
                        {plan.features && plan.features.length > 0 && (
                            <div className="pt-4 border-t border-zinc-900">
                                <label className="flex items-center gap-2 text-zinc-500 text-xs font-bold uppercase tracking-wider mb-2 font-satoshi">
                                    <FaCheck className="text-emerald-500" /> Key Features
                                </label>
                                <ul className="space-y-1">
                                    {plan.features.map((feature, index) => (
                                        <li key={index} className="text-zinc-400 text-xs flex items-start gap-2 font-satoshi">
                                            <span className="text-emerald-500/50 mt-0.5">•</span> {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* FEES SECTION */}
                        <div className="pt-4 border-t border-zinc-900 flex justify-between items-center">
                            <label className="flex items-center gap-2 text-zinc-500 text-xs font-bold uppercase tracking-wider mb-0 font-satoshi">
                                <FaMoneyBillWave className="text-emerald-500" /> Total Cost
                            </label>
                            <div className="text-yellow-400 font-bold font-satoshi text-lg">
                                ৳ {plan.price ? plan.price.toLocaleString() : "N/A"} <span className="text-xs text-zinc-600 font-normal">/ Month</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* DATE SELECTION */}
                <div>
                    <label className="flex items-center gap-2 text-zinc-400 text-sm font-bold mb-3 uppercase tracking-wider font-satoshi">
                        <FaCalendarAlt className="text-emerald-500" /> Select Start Date
                    </label>
                    <input
                        type="date"
                        min={today}
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-800 px-4 py-4 text-white focus:outline-none focus:border-emerald-500 transition-colors rounded-none font-satoshi cursor-pointer hover:border-zinc-700"
                    />

                    {selectedDate && (
                        <div className="mt-4 flex items-center justify-between bg-zinc-950 border border-zinc-800 p-3">
                            <span className="text-xs text-zinc-500 font-bold uppercase tracking-wider font-satoshi">Valid Until:</span>
                            <span className="text-emerald-400 text-sm font-bold font-mono">{endDateFormatted}</span>
                        </div>
                    )}
                    <p className="text-[10px] text-zinc-600 mt-2 italic">
                        *Your 1-month billing cycle will begin on your selected start date.
                    </p>
                </div>

                {/* SUBMIT BUTTON */}
                {/* When you are ready for SSLcommerz, you can change onClick to redirect to your generic /checkout page */}
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleBooking}
                    disabled={isPending || !selectedDate}
                    className="w-full bg-white text-black font-bold text-lg py-4 flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-none font-satoshi mt-4"
                >
                    {isPending ? (
                        <>
                            <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                            <span>Processing...</span>
                        </>
                    ) : (
                        "Confirm Booking"
                    )}
                </motion.button>

            </div>
        </div>
    );
}