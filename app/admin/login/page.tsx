'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { Shield, ArrowLeft, Lock, Fingerprint } from 'lucide-react';

const ADMIN_PIN = '12345';

const AdminLogin = () => {
    const router = useRouter();
    const [pin, setPin] = useState<string[]>(Array(5).fill(''));
    const [loading, setLoading] = useState(false);
    const [shake, setShake] = useState(false);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    // Auto-focus first input
    useEffect(() => {
        inputRefs.current[0]?.focus();
    }, []);

    const handleChange = (index: number, value: string) => {
        // Only allow digits
        if (value && !/^\d$/.test(value)) return;

        const newPin = [...pin];
        newPin[index] = value;
        setPin(newPin);

        // Move to next input
        if (value && index < 4) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !pin[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 5);
        const newPin = [...pin];
        for (let i = 0; i < pasted.length; i++) {
            newPin[i] = pasted[i];
        }
        setPin(newPin);
        const focusIndex = Math.min(pasted.length, 4);
        inputRefs.current[focusIndex]?.focus();
    };

    const handleSubmit = async () => {
        const enteredPin = pin.join('');
        if (enteredPin.length < 5) {
            toast.error('Please enter the full 5-digit PIN');
            return;
        }

        setLoading(true);
        await new Promise((res) => setTimeout(res, 600));

        if (enteredPin === ADMIN_PIN) {
            localStorage.setItem('auraforce_admin', 'true');
            toast.success('Access granted!');
            router.push('/admin');
        } else {
            toast.error('Invalid security PIN');
            setShake(true);
            setTimeout(() => {
                setShake(false);
                setPin(Array(5).fill(''));
                inputRefs.current[0]?.focus();
            }, 500);
        }

        setLoading(false);
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-zinc-950 overflow-hidden">

            {/* Animated Background Gradients */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-20%] left-[-15%] w-[600px] h-[600px] bg-emerald-600/8 rounded-full blur-[150px] animate-pulse" />
                <div className="absolute bottom-[-20%] right-[-15%] w-[600px] h-[600px] bg-emerald-600/8 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[120px]" />
            </div>

            {/* Grid Pattern Overlay */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                }}
            />

            {/* Back to Home */}
            <Link
                href="/"
                className="absolute top-6 left-6 z-30 flex items-center gap-1.5 text-xs text-zinc-500 hover:text-emerald-400 transition-colors duration-300"
            >
                <ArrowLeft size={14} />
                Back to Home
            </Link>

            {/* Login Card */}
            <div className={`relative z-20 w-full max-w-sm transition-transform duration-300 ${shake ? 'animate-[shake_0.5s_ease-in-out]' : ''}`}>

                <div className="bg-zinc-900/70 backdrop-blur-2xl border border-zinc-800/80 rounded-3xl shadow-2xl shadow-black/40 overflow-hidden">

                    {/* Top Accent Line */}
                    <div className="h-[2px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />

                    <div className="px-8 pt-10 pb-3 text-center">

                        {/* Animated Shield Icon */}
                        <div className="relative w-20 h-20 mx-auto mb-6">
                            {/* Outer ring pulse */}
                            <div className="absolute inset-0 rounded-2xl bg-emerald-500/10 animate-ping opacity-20" />
                            {/* Icon container */}
                            <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border border-emerald-500/30 flex items-center justify-center shadow-lg shadow-emerald-500/10">
                                <Fingerprint className="w-9 h-9 text-emerald-400" />
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold text-white mb-1 font-heading tracking-wider">
                            ADMIN <span className="text-emerald-400">ACCESS</span>
                        </h2>
                        <p className="text-[11px] text-zinc-500 font-satoshi leading-relaxed">
                            Enter your 5-digit security PIN to continue
                        </p>
                    </div>

                    <div className="px-8 pb-10 pt-6">

                        {/* PIN Input Grid */}
                        <div className="flex justify-center gap-3 mb-8" onPaste={handlePaste}>
                            {pin.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(el) => { inputRefs.current[index] = el; }}
                                    type="password"
                                    inputMode="numeric"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    className={`
                    w-12 h-14 text-center text-xl font-bold rounded-xl border-2 transition-all duration-300 outline-none
                    bg-zinc-950/60 text-white
                    ${digit
                                            ? 'border-emerald-500/60 shadow-[0_0_12px_rgba(16,185,129,0.15)]'
                                            : 'border-zinc-700/60 hover:border-zinc-600'
                                        }
                    focus:border-emerald-500 focus:shadow-[0_0_20px_rgba(16,185,129,0.2)] focus:ring-0
                  `}
                                />
                            ))}
                        </div>

                        {/* Submit Button */}
                        <button
                            onClick={handleSubmit}
                            disabled={loading || pin.some((d) => !d)}
                            className="w-full py-3 text-sm font-bold text-black bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-xl hover:from-emerald-400 hover:to-emerald-300 focus:outline-none transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.25)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] transform active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-[0_0_20px_rgba(16,185,129,0.25)] flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                    Verifying...
                                </>
                            ) : (
                                <>
                                    <Lock size={15} />
                                    Unlock Dashboard
                                </>
                            )}
                        </button>

                        {/* Hint */}
                        <div className="mt-6 text-center">
                            <p className="text-[10px] text-zinc-600 font-satoshi">
                                Restricted area — authorized personnel only
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom glow effect */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-2/3 h-12 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
            </div>

            {/* Shake Keyframe (injected via style tag) */}
            <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-6px); }
          80% { transform: translateX(6px); }
        }
      `}</style>
        </section>
    );
};

export default AdminLogin;
