"use client";

import React from "react";
import Image from "next/image";
import { 
  FaUserEdit, 
  FaCog, 
  FaFire, 
  FaDumbbell, 
  FaCalendarAlt, 
  FaClock, 
  FaMapMarkerAlt,
  FaTrophy
} from "react-icons/fa";

// 1. STATIC USER DATA
const user = {
  name: "Alex Johnson",
  role: "Elite Member",
  joinDate: "Member since Nov 2023",
  location: "Gulshan, Dhaka",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop",
  banner: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop",
  stats: {
    workouts: 42,
    calories: 12500,
    streak: 12, // days
    weightLifted: "5,400 kg"
  }
};

const upcomingClasses = [
  {
    id: 1,
    name: "High Voltage HIIT",
    instructor: "Marcus Thorne",
    time: "Today, 5:00 PM",
    duration: "45 min",
    image: "https://images.unsplash.com/photo-1601422407692-ec4ee62be1c4?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Power Yoga Flow",
    instructor: "Dr. Kenji",
    time: "Tomorrow, 8:00 AM",
    duration: "60 min",
    image: "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=1000&auto=format&fit=crop"
  }
];

const recentActivity = [
  { id: 1, title: "Upper Body Power", date: "Yesterday", calories: 450, duration: "60 min" },
  { id: 2, title: "Cardio Blast", date: "2 Days ago", calories: 320, duration: "30 min" },
  { id: 3, title: "Leg Day Destruction", date: "3 Days ago", calories: 550, duration: "75 min" },
];

const Profile = () => {
  return (
    <section className="min-h-screen bg-zinc-950 pb-20 relative overflow-hidden">
      
      {/* 2. PROFILE BANNER */}
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
        
        {/* 3. USER HEADER CARD */}
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
            {/* Status Indicator */}
            <div className="absolute bottom-2 right-2 w-6 h-6 bg-emerald-500 border-4 border-zinc-900 rounded-full z-20"></div>
          </div>

          {/* Info */}
          <div className="flex-1 text-center md:text-left mb-2 md:mb-4">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-1">{user.name}</h1>
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 text-sm text-zinc-400">
              <span className="flex items-center gap-1">
                <FaTrophy className="text-emerald-500" /> {user.role}
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

        {/* 4. DASHBOARD GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: Stats & Activity */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Workouts", value: user.stats.workouts, icon: FaDumbbell },
                { label: "Kcal Burned", value: user.stats.calories.toLocaleString(), icon: FaFire },
                { label: "Day Streak", value: user.stats.streak, icon: FaCalendarAlt },
                { label: "Total Lifted", value: user.stats.weightLifted, icon: FaTrophy },
              ].map((stat, index) => (
                <div key={index} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 hover:border-emerald-500/30 transition-colors">
                  <div className="w-10 h-10 bg-emerald-500/10 rounded-full flex items-center justify-center mb-3 text-emerald-500">
                    <stat.icon />
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-xs text-zinc-500 uppercase font-medium tracking-wide">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
              <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-4 bg-zinc-950/50 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-zinc-800 rounded-lg flex items-center justify-center text-emerald-500">
                        <FaDumbbell size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-white">{activity.title}</h4>
                        <p className="text-xs text-zinc-500">{activity.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-emerald-400">{activity.calories} kcal</div>
                      <div className="text-xs text-zinc-500">{activity.duration}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Upcoming Schedule */}
          <div className="lg:col-span-1">
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 sticky top-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Upcoming Classes</h3>
                <span className="text-xs text-emerald-500 font-bold cursor-pointer hover:underline">View All</span>
              </div>

              <div className="space-y-6">
                {upcomingClasses.map((item) => (
                  <div key={item.id} className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950">
                    {/* Image Background */}
                    <div className="absolute inset-0 opacity-40">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent" />
                    
                    <div className="relative p-5">
                      <h4 className="font-bold text-lg text-white mb-1 group-hover:text-emerald-400 transition-colors">{item.name}</h4>
                      <p className="text-xs text-zinc-300 mb-4">with {item.instructor}</p>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-white/10">
                        <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
                          <FaClock /> {item.time}
                        </div>
                        <span className="text-xs text-zinc-400">{item.duration}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-6 py-3 rounded-xl border border-dashed border-zinc-700 text-zinc-400 hover:text-white hover:border-emerald-500 hover:bg-emerald-500/10 transition-all font-medium text-sm flex items-center justify-center gap-2">
                <FaCalendarAlt /> Book New Class
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Profile;