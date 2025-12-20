import Link from "next/link";
import Image from "next/image"; // 1. Import Image component
import { FaPlay, FaStar } from "react-icons/fa";

const Banner = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-zinc-950">
      
      {/* Background Image Container */}
      <div className="absolute inset-0">
        <Image 
          src="/images/banner/banner.jpg" 
          alt="Fitness Banner"
          fill // background-size: cover'
          className="object-cover object-top" // crops from the top
          priority // Loads image high priority 
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/90 via-zinc-950/80 to-zinc-950/40 z-10"></div>
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-zinc-900/50 backdrop-blur-md border border-emerald-500/30 rounded-full px-4 py-2 mb-8 shadow-lg shadow-emerald-900/10">
            <FaStar className="text-emerald-500 text-sm" />
            <span className="text-zinc-200 text-sm font-medium tracking-wide">
              Trusted by 10,000+ Fitness Enthusiasts
            </span>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight tracking-tight">
            Your Only Limit is{" "}
            <span className="transparent-text bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
              You !
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-zinc-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Track. Train. Triumph! Elevate your daily performance with the ultimate fitness companion designed to keep you focused, fueled & moving forward.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <Link href="/allClasses">
              <button className="group relative bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/20 overflow-hidden">
                <span className="relative z-10 flex items-center gap-2">
                  Get Started Now !
                </span>
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              </button>
            </Link>
            
            <Link href="https://youtu.be/Sm8O9Lcnr7o?si=-xBc7pWkuUAgAnU1" target="_blank">
              <button className="group flex items-center gap-3 bg-zinc-800/40 backdrop-blur-sm hover:bg-zinc-800/60 text-white px-6 py-4 rounded-full font-semibold transition-all duration-300 border border-zinc-700 hover:border-emerald-500/50">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-black transition-colors duration-300">
                  <FaPlay className="text-sm ml-1" />
                </div>
                Watch Demo
              </button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-20 pt-8 border-t border-zinc-800/60">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-1">
                5K+
              </div>
              <div className="text-zinc-400 text-sm font-medium uppercase tracking-wider">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-1">
                50+
              </div>
              <div className="text-zinc-400 text-sm font-medium uppercase tracking-wider">Workout Plans</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-1">
                24/7
              </div>
              <div className="text-zinc-400 text-sm font-medium uppercase tracking-wider">Support</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;