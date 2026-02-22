'use client';

import { Search, Filter, Plus, Check, X } from 'lucide-react';

const memberships = [
    { id: 1, name: 'Basic Plan', price: '$49/mo', duration: '1 Month', members: 320, features: ['Gym Access', 'Locker Room', 'Free WiFi'], status: 'Active' },
    { id: 2, name: 'Premium Plan', price: '$99/mo', duration: '1 Month', members: 580, features: ['All Basic', 'Group Classes', 'Sauna', 'Diet Plan'], status: 'Active' },
    { id: 3, name: 'Elite Plan', price: '$149/mo', duration: '1 Month', members: 348, features: ['All Premium', 'Personal Trainer', 'Supplements', 'Priority Booking'], status: 'Active' },
    { id: 4, name: 'Annual Basic', price: '$470/yr', duration: '12 Months', members: 90, features: ['Gym Access', 'Locker Room', 'Free WiFi', '2 Months Free'], status: 'Active' },
    { id: 5, name: 'Annual Premium', price: '$950/yr', duration: '12 Months', members: 145, features: ['All Basic', 'Group Classes', 'Sauna', 'Diet Plan', '2 Months Free'], status: 'Active' },
    { id: 6, name: 'Student Plan', price: '$29/mo', duration: '1 Month', members: 120, features: ['Gym Access', 'Locker Room'], status: 'Paused' },
];

export default function MembershipsPage() {
    return (
        <div className="space-y-6">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-white font-heading">Memberships</h2>
                    <p className="text-sm text-zinc-500 font-satoshi mt-1">Manage membership plans and pricing.</p>
                </div>
                <button className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-black text-sm font-bold rounded-xl transition-all shadow-lg shadow-emerald-500/10">
                    <Plus size={16} />
                    Add Plan
                </button>
            </div>

            {/* Plan Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {memberships.map((plan) => (
                    <div
                        key={plan.id}
                        className="bg-zinc-900/60 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition-all duration-300 group"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h3 className="text-white font-bold text-lg">{plan.name}</h3>
                                <p className="text-zinc-500 text-xs">{plan.duration}</p>
                            </div>
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${plan.status === 'Active'
                                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                    : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                }`}>
                                {plan.status}
                            </span>
                        </div>

                        <p className="text-3xl font-bold text-emerald-400 mb-4">{plan.price}</p>

                        <div className="flex items-center gap-1.5 text-xs text-zinc-500 mb-4">
                            <span className="font-medium text-zinc-300">{plan.members}</span> active subscribers
                        </div>

                        <div className="space-y-2 border-t border-zinc-800/50 pt-4">
                            {plan.features.map((feature, i) => (
                                <div key={i} className="flex items-center gap-2 text-xs text-zinc-400">
                                    <Check size={12} className="text-emerald-500 flex-shrink-0" />
                                    {feature}
                                </div>
                            ))}
                        </div>

                        <div className="mt-5 flex gap-2">
                            <button className="flex-1 py-2 text-xs font-medium bg-zinc-800 text-zinc-300 rounded-lg hover:bg-zinc-700 transition-colors">
                                Edit
                            </button>
                            <button className="px-3 py-2 text-xs font-medium bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors border border-red-500/20">
                                <X size={14} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
