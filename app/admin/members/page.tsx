'use client';

import { useEffect, useState } from 'react';
import { Users, Search, Filter } from 'lucide-react';

interface Member {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
    role: string;
    phone: string | null;
    gender: string | null;
    location: string | null;
    createdAt: string;
}

const roleColorMap: Record<string, string> = {
    MEMBER: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20',
    ADMIN: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    TRAINER: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
};

function getInitials(name: string | null, email: string): string {
    if (name) {
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    }
    return email.substring(0, 2).toUpperCase();
}

function formatDate(dateStr: string): string {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
    });
}

export default function MembersPage() {
    const [members, setMembers] = useState<Member[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        async function fetchMembers() {
            try {
                const res = await fetch('/api/admin/members');
                if (!res.ok) throw new Error('Failed to fetch members');
                const data = await res.json();
                setMembers(data);
            } catch (err) {
                console.error('Error fetching members:', err);
            } finally {
                setLoading(false);
            }
        }
        fetchMembers();
    }, []);

    const filteredMembers = members.filter((m) => {
        const q = searchQuery.toLowerCase();
        return (
            (m.name?.toLowerCase().includes(q) ?? false) ||
            m.email.toLowerCase().includes(q) ||
            (m.phone?.toLowerCase().includes(q) ?? false) ||
            m.role.toLowerCase().includes(q)
        );
    });

    const totalMembers = members.length;

    return (
        <div className="space-y-6">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-white font-heading">Members</h2>
                    <p className="text-sm text-zinc-500 font-satoshi mt-1">Manage all gym members and their subscriptions.</p>
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900/60 border border-zinc-800 rounded-xl">
                    <Users size={16} className="text-emerald-400" />
                    <span className="text-sm font-bold text-white">{loading ? '—' : totalMembers}</span>
                    <span className="text-xs text-zinc-500">Users</span>
                </div>
            </div>

            {/* Search & Filter */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                    <input
                        type="text"
                        placeholder="Search members..."
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



            {/* Members Table */}
            <div className="bg-zinc-900/60 backdrop-blur-sm border border-zinc-800 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-yellow-500 text-xs border-b border-zinc-800/50">
                                <th className="text-left px-5 py-3.5 font-medium uppercase tracking-wider">ID</th>
                                <th className="text-left px-5 py-3.5 font-medium uppercase tracking-wider">Member</th>
                                <th className="text-left px-5 py-3.5 font-medium hidden md:table-cell uppercase tracking-wider">Phone</th>
                                <th className="text-left px-5 py-3.5 font-medium hidden md:table-cell uppercase tracking-wider">Gender</th>
                                <th className="text-left px-5 py-3.5 font-medium uppercase tracking-wider">Role</th>
                                <th className="text-left px-5 py-3.5 font-medium hidden sm:table-cell uppercase tracking-wider">Joined</th>
                                <th className="text-left px-5 py-3.5 font-medium hidden lg:table-cell uppercase tracking-wider">Location</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={7} className="px-5 py-12 text-center">
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                                            <p className="text-zinc-500 text-sm">Loading members...</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredMembers.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-5 py-12 text-center">
                                        <p className="text-zinc-500 text-sm">No members found.</p>
                                    </td>
                                </tr>
                            ) : (
                                filteredMembers.map((m) => (
                                    <tr key={m.id} className="border-b border-zinc-800/30 hover:bg-zinc-800/20 transition-colors cursor-pointer">
                                        <td className="px-5 py-3.5">
                                            <span className="text-zinc-500 font-mono text-xs">
                                                {m.id.slice(-6).toUpperCase()}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <div className="flex items-center gap-3">
                                                {m.image ? (
                                                    <img
                                                        src={m.image}
                                                        alt={m.name || m.email}
                                                        className="w-8 h-8 rounded-full object-cover border border-zinc-700 flex-shrink-0"
                                                    />
                                                ) : (
                                                    <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 text-xs font-bold flex-shrink-0">
                                                        {getInitials(m.name, m.email)}
                                                    </div>
                                                )}
                                                <div>
                                                    <p className="text-white font-medium">{m.name || 'Unnamed'}</p>
                                                    <p className="text-zinc-500 text-xs">{m.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3.5 text-zinc-400 hidden md:table-cell">{m.phone || '—'}</td>
                                        <td className="px-5 py-3.5 text-zinc-400 hidden md:table-cell uppercase">{m.gender || '—'}</td>
                                        <td className="px-5 py-3.5">
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${roleColorMap[m.role] || roleColorMap['MEMBER']}`}>
                                                {m.role}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3.5 text-zinc-400 hidden sm:table-cell">{formatDate(m.createdAt)}</td>
                                        <td className="px-5 py-3.5 text-zinc-400 hidden lg:table-cell">{m.location || '—'}</td>
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
