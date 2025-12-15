import React from "react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db"; // Connecting to your database
import { 
  FaUserEdit, 
  FaIdCard, 
  FaCheckCircle, 
  FaCalendarCheck, 
  FaLayerGroup,
  FaClock,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaExclamationCircle
} from "react-icons/fa";

// Helper to format dates (e.g., "Dec 12, 2025")
const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

// Helper to get Day Name (e.g., "Monday")
const getDayName = (date: Date) => {
  return new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(date);
};

// Helper to get Time (e.g., "07:00 AM")
const getTime = (date: Date) => {
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

const Profile = async () => {
  // 1. Get Logged In User
  const clerkUser = await currentUser();
  if (!clerkUser) redirect("/");

  // 2. Fetch User Data + Subscription + Bookings from Supabase
  const dbUser = await db.user.findUnique({
    where: {
      clerkUserId: clerkUser.id,
    },
    include: {
      subscription: true, // Fetch the plan
      bookings: {         // Fetch upcoming classes
        where: {
          date: {
            gte: new Date(), // Only get future bookings
          },
        },
        orderBy: {
          date: 'asc', // Soonest first
        },
        take: 5, // Show top 5
      },
    },
  });

  // If user registered via Clerk but DB sync hasn't happened yet (rare edge case)
  if (!dbUser) return <div>Loading profile...</div>;

  // 3. Prepare Display Data
  const planName = dbUser.subscription?.plan || "NO ACTIVE PLAN";
  const isActive = dbUser.subscription?.isActive || false;
  const renewalDate = dbUser.subscription?.endDate ? formatDate(dbUser.subscription.endDate) : "N/A";
  const memberSince = formatDate(dbUser.createdAt);
  
  // Use Clerk avatar if available, otherwise DB image, otherwise placeholder
  const avatarUrl = clerkUser.imageUrl || dbUser.image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=1000";

  return (
    <section className="min-h-screen bg-zinc-950 pb-20 relative overflow-hidden">
      
      {/* PROFILE BANNER */}
      <div className="relative h-64 md:h-80 w-full">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-zinc-950 z-10" />
        <Image 
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop" 
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
                src={avatarUrl} 
                alt={dbUser.name || "User"} 
                fill 
                className="object-cover"
              />
            </div>
            {/* Active Status Indicator */}
            {isActive && (
              <div className="absolute bottom-2 right-2 w-6 h-6 bg-emerald-500 border-4 border-zinc-900 rounded-full z-20" title="Membership Active"></div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 text-center md:text-left mb-2 md:mb-4">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-1">{dbUser.name}</h1>
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 text-sm text-zinc-400">
              <span className="flex items-center gap-1 bg-zinc-800 px-3 py-1 rounded-full">
                <FaIdCard className="text-emerald-500" /> ID: {dbUser.id.slice(-6).toUpperCase()}
              </span>
              <span className="flex items-center gap-1">
                <FaMapMarkerAlt className="text-emerald-500" /> {dbUser.role} Account
              </span>
              <span>Joined {memberSince}</span>
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
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 hover:border-emerald-500/30 transition-colors">
                 <div className="w-10 h-10 bg-emerald-500/10 rounded-full flex items-center justify-center mb-3 text-emerald-500">
                   <FaLayerGroup />
                 </div>
                 <div className="text-lg font-bold text-white mb-1 truncate">{planName}</div>
                 <div className="text-xs text-zinc-500 uppercase font-medium tracking-wide">Current Plan</div>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 hover:border-emerald-500/30 transition-colors">
                 <div className="w-10 h-10 bg-emerald-500/10 rounded-full flex items-center justify-center mb-3 text-emerald-500">
                   <FaCheckCircle />
                 </div>
                 <div className={`text-lg font-bold mb-1 truncate ${isActive ? "text-white" : "text-red-500"}`}>
                   {isActive ? "Active" : "Inactive"}
                 </div>
                 <div className="text-xs text-zinc-500 uppercase font-medium tracking-wide">Status</div>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 hover:border-emerald-500/30 transition-colors">
                 <div className="w-10 h-10 bg-emerald-500/10 rounded-full flex items-center justify-center mb-3 text-emerald-500">
                   <FaCalendarCheck />
                 </div>
                 <div className="text-lg font-bold text-white mb-1 truncate">{renewalDate}</div>
                 <div className="text-xs text-zinc-500 uppercase font-medium tracking-wide">Renewal Date</div>
              </div>
            </div>

            {/* My Active Subscription Card */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">My Active Plan</h3>
                <span className="text-xs text-emerald-500 font-bold cursor-pointer hover:underline">Manage</span>
              </div>
              
              {dbUser.subscription ? (
                <div className="flex flex-col md:flex-row items-center gap-4 p-4 bg-zinc-950/50 rounded-xl border border-zinc-800 hover:border-emerald-500/30 transition-colors">
                  <div className="relative w-16 h-16 flex-shrink-0">
                    {/* Placeholder image for plan */}
                    <div className="w-full h-full bg-emerald-900/20 rounded-lg flex items-center justify-center text-emerald-500 text-2xl font-bold">
                      {planName[0]}
                    </div>
                  </div>
                  
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                      <span className="text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded uppercase tracking-wider">MEMBERSHIP</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    </div>
                    <h4 className="font-bold text-white text-lg">{planName} Membership</h4>
                    <p className="text-sm text-zinc-400">Valid until {renewalDate}</p>
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center bg-zinc-950/30 rounded-xl border border-dashed border-zinc-800">
                  <p className="text-zinc-400">You don't have an active subscription.</p>
                  <button className="mt-4 text-emerald-500 hover:text-emerald-400 text-sm font-bold">Browse Plans</button>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Real-Time Schedule */}
          <div className="lg:col-span-1">
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 sticky top-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Upcoming Classes</h3>
                <FaCalendarAlt className="text-emerald-500" />
              </div>

              {dbUser.bookings.length > 0 ? (
                <div className="space-y-4 relative">
                  {/* Connecting Line */}
                  <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-zinc-800 z-0"></div>

                  {dbUser.bookings.map((booking) => (
                    <div key={booking.id} className="relative z-10 flex items-start gap-4">
                      {/* Bullet Point */}
                      <div className="w-10 h-10 rounded-full bg-zinc-950 border-2 border-emerald-500/50 flex items-center justify-center flex-shrink-0 text-emerald-500 text-[10px] font-bold shadow-lg uppercase">
                        {getDayName(booking.date).substring(0, 3)}
                      </div>
                      
                      {/* Card */}
                      <div className="flex-1 bg-zinc-950 p-4 rounded-xl border border-zinc-800 hover:border-emerald-500/30 transition-colors">
                        <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold mb-1">
                          <FaClock /> {getTime(booking.date)}
                        </div>
                        <h4 className="font-bold text-white text-sm">{booking.className}</h4>
                        <p className="text-xs text-zinc-500 mt-1">Trainer: {booking.trainer}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                   <FaExclamationCircle className="mx-auto text-zinc-600 text-3xl mb-3" />
                   <p className="text-zinc-400 text-sm">No upcoming bookings found.</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Profile;