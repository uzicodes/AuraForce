'use client';

import { Users, Search, Filter, Plus } from 'lucide-react';

const members = [
    { id: 1, name: 'Sarah Johnson', email: 'sarah@email.com', phone: '+1 234 567 890', plan: 'Premium', joined: 'Jan 15, 2026', status: 'Active', avatar: 'SJ' },
    { id: 2, name: 'Mike Chen', email: 'mike@email.com', phone: '+1 345 678 901', plan: 'Basic', joined: 'Jan 20, 2026', status: 'Active', avatar: 'MC' },
    { id: 3, name: 'Emily Davis', email: 'emily@email.com', phone: '+1 456 789 012', plan: 'Premium', joined: 'Feb 01, 2026', status: 'Active', avatar: 'ED' },
    { id: 4, name: 'James Wilson', email: 'james@email.com', phone: '+1 567 890 123', plan: 'Elite', joined: 'Feb 05, 2026', status: 'Inactive', avatar: 'JW' },
    { id: 5, name: 'Olivia Brown', email: 'olivia@email.com', phone: '+1 678 901 234', plan: 'Basic', joined: 'Feb 10, 2026', status: 'Active', avatar: 'OB' },
    { id: 6, name: 'Daniel Martinez', email: 'daniel@email.com', phone: '+1 789 012 345', plan: 'Elite', joined: 'Feb 12, 2026', status: 'Active', avatar: 'DM' },
    { id: 7, name: 'Sophia Lee', email: 'sophia@email.com', phone: '+1 890 123 456', plan: 'Premium', joined: 'Feb 14, 2026', status: 'Active', avatar: 'SL' },
    { id: 8, name: 'Liam Taylor', email: 'liam@email.com', phone: '+1 901 234 567', plan: 'Basic', joined: 'Feb 18, 2026', status: 'Expired', avatar: 'LT' },
];

const planColorMap: Record<string, string> = {
    Basic: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20',
    Premium: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    Elite: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
};

const statusColorMap: Record<string, string> = {
    Active: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    Inactive: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    Expired: 'bg-red-500/10 text-red-400 border-red-500/20',
};

export default function MembersPage() {
    return (
        <div className="space-y-6">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-white font-heading">Members</h2>
                    <p className="text-sm text-zinc-500 font-satoshi mt-1">Manage all gym members and their subscriptions.</p>
                </div>
                <button className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-black text-sm font-bold rounded-xl transition-all shadow-lg shadow-emerald-500/10">
                    <Plus size={16} />
                    Add Member
                </button>
            </div>

            {/* Search & Filter */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                    <input
                        type="text"
                        placeholder="Search members..."
                        className="w-full pl-9 pr-4 py-2.5 bg-zinc-900/60 border border-zinc-800 rounded-xl text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                    />
                </div>
                <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-zinc-900/60 border border-zinc-800 text-zinc-400 text-sm rounded-xl hover:border-zinc-700 transition-all">
                    <Filter size={16} />
                    Filters
                </button>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                    { label: 'Total Members', value: '1,248', icon: Users },
                    { label: 'Active', value: '1,102' },
                    { label: 'Inactive', value: '98' },
                    { label: 'Expired', value: '48' },
                ].map((s) => (
                    <div key={s.label} className="bg-zinc-900/60 border border-zinc-800 rounded-xl px-4 py-3">
                        <p className="text-[10px] text-zinc-500 uppercase tracking-wider">{s.label}</p>
                        <p className="text-lg font-bold text-white mt-0.5">{s.value}</p>
                    </div>
                ))}
            </div>

            {/* Members Table */}
            <div className="bg-zinc-900/60 backdrop-blur-sm border border-zinc-800 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-zinc-500 text-xs border-b border-zinc-800/50">
                                <th className="text-left px-5 py-3.5 font-medium">Member</th>
                                <th className="text-left px-5 py-3.5 font-medium hidden md:table-cell">Phone</th>
                                <th className="text-left px-5 py-3.5 font-medium">Plan</th>
                                <th className="text-left px-5 py-3.5 font-medium hidden sm:table-cell">Joined</th>
                                <th className="text-left px-5 py-3.5 font-medium">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {members.map((m) => (
                                <tr key={m.id} className="border-b border-zinc-800/30 hover:bg-zinc-800/20 transition-colors cursor-pointer">
                                    <td className="px-5 py-3.5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 text-xs font-bold flex-shrink-0">
                                                {m.avatar}
                                            </div>
                                            <div>
                                                <p className="text-white font-medium">{m.name}</p>
                                                <p className="text-zinc-500 text-xs">{m.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-3.5 text-zinc-400 hidden md:table-cell">{m.phone}</td>
                                    <td className="px-5 py-3.5">
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${planColorMap[m.plan]}`}>
                                            {m.plan}
                                        </span>
                                    </td>
                                    <td className="px-5 py-3.5 text-zinc-400 hidden sm:table-cell">{m.joined}</td>
                                    <td className="px-5 py-3.5">
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${statusColorMap[m.status]}`}>
                                            {m.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
