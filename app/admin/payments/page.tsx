'use client';

import { useEffect, useState } from 'react';
import { Search, Filter, CreditCard, DollarSign, Calendar, User } from 'lucide-react';
import toast from 'react-hot-toast';

interface Payment {
    id: number;
    MemberID: string | null;
    name: string | null;
    transactionId: string;
    amount: number;
    paymentType: string | null;
    bookingType: string;
    referenceId: number;
    created_at: string | null;
}

const bookingBadge: Record<string, string> = {
    trainer: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    class: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    membership: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
};

function formatDate(dateStr: string | null): string {
    if (!dateStr) return '—';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
}

function formatTime(dateStr: string | null): string {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
}

export default function PaymentsPage() {
    const [payments, setPayments] = useState<Payment[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        async function fetchPayments() {
            try {
                const res = await fetch('/api/admin/payments');

                if (res.status === 429) {
                    toast.error("You are doing that too fast! Please wait a few seconds.", {
                        style: { background: '#18181b', color: '#fff', border: '1px solid #27272a' }
                    });
                    return;
                }

                if (!res.ok) throw new Error('Failed to fetch payments');
                const data = await res.json();
                setPayments(data);
            } catch (err) {
                console.error('Error fetching payments:', err);
                toast.error('Something went wrong. Please try again.');
            } finally {
                setLoading(false);
            }
        }
        fetchPayments();
    }, []);

    const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);

    const filteredPayments = payments.filter((p) => {
        const q = searchQuery.toLowerCase();
        return (
            (p.MemberID?.toLowerCase().includes(q) ?? false) ||
            (p.name?.toLowerCase().includes(q) ?? false) ||
            (p.transactionId.toLowerCase().includes(q)) ||
            (p.bookingType.toLowerCase().includes(q)) ||
            (p.paymentType?.toLowerCase().includes(q) ?? false)
        );
    });

    return (
        <div className="space-y-6">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-white font-heading">Payments</h2>
                    <p className="text-sm text-zinc-500 font-satoshi mt-1">All successful transactions recorded from the database.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900/60 border border-zinc-800 rounded-xl">
                        <CreditCard size={16} className="text-emerald-400" />
                        <span className="text-sm font-bold text-white">{loading ? '—' : payments.length}</span>
                        <span className="text-xs text-zinc-500">Payments</span>
                    </div>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900/60 border border-zinc-800 rounded-xl">
                        <DollarSign size={16} className="text-emerald-400" />
                        <span className="text-sm font-bold text-emerald-400 font-mono">৳{loading ? '—' : totalRevenue.toLocaleString()}</span>
                        <span className="text-xs text-zinc-500">Revenue</span>
                    </div>
                </div>
            </div>

            {/* Search & Filter */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                    <input
                        type="text"
                        placeholder="Search by member ID, name, transaction ID, or booking type..."
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

            {/* Payments Table */}
            <div className="bg-zinc-900/60 backdrop-blur-sm border border-zinc-800 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-yellow-500 text-xs border-b border-zinc-800/50">
                                <th className="text-left px-5 py-3.5 font-medium uppercase tracking-wider">Member ID</th>
                                <th className="text-left px-5 py-3.5 font-medium uppercase tracking-wider">Name</th>
                                <th className="text-left px-5 py-3.5 font-medium uppercase tracking-wider hidden lg:table-cell">Transaction ID</th>
                                <th className="text-left px-5 py-3.5 font-medium uppercase tracking-wider">Amount</th>
                                <th className="text-left px-5 py-3.5 font-medium uppercase tracking-wider hidden md:table-cell">Payment Type</th>
                                <th className="text-left px-5 py-3.5 font-medium uppercase tracking-wider">Booking Type</th>
                                <th className="text-left px-5 py-3.5 font-medium uppercase tracking-wider hidden md:table-cell">Ref ID</th>
                                <th className="text-left px-5 py-3.5 font-medium uppercase tracking-wider hidden sm:table-cell">Date & Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={8} className="px-5 py-12 text-center">
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                                            <p className="text-zinc-500 text-sm">Loading payments...</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredPayments.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="px-5 py-12 text-center">
                                        <p className="text-zinc-500 text-sm">No payments found.</p>
                                    </td>
                                </tr>
                            ) : (
                                filteredPayments.map((p) => (
                                    <tr key={p.id} className="border-b border-zinc-800/30 hover:bg-zinc-800/20 transition-colors">
                                        <td className="px-5 py-3.5">
                                            <span className="text-zinc-500 font-mono text-xs uppercase italic tracking-wider">
                                                {p.MemberID || '—'}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <div className="flex items-center gap-2.5">
                                                <div className="w-7 h-7 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 flex-shrink-0">
                                                    <User size={12} />
                                                </div>
                                                <span className="text-white font-medium text-sm">{p.name || 'Unknown'}</span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3.5 hidden lg:table-cell">
                                            <span className="text-zinc-600 font-mono text-[10px]">{p.transactionId}</span>
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <span className="text-emerald-400 font-bold text-sm font-mono">৳{p.amount.toLocaleString()}</span>
                                        </td>
                                        <td className="px-5 py-3.5 hidden md:table-cell">
                                            <span className="text-zinc-400 text-xs">{p.paymentType || '—'}</span>
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border capitalize ${bookingBadge[p.bookingType] || 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20'}`}>
                                                {p.bookingType}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3.5 hidden md:table-cell">
                                            <span className="text-zinc-500 font-mono text-xs">#{p.referenceId}</span>
                                        </td>
                                        <td className="px-5 py-3.5 hidden sm:table-cell">
                                            <div className="flex items-center gap-1.5 text-zinc-400">
                                                <Calendar size={12} className="text-zinc-600" />
                                                <div>
                                                    <p className="text-xs">{formatDate(p.created_at)}</p>
                                                    <p className="text-[10px] text-zinc-600">{formatTime(p.created_at)}</p>
                                                </div>
                                            </div>
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
