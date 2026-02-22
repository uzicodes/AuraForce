'use client';

import { Search, Filter, Plus, Star } from 'lucide-react';

const trainers = [
    { id: 1, name: 'Alex Rivera', specialty: 'Strength & Conditioning', experience: '8 years', rating: 4.9, clients: 42, status: 'Active', avatar: 'AR' },
    { id: 2, name: 'Jessica Park', specialty: 'Yoga & Flexibility', experience: '6 years', rating: 4.8, clients: 38, status: 'Active', avatar: 'JP' },
    { id: 3, name: 'Marcus Williams', specialty: 'HIIT & Cardio', experience: '5 years', rating: 4.7, clients: 35, status: 'Active', avatar: 'MW' },
    { id: 4, name: 'Priya Sharma', specialty: 'CrossFit', experience: '7 years', rating: 4.9, clients: 45, status: 'Active', avatar: 'PS' },
    { id: 5, name: 'David Kim', specialty: 'Boxing & MMA', experience: '10 years', rating: 5.0, clients: 50, status: 'Active', avatar: 'DK' },
    { id: 6, name: 'Luna Rodriguez', specialty: 'Pilates & Rehab', experience: '4 years', rating: 4.6, clients: 28, status: 'On Leave', avatar: 'LR' },
    { id: 7, name: 'Chris Anderson', specialty: 'Bodybuilding', experience: '9 years', rating: 4.8, clients: 40, status: 'Active', avatar: 'CA' },
    { id: 8, name: 'Nina Foster', specialty: 'Dance Fitness', experience: '3 years', rating: 4.5, clients: 22, status: 'Active', avatar: 'NF' },
];

export default function TrainersPage() {
    return (
        <div className="space-y-6">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-white font-heading">Trainers</h2>
                    <p className="text-sm text-zinc-500 font-satoshi mt-1">Manage your training staff and their schedules.</p>
                </div>
                <button className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-black text-sm font-bold rounded-xl transition-all shadow-lg shadow-emerald-500/10">
                    <Plus size={16} />
                    Add Trainer
                </button>
            </div>

            {/* Search */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                    <input
                        type="text"
                        placeholder="Search trainers..."
                        className="w-full pl-9 pr-4 py-2.5 bg-zinc-900/60 border border-zinc-800 rounded-xl text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                    />
                </div>
                <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-zinc-900/60 border border-zinc-800 text-zinc-400 text-sm rounded-xl hover:border-zinc-700 transition-all">
                    <Filter size={16} />
                    Filters
                </button>
            </div>

            {/* Trainer Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {trainers.map((t) => (
                    <div
                        key={t.id}
                        className="bg-zinc-900/60 backdrop-blur-sm border border-zinc-800 rounded-2xl p-5 hover:border-zinc-700 transition-all duration-300 group cursor-pointer"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 text-sm font-bold flex-shrink-0">
                                {t.avatar}
                            </div>
                            <div className="min-w-0">
                                <p className="text-white font-medium text-sm truncate">{t.name}</p>
                                <p className="text-zinc-500 text-xs truncate">{t.specialty}</p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs">
                                <span className="text-zinc-500">Experience</span>
                                <span className="text-zinc-300">{t.experience}</span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                                <span className="text-zinc-500">Clients</span>
                                <span className="text-zinc-300">{t.clients}</span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                                <span className="text-zinc-500">Rating</span>
                                <span className="flex items-center gap-1 text-amber-400">
                                    <Star size={12} fill="currentColor" />
                                    {t.rating}
                                </span>
                            </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-zinc-800/50">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${t.status === 'Active'
                                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                    : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                }`}>
                                {t.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
