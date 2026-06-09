import Image from "next/image";
import Link from "next/link";
import { SignOutButton } from "@clerk/nextjs";
import { FaUserEdit, FaIdCard, FaCalendarAlt, FaSignOutAlt, FaCrown, FaUserTie } from "react-icons/fa";

interface StatItem {
  icon: JSX.Element;
  label: string;
  value: string;
}

interface ProfileHeaderProps {
  dbUser: any;
  isActive: boolean;
  avatarUrl: string;
  memberSince: string;
  statItems: (StatItem | null)[];
}

const ProfileHeader = ({ dbUser, isActive, avatarUrl, memberSince, statItems }: ProfileHeaderProps) => {
  return (
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
              sizes="(max-width: 768px) 144px, 176px"
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
            <span className="flex items-center gap-1.5 text-xs text-zinc-400">
              <FaCalendarAlt className="text-zinc-500" /> Joined {memberSince}
            </span>
          </div>

          {/* Stat Chips */}
          {statItems.length > 0 && (
            <div className="flex flex-wrap justify-center md:justify-start gap-2.5">
              {statItems.map((stat) => stat && (
                <div
                  key={stat.label}
                  className="flex items-center gap-2 bg-zinc-800/50 border border-zinc-700/50 rounded-lg px-4 py-2 hover:border-emerald-500/30 transition-colors duration-300"
                >
                  <span className="text-emerald-400 text-sm">{stat.icon}</span>
                  <div className="text-left">
                    <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">{stat.label}</p>
                    <p className="text-sm text-zinc-200 font-bold">{stat.value}</p>
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
            <button type="button" className="flex items-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-red-600 text-zinc-300 hover:text-white text-sm font-bold border border-zinc-700 hover:border-red-500 transition-all duration-300 cursor-pointer">
              <FaSignOutAlt /> Logout
            </button>
          </SignOutButton>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
