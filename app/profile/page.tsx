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
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaBirthdayCake,
  FaWeight,
  FaRulerVertical,
  FaSignOutAlt,
  FaDumbbell,
  FaUserTie,
  FaCrown,
  FaArrowRight,
} from "react-icons/fa";

// --- HELPERS ---

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

const calculateAge = (dob: Date) => {
  const diffMs = Date.now() - dob.getTime();
  const ageDt = new Date(diffMs);
  return Math.abs(ageDt.getUTCFullYear() - 1970);
};

const Profile = async () => {
  // Check user
  const user = await checkUser();
  if (!user) redirect("/login");

  // Get Clerk user
  const clerkUser = await currentUser();

  // Fetch User Data
  const dbUser = await db.user.findUnique({
    where: { clerkUserId: user.clerkUserId },
    include: {
      subscription: true,
      posts: { orderBy: { createdAt: 'desc' } }
    },
  });

  if (!dbUser) redirect("/login");

  // 4. Prepare Display Data
  const planName = dbUser.subscription?.plan || "NO ACTIVE PLAN";
  const isActive = dbUser.subscription?.isActive || false;
  const renewalDate = dbUser.subscription?.endDate ? formatDate(dbUser.subscription.endDate) : "N/A";
  const memberSince = formatDate(dbUser.createdAt);

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

  // Stat items for the grid
  const statItems = [
    dbUser.location ? { icon: <FaMapMarkerAlt />, label: "Location", value: dbUser.location } : null,
    userAge !== null ? { icon: <FaBirthdayCake />, label: "Age", value: `${userAge} yrs` } : null,
    dbUser.weight ? { icon: <FaWeight />, label: "Weight", value: `${dbUser.weight} kg` } : null,
    userHeight ? { icon: <FaRulerVertical />, label: "Height", value: userHeight } : null,
  ].filter(Boolean);

  return (
    <section className="min-h-screen bg-zinc-950 pb-24 relative overflow-hidden">

      {/* ═══ AMBIENT BACKGROUND GLOW ═══ */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-emerald-600/5 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/5 blur-[160px] rounded-full pointer-events-none" />

      {/* ═══ PROFILE BANNER ═══ */}
      <div className="relative h-72 md:h-96 w-full">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-zinc-950/60 to-zinc-950 z-10" />
        <Image
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop"
          alt="Profile Banner"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-32 md:-mt-40">

        {/* ═══ USER HERO CARD ═══ */}
        <div className="relative bg-zinc-900/60 backdrop-blur-xl border border-zinc-800/80 rounded-2xl p-8 md:p-10 shadow-2xl shadow-black/40 mb-10">

          {/* Decorative corner accent */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-emerald-500/10 to-transparent rounded-tr-2xl pointer-events-none" />

          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">

            {/* Avatar with ring */}
            <div className="relative flex-shrink-0 group">
              <div className={`w-36 h-36 md:w-44 md:h-44 rounded-2xl overflow-hidden relative z-10 border-2 ${isActive ? "border-emerald-500/60" : "border-zinc-700"} shadow-2xl shadow-black/50 transition-all duration-300 group-hover:border-emerald-400/80`}>
                <Image
                  src={avatarUrl}
                  alt={dbUser.name || "User"}
                  fill
                  className="object-cover"
                />
              </div>
              {isActive && (
                <div className="absolute -bottom-1 -right-1 z-20 bg-emerald-500 text-black text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider flex items-center gap-1 shadow-lg shadow-emerald-500/30">
                  <span className="w-1.5 h-1.5 bg-black rounded-full animate-pulse" />
                  Active
                </div>
              )}
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-3 mb-4">
                <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight font-heading">
                  {dbUser.name}
                </h1>
                {dbUser.role === "ADMIN" && (
                  <span className="inline-flex items-center gap-1 bg-amber-500/15 text-amber-400 text-[10px] font-bold px-3 py-1 rounded-md uppercase tracking-widest border border-amber-500/20">
                    <FaCrown className="text-[9px]" /> Admin
                  </span>
                )}
                {dbUser.role === "TRAINER" && (
                  <span className="inline-flex items-center gap-1 bg-sky-500/15 text-sky-400 text-[10px] font-bold px-3 py-1 rounded-md uppercase tracking-widest border border-sky-500/20">
                    <FaUserTie className="text-[9px]" /> Trainer
                  </span>
                )}
              </div>

              {/* Meta Tags */}
              <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 text-sm text-zinc-400 mb-5">
                <span className="flex items-center gap-1.5 bg-zinc-800/70 px-3 py-1.5 rounded-lg border border-zinc-700/50 text-xs font-medium">
                  <FaIdCard className="text-emerald-500 text-[11px]" /> ID: {dbUser.id.slice(-6).toUpperCase()}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-zinc-500">
                  <FaCalendarAlt className="text-zinc-600" /> Joined {memberSince}
                </span>
              </div>

              {/* Stat Chips */}
              {statItems.length > 0 && (
                <div className="flex flex-wrap justify-center md:justify-start gap-2.5">
                  {statItems.map((stat, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 bg-zinc-800/50 border border-zinc-700/50 rounded-lg px-4 py-2 hover:border-emerald-500/30 transition-colors duration-300"
                    >
                      <span className="text-emerald-400 text-sm">{stat!.icon}</span>
                      <div className="text-left">
                        <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">{stat!.label}</p>
                        <p className="text-sm text-zinc-200 font-bold">{stat!.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-row md:flex-col gap-3 flex-shrink-0">
              <Link
                href="/profile/edit"
                className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold transition-all duration-300 shadow-lg shadow-emerald-900/20 hover:shadow-emerald-500/20"
              >
                <FaUserEdit /> Edit Profile
              </Link>
              <SignOutButton>
                <button className="flex items-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-red-600 text-zinc-300 hover:text-white text-sm font-bold border border-zinc-700 hover:border-red-500 transition-all duration-300 cursor-pointer">
                  <FaSignOutAlt /> Logout
                </button>
              </SignOutButton>
            </div>
          </div>
        </div>

        {/* ═══ MAIN GRID ═══ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ─── LEFT COLUMN ─── */}
          <div className="lg:col-span-2 space-y-8">

            {/* ── Active Subscription Card ── */}
            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/80 rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between px-8 pt-8 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                    <FaCrown className="text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white font-heading">My Active Plan</h3>
                </div>
                {isActive && (
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-md uppercase tracking-wider border border-emerald-500/20">
                    Active
                  </span>
                )}
              </div>

              <div className="px-8 pb-8">
                {dbUser.subscription ? (
                  <div className="relative group p-6 bg-gradient-to-br from-zinc-800/50 to-zinc-900/80 rounded-xl border border-zinc-700/50 hover:border-emerald-500/30 transition-all duration-500">
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl pointer-events-none" />

                    <div className="flex flex-col sm:flex-row items-center gap-5 relative z-10">
                      <div className="w-16 h-16 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-xl flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-emerald-900/30 flex-shrink-0 font-heading">
                        {planName[0]}
                      </div>
                      <div className="flex-1 text-center sm:text-left">
                        <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-[0.2em] mb-1">Membership</p>
                        <h4 className="font-bold text-white text-xl mb-1 font-heading">{planName} Plan</h4>
                        <p className="text-sm text-zinc-400">
                          Valid until <span className="text-zinc-300 font-semibold">{renewalDate}</span>
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-emerald-400 text-sm">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-lg shadow-emerald-500/50" />
                        <span className="font-semibold text-xs uppercase tracking-wider">Active</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-10 text-center bg-zinc-950/40 rounded-xl border border-dashed border-zinc-800 hover:border-zinc-700 transition-colors">
                    <div className="w-14 h-14 mx-auto bg-zinc-800 rounded-xl flex items-center justify-center text-zinc-500 mb-4">
                      <FaCrown size={22} />
                    </div>
                    <p className="text-zinc-400 mb-1">You don&apos;t have an active subscription.</p>
                    <p className="text-zinc-600 text-sm mb-5">Get started with a plan to unlock premium features.</p>
                    <Link
                      href="/#membership"
                      className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold px-6 py-2.5 transition-all duration-300 shadow-lg shadow-emerald-900/20"
                    >
                      Browse Plans <FaArrowRight className="text-xs" />
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* ── My Posts ── */}
            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/80 rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between px-8 pt-8 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                    <FaDumbbell className="text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white font-heading">My Published Posts</h3>
                </div>
                <span className="text-xs font-bold text-zinc-500 bg-zinc-800 px-3 py-1 rounded-md">
                  {formattedPosts.length} {formattedPosts.length === 1 ? "Post" : "Posts"}
                </span>
              </div>
              <div className="px-8 pb-8">
                <MyPosts posts={formattedPosts} />
              </div>
            </div>
          </div>

          {/* ─── RIGHT COLUMN ─── */}
          <div className="lg:col-span-1 space-y-8">

            {/* ── My Trainer ── */}
            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/80 rounded-2xl overflow-hidden group hover:border-zinc-700/80 transition-all duration-300">
              <div className="flex items-center justify-between px-8 pt-8 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                    <FaUserTie className="text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white font-heading">My Trainer</h3>
                </div>
              </div>

              <div className="px-8 pb-8">
                <div className="p-8 text-center bg-zinc-950/40 rounded-xl border border-dashed border-zinc-800 group-hover:border-zinc-700 transition-colors">
                  <div className="w-14 h-14 mx-auto bg-zinc-800 rounded-xl flex items-center justify-center text-zinc-600 mb-4">
                    <FaUserTie size={22} />
                  </div>
                  <p className="text-zinc-400 text-sm mb-1">No trainer booked yet.</p>
                  <p className="text-zinc-600 text-xs mb-5">Book a trainer to get personalized guidance.</p>
                  <Link
                    href="/allTrainers"
                    className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 text-sm font-bold transition-colors"
                  >
                    Find a Trainer <FaArrowRight className="text-xs" />
                  </Link>
                </div>
              </div>
            </div>

            {/* ── My Classes ── */}
            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/80 rounded-2xl overflow-hidden group hover:border-zinc-700/80 transition-all duration-300">
              <div className="flex items-center justify-between px-8 pt-8 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                    <FaDumbbell className="text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white font-heading">My Classes</h3>
                </div>
              </div>

              <div className="px-8 pb-8">
                <div className="p-8 text-center bg-zinc-950/40 rounded-xl border border-dashed border-zinc-800 group-hover:border-zinc-700 transition-colors">
                  <div className="w-14 h-14 mx-auto bg-zinc-800 rounded-xl flex items-center justify-center text-zinc-600 mb-4">
                    <FaDumbbell size={22} />
                  </div>
                  <p className="text-zinc-400 text-sm mb-1">No classes scheduled.</p>
                  <p className="text-zinc-600 text-xs mb-5">Browse and join fitness classes.</p>
                  <Link
                    href="/allClasses"
                    className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 text-sm font-bold transition-colors"
                  >
                    Browse Classes <FaArrowRight className="text-xs" />
                  </Link>
                </div>
              </div>
            </div>

            {/* ── Quick Stats Overview ── */}
            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/80 rounded-2xl overflow-hidden">
              <div className="px-8 pt-8 pb-4">
                <h3 className="text-lg font-bold text-white font-heading">Overview</h3>
              </div>
              <div className="px-8 pb-8 space-y-4">
                <div className="flex items-center justify-between p-4 bg-zinc-800/30 rounded-xl border border-zinc-700/30">
                  <span className="text-sm text-zinc-400">Total Posts</span>
                  <span className="text-lg font-bold text-white">{formattedPosts.length}</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-zinc-800/30 rounded-xl border border-zinc-700/30">
                  <span className="text-sm text-zinc-400">Membership</span>
                  <span className={`text-sm font-bold ${isActive ? "text-emerald-400" : "text-zinc-500"}`}>
                    {isActive ? planName : "Inactive"}
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 bg-zinc-800/30 rounded-xl border border-zinc-700/30">
                  <span className="text-sm text-zinc-400">Member Since</span>
                  <span className="text-sm font-bold text-zinc-300">{memberSince}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;