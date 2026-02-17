"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaCheckCircle, FaDumbbell, FaLayerGroup, FaUser, FaClock, FaCalendarDay, FaMoneyBillWave } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface ClassData {
    id: number;
    classname: string | null;
    trainer: string | null;
    duration: string | null;
    class_fees: number | null;
    class_time: string | null;
    class_days: string | null;
}

interface ClassBookingFormProps {
    classData: ClassData;
}

export default function ClassBookingForm({ classData }: ClassBookingFormProps) {
    const router = useRouter();
    const [isPending, setIsPending] = useState(false);
    const [selectedDate, setSelectedDate] = useState<string>("");

    // Calculate upcoming 1st of the months (next 3 months)
    const getUpcomingMonths = () => {
        const dates = [];
        const today = new Date();

        // Start from the next month 
        let currentMonth = today.getMonth() + 1;
        let currentYear = today.getFullYear();

        for (let i = 0; i < 3; i++) {
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            const date = new Date(currentYear, currentMonth, 1);
            dates.push(date);
            currentMonth++;
        }
        return dates;
    };

    const upcomingMonths = getUpcomingMonths();

    // Calculate end date (1 month after start)
    const getEndDate = (startDateStr: string) => {
        if (!startDateStr) return "";
        const start = new Date(startDateStr);

        const end = new Date(start);
        end.setMonth(start.getMonth() + 1);
        // Subtract one day - last day of the month
        end.setDate(end.getDate() - 1);
        return format(end, "MMMM d, yyyy");
    };

    const endDateFormatted = getEndDate(selectedDate);

    const handleBooking = () => {
        if (!selectedDate) {
            toast.error("Please select a start date.");
            return;
        }

        setIsPending(true);
        // Redirect to the generic checkout page → SSLCommerz payment flow
        router.push(`/checkout?type=class&id=${classData.id}`);
    };

    return (
        <div className="bg-zinc-900 border border-zinc-800 p-8 shadow-2xl rounded-none max-w-lg w-full">
            <h3 className="text-3xl font-bold text-white mb-2 font-heading">
                Book Your Class
            </h3>
            <p className="text-zinc-400 text-sm mb-5 font-satoshi">
                Secure your spot in our premium fitness sessions.
            </p>

            <div className="space-y-5">

                {/* CLASS DETAILS SUMMARY */}
                <div className="bg-zinc-950 p-6 border border-zinc-800/50">
                    <div className="space-y-4">
                        <div className="flex items-start justify-between">
                            <div>
                                <label className="flex items-center gap-2 text-zinc-500 text-xs font-bold uppercase tracking-wider mb-1 font-satoshi">
                                    <FaDumbbell className="text-emerald-500" /> Class
                                </label>
                                <div className="text-yellow-400 text-xl font-bold font-satoshi">{classData.classname || "N/A"}</div>
                            </div>
                            <div className="text-right">
                                <label className="block text-zinc-500 text-xs font-bold uppercase tracking-wider mb-1 font-satoshi">
                                    Duration
                                </label>
                                <div className="text-zinc-300 font-mono text-sm">{classData.duration || "1 Month"}</div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-900">
                            <div>
                                <label className="flex items-center gap-2 text-zinc-500 text-xs font-bold uppercase tracking-wider mb-1 font-satoshi">
                                    <FaUser className="text-emerald-500" /> Trainer
                                </label>
                                <div className="text-emerald-400 font-bold font-satoshi">{classData.trainer || "Expert Coach"}</div>
                            </div>
                            <div>
                                <label className="flex items-center gap-2 text-zinc-500 text-xs font-bold uppercase tracking-wider mb-1 font-satoshi">
                                    <FaClock className="text-emerald-500" /> Schedule
                                </label>
                                <div className="text-zinc-300 text-xs leading-relaxed font-satoshi">
                                    {classData.class_days || "Flexible"} <br />
                                    <span className="text-zinc-500">{classData.class_time || "Varies"}</span>
                                </div>
                            </div>
                        </div>

                        {/* FEES SECTION */}
                        <div className="pt-4 border-t border-zinc-900 flex justify-between items-center">
                            <label className="flex items-center gap-2 text-zinc-500 text-xs font-bold uppercase tracking-wider mb-0 font-satoshi">
                                <FaMoneyBillWave className="text-emerald-500" /> Total Cost
                            </label>
                            <div className="text-yellow-400 font-bold font-satoshi text-lg">
                                ৳ {classData.class_fees ? classData.class_fees.toLocaleString() : "N/A"} <span className="text-xs text-zinc-600 font-normal">/ Month</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* DATE SELECTION */}
                <div>
                    <label className="flex items-center gap-2 text-zinc-400 text-sm font-bold mb-3 uppercase tracking-wider font-satoshi">
                        <FaCalendarAlt className="text-emerald-500" /> Select Start Month
                    </label>
                    <div className="relative">
                        <select
                            className="w-full appearance-none bg-zinc-950 border border-zinc-800 px-4 py-4 text-white focus:outline-none focus:border-emerald-500 transition-colors rounded-none font-satoshi cursor-pointer hover:border-zinc-700"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                        >
                            <option value="" disabled className="text-zinc-600">Choose upcoming month...</option>
                            {upcomingMonths.map((date) => (
                                <option key={date.toISOString()} value={date.toISOString()} className="bg-zinc-900 py-2">
                                    {format(date, "MMMM d, yyyy")}
                                </option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-zinc-400">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                        </div>
                    </div>
                    {selectedDate && (
                        <div className="mt-4 flex items-center justify-between bg-zinc-950 border border-zinc-800 p-3">
                            <span className="text-xs text-zinc-500 font-bold uppercase tracking-wider font-satoshi">Valid Until:</span>
                            <span className="text-emerald-400 text-sm font-bold font-mono">{endDateFormatted}</span>
                        </div>
                    )}
                    <p className="text-[10px] text-zinc-600 mt-2 italic">
                        *All class subscriptions start on the 1st of the month.
                    </p>
                </div>

                {/* SUBMIT BUTTON */}
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
