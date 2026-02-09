"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/Components/Shared/Reveal";
import Image from "next/image";
import {
  FaArrowRight,
  FaDumbbell,
  FaRunning,
  FaHeartbeat,
  FaBrain,
  FaFireAlt,
  FaStopwatch
} from "react-icons/fa";

const features = [
  {
    icon: <FaDumbbell />,
    title: "Hypertrophy & Strength",
    description: "Scientific-based progressive overload plans designed to maximize muscle growth and raw power.",
    image: "/images/features/1.jpg",
    accent: "group-hover:text-emerald-400"
  },
  {
    icon: <FaFireAlt />,
    title: "High-Intensity (HIIT)",
    description: "Burn fat and boost endurance with our explosive circuit training modules and timers.",
    image: "/images/features/2.jpg",
    accent: "group-hover:text-orange-500"
  },
  {
    icon: <FaRunning />,
    title: "Cardio Endurance",
    description: "Track your distance, pace, and VO2 max with precision. specialized plans for marathon prep.",
    image: "/images/features/3.jpg",
    accent: "group-hover:text-blue-500"
  },
  {
    icon: <FaHeartbeat />,
    title: "Mobility & Recovery",
    description: "Prevent injury with guided stretching routines, yoga flows, and active recovery sessions.",
    image: "/images/features/4.jpg",
    accent: "group-hover:text-purple-500"
  },
  {
    icon: <FaStopwatch />,
    title: "Competition Prep",
    description: "Detailed macro tracking and posing guides for bodybuilders preparing for the stage.",
    image: "/images/features/5.jpg",
    accent: "group-hover:text-red-500"
  },
  {
    icon: <FaBrain />,
    title: "Mindset & Focus",
    description: "Meditation and mental toughness drills to keep your head in the game during heavy lifts.",
    image: "/images/features/6.jpg",
    accent: "group-hover:text-teal-500"
  }
];

const Features = () => {
  return (
    <section id="features" className="py-24 relative overflow-hidden">

      {/* Background Decor - Gritty Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] pointer-events-none" />

      {/* Glowing Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <Reveal>
            <div className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-emerald-500 mb-6 hover:bg-zinc-800 transition-colors cursor-default">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Premium Facilities</span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              Forge Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-red-400">Legacy</span>
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-lg text-zinc-400 leading-relaxed max-w-2xl mx-auto font-satoshi">
              We provide more than just equipment. We provide the blueprint to engineer the best version of yourself.
            </p>
          </Reveal>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            // Create unique animations for each card position
            const animations = [
              { x: -100, rotate: -5 },   // Card 1: from left with slight rotation
              { y: -80, scale: 0.8 },    // Card 2: from top with scale
              { x: 100, rotate: 5 },     // Card 3: from right with rotation
              { y: 80, scale: 0.9 },     // Card 4: from bottom with scale
              { x: -80, y: 40 },         // Card 5: diagonal from left-bottom
              { x: 80, y: 40 },          // Card 6: diagonal from right-bottom
            ];

            const animation = animations[index % 6];

            return (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  x: animation.x || 0,
                  y: animation.y || 0,
                  scale: animation.scale || 1,
                  rotate: animation.rotate || 0
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  y: 0,
                  scale: 1,
                  rotate: 0
                }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }}
                whileHover={{
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                className="group relative h-[400px] w-full rounded-3xl overflow-hidden cursor-pointer"
              >
                {/* Background Image with Zoom Effect */}
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Gradient Overlays */}
                {/* Base dark overlay */}
                <div className="absolute inset-0 bg-zinc-950/70 transition-opacity duration-300 group-hover:bg-zinc-950/60" />

                {/* Gradient from bottom to make text readable */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent" />

                {/* Content Container */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end">

                  {/* Icon Wrapper */}
                  <div className={`w-14 h-14 rounded-2xl bg-zinc-900/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-2xl text-white mb-4 transition-colors duration-300 ${feature.accent}`}>
                    {feature.icon}
                  </div>

                  {/* Text Content - Slides up slightly on hover */}
                  <div className="transform transition-transform duration-300 group-hover:-translate-y-2">
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-24 transition-all duration-500 ease-in-out font-satoshi">
                      {feature.description}
                    </p>
                  </div>

                  {/* Learn More Button - Appears on hover */}
                  <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                    <span className="text-sm font-bold text-white uppercase tracking-wider">Explore</span>
                    <div className={`p-2 rounded-full bg-white/10 text-white ${feature.accent}`}>
                      <FaArrowRight />
                    </div>
                  </div>

                </div>

                {/* Border Glow Effect */}
                <div className="absolute inset-0 border-2 border-white/0 rounded-3xl transition-colors duration-300 group-hover:border-emerald-500/30 pointer-events-none" />

              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;