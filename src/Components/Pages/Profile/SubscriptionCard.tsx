import { FaCrown, FaArrowRight } from "react-icons/fa";
import Link from "next/link";

interface SubscriptionCardProps {
  isActive: boolean;
  isSubscriptionValid: boolean | null;
  planName: string;
  renewalDate: string;
}

const SubscriptionCard = ({ isActive, isSubscriptionValid, planName, renewalDate }: SubscriptionCardProps) => {
  return (
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
        {isSubscriptionValid ? (
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
            <div className="w-14 h-14 mx-auto bg-zinc-800 rounded-xl flex items-center justify-center text-zinc-400 mb-4">
              <FaCrown size={22} />
            </div>
            <p className="text-zinc-300 font-semibold mb-2">You have currently no active subscriptions</p>
            <p className="text-zinc-600 text-sm mb-5">Upgrade to a membership plan to unlock premium features and benefits.</p>
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
  );
};

export default SubscriptionCard;
