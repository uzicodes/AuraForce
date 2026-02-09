"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaDumbbell, FaInstagram, FaTwitter, FaLinkedin, FaArrowRight } from "react-icons/fa";

// 1. STATIC DATA (Updated with Local Images)
const trainers = [
  {
    _id: 1,
    name: "Marcus 'The Anvil' Thorne",
    role: "Head Strength Coach",
    specialty: "Powerlifting & Biomechanics",
    bio: "Marcus doesn't believe in exercise for the sake of sweating. He builds raw power using a science-based approach to barbell mechanics. If you want to lift heavy without breaking your spine, he's your guy.",
    image: "/images/trainers/1.jpg",
    socials: { instagram: "#", twitter: "#" }
  },
  {
    _id: 2,
    name: "Elena Rodriguez",
    role: "Performance Specialist",
    specialty: "Hybrid Athlete Training",
    bio: "Elena bridges the gap between the marathon runner and the weightlifter. Her programming is intense, high-volume, and designed to make you look good while being able to run a 5k at a moment's notice.",
    image: "/images/trainers/2.jpg",
    socials: { instagram: "#", linkedin: "#" }
  },
  {
    _id: 3,
    name: "Dr. Kenji Sato",
    role: "Mobility & Recovery",
    specialty: "Functional Movement",
    bio: "Most people train until they break. Kenji trains you to last. With a background in physiotherapy, his sessions focus on bulletproofing your joints and correcting posture so you can train hard for decades, not just years.",
    image: "/images/trainers/3.jpg",
    socials: { twitter: "#", linkedin: "#" }
  },
  {
    _id: 4,
    name: "Philips Parker",
    role: "Hypertrophy Coach",
    specialty: "Bodybuilding Prep",
    bio: "Philips specializes in the art of sculpting. No cardio bunnies here—this is about time-under-tension, strict nutrition protocols, and building a physique that dominates the stage or the beach.",
    image: "/images/trainers/4.jpg",
    socials: { instagram: "#", twitter: "#" }
  }
];

const AllTrainers = () => {
  return (
    // MAIN BACKGROUND: Dark Zinc-950 for premium look
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">

      {/* Background Decor: Subtle Green Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-96 bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

      {/* HEADER SECTION */}
      <div className="relative max-w-4xl mx-auto mb-20 text-center z-10">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-emerald-500/20 mb-6">
          <FaDumbbell />
          <span>The Coaching Staff</span>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight font-heading">
          Partners in Your <span className="text-green-600">Progress.</span>
        </h2>

        <p className="max-w-xl mx-auto text-zinc-400 text-lg leading-relaxed font-satoshi">
          We’ve replaced the generic "fitness enthusiasts" with biomechanics experts,
          pro athletes, and rehabilitation specialists. Choose wisely.
        </p>
      </div>

      {/* CARD GRID */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 z-10 relative">
        {trainers.map((trainer, index) => (
          <motion.div
            key={trainer._id}
            initial={{
              opacity: 0,
              rotateY: index % 2 === 0 ? -30 : 30,
              scale: 0.8,
              filter: "blur(10px)"
            }}
            whileInView={{
              opacity: 1,
              rotateY: 0,
              scale: 1,
              filter: "blur(0px)"
            }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{
              duration: 0.8,
              delay: index * 0.15,
              type: "spring",
              stiffness: 80,
              damping: 20
            }}
            whileHover={{
              y: -15,
              rotateY: 5,
              transition: { duration: 0.3 }
            }}
            style={{ transformStyle: "preserve-3d", perspective: 1000 }}
            className="group relative bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-emerald-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-900/20 flex flex-col"
          >
            {/* IMAGE AREA */}
            <div className="relative h-80 w-full overflow-hidden bg-zinc-800">
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent z-10 opacity-90" />

              {/* Switched to next/image for optimization, keeping style/crop */}
              <Image
                src={trainer.image}
                alt={trainer.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
              />

              {/* SPECIALTY BADGE */}
              <div className="absolute top-4 left-4 z-20 bg-zinc-950/90 backdrop-blur px-3 py-1 rounded-md border border-zinc-800 shadow-xl">
                <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                  {trainer.specialty}
                </p>
              </div>
            </div>

            {/* TEXT CONTENT */}
            <div className="p-5 pt-2 flex-grow flex flex-col">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors font-heading">
                  {trainer.name}
                </h3>
                <p className="text-xs text-zinc-500 font-mono uppercase tracking-wide">
                  {trainer.role}
                </p>
              </div>

              <p className="text-zinc-400 text-xs leading-relaxed mb-6 line-clamp-4 font-satoshi">
                {trainer.bio}
              </p>

              {/* SOCIALS & ACTION */}
              <div className="mt-auto pt-4 border-t border-zinc-800 flex items-center justify-between">
                <div className="flex gap-3">
                  <FaInstagram className="text-zinc-600 hover:text-white cursor-pointer transition-colors text-sm" />
                  <FaTwitter className="text-zinc-600 hover:text-white cursor-pointer transition-colors text-sm" />
                  <FaLinkedin className="text-zinc-600 hover:text-white cursor-pointer transition-colors text-sm" />
                </div>

                <button className="text-xs font-bold text-emerald-500 flex items-center gap-1 hover:gap-2 transition-all uppercase tracking-wider">
                  Profile <FaArrowRight />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AllTrainers;