"use client";

import React, { useState, useTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaCheckCircle, FaLayerGroup } from "react-icons/fa";
import toast from "react-hot-toast";
import { bookTrainerAction } from "@/actions/bookTrainer";

interface TrainerBookingFormProps {
    trainerId: number;
    trainerName: string;
    feePerWeek?: number | null;
    feePerMonth?: number | null;
}

const TrainerBookingForm = ({ trainerId, trainerName, feePerWeek, feePerMonth }: TrainerBookingFormProps) => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [selectedDate, setSelectedDate] = useState("");
    const [planType, setPlanType] = useState<"WEEKLY" | "MONTHLY" | null>(null);
    const [endDate, setEndDate] = useState<string>("");

    // Calculate end date based on selection
    useEffect(() => {
        if (!selectedDate || !planType) {
            setEndDate("");
            return;
        }

        const start = new Date(selectedDate);
        const daysToAdd = planType === "WEEKLY" ? 6 : 29; // 7 days total or 30 days total (inclusive)

        const end = new Date(start);
        end.setDate(start.getDate() + daysToAdd);

        setEndDate(end.toISOString().split('T')[0]);
    }, [selectedDate, planType]);

    const handleBooking = () => {
        if (!selectedDate || !planType) {
            toast.error("Please select a plan and a start date.");
            return;
        }

        startTransition(async () => {
            // We pass a default "Flexible" time slot since the time grid is removed
            // but the database/action still expects a timeSlot string.
            const result = await bookTrainerAction(trainerId, selectedDate, "Flexible", planType);

            if (result?.error) {
                toast.error(result.error, {
                    style: { background: '#333', color: '#fff', borderRadius: '10px' }
                });
            } else {
                toast.success(`Successfully booked ${planType.toLowerCase()} package with ${trainerName}!`, {
                    icon: "🔥",
                    style: { background: '#333', color: '#fff', borderRadius: '10px' }
                });
                // Redirect to profile to see the booking
                router.push("/profile");
            }
        });
    };

    // Get today's date formatted for the input min attribute (YYYY-MM-DD)
    const today = new Date().toISOString().split('T')[0];

    // Determine current price based on selection
    const price = planType === "WEEKLY" ? feePerWeek : planType === "MONTHLY" ? feePerMonth : 0;

    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-2 font-heading">
                Schedule your session
            </h3>

            {/* PRICING SUMMARY */}
            <p className="text-emerald-400 text-sm font-bold uppercase tracking-wider mb-8">
                Pricing: ৳{feePerWeek || "N/A"} / Weekly | ৳{feePerMonth || "N/A"} / Monthly
            </p>

            <div className="space-y-8">
                {/* PLAN SELECTION */}
                <div>
                    <label className="flex items-center gap-2 text-zinc-400 text-sm font-bold mb-4 uppercase tracking-wider">
                        <FaLayerGroup className="text-emerald-500" /> Select Subscription Plan
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                        {/* Weekly Card */}
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setPlanType("WEEKLY")}
                            className={`relative h-32 rounded-2xl border-2 flex flex-col items-center justify-center gap-2 transition-all ${planType === "WEEKLY"
                                    ? "bg-emerald-500/10 border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                                    : "bg-zinc-950 border-zinc-800 hover:border-zinc-600"
                                }`}
                        >
                            <span className={`text-lg font-bold uppercase tracking-wider ${planType === "WEEKLY" ? "text-white" : "text-zinc-400"}`}>
                                Weekly Plan
                            </span>
                            <span className={`text-sm ${planType === "WEEKLY" ? "text-emerald-400" : "text-zinc-500"}`}>
                                7 Days Access
                            </span>
                            {planType === "WEEKLY" && (
                                <div className="absolute top-3 right-3 text-emerald-500">
                                    <FaCheckCircle />
                                </div>
                            )}
                        </motion.button>

                        {/* Monthly Card */}
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setPlanType("MONTHLY")}
                            className={`relative h-32 rounded-2xl border-2 flex flex-col items-center justify-center gap-2 transition-all ${planType === "MONTHLY"
                                    ? "bg-emerald-500/10 border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                                    : "bg-zinc-950 border-zinc-800 hover:border-zinc-600"
                                }`}
                        >
                            <span className={`text-lg font-bold uppercase tracking-wider ${planType === "MONTHLY" ? "text-white" : "text-zinc-400"}`}>
                                Monthly Plan
                            </span>
                            <span className={`text-sm ${planType === "MONTHLY" ? "text-emerald-400" : "text-zinc-500"}`}>
                                30 Days Access
                            </span>
                            {planType === "MONTHLY" && (
                                <div className="absolute top-3 right-3 text-emerald-500">
                                    <FaCheckCircle />
                                </div>
                            )}
                        </motion.button>
                    </div>
                </div>

                {/* DATE PICKER */}
                <div>
                    <label className="flex items-center gap-2 text-zinc-400 text-sm font-bold mb-3 uppercase tracking-wider">
                        <FaCalendarAlt className="text-emerald-500" /> Select Start Date
                    </label>
                    <input
                        type="date"
                        min={today}
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                    {endDate && (
                        <p className="mt-2 text-xs text-zinc-500 font-mono">
                            Plan expires on: <span className="text-emerald-400 font-bold">{endDate}</span>
                        </p>
                    )}
                </div>

                {/* TOTAL COST DISPLAY */}
                <div className="bg-zinc-950 rounded-xl p-4 border border-zinc-800 flex justify-between items-center">
                    <span className="text-zinc-400 text-sm font-bold uppercase tracking-wider">Total Cost</span>
                    <span className="text-2xl font-bold text-white font-heading">
                        ৳{price ? price.toLocaleString() : "0"}
                    </span>
                </div>

                {/* SUBMIT BUTTON */}
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleBooking}
                    disabled={isPending || !planType || !selectedDate}
                    className="w-full bg-white text-black font-bold text-lg py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isPending ? "Processing..." : "Proceed to Payment"}
                </motion.button>
            </div>
        </div>
    );
};

export default TrainerBookingForm;