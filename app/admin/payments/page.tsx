'use client';

import { Search, Filter, Download, CreditCard, TrendingUp, DollarSign, AlertCircle } from 'lucide-react';

const payments = [
    { id: 'PAY-001', member: 'Sarah Johnson', email: 'sarah@email.com', amount: '$99.00', plan: 'Premium Plan', method: 'Credit Card', date: 'Feb 20, 2026', status: 'Paid' },
    { id: 'PAY-002', member: 'Mike Chen', email: 'mike@email.com', amount: '$49.00', plan: 'Basic Plan', method: 'bKash', date: 'Feb 19, 2026', status: 'Paid' },
    { id: 'PAY-003', member: 'Emily Davis', email: 'emily@email.com', amount: '$99.00', plan: 'Premium Plan', method: 'Credit Card', date: 'Feb 18, 2026', status: 'Paid' },
    { id: 'PAY-004', member: 'James Wilson', email: 'james@email.com', amount: '$149.00', plan: 'Elite Plan', method: 'Nagad', date: 'Feb 17, 2026', status: 'Pending' },
    { id: 'PAY-005', member: 'Olivia Brown', email: 'olivia@email.com', amount: '$49.00', plan: 'Basic Plan', method: 'Credit Card', date: 'Feb 16, 2026', status: 'Failed' },
    { id: 'PAY-006', member: 'Daniel Martinez', email: 'daniel@email.com', amount: '$149.00', plan: 'Elite Plan', method: 'bKash', date: 'Feb 15, 2026', status: 'Paid' },
    { id: 'PAY-007', member: 'Sophia Lee', email: 'sophia@email.com', amount: '$99.00', plan: 'Premium Plan', method: 'Credit Card', date: 'Feb 14, 2026', status: 'Refunded' },
    { id: 'PAY-008', member: 'Liam Taylor', email: 'liam@email.com', amount: '$49.00', plan: 'Basic Plan', method: 'Nagad', date: 'Feb 13, 2026', status: 'Paid' },
];

const statusColorMap: Record<string, string> = {
    Paid: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    Pending: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    Failed: 'bg-red-500/10 text-red-400 border-red-500/20',
    Refunded: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
};

export default function PaymentsPage() {
    return (
        <div className="space-y-6">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-white font-heading">Payments</h2>
                    <p className="text-sm text-zinc-500 font-satoshi mt-1">Track all transactions and revenue.</p>
                </div>
                <button className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900/60 border border-zinc-800 text-zinc-300 text-sm font-medium rounded-xl hover:border-zinc-700 transition-all">
                    <Download size={16} />
                    Export CSV
                </button>
            </div>

            {/* Revenue Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {[
                    { label: 'Total Revenue', value: '$48,250', icon: DollarSign, color: 'emerald' },
                    { label: 'This Month', value: '$12,800', icon: TrendingUp, color: 'blue' },
                    { label: 'Successful', value: '412', icon: CreditCard, color: 'emerald' },
                    { label: 'Pending / Failed', value: '23', icon: AlertCircle, color: 'amber' },
                ].map((s) => (
                    <div key={s.label} className="bg-zinc-900/60 border border-zinc-800 rounded-xl px-5 py-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-[10px] text-zinc-500 uppercase tracking-wider">{s.label}</p>
                                <p className="text-xl font-bold text-white mt-1">{s.value}</p>
                            </div>
                            <div className={`w-9 h-9 rounded-lg bg-${s.color}-500/10 border border-${s.color}-500/20 flex items-center justify-center`}>
                                <s.icon size={16} className={`text-${s.color}-400`} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Search */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                    <input
                        type="text"
                        placeholder="Search transactions..."
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
                            <tr className="text-zinc-500 text-xs border-b border-zinc-800/50">
                                <th className="text-left px-5 py-3.5 font-medium">Transaction ID</th>
                                <th className="text-left px-5 py-3.5 font-medium">Member</th>
                                <th className="text-left px-5 py-3.5 font-medium hidden md:table-cell">Plan</th>
                                <th className="text-left px-5 py-3.5 font-medium">Amount</th>
                                <th className="text-left px-5 py-3.5 font-medium hidden lg:table-cell">Method</th>
                                <th className="text-left px-5 py-3.5 font-medium hidden sm:table-cell">Date</th>
                                <th className="text-left px-5 py-3.5 font-medium">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((p) => (
                                <tr key={p.id} className="border-b border-zinc-800/30 hover:bg-zinc-800/20 transition-colors cursor-pointer">
                                    <td className="px-5 py-3.5 text-zinc-400 font-mono text-xs">{p.id}</td>
                                    <td className="px-5 py-3.5">
                                        <div>
                                            <p className="text-white font-medium text-sm">{p.member}</p>
                                            <p className="text-zinc-500 text-xs">{p.email}</p>
                                        </div>
                                    </td>
                                    <td className="px-5 py-3.5 text-zinc-400 hidden md:table-cell">{p.plan}</td>
                                    <td className="px-5 py-3.5 text-white font-medium">{p.amount}</td>
                                    <td className="px-5 py-3.5 text-zinc-400 hidden lg:table-cell">{p.method}</td>
                                    <td className="px-5 py-3.5 text-zinc-400 hidden sm:table-cell">{p.date}</td>
                                    <td className="px-5 py-3.5">
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${statusColorMap[p.status]}`}>
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
    );
}
