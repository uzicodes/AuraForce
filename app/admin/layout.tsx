'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
    LayoutDashboard,
    Users,
    Dumbbell,
    CalendarCheck,
    CreditCard,
    ClipboardList,
    Settings,
    LogOut,
    Menu,
    X,
    ChevronRight,
} from 'lucide-react';

const sidebarLinks = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Members', href: '/admin/members', icon: Users },
    { name: 'Trainers', href: '/admin/trainers', icon: Dumbbell },
    { name: 'Classes', href: '/admin/classes', icon: CalendarCheck },
    { name: 'Memberships', href: '/admin/memberships', icon: ClipboardList },
    { name: 'Payments', href: '/admin/payments', icon: CreditCard },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isAuthed, setIsAuthed] = useState(false);

    useEffect(() => {
        const admin = localStorage.getItem('auraforce_admin');
        if (!admin && pathname !== '/admin/login') {
            router.push('/admin/login');
        } else {
            setIsAuthed(true);
        }
    }, [pathname, router]);

    const handleLogout = () => {
        localStorage.removeItem('auraforce_admin');
        router.push('/admin/login');
    };

    // Login page - render without the dashboard shell
    if (pathname === '/admin/login') {
        return <>{children}</>;
    }

    // Show nothing until auth check completes
    if (!isAuthed) {
        return (
            <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-950 flex">

            {/* ----- Mobile overlay ----- */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* ----- Sidebar ----- */}
            <aside
                className={`
          fixed top-0 left-0 z-50 h-full w-64 bg-zinc-900/95 backdrop-blur-xl border-r border-zinc-800 flex flex-col transition-transform duration-300
          lg:translate-x-0 lg:static lg:z-auto
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
            >
                {/* Brand */}
                <div className="flex items-center justify-between px-5 py-5 border-b border-zinc-800">
                    <Link href="/admin" className="flex items-center gap-2 group">
                        <div className="relative w-8 h-8 transition-transform duration-300 group-hover:scale-110">
                            <Image
                                src="/for favicon.png"
                                alt="Aura Force Logo"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <span className="text-lg font-bold text-white tracking-tight" style={{ fontFamily: 'Tenada, sans-serif' }}>
                            AURA <span className="text-emerald-500">ADMIN</span>
                        </span>
                    </Link>

                    {/* Close on mobile */}
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden text-zinc-400 hover:text-white transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                    {sidebarLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setSidebarOpen(false)}
                                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group
                  ${isActive
                                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-lg shadow-emerald-500/5'
                                        : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50 border border-transparent'
                                    }
                `}
                            >
                                <link.icon size={18} className={isActive ? 'text-emerald-400' : 'text-zinc-500 group-hover:text-zinc-300 transition-colors'} />
                                <span className="flex-1">{link.name}</span>
                                {isActive && <ChevronRight size={14} className="text-emerald-500" />}
                            </Link>
                        );
                    })}
                </nav>

                {/* Logout */}
                <div className="px-3 py-4 border-t border-zinc-800">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-200 border border-transparent hover:border-red-500/20"
                    >
                        <LogOut size={18} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* ----- Main content ----- */}
            <div className="flex-1 flex flex-col min-w-0">

                {/* Top Bar */}
                <header className="sticky top-0 z-30 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 px-4 lg:px-6 py-3 flex items-center justify-between">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="lg:hidden text-zinc-400 hover:text-white transition-colors"
                    >
                        <Menu size={22} />
                    </button>

                    <div className="hidden lg:block">
                        <h1 className="text-sm font-bold text-white font-heading">
                            {sidebarLinks.find((l) => l.href === pathname)?.name || 'Admin Panel'}
                        </h1>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 text-sm font-bold">
                            A
                        </div>
                    </div>
                </header>

                {/* Page content */}
                <main className="flex-1 p-4 lg:p-6 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
