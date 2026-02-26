'use client';

import { useEffect, useState } from 'react';
import { Search, Filter, Crown, User, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';

interface MembershipBooking {
    id: number;
    MemberID: string | null;
    name: string | null;
    plan: string | null;
    price: number | null;
    startDate: string | null;
    endDate: string | null;
    status: string | null;
}

const planBadge: Record<string, string> = {
    BASIC: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20',
    STANDARD: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    PREMIUM: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
};

const statusBadge: Record<string, string> = {
    ACTIVE: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    INACTIVE: 'bg-red-500/10 text-red-400 border-red-500/20',
};

function formatDate(dateStr: string | null): string {
    if (!dateStr) return '—';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
}

export default function MembershipsPage() {
    const [bookings, setBookings] = useState<MembershipBooking[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        async function fetchBookings() {
            try {
                const res = await fetch('/api/admin/membership-bookings');

                if (res.status === 429) {
                    toast.error("You are doing that too fast! Please wait a few seconds.", {
                        style: { background: '#18181b', color: '#fff', border: '1px solid #27272a' }
                    });
                    return;
                }

                if (!res.ok) throw new Error('Failed to fetch membership bookings');
                const data = await res.json();
                setBookings(data);
            } catch (err) {
                console.error('Error fetching membership bookings:', err);
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
            (b.name?.toLowerCase().includes(q) ?? false) ||
            (b.plan?.toLowerCase().includes(q) ?? false) ||
            (b.status?.toLowerCase().includes(q) ?? false)
        );
    });

    return (
        <div className="space-y-6">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-white font-ubuntu">Membership Bookings</h2>
                    <p className="text-sm text-zinc-500 font-satoshi mt-1">View all membership booking records from the database.</p>
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900/60 border border-zinc-800 rounded-xl">
                    <Crown size={16} className="text-yellow-400" />
                    <span className="text-sm font-bold text-white">{loading ? '—' : bookings.length}</span>
                    <span className="text-xs text-zinc-500">Bookings</span>
                </div>
            </div>

            {/* Search & Filter */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                    <input
                        type="text"
                        placeholder="Search by member ID, name, plan, or status..."
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
                                <th className="text-left px-5 py-3.5 font-medium uppercase tracking-wider">Name</th>
                                <th className="text-left px-5 py-3.5 font-medium uppercase tracking-wider">Plan</th>
                                <th className="text-left px-5 py-3.5 font-medium uppercase tracking-wider">Price</th>
                                <th className="text-left px-5 py-3.5 font-medium uppercase tracking-wider hidden md:table-cell">Start Date</th>
                                <th className="text-left px-5 py-3.5 font-medium uppercase tracking-wider hidden md:table-cell">End Date</th>
                                <th className="text-left px-5 py-3.5 font-medium uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={7} className="px-5 py-12 text-center">
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="w-6 h-6 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin" />
                                            <p className="text-zinc-500 text-sm">Loading membership bookings...</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredBookings.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-5 py-12 text-center">
                                        <p className="text-zinc-500 text-sm">No membership bookings found.</p>
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
                                                <div className="w-8 h-8 rounded-full bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-400 flex-shrink-0">
                                                    <User size={14} />
                                                </div>
                                                <span className="text-white font-medium">{b.name || 'Unknown'}</span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${planBadge[b.plan?.toUpperCase() || ''] || planBadge['BASIC']}`}>
                                                {b.plan || '—'}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <span className="text-emerald-400 font-bold text-sm font-mono">
                                                ৳{b.price?.toLocaleString() || '0'}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3.5 hidden md:table-cell">
                                            <div className="flex items-center gap-1.5 text-zinc-400">
                                                <Calendar size={12} className="text-zinc-600" />
                                                <span className="text-xs">{formatDate(b.startDate)}</span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3.5 hidden md:table-cell">
                                            <div className="flex items-center gap-1.5 text-zinc-400">
                                                <Calendar size={12} className="text-zinc-600" />
                                                <span className="text-xs">{formatDate(b.endDate)}</span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${statusBadge[b.status?.toUpperCase() || ''] || statusBadge['INACTIVE']}`}>
                                                {b.status || '—'}
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
