'use client';

import { useEffect, useState } from 'react';
import { Crown, Dumbbell, CalendarCheck, Clock, Star } from 'lucide-react';

interface Membership {
    id: number;
    name: string;
    price: number;
    period: string;
}

interface GymClass {
    id: number;
    classname: string;
    trainer: string;
    duration: string;
    class_fees: number;
    class_time: string;
    class_days: string;
}

/* ── Remaining Dummy data ── */

const trainers = [
    { id: 1, name: 'Ahmad Raza', role: 'Strength Coach', feeWeek: 2000, feeMonth: 7000, rating: 4.9 },
    { id: 2, name: 'Sara Khan', role: 'Yoga Instructor', feeWeek: 1500, feeMonth: 5000, rating: 4.8 },
    { id: 3, name: 'Omar Faruk', role: 'HIIT Specialist', feeWeek: 1800, feeMonth: 6500, rating: 4.7 },
    { id: 4, name: 'Nadia Akter', role: 'Cardio Expert', feeWeek: 1600, feeMonth: 5500, rating: 4.6 },
];

/* ── Color helpers ── */

const tierColors: Record<string, string> = {
    Basic: 'border-zinc-600/40 from-zinc-800/60 to-zinc-900/80',
    Standard: 'border-emerald-500/30 from-emerald-900/20 to-zinc-900/80',
    Premium: 'border-yellow-500/30 from-yellow-900/15 to-zinc-900/80',
};

const tierBadge: Record<string, string> = {
    Basic: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20',
    Standard: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    Premium: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
};

export default function PlansPage() {
    const [membershipPlans, setMembershipPlans] = useState<Membership[]>([]);
    const [gymClasses, setGymClasses] = useState<GymClass[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const [memRes, classRes] = await Promise.all([
                    fetch('/api/admin/memberships'),
                    fetch('/api/admin/classes')
                ]);

                if (!memRes.ok || !classRes.ok) throw new Error('Failed to fetch data');

                const [memData, classData] = await Promise.all([
                    memRes.json(),
                    classRes.json()
                ]);

                setMembershipPlans(memData);
                setGymClasses(classData);
            } catch (err) {
                console.error('Error fetching dashboard data:', err);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="space-y-10">

            {/* ═══════════════ MEMBERSHIPS ═══════════════ */}
            <section className="space-y-4">
                <div className="flex items-center gap-2">
                    <Crown size={18} className="text-yellow-500" />
                    <h3 className="text-lg font-bold text-white font-heading">Membership Plans</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {loading ? (
                        [1, 2, 3].map((i) => (
                            <div key={i} className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5 h-32 animate-pulse" />
                        ))
                    ) : membershipPlans.length === 0 ? (
                        <p className="text-zinc-500 text-sm">No membership plans found in database.</p>
                    ) : (
                        membershipPlans.map((plan) => (
                            <div
                                key={plan.id}
                                className={`relative bg-gradient-to-b ${tierColors[plan.name] || 'border-zinc-800 from-zinc-900/40 to-zinc-900/80'} border rounded-2xl p-5 flex flex-col gap-4 transition-all hover:scale-[1.02] hover:shadow-lg`}
                            >
                                {/* Badge */}
                                <span className={`self-start inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${tierBadge[plan.name] || 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20'}`}>
                                    {plan.name}
                                </span>

                                {/* Price */}
                                <div className="flex items-end gap-1">
                                    <span className="text-3xl font-bold text-white">৳{plan.price.toLocaleString()}</span>
                                    <span className="text-zinc-500 text-sm mb-1">{plan.period}</span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </section>

            {/* ═══════════════ TRAINERS ═══════════════ */}
            <section className="space-y-4">
                <div className="flex items-center gap-2">
                    <Dumbbell size={18} className="text-purple-400" />
                    <h3 className="text-lg font-bold text-white font-heading">Our Trainers</h3>
                </div>

                <div className="bg-zinc-900/60 backdrop-blur-sm border border-zinc-800 rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="text-yellow-500 text-xs border-b border-zinc-800/50">
                                    <th className="text-left px-5 py-3.5 font-medium uppercase tracking-wider">Trainer</th>
                                    <th className="text-left px-5 py-3.5 font-medium uppercase tracking-wider">Specialization</th>
                                    <th className="text-left px-5 py-3.5 font-medium uppercase tracking-wider hidden sm:table-cell">Fee / Week</th>
                                    <th className="text-left px-5 py-3.5 font-medium uppercase tracking-wider hidden sm:table-cell">Fee / Month</th>
                                    <th className="text-left px-5 py-3.5 font-medium uppercase tracking-wider">Rating</th>
                                </tr>
                            </thead>
                            <tbody>
                                {trainers.map((t) => (
                                    <tr key={t.id} className="border-b border-zinc-800/30 hover:bg-zinc-800/20 transition-colors">
                                        <td className="px-5 py-3.5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 text-xs font-bold flex-shrink-0">
                                                    {t.name.split(' ').map((n) => n[0]).join('')}
                                                </div>
                                                <span className="text-white font-medium">{t.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3.5 text-zinc-400">{t.role}</td>
                                        <td className="px-5 py-3.5 text-zinc-400 hidden sm:table-cell">৳{t.feeWeek.toLocaleString()}</td>
                                        <td className="px-5 py-3.5 text-zinc-400 hidden sm:table-cell">৳{t.feeMonth.toLocaleString()}</td>
                                        <td className="px-5 py-3.5">
                                            <div className="flex items-center gap-1 text-yellow-500">
                                                <Star size={12} fill="currentColor" />
                                                <span className="text-sm font-medium">{t.rating}</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* ═══════════════ CLASSES ═══════════════ */}
            <section className="space-y-4">
                <div className="flex items-center gap-2">
                    <CalendarCheck size={18} className="text-emerald-400" />
                    <h3 className="text-lg font-bold text-white font-heading">Our Classes</h3>
                </div>

                <div className="bg-zinc-900/60 backdrop-blur-sm border border-zinc-800 rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="text-yellow-500 text-xs border-b border-zinc-800/50">
                                    <th className="text-left px-5 py-3.5 font-medium uppercase tracking-wider">Class</th>
                                    <th className="text-left px-5 py-3.5 font-medium uppercase tracking-wider hidden sm:table-cell">Trainer</th>
                                    <th className="text-left px-5 py-3.5 font-medium uppercase tracking-wider hidden md:table-cell">Duration</th>
                                    <th className="text-left px-5 py-3.5 font-medium uppercase tracking-wider">Fee</th>
                                    <th className="text-left px-5 py-3.5 font-medium uppercase tracking-wider hidden lg:table-cell">Time</th>
                                    <th className="text-left px-5 py-3.5 font-medium uppercase tracking-wider hidden lg:table-cell">Days</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan={6} className="px-5 py-12 text-center">
                                            <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
                                        </td>
                                    </tr>
                                ) : gymClasses.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="px-5 py-12 text-center text-zinc-500">
                                            No classes found in database.
                                        </td>
                                    </tr>
                                ) : (
                                    gymClasses.map((c) => (
                                        <tr key={c.id} className="border-b border-zinc-800/30 hover:bg-zinc-800/20 transition-colors">
                                            <td className="px-5 py-3.5">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 flex-shrink-0">
                                                        <CalendarCheck size={14} />
                                                    </div>
                                                    <span className="text-white font-medium">{c.classname}</span>
                                                </div>
                                            </td>
                                            <td className="px-5 py-3.5 text-zinc-400 hidden sm:table-cell">{c.trainer || 'TBA'}</td>
                                            <td className="px-5 py-3.5 hidden md:table-cell">
                                                <div className="flex items-center gap-1 text-zinc-400">
                                                    <Clock size={12} />
                                                    <span>{c.duration}</span>
                                                </div>
                                            </td>
                                            <td className="px-5 py-3.5">
                                                <span className="text-emerald-400 font-medium">৳{(c.class_fees || 0).toLocaleString()}</span>
                                            </td>
                                            <td className="px-5 py-3.5 text-zinc-400 hidden lg:table-cell">{c.class_time}</td>
                                            <td className="px-5 py-3.5 hidden lg:table-cell">
                                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border bg-zinc-500/10 text-zinc-400 border-zinc-500/20">
                                                    {c.class_days}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

        </div>
    );
}
