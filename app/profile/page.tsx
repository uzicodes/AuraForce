import React from "react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { SignOutButton } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { checkUser } from "@/lib/checkUser";
import MyPosts from "@/Components/Pages/Profile/MyPosts";
import ProfileHeader from "@/Components/Pages/Profile/ProfileHeader";
import SubscriptionCard from "@/Components/Pages/Profile/SubscriptionCard";
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

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

const formatDate = (date: Date) => {
  return dateFormatter.format(date);
};

const calculateAge = (dob: Date) => {
  const diffMs = Date.now() - dob.getTime();
  const ageDt = new Date(diffMs);
  return Math.abs(ageDt.getUTCFullYear() - 1970);
};

const Profile = async () => {
  // Single Clerk API call — checkUser() already calls currentUser() internally,
  // so we reuse the returned user instead of calling Clerk twice.
  const clerkUser = await currentUser();
  if (!clerkUser) redirect("/login?redirect_url=/profile");

  // Run checkUser (for DB upsert/MemberID logic) and profile data queries in parallel.
  // checkUser needs clerkUser which we already have, but it calls currentUser() internally
  // and Clerk caches it within the same request, so this is safe.
  const [user, dbUser, activeMembership] = await Promise.all([
    checkUser(),
    db.user.findUnique({
      where: { clerkUserId: clerkUser.id },
      include: {
        posts: {
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            title: true,
            content: true,
            category: true,
            upvotes: true,
            createdAt: true,
          },
        },
      },
    }),
    db.membershipBookings.findFirst({
      where: { clerkUserId: clerkUser.id, status: "ACTIVE" },
      orderBy: { id: 'desc' },
      select: {
        plan: true,
        endDate: true,
      },
    }),
  ]);

  if (!user || !dbUser) redirect("/login?redirect_url=/profile");

  // Check if membership is still valid (not expired)
  const isSubscriptionValid = activeMembership && activeMembership.endDate && new Date(activeMembership.endDate) > new Date();

  // Prepare Display Data
  const planName = isSubscriptionValid ? (activeMembership?.plan || "NO ACTIVE PLAN") : "NO ACTIVE PLAN";
  const isActive = isSubscriptionValid;
  const renewalDate = isSubscriptionValid && activeMembership?.endDate ? formatDate(activeMembership.endDate) : "N/A";
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
          sizes="100vw"
          className="object-cover"
          priority
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-32 md:-mt-40">

        {/* ═══ USER HERO CARD ═══ */}
        <ProfileHeader
          dbUser={dbUser}
          isActive={isActive}
          avatarUrl={avatarUrl}
          memberSince={memberSince}
          statItems={statItems}
        />

        {/* ═══ MAIN GRID ═══ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ─── LEFT COLUMN ─── */}
          <div className="lg:col-span-2 space-y-8">

            {/* ── Active Subscription Card ── */}
            <SubscriptionCard
              isActive={isActive}
              isSubscriptionValid={isSubscriptionValid}
              planName={planName}
              renewalDate={renewalDate}
            />

            {/* ── My Posts ── */}
            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/80 rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between px-8 pt-8 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                    <FaDumbbell className="text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white font-heading">My Published Posts</h3>
                </div>
                <span className="text-xs font-bold text-zinc-400 bg-zinc-800 px-3 py-1 rounded-md">
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
                  <span className={`text-sm font-bold ${isActive ? "text-emerald-400" : "text-zinc-400"}`}>
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
export const metadata = {
  title: 'Profile | AuraForce',
  description: 'Profile | AuraForce',
};
