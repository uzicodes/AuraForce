'use client';

import { Save, Bell, Shield, Palette, Globe, Mail } from 'lucide-react';
import { useState } from 'react';

export default function SettingsPage() {
    const [gymName, setGymName] = useState('AuraForce Gym');
    const [email, setEmail] = useState('admin@auraforce.com');
    const [phone, setPhone] = useState('+880 1234 567890');
    const [address, setAddress] = useState('123 Fitness Avenue, Dhaka, Bangladesh');
    const [openTime, setOpenTime] = useState('06:00');
    const [closeTime, setCloseTime] = useState('22:00');
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [newMemberAlert, setNewMemberAlert] = useState(true);
    const [paymentAlert, setPaymentAlert] = useState(true);
    const [maintenanceMode, setMaintenanceMode] = useState(false);

    return (
        <div className="space-y-6 max-w-3xl">

            {/* Header */}
            <div>
                <h2 className="text-2xl font-bold text-white font-heading">Settings</h2>
                <p className="text-sm text-zinc-500 font-satoshi mt-1">Configure gym preferences and admin settings.</p>
            </div>

            {/* General Settings */}
            <div className="bg-zinc-900/60 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-5">
                    <Globe size={18} className="text-emerald-400" />
                    <h3 className="text-base font-bold text-white font-heading">General</h3>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="text-xs font-medium text-zinc-400 mb-1 block">Gym Name</label>
                        <input
                            type="text"
                            value={gymName}
                            onChange={(e) => setGymName(e.target.value)}
                            className="w-full px-4 py-2.5 bg-zinc-950/50 border border-zinc-700 rounded-lg text-sm text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none transition-all"
                        />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-medium text-zinc-400 mb-1 block">Admin Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2.5 bg-zinc-950/50 border border-zinc-700 rounded-lg text-sm text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none transition-all"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-medium text-zinc-400 mb-1 block">Phone</label>
                            <input
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full px-4 py-2.5 bg-zinc-950/50 border border-zinc-700 rounded-lg text-sm text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none transition-all"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="text-xs font-medium text-zinc-400 mb-1 block">Address</label>
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full px-4 py-2.5 bg-zinc-950/50 border border-zinc-700 rounded-lg text-sm text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none transition-all"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-medium text-zinc-400 mb-1 block">Opening Time</label>
                            <input
                                type="time"
                                value={openTime}
                                onChange={(e) => setOpenTime(e.target.value)}
                                className="w-full px-4 py-2.5 bg-zinc-950/50 border border-zinc-700 rounded-lg text-sm text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none transition-all"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-medium text-zinc-400 mb-1 block">Closing Time</label>
                            <input
                                type="time"
                                value={closeTime}
                                onChange={(e) => setCloseTime(e.target.value)}
                                className="w-full px-4 py-2.5 bg-zinc-950/50 border border-zinc-700 rounded-lg text-sm text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none transition-all"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Notifications */}
            <div className="bg-zinc-900/60 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-5">
                    <Bell size={18} className="text-emerald-400" />
                    <h3 className="text-base font-bold text-white font-heading">Notifications</h3>
                </div>

                <div className="space-y-4">
                    {[
                        { label: 'Email Notifications', desc: 'Receive email updates for important events', state: emailNotifications, setter: setEmailNotifications },
                        { label: 'New Member Alerts', desc: 'Get notified when a new member joins', state: newMemberAlert, setter: setNewMemberAlert },
                        { label: 'Payment Alerts', desc: 'Get notified for payment successes and failures', state: paymentAlert, setter: setPaymentAlert },
                    ].map((n) => (
                        <div key={n.label} className="flex items-center justify-between py-2">
                            <div>
                                <p className="text-sm text-white font-medium">{n.label}</p>
                                <p className="text-xs text-zinc-500">{n.desc}</p>
                            </div>
                            <button
                                onClick={() => n.setter(!n.state)}
                                className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${n.state ? 'bg-emerald-600' : 'bg-zinc-700'}`}
                            >
                                <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${n.state ? 'translate-x-5' : 'translate-x-0'}`} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Security */}
            <div className="bg-zinc-900/60 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-5">
                    <Shield size={18} className="text-emerald-400" />
                    <h3 className="text-base font-bold text-white font-heading">Security</h3>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between py-2">
                        <div>
                            <p className="text-sm text-white font-medium">Maintenance Mode</p>
                            <p className="text-xs text-zinc-500">Temporarily disable public access to the gym website</p>
                        </div>
                        <button
                            onClick={() => setMaintenanceMode(!maintenanceMode)}
                            className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${maintenanceMode ? 'bg-red-600' : 'bg-zinc-700'}`}
                        >
                            <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${maintenanceMode ? 'translate-x-5' : 'translate-x-0'}`} />
                        </button>
                    </div>

                    <div>
                        <button className="px-4 py-2 text-xs font-medium bg-zinc-800 text-zinc-300 rounded-lg hover:bg-zinc-700 border border-zinc-700 transition-colors">
                            Change Admin Password
                        </button>
                    </div>
                </div>
            </div>

            {/* Save */}
            <div className="flex justify-end">
                <button className="inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-black text-sm font-bold rounded-xl transition-all shadow-lg shadow-emerald-500/10">
                    <Save size={16} />
                    Save Changes
                </button>
            </div>
        </div>
    );
}
