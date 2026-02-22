'use client';

import {
    Users,
    Dumbbell,
    CalendarCheck,
    CreditCard,
    TrendingUp,
    TrendingDown,
    ArrowUpRight,
} from 'lucide-react';

const stats = [
    { label: 'Total Members', value: '1,248', change: '+12%', trend: 'up', icon: Users, color: 'emerald' },
    { label: 'Active Trainers', value: '24', change: '+3', trend: 'up', icon: Dumbbell, color: 'blue' },
    { label: 'Classes Today', value: '18', change: '-2', trend: 'down', icon: CalendarCheck, color: 'amber' },
    { label: 'Revenue (Month)', value: '$48,250', change: '+8.5%', trend: 'up', icon: CreditCard, color: 'purple' },
];

const recentMembers = [
    { name: 'Sarah Johnson', email: 'sarah@email.com', plan: 'Premium', joined: 'Feb 20, 2026', status: 'Active' },
    { name: 'Mike Chen', email: 'mike@email.com', plan: 'Basic', joined: 'Feb 19, 2026', status: 'Active' },
    { name: 'Emily Davis', email: 'emily@email.com', plan: 'Premium', joined: 'Feb 18, 2026', status: 'Active' },
    { name: 'James Wilson', email: 'james@email.com', plan: 'Elite', joined: 'Feb 17, 2026', status: 'Inactive' },
    { name: 'Olivia Brown', email: 'olivia@email.com', plan: 'Basic', joined: 'Feb 16, 2026', status: 'Active' },
];

const recentPayments = [
    { member: 'Sarah Johnson', amount: '$99.00', type: 'Premium Plan', date: 'Feb 20', status: 'Paid' },
    { member: 'Mike Chen', amount: '$49.00', type: 'Basic Plan', date: 'Feb 19', status: 'Paid' },
    { member: 'Emily Davis', amount: '$99.00', type: 'Premium Plan', date: 'Feb 18', status: 'Paid' },
    { member: 'James Wilson', amount: '$149.00', type: 'Elite Plan', date: 'Feb 17', status: 'Pending' },
    { member: 'Olivia Brown', amount: '$49.00', type: 'Basic Plan', date: 'Feb 16', status: 'Failed' },
];

const colorMap: Record<string, { bg: string; text: string; border: string; shadow: string }> = {
    emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20', shadow: 'shadow-emerald-500/5' },
    blue: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20', shadow: 'shadow-blue-500/5' },
    amber: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20', shadow: 'shadow-amber-500/5' },
    purple: { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/20', shadow: 'shadow-purple-500/5' },
};

export default function AdminDashboard() {
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

                            <div className="relative z-10 mt-3 flex items-center gap-1.5">
                                {stat.trend === 'up' ? (
                                    <TrendingUp size={14} className="text-emerald-400" />
                                ) : (
                                    <TrendingDown size={14} className="text-red-400" />
                                )}
                                <span className={`text-xs font-medium ${stat.trend === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
                                    {stat.change}
                                </span>
                                <span className="text-xs text-zinc-600">vs last month</span>
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
                                    <th className="text-left px-5 py-3 font-medium">Plan</th>
                                    <th className="text-left px-5 py-3 font-medium">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentMembers.map((m, i) => (
                                    <tr key={i} className="border-b border-zinc-800/30 hover:bg-zinc-800/20 transition-colors">
                                        <td className="px-5 py-3">
                                            <div>
                                                <p className="text-white font-medium text-sm">{m.name}</p>
                                                <p className="text-zinc-500 text-xs">{m.email}</p>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3 text-zinc-300">{m.plan}</td>
                                        <td className="px-5 py-3">
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium ${m.status === 'Active'
                                                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                                    : 'bg-red-500/10 text-red-400 border border-red-500/20'
                                                }`}>
                                                {m.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
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
                                    <th className="text-left px-5 py-3 font-medium">Member</th>
                                    <th className="text-left px-5 py-3 font-medium">Amount</th>
                                    <th className="text-left px-5 py-3 font-medium">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentPayments.map((p, i) => (
                                    <tr key={i} className="border-b border-zinc-800/30 hover:bg-zinc-800/20 transition-colors">
                                        <td className="px-5 py-3">
                                            <div>
                                                <p className="text-white font-medium text-sm">{p.member}</p>
                                                <p className="text-zinc-500 text-xs">{p.type}</p>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3 text-zinc-300 font-medium">{p.amount}</td>
                                        <td className="px-5 py-3">
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium ${p.status === 'Paid'
                                                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                                    : p.status === 'Pending'
                                                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                                        : 'bg-red-500/10 text-red-400 border border-red-500/20'
                                                }`}>
                                                {p.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
