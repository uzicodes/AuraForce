'use client';

import { Search, Filter, Plus, Clock, Users } from 'lucide-react';

const classes = [
    { id: 1, name: 'Power Yoga', trainer: 'Jessica Park', time: '06:00 AM - 07:00 AM', days: 'Mon, Wed, Fri', enrolled: 24, capacity: 30, status: 'Active' },
    { id: 2, name: 'HIIT Blast', trainer: 'Marcus Williams', time: '07:30 AM - 08:30 AM', days: 'Tue, Thu, Sat', enrolled: 28, capacity: 30, status: 'Active' },
    { id: 3, name: 'CrossFit WOD', trainer: 'Priya Sharma', time: '08:00 AM - 09:00 AM', days: 'Mon, Wed, Fri', enrolled: 20, capacity: 25, status: 'Active' },
    { id: 4, name: 'Boxing Fundamentals', trainer: 'David Kim', time: '09:00 AM - 10:00 AM', days: 'Tue, Thu', enrolled: 18, capacity: 20, status: 'Active' },
    { id: 5, name: 'Pilates Core', trainer: 'Luna Rodriguez', time: '10:00 AM - 11:00 AM', days: 'Mon, Wed', enrolled: 15, capacity: 20, status: 'Paused' },
    { id: 6, name: 'Dance Cardio', trainer: 'Nina Foster', time: '05:00 PM - 06:00 PM', days: 'Mon, Wed, Fri', enrolled: 22, capacity: 25, status: 'Active' },
    { id: 7, name: 'Strength Training', trainer: 'Alex Rivera', time: '06:30 PM - 07:30 PM', days: 'Tue, Thu, Sat', enrolled: 25, capacity: 25, status: 'Full' },
    { id: 8, name: 'Bodybuilding Pro', trainer: 'Chris Anderson', time: '07:00 PM - 08:30 PM', days: 'Mon, Wed, Fri', enrolled: 18, capacity: 20, status: 'Active' },
];

const statusColorMap: Record<string, string> = {
    Active: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    Paused: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    Full: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
};

export default function ClassesPage() {
    return (
        <div className="space-y-6">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-white font-heading">Classes</h2>
                    <p className="text-sm text-zinc-500 font-satoshi mt-1">Manage gym class schedules and enrollment.</p>
                </div>
                <button className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-black text-sm font-bold rounded-xl transition-all shadow-lg shadow-emerald-500/10">
                    <Plus size={16} />
                    Add Class
                </button>
            </div>

            {/* Search */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                    <input
                        type="text"
                        placeholder="Search classes..."
                        className="w-full pl-9 pr-4 py-2.5 bg-zinc-900/60 border border-zinc-800 rounded-xl text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                    />
                </div>
                <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-zinc-900/60 border border-zinc-800 text-zinc-400 text-sm rounded-xl hover:border-zinc-700 transition-all">
                    <Filter size={16} />
                    Filters
                </button>
            </div>

            {/* Classes Table */}
            <div className="bg-zinc-900/60 backdrop-blur-sm border border-zinc-800 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-zinc-500 text-xs border-b border-zinc-800/50">
                                <th className="text-left px-5 py-3.5 font-medium">Class</th>
                                <th className="text-left px-5 py-3.5 font-medium hidden md:table-cell">Schedule</th>
                                <th className="text-left px-5 py-3.5 font-medium hidden lg:table-cell">Days</th>
                                <th className="text-left px-5 py-3.5 font-medium">Enrollment</th>
                                <th className="text-left px-5 py-3.5 font-medium">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {classes.map((c) => (
                                <tr key={c.id} className="border-b border-zinc-800/30 hover:bg-zinc-800/20 transition-colors cursor-pointer">
                                    <td className="px-5 py-3.5">
                                        <div>
                                            <p className="text-white font-medium">{c.name}</p>
                                            <p className="text-zinc-500 text-xs">by {c.trainer}</p>
                                        </div>
                                    </td>
                                    <td className="px-5 py-3.5 hidden md:table-cell">
                                        <div className="flex items-center gap-1.5 text-zinc-400 text-xs">
                                            <Clock size={12} />
                                            {c.time}
                                        </div>
                                    </td>
                                    <td className="px-5 py-3.5 text-zinc-400 text-xs hidden lg:table-cell">{c.days}</td>
                                    <td className="px-5 py-3.5">
                                        <div className="flex items-center gap-2">
                                            <div className="w-20 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-emerald-500 rounded-full transition-all"
                                                    style={{ width: `${(c.enrolled / c.capacity) * 100}%` }}
                                                />
                                            </div>
                                            <span className="text-zinc-400 text-xs flex items-center gap-1">
                                                <Users size={11} />
                                                {c.enrolled}/{c.capacity}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-5 py-3.5">
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${statusColorMap[c.status]}`}>
                                            {c.status}
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
