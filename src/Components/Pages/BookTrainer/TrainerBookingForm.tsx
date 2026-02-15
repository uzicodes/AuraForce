"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaClock, FaCheckCircle } from "react-icons/fa";
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

    const handleBooking = () => {
        if (!selectedDate || !selectedTime) {
            toast.error("Please select both a date and a time slot.");
            return;
        }

        startTransition(async () => {
            const result = await bookTrainerAction(trainerId, selectedDate, selectedTime);

            if (result?.error) {
                toast.error(result.error, {
                    style: { background: '#333', color: '#fff', borderRadius: '10px' }
                });
            } else {
                toast.success(`Successfully booked with ${trainerName}!`, {
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
                {/* DATE PICKER */}
                <div>
                    <label className="flex items-center gap-2 text-zinc-400 text-sm font-bold mb-2 uppercase tracking-wider">
                        <FaCalendarAlt className="text-emerald-500" /> Select Date
                    </label>
                    <input
                        type="date"
                        min={today}
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                </div>

                {/* TIME SLOTS */}
                <div>
                    <label className="flex items-center gap-2 text-zinc-400 text-sm font-bold mb-3 uppercase tracking-wider">
                        <FaClock className="text-emerald-500" /> Select Time
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
                    {isPending ? "Confirming..." : <><FaCheckCircle className="text-emerald-500" /> Confirm Booking</>}
                </motion.button>
            </div>
        </div>
    );
};

export default TrainerBookingForm;