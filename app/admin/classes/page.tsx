'use client';

import { useEffect, useState } from 'react';
import { Search, Filter, CalendarCheck, Clock, User, Hash } from 'lucide-react';
import toast from 'react-hot-toast';

interface ClassBooking {
    id: number;
    clerkUserId: string;
    user: {
        MemberID: string | null;
    };
    classId: number;
    className: string | null;
    name: string | null;
    bookingDate: string;
    validTill: string | null;
    status: string | null;
}

const statusColorMap: Record<string, string> = {
    CONFIRMED: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    PENDING: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    CANCELLED: 'bg-red-500/10 text-red-400 border-red-500/20',
    EXPIRED: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20',
};

function formatDate(dateStr: string | null): string {
    if (!dateStr) return '—';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
    });
}

export default function ClassesPage() {
    const [bookings, setBookings] = useState<ClassBooking[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        async function fetchBookings() {
            try {
                const res = await fetch('/api/admin/class-bookings');
                if (!res.ok) throw new Error('Failed to fetch class bookings');
                const data = await res.json();
                setBookings(data);
            } catch (err) {
                console.error('Error fetching class bookings:', err);
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
            (b.className?.toLowerCase().includes(q) ?? false) ||
            (b.name?.toLowerCase().includes(q) ?? false) ||
            (b.status?.toLowerCase().includes(q) ?? false) ||
            b.clerkUserId.toLowerCase().includes(q)
        );
    });

    const totalBookings = bookings.length;

    return (
        <div className="space-y-6">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-white font-heading">Class Bookings</h2>
                    <p className="text-sm text-zinc-500 font-satoshi mt-1">View all class booking records from the database.</p>
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900/60 border border-zinc-800 rounded-xl">
                    <CalendarCheck size={16} className="text-emerald-400" />
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
                        placeholder="Search by class, name, or status..."
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
                                <th className="text-left px-5 py-3.5 font-medium uppercase tracking-wider">ID</th>
                                <th className="text-left px-5 py-3.5 font-medium uppercase tracking-wider">Class</th>
                                <th className="text-left px-5 py-3.5 font-medium uppercase tracking-wider">Booked By</th>
                                <th className="text-left px-5 py-3.5 font-medium uppercase tracking-wider hidden md:table-cell">Booking Date</th>
                                <th className="text-left px-5 py-3.5 font-medium uppercase tracking-wider hidden lg:table-cell">Valid Till</th>
                                <th className="text-left px-5 py-3.5 font-medium uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={6} className="px-5 py-12 text-center">
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                                            <p className="text-zinc-500 text-sm">Loading class bookings...</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredBookings.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-5 py-12 text-center">
                                        <p className="text-zinc-500 text-sm">No class bookings found.</p>
                                    </td>
                                </tr>
                            ) : (
                                filteredBookings.map((b) => (
                                    <tr key={b.id} className="border-b border-zinc-800/30 hover:bg-zinc-800/20 transition-colors">
                                        <td className="px-5 py-3.5">
                                            <span className="text-zinc-500 font-mono text-xs">#{b.id}</span>
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 flex-shrink-0">
                                                    <CalendarCheck size={14} />
                                                </div>
                                                <div>
                                                    <p className="text-white font-medium">{b.className || 'Unknown Class'}</p>
                                                    <p className="text-zinc-500 text-xs font-mono">ID: {b.classId}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <div className="flex items-center gap-2">
                                                <div className="w-7 h-7 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-400 flex-shrink-0">
                                                    <User size={12} />
                                                </div>
                                                <div>
                                                    <p className="text-white text-sm">{b.name || 'Unnamed'}</p>
                                                    <p className="text-zinc-600 text-[10px] font-mono uppercase italic tracking-wider">
                                                        {b.user?.MemberID || b.clerkUserId.slice(-6).toUpperCase()}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3.5 text-zinc-400 hidden md:table-cell">
                                            <div className="flex items-center gap-1.5">
                                                <Clock size={12} className="text-zinc-600" />
                                                {formatDate(b.bookingDate)}
                                            </div>
                                        </td>
                                        <td className="px-5 py-3.5 text-zinc-400 hidden lg:table-cell">
                                            {formatDate(b.validTill)}
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${statusColorMap[b.status || ''] || statusColorMap['CONFIRMED']}`}>
                                                {b.status || 'CONFIRMED'}
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
