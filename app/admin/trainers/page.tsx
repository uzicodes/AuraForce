'use client';

import { useEffect, useState } from 'react';
import { Search, Filter, Dumbbell, Clock, User } from 'lucide-react';
import toast from 'react-hot-toast';

interface TrainerBooking {
    id: number;
    MemberID: string | null;
    trainerId: number;
    trainerName: string | null;
    timeSlot: string;
    plan: string | null;
    pricing: number | null;
}

const planColorMap: Record<string, string> = {
    WEEKLY: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    MONTHLY: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
};

export default function TrainersPage() {
    const [bookings, setBookings] = useState<TrainerBooking[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        async function fetchBookings() {
            try {
                const res = await fetch('/api/admin/trainer-bookings');
                if (!res.ok) throw new Error('Failed to fetch trainer bookings');
                const data = await res.json();
                setBookings(data);
            } catch (err) {
                console.error('Error fetching trainer bookings:', err);
                toast.error('Something went wrong. Please try again.');
            } finally {
                setLoading(false);
            }
        }
        fetchBookings();
    }, []);

    const filteredBookings = bookings.filter((b) => {
        const q = searchQuery.toLowerCase();
        return (
            (b.MemberID?.toLowerCase().includes(q) ?? false) ||
            (b.trainerName?.toLowerCase().includes(q) ?? false) ||
            (b.plan?.toLowerCase().includes(q) ?? false) ||
            b.timeSlot.toLowerCase().includes(q)
        );
    });

    const totalBookings = bookings.length;

    return (
        <div className="space-y-6">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-white font-heading">Trainer Bookings</h2>
                    <p className="text-sm text-zinc-500 font-satoshi mt-1">View all trainer booking records from the database.</p>
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900/60 border border-zinc-800 rounded-xl">
                    <Dumbbell size={16} className="text-emerald-400" />
                    <span className="text-sm font-bold text-white">{loading ? '—' : totalBookings}</span>
                    <span className="text-xs text-zinc-500">Bookings</span>
                </div>
            </div>

            {/* Search & Filter */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                    <input
                        type="text"
                        placeholder="Search by member ID, trainer, or plan..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 bg-zinc-900/60 border border-zinc-800 rounded-xl text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                    />
                </div>
                <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-zinc-900/60 border border-zinc-800 text-zinc-400 text-sm rounded-xl hover:border-zinc-700 transition-all">
                    <Filter size={16} />
                    Filters
                </button>
            </div>

            {/* Bookings Table */}
            <div className="bg-zinc-900/60 backdrop-blur-sm border border-zinc-800 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-yellow-500 text-xs border-b border-zinc-800/50">
                                <th className="text-left px-5 py-3.5 font-medium uppercase tracking-wider">Member ID</th>
                                <th className="text-left px-5 py-3.5 font-medium uppercase tracking-wider">Trainer</th>
                                <th className="text-left px-5 py-3.5 font-medium uppercase tracking-wider">Trainer ID</th>
                                <th className="text-left px-5 py-3.5 font-medium uppercase tracking-wider hidden md:table-cell">Time Slot</th>
                                <th className="text-left px-5 py-3.5 font-medium uppercase tracking-wider">Plan</th>
                                <th className="text-left px-5 py-3.5 font-medium uppercase tracking-wider">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={6} className="px-5 py-12 text-center">
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                                            <p className="text-zinc-500 text-sm">Loading trainer bookings...</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredBookings.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-5 py-12 text-center">
                                        <p className="text-zinc-500 text-sm">No trainer bookings found.</p>
                                    </td>
                                </tr>
                            ) : (
                                filteredBookings.map((b) => (
                                    <tr key={b.id} className="border-b border-zinc-800/30 hover:bg-zinc-800/20 transition-colors">
                                        <td className="px-5 py-3.5">
                                            <span className="text-zinc-500 font-mono text-xs uppercase italic tracking-wider">
                                                {b.MemberID || '—'}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 flex-shrink-0">
                                                    <User size={14} />
                                                </div>
                                                <div>
                                                    <p className="text-white font-medium">{b.trainerName || 'Unknown'}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <span className="text-zinc-400 font-mono text-xs">{b.trainerId}</span>
                                        </td>
                                        <td className="px-5 py-3.5 hidden md:table-cell">
                                            <div className="flex items-center gap-1.5 text-zinc-400">
                                                <Clock size={12} className="text-zinc-600" />
                                                <span className="text-xs font-mono">{b.timeSlot}</span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${planColorMap[b.plan || ''] || planColorMap['MONTHLY']}`}>
                                                {b.plan || '—'}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <span className="text-emerald-400 font-bold text-sm font-mono">
                                                ৳{b.pricing?.toLocaleString() || '0'}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
