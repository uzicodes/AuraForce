'use client';

import { useEffect, useState } from 'react';
import {
    Users,
    Dumbbell,
    CalendarCheck,
    CreditCard,
    ArrowUpRight,
} from 'lucide-react';
import toast from 'react-hot-toast';

interface Member {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
    role: string;
    createdAt: string;
}

interface Payment {
    id: number;
    clerkUserId: string;
    amount: number;
    bookingType: string;
    status: string | null;
    transactionId: string;
}

const colorMap: Record<string, { bg: string; text: string; border: string; shadow: string }> = {
    emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20', shadow: 'shadow-emerald-500/5' },
    purple: { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/20', shadow: 'shadow-purple-500/5' },
    amber: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20', shadow: 'shadow-amber-500/5' },
    blue: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20', shadow: 'shadow-blue-500/5' },
};

export default function AdminDashboard() {
    const [members, setMembers] = useState<Member[]>([]);
    const [trainerCount, setTrainerCount] = useState(0);
    const [classCount, setClassCount] = useState(0);
    const [payments, setPayments] = useState<Payment[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchDashboardData() {
            try {
                const [memRes, trainerRes, classRes, payRes] = await Promise.all([
                    fetch('/api/admin/members'),
                    fetch('/api/admin/trainers'),
                    fetch('/api/admin/classes'),
                    fetch('/api/admin/payments'),
                ]);

                if (memRes.status === 429 || trainerRes.status === 429 || classRes.status === 429) {
                    toast.error("You are doing that too fast! Please wait a few seconds.", {
                        style: { background: '#18181b', color: '#fff', border: '1px solid #27272a' }
                    });
                    return;
                }

                const memData = memRes.ok ? await memRes.json() : [];
                const trainerData = trainerRes.ok ? await trainerRes.json() : [];
                const classData = classRes.ok ? await classRes.json() : [];
                const payData = payRes.ok ? await payRes.json() : [];

                setMembers(memData);
                setTrainerCount(trainerData.length);
                setClassCount(classData.length);
                setPayments(Array.isArray(payData) ? payData : []);
            } catch (err) {
                console.error('Dashboard fetch error:', err);
                toast.error('Failed to load dashboard data.');
            } finally {
                setLoading(false);
            }
        }
        fetchDashboardData();
    }, []);

    const totalRevenue = payments
        .filter(p => p.status === 'SUCCESS')
        .reduce((sum, p) => sum + p.amount, 0);

    const stats = [
        { label: 'Total Members', value: loading ? '—' : members.length.toLocaleString(), icon: Users, color: 'emerald' },
        { label: 'Active Trainers', value: loading ? '—' : trainerCount.toLocaleString(), icon: Dumbbell, color: 'purple' },
        { label: 'Total Classes', value: loading ? '—' : classCount.toLocaleString(), icon: CalendarCheck, color: 'amber' },
        { label: 'Revenue', value: loading ? '—' : `৳${totalRevenue.toLocaleString()}`, icon: CreditCard, color: 'blue' },
    ];

    // Get the 5 most recent members
    const recentMembers = members.slice(0, 5);

    // Get the 5 most recent payments
    const recentPayments = payments.slice(0, 5);

    const statusBadge = (status: string | null) => {
        switch (status) {
            case 'SUCCESS':
                return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
            case 'PENDING':
                return 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
            default:
                return 'bg-red-500/10 text-red-400 border border-red-500/20';
        }
    };

    function formatDate(dateStr: string): string {
        const d = new Date(dateStr);
        return d.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
    }

    return (
        <div className="space-y-6">

            {/* Page Header */}
            <div>
                <h2 className="text-2xl font-bold text-white font-heading">Dashboard Overview</h2>
                <p className="text-sm text-zinc-500 font-satoshi mt-1">Welcome back, Admin. Here&apos;s what&apos;s happening today.</p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {stats.map((stat) => {
                    const c = colorMap[stat.color];
                    return (
                        <div
                            key={stat.label}
                            className={`relative bg-zinc-900/60 backdrop-blur-sm border border-zinc-800 rounded-2xl p-5 hover:border-zinc-700 transition-all duration-300 shadow-lg ${c.shadow} group overflow-hidden`}
                        >
                            {/* Glow */}
                            <div className={`absolute -top-10 -right-10 w-32 h-32 ${c.bg} rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                            <div className="relative z-10 flex items-start justify-between">
                                <div>
                                    <p className="text-xs text-zinc-500 font-satoshi mb-1">{stat.label}</p>
                                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                                </div>
                                <div className={`w-10 h-10 rounded-xl ${c.bg} border ${c.border} flex items-center justify-center`}>
                                    <stat.icon size={18} className={c.text} />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Tables */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

                {/* Recent Members */}
                <div className="bg-zinc-900/60 backdrop-blur-sm border border-zinc-800 rounded-2xl overflow-hidden">
                    <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800">
                        <h3 className="text-sm font-bold text-white font-heading">Recent Members</h3>
                        <a href="/admin/members" className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors">
                            View All <ArrowUpRight size={12} />
                        </a>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="text-zinc-500 text-xs border-b border-zinc-800/50">
                                    <th className="text-left px-5 py-3 font-medium">Name</th>
                                    <th className="text-left px-5 py-3 font-medium">Role</th>
                                    <th className="text-left px-5 py-3 font-medium hidden sm:table-cell">Joined</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan={3} className="px-5 py-8 text-center">
                                            <div className="w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
                                        </td>
                                    </tr>
                                ) : recentMembers.length === 0 ? (
                                    <tr>
                                        <td colSpan={3} className="px-5 py-8 text-center text-zinc-500 text-sm">No members found.</td>
                                    </tr>
                                ) : (
                                    recentMembers.map((m) => (
                                        <tr key={m.id} className="border-b border-zinc-800/30 hover:bg-zinc-800/20 transition-colors">
                                            <td className="px-5 py-3">
                                                <div className="flex items-center gap-3">
                                                    {m.image ? (
                                                        <img src={m.image} alt={m.name || ''} className="w-7 h-7 rounded-full object-cover border border-zinc-700 flex-shrink-0" />
                                                    ) : (
                                                        <div className="w-7 h-7 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 text-[10px] font-bold flex-shrink-0">
                                                            {(m.name || m.email).substring(0, 2).toUpperCase()}
                                                        </div>
                                                    )}
                                                    <div>
                                                        <p className="text-white font-medium text-sm">{m.name || 'Unnamed'}</p>
                                                        <p className="text-zinc-500 text-xs">{m.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-5 py-3">
                                                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${m.role === 'ADMIN'
                                                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                                        : m.role === 'TRAINER'
                                                            ? 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                                                            : 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20'
                                                    }`}>
                                                    {m.role}
                                                </span>
                                            </td>
                                            <td className="px-5 py-3 text-zinc-400 text-xs hidden sm:table-cell">{formatDate(m.createdAt)}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Recent Payments */}
                <div className="bg-zinc-900/60 backdrop-blur-sm border border-zinc-800 rounded-2xl overflow-hidden">
                    <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800">
                        <h3 className="text-sm font-bold text-white font-heading">Recent Payments</h3>
                        <a href="/admin/payments" className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors">
                            View All <ArrowUpRight size={12} />
                        </a>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="text-zinc-500 text-xs border-b border-zinc-800/50">
                                    <th className="text-left px-5 py-3 font-medium">Type</th>
                                    <th className="text-left px-5 py-3 font-medium">Amount</th>
                                    <th className="text-left px-5 py-3 font-medium">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan={3} className="px-5 py-8 text-center">
                                            <div className="w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
                                        </td>
                                    </tr>
                                ) : recentPayments.length === 0 ? (
                                    <tr>
                                        <td colSpan={3} className="px-5 py-8 text-center text-zinc-500 text-sm">No payments found.</td>
                                    </tr>
                                ) : (
                                    recentPayments.map((p) => (
                                        <tr key={p.id} className="border-b border-zinc-800/30 hover:bg-zinc-800/20 transition-colors">
                                            <td className="px-5 py-3">
                                                <div>
                                                    <p className="text-white font-medium text-sm capitalize">{p.bookingType}</p>
                                                    <p className="text-zinc-600 text-[10px] font-mono">{p.transactionId}</p>
                                                </div>
                                            </td>
                                            <td className="px-5 py-3 text-emerald-400 font-bold text-sm font-mono">৳{p.amount.toLocaleString()}</td>
                                            <td className="px-5 py-3">
                                                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium ${statusBadge(p.status)}`}>
                                                    {p.status || 'UNKNOWN'}
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
        </div>
    );
}
