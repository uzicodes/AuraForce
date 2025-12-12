"use client";

import React from "react";
import Image from "next/image";
import { 
  FaUserEdit, 
  FaCog, 
  FaIdCard, 
  FaCheckCircle, 
  FaCalendarCheck, 
  FaCalendarAlt,
  FaUserTie,
  FaMapMarkerAlt,
  FaLayerGroup,
  FaClock
} from "react-icons/fa";

// 1. STATIC USER DATA (Membership Focused)
const user = {
  name: "Alex Johnson",
  role: "Gold Member",
  memberId: "AF-88392",
  joinDate: "Member since Nov 2023",
  location: "Gulshan, Dhaka",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop",
  banner: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop",
  membership: {
    plan: "Gold Access",
    status: "Active",
    renewal: "Dec 12, 2025",
    sessionsLeft: 8 // e.g., for PT
  }
};

// 2. ACTIVE SUBSCRIPTIONS (Trainers & Classes)
const activeSubscriptions = [
  {
    id: 1,
    type: "Personal Training",
    name: "Marcus Thorne",
    detail: "12 Sessions Package",
    status: "Active",
    image: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=1000&auto=format&fit=crop",
    progress: "4/12 Completed"
  },
  {
    id: 2,
    type: "Class Subscription",
    name: "Power Yoga Series",
    detail: "Monthly Access",
    status: "Active",
    image: "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=1000&auto=format&fit=crop",
    progress: "Unlimited"
  }
];

// 3. WEEKLY TIMETABLE
const weeklySchedule = [
  { day: "Monday", time: "07:00 AM", activity: "Yoga Flow", with: "Dr. Kenji" },
  { day: "Tuesday", time: "05:00 PM", activity: "1-on-1 PT", with: "Marcus Thorne" },
  { day: "Thursday", time: "06:30 PM", activity: "HIIT Group", with: "Sarah J." },
  { day: "Saturday", time: "10:00 AM", activity: "Open Gym", with: "Self" },
];

const Profile = () => {
  return (
    <section className="min-h-screen bg-zinc-950 pb-20 relative overflow-hidden">
      
      {/* PROFILE BANNER */}
      <div className="relative h-64 md:h-80 w-full">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-zinc-950 z-10" />
        <Image 
          src={user.banner} 
          alt="Profile Banner" 
          fill 
          className="object-cover opacity-60"
          priority
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-24">
        
        {/* USER HEADER CARD */}
        <div className="bg-zinc-900/80 backdrop-blur-md border border-zinc-800 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center md:items-end gap-6 shadow-2xl mb-12">
          
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-zinc-950 overflow-hidden relative z-10 shadow-lg">
              <Image 
                src={user.avatar} 
                alt={user.name} 
                fill 
                className="object-cover"
              />
            </div>
            {/* Active Status Indicator */}
            <div className="absolute bottom-2 right-2 w-6 h-6 bg-emerald-500 border-4 border-zinc-900 rounded-full z-20" title="Membership Active"></div>
          </div>

          {/* Info */}
          <div className="flex-1 text-center md:text-left mb-2 md:mb-4">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-1">{user.name}</h1>
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 text-sm text-zinc-400">
              <span className="flex items-center gap-1 bg-zinc-800 px-3 py-1 rounded-full">
                <FaIdCard className="text-emerald-500" /> ID: {user.memberId}
              </span>
              <span className="flex items-center gap-1">
                <FaMapMarkerAlt className="text-emerald-500" /> {user.location}
              </span>
              <span>{user.joinDate}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mb-4">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full font-semibold transition-all shadow-lg shadow-emerald-900/20">
              <FaUserEdit /> Edit Profile
            </button>
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: Membership Info & Subscriptions */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Membership Overview Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Current Plan", value: user.membership.plan, icon: FaLayerGroup },
                { label: "Account Status", value: user.membership.status, icon: FaCheckCircle },
                { label: "Renewal Date", value: user.membership.renewal, icon: FaCalendarCheck },
                { label: "PT Sessions Left", value: user.membership.sessionsLeft, icon: FaUserTie },
              ].map((stat, index) => (
                <div key={index} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 hover:border-emerald-500/30 transition-colors">
                  <div className="w-10 h-10 bg-emerald-500/10 rounded-full flex items-center justify-center mb-3 text-emerald-500">
                    <stat.icon />
                  </div>
                  <div className="text-lg font-bold text-white mb-1 truncate">{stat.value}</div>
                  <div className="text-xs text-zinc-500 uppercase font-medium tracking-wide">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* My Subscriptions (Trainers & Classes) */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">My Active Subscriptions</h3>
                <span className="text-xs text-emerald-500 font-bold cursor-pointer hover:underline">Manage</span>
              </div>
              
              <div className="space-y-4">
                {activeSubscriptions.map((sub) => (
                  <div key={sub.id} className="flex flex-col md:flex-row items-center gap-4 p-4 bg-zinc-950/50 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-colors">
                    {/* Image */}
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <Image 
                        src={sub.image} 
                        alt={sub.name} 
                        fill 
                        className="object-cover rounded-lg"
                      />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 text-center md:text-left">
                      <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                        <span className="text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded uppercase tracking-wider">{sub.type}</span>
                        {sub.status === "Active" && <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>}
                      </div>
                      <h4 className="font-bold text-white text-lg">{sub.name}</h4>
                      <p className="text-sm text-zinc-400">{sub.detail}</p>
                    </div>

                    {/* Right Side Info */}
                    <div className="text-center md:text-right w-full md:w-auto mt-2 md:mt-0 pt-2 md:pt-0 border-t md:border-none border-zinc-800">
                      <div className="text-sm font-semibold text-white">{sub.progress}</div>
                      <div className="text-xs text-zinc-500">Usage Status</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Allocated Timetable */}
          <div className="lg:col-span-1">
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 sticky top-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Weekly Schedule</h3>
                <FaCalendarAlt className="text-emerald-500" />
              </div>

              <div className="space-y-4 relative">
                {/* Connecting Line */}
                <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-zinc-800 z-0"></div>

                {weeklySchedule.map((slot, index) => (
                  <div key={index} className="relative z-10 flex items-start gap-4">
                    {/* Bullet Point */}
                    <div className="w-10 h-10 rounded-full bg-zinc-950 border-2 border-emerald-500/50 flex items-center justify-center flex-shrink-0 text-emerald-500 text-xs font-bold shadow-lg">
                      {slot.day.substring(0, 3)}
                    </div>
                    
                    {/* Card */}
                    <div className="flex-1 bg-zinc-950 p-4 rounded-xl border border-zinc-800 hover:border-emerald-500/30 transition-colors">
                      <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold mb-1">
                        <FaClock /> {slot.time}
                      </div>
                      <h4 className="font-bold text-white text-sm">{slot.activity}</h4>
                      <p className="text-xs text-zinc-500 mt-1">w/ {slot.with}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Profile;