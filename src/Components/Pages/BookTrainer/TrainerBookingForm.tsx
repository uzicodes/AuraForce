"use client";

import React, { useState, useTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaClock, FaCheckCircle, FaLayerGroup } from "react-icons/fa";
import toast from "react-hot-toast";
import { bookTrainerAction } from "@/actions/bookTrainer";

// Standard gym hours time slots
const TIME_SLOTS = [
    "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM",
    "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM"
];

interface TrainerBookingFormProps {
    trainerId: number;
    trainerName: string;
}

const TrainerBookingForm = ({ trainerId, trainerName }: TrainerBookingFormProps) => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [packageType, setPackageType] = useState<"WEEKLY" | "MONTHLY">("WEEKLY");
    const [endDate, setEndDate] = useState<string>("");

    // Calculate end date based on selection
    useEffect(() => {
        if (!selectedDate) {
            setEndDate("");
            return;
        }

        const start = new Date(selectedDate);
        const daysToAdd = packageType === "WEEKLY" ? 6 : 29; // 7 days total or 30 days total (inclusive)

        const end = new Date(start);
        end.setDate(start.getDate() + daysToAdd);

        setEndDate(end.toISOString().split('T')[0]);
    }, [selectedDate, packageType]);

    const handleBooking = () => {
        if (!selectedDate || !selectedTime) {
            toast.error("Please select a start date and a time slot.");
            return;
        }

        startTransition(async () => {
            const result = await bookTrainerAction(trainerId, selectedDate, selectedTime, packageType);

            if (result?.error) {
                toast.error(result.error, {
                    style: { background: '#333', color: '#fff', borderRadius: '10px' }
                });
            } else {
                toast.success(`Successfully booked ${packageType.toLowerCase()} package with ${trainerName}!`, {
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

    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-6 font-heading">
                Schedule your session
            </h3>

            <div className="space-y-6">
                {/* PACKAGE SELECTION */}
                <div>
                    <label className="flex items-center gap-2 text-zinc-400 text-sm font-bold mb-3 uppercase tracking-wider">
                        <FaLayerGroup className="text-emerald-500" /> Select Package
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={() => setPackageType("WEEKLY")}
                            className={`py-3 px-4 rounded-xl border font-bold text-sm uppercase tracking-wider transition-all ${packageType === "WEEKLY"
                                    ? "bg-emerald-500 border-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                                    : "bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-emerald-500/50 hover:text-white"
                                }`}
                        >
                            Weekly (7 Days)
                        </button>
                        <button
                            onClick={() => setPackageType("MONTHLY")}
                            className={`py-3 px-4 rounded-xl border font-bold text-sm uppercase tracking-wider transition-all ${packageType === "MONTHLY"
                                    ? "bg-emerald-500 border-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                                    : "bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-emerald-500/50 hover:text-white"
                                }`}
                        >
                            Monthly (30 Days)
                        </button>
                    </div>
                </div>

                {/* DATE PICKER */}
                <div>
                    <label className="flex items-center gap-2 text-zinc-400 text-sm font-bold mb-2 uppercase tracking-wider">
                        <FaCalendarAlt className="text-emerald-500" /> Select Start Date
                    </label>
                    <input
                        type="date"
                        min={today}
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                    {endDate && (
                        <p className="mt-2 text-xs text-emerald-400 font-mono">
                            Package ends on: <span className="font-bold">{endDate}</span>
                        </p>
                    )}
                </div>

                {/* TIME SLOTS */}
                <div>
                    <label className="flex items-center gap-2 text-zinc-400 text-sm font-bold mb-3 uppercase tracking-wider">
                        <FaClock className="text-emerald-500" /> Select Daily Time
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                        {TIME_SLOTS.map((slot) => (
                            <button
                                key={slot}
                                onClick={() => setSelectedTime(slot)}
                                className={`py-2 px-1 text-sm font-bold rounded-lg border transition-all ${selectedTime === slot
                                    ? "bg-emerald-500 border-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                                    : "bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-emerald-500/50 hover:text-white"
                                    }`}
                            >
                                {slot}
                            </button>
                        ))}
                    </div>
                </div>

                {/* SUBMIT BUTTON */}
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleBooking}
                    disabled={isPending}
                    className="w-full mt-4 bg-white text-black font-bold text-lg py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isPending ? "Booking Package..." : <><FaCheckCircle className="text-emerald-500" /> Confirm {packageType === "WEEKLY" ? "Weekly" : "Monthly"} Package</>}
                </motion.button>
            </div>
        </div>
    );
};

export default TrainerBookingForm;