import React from "react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { SignOutButton } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { checkUser } from "@/lib/checkUser";
import MyPosts from "@/Components/Pages/Profile/MyPosts";
import {
  FaUserEdit,
  FaIdCard,
  FaCheckCircle,
  FaCalendarCheck,
  FaLayerGroup,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaExclamationCircle,
  FaBirthdayCake,
  FaWeight,
  FaRulerVertical,
  FaSignOutAlt
} from "react-icons/fa";

// --- HELPERS ---

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

// Temporarily removing getDayName and getTime since bookings are removed for now
// const getDayName = (date: Date) => { ... }
// const getTime = (date: Date) => { ... }

const calculateAge = (dob: Date) => {
  const diffMs = Date.now() - dob.getTime();
  const ageDt = new Date(diffMs);
  return Math.abs(ageDt.getUTCFullYear() - 1970);
};

const Profile = async () => {
  // 1. Check user
  const user = await checkUser();
  if (!user) redirect("/login");

  // 2. Get Clerk user
  const clerkUser = await currentUser();

  // 3. Fetch User Data
  const dbUser = await db.user.findUnique({
    where: { clerkUserId: user.clerkUserId },
    include: {
      subscription: true,
      // Temporarily removed bookings to fix the P2021 error
      // Will be replaced with classBookings and trainerBookings later
      posts: { orderBy: { createdAt: 'desc' } }
    },
  });

  if (!dbUser) redirect("/login");

  // 4. Prepare Display Data
  const planName = dbUser.subscription?.plan || "NO ACTIVE PLAN";
  const isActive = dbUser.subscription?.isActive || false;
  const renewalDate = dbUser.subscription?.endDate ? formatDate(dbUser.subscription.endDate) : "N/A";
  const memberSince = formatDate(dbUser.createdAt);

  // ✅ FIX: Prioritize DB Image -> Clerk Image -> Placeholder
  const avatarUrl = dbUser.image || clerkUser?.imageUrl || "/dp.png";

  // --- STATS ---
  const userAge = dbUser.dob ? calculateAge(dbUser.dob) : null;
  const userHeight = (dbUser.heightFeet && dbUser.heightInches)
    ? `${dbUser.heightFeet}'${dbUser.heightInches}"`
    : null;

  const formattedPosts = dbUser.posts.map((post) => ({
    _id: post.id,
    title: post.title,
    author_name: dbUser.name || "Unknown User",
    author_location: dbUser.location || "Unknown Location",
    author_img: avatarUrl,
    short_description: post.content,
    publish_time: new Date(post.createdAt).toLocaleDateString(),
    role: dbUser.role === "ADMIN" ? "Admin" : dbUser.role === "TRAINER" ? "Trainer" : "Member",
    category: post.category,
    upvotes: post.upvotes,
  }));

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
            {isActive && (
              <div className="absolute bottom-2 right-2 w-6 h-6 bg-emerald-500 border-4 border-zinc-900 rounded-full z-20" title="Membership Active"></div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 text-center md:text-left mb-2 md:mb-4">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{dbUser.name}</h1>

            <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 text-sm text-zinc-400 mb-3">
              <span className="flex items-center gap-1 bg-zinc-800/50 px-3 py-1 rounded-full border border-zinc-700/50">
                <FaIdCard className="text-emerald-500" /> ID: {dbUser.id.slice(-6).toUpperCase()}
              </span>
              <span className="flex items-center gap-1 px-3 py-1">
                <FaCalendarAlt className="text-zinc-500" /> Joined {memberSince}
              </span>
            </div>

            {/* OPTIONAL STATS */}
            {(dbUser.location || userAge || dbUser.weight || userHeight) && (
              <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-2">
                {dbUser.location && (
                  <span className="flex items-center gap-1.5 text-xs font-semibold bg-zinc-800 text-zinc-300 px-3 py-1.5 rounded-lg border border-zinc-700">
                    <FaMapMarkerAlt className="text-emerald-400" /> {dbUser.location}
                  </span>
                )}
                {userAge !== null && (
                  <span className="flex items-center gap-1.5 text-xs font-semibold bg-zinc-800 text-zinc-300 px-3 py-1.5 rounded-lg border border-zinc-700">
                    <FaBirthdayCake className="text-emerald-400" /> {userAge} yrs
                  </span>
                )}
                {dbUser.weight && (
                  <span className="flex items-center gap-1.5 text-xs font-semibold bg-zinc-800 text-zinc-300 px-3 py-1.5 rounded-lg border border-zinc-700">
                    <FaWeight className="text-emerald-400" /> {dbUser.weight} kg
                  </span>
                )}
                {userHeight && (
                  <span className="flex items-center gap-1.5 text-xs font-semibold bg-zinc-800 text-zinc-300 px-3 py-1.5 rounded-lg border border-zinc-700">
                    <FaRulerVertical className="text-emerald-400" /> {userHeight}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mb-4">
            <Link
              href="/profile/edit"
              className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full font-semibold transition-all shadow-lg shadow-emerald-900/20"
            >
              <FaUserEdit /> Edit Profile
            </Link>
            <SignOutButton>
              <button className="flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-full font-semibold transition-all shadow-lg shadow-red-900/20">
                <FaSignOutAlt /> Logout
              </button>
            </SignOutButton>
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT COLUMN */}
          <div className="lg:col-span-2 space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Plan Name */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 hover:border-emerald-500/30 transition-colors">
                <div className="w-10 h-10 bg-emerald-500/10 rounded-full flex items-center justify-center mb-3 text-emerald-500">
                  <FaLayerGroup />
                </div>
                <div className="text-lg font-bold text-white mb-1 truncate">{planName}</div>
                <div className="text-xs text-zinc-500 uppercase font-medium tracking-wide">Current Plan</div>
              </div>
              {/* Status */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 hover:border-emerald-500/30 transition-colors">
                <div className="w-10 h-10 bg-emerald-500/10 rounded-full flex items-center justify-center mb-3 text-emerald-500">
                  <FaCheckCircle />
                </div>
                <div className={`text-lg font-bold mb-1 truncate ${isActive ? "text-white" : "text-red-500"}`}>
                  {isActive ? "Active" : "Inactive"}
                </div>
                <div className="text-xs text-zinc-500 uppercase font-medium tracking-wide">Status</div>
              </div>
              {/* Renewal */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 hover:border-emerald-500/30 transition-colors">
                <div className="w-10 h-10 bg-emerald-500/10 rounded-full flex items-center justify-center mb-3 text-emerald-500">
                  <FaCalendarCheck />
                </div>
                <div className="text-lg font-bold text-white mb-1 truncate">{renewalDate}</div>
                <div className="text-xs text-zinc-500 uppercase font-medium tracking-wide">Renewal Date</div>
              </div>
            </div>

            {/* Active Subscription Banner */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">My Active Plan</h3>
                <span className="text-xs text-emerald-500 font-bold cursor-pointer hover:underline">Manage</span>
              </div>
              {dbUser.subscription ? (
                <div className="flex flex-col md:flex-row items-center gap-4 p-4 bg-zinc-950/50 rounded-xl border border-zinc-800 hover:border-emerald-500/30 transition-colors">
                  <div className="relative w-16 h-16 flex-shrink-0">
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

            {/* My Posts */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 mt-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">My Published Posts</h3>
              </div>
              <MyPosts posts={formattedPosts} />
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-1">
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 sticky top-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Upcoming Bookings</h3>
                <FaCalendarAlt className="text-emerald-500" />
              </div>

              {/* Placeholder until tables are ready */}
              <div className="text-center py-10">
                <FaExclamationCircle className="mx-auto text-zinc-600 text-3xl mb-3" />
                <p className="text-zinc-400 text-sm">Booking system is currently being updated.</p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Profile;