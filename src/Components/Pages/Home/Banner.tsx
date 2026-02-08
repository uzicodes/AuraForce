"use client";

import Link from "next/link";
import Image from "next/image";
import { FaPlay } from "react-icons/fa";
import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

const Counter = ({ value, suffix = "", prefix = "" }: { value: number, suffix?: string, prefix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 200,
  });
  const isInView = useInView(ref, { once: true, margin: "-10px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${Math.floor(latest)}${suffix}`;
      }
    });
  }, [springValue, prefix, suffix]);

  return <span ref={ref} />;
};

const Banner = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* Background Image Container */}
      <div className="absolute inset-0">
        <Image
          src="/images/banner/banner.jpg"
          alt="Fitness Banner"
          fill
          className="object-cover object-top"
          priority // Loads image high priority 
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/90 via-zinc-950/80 to-zinc-950/40 z-10"></div>
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center pt-16 sm:pt-0">

          {/* Main heading */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-8 mt-8 leading-tight tracking-tight">
            Your Only Limit is{" "}
            <span className="transparent-text bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-red-400">You</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-red-400">!</span>
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
                  Get Started !
                </span>
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              </button>
            </Link>

            <Link href="https://youtu.be/Sm8O9Lcnr7o?si=-xBc7pWkuUAgAnU1" target="_blank">
              <button className="group flex items-center gap-3 bg-zinc-800/40 backdrop-blur-sm hover:bg-zinc-800/60 text-white px-6 py-4 rounded-full font-semibold transition-all duration-300 border border-zinc-700 hover:border-emerald-500/50">
                <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-black transition-colors duration-300">
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
                <Counter value={5} suffix="K+" />
              </div>
              <div className="text-zinc-400 text-sm font-medium uppercase tracking-wider">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-1">
                <Counter value={50} suffix="+" />
              </div>
              <div className="text-zinc-400 text-sm font-medium uppercase tracking-wider">Workout Plans</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-1">
                <Counter value={24} suffix="/7" />
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