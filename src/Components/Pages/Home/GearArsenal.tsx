"use client";

import React from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { Reveal } from "@/Components/Shared/Reveal";
import {
    FaDumbbell,
    FaFistRaised,
    FaBolt,
    FaShieldAlt,
} from "react-icons/fa";
import { Zap, Swords } from "lucide-react";

// --- GEAR DATA ---
const gearItems = [
    {
        title: "Olympic Dumbbells",
        desc: "Premium chrome & rubber-coated dumbbells engineered for explosive lifts and precision control.",
        image: "https://images.unsplash.com/photo-1638536532686-d610adfc8c56?q=80&w=1200&auto=format&fit=crop",
        icon: <FaDumbbell />,
        accent: "from-emerald-500 to-teal-600",
        hoverBorder: "hover:border-emerald-500/50",
    },
    {
        title: "Power Racks",
        desc: "Heavy-duty steel power cages built to handle your deadliest squats and bench presses.",
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop",
        icon: <FaShieldAlt />,
        accent: "from-blue-500 to-indigo-600",
        hoverBorder: "hover:border-blue-500/50",
    },
    {
        title: "Combat Gear",
        desc: "Pro-grade boxing gloves, wraps, and heavy bags for fighters who train to dominate.",
        image: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=1200&auto=format&fit=crop",
        icon: <FaFistRaised />,
        accent: "from-red-500 to-orange-600",
        hoverBorder: "hover:border-red-500/50",
    },
    {
        title: "Cardio Machines",
        desc: "Next-gen treadmills, rowers, and assault bikes for heart-pounding endurance sessions.",
        image: "https://images.unsplash.com/photo-1576678927484-cc907957088c?q=80&w=1200&auto=format&fit=crop",
        icon: <FaBolt />,
        accent: "from-amber-500 to-yellow-600",
        hoverBorder: "hover:border-amber-500/50",
    },
    {
        title: "Functional Training",
        desc: "Kettlebells, battle ropes & TRX systems for explosive full-body functional fitness.",
        image: "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?q=80&w=1200&auto=format&fit=crop",
        icon: <Zap className="w-5 h-5" />,
        accent: "from-purple-500 to-violet-600",
        hoverBorder: "hover:border-purple-500/50",
    },
    {
        title: "Recovery Arsenal",
        desc: "Foam rollers, massage guns & stretch stations — because recovery is half the battle.",
        image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1200&auto=format&fit=crop",
        icon: <Swords className="w-5 h-5" />,
        accent: "from-teal-500 to-cyan-600",
        hoverBorder: "hover:border-teal-500/50",
    },
];

// --- ANIMATION VARIANTS ---
const containerVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.12,
        },
    },
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 60, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.6,
            ease: "easeOut",
        },
    },
};

// --- COMPONENT ---
const GearArsenal = () => {
    return (
        <section id="gear-arsenal" className="py-24 relative overflow-hidden">

            {/* Background Decorations */}
            <div className="absolute inset-0 opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/dark-mosaic.png')] pointer-events-none" />
            <div className="absolute top-1/3 left-[-10%] w-[600px] h-[600px] bg-emerald-500/8 blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-[-10%] w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Section Header */}
                <div className="text-center mb-20 max-w-3xl mx-auto">
                    <Reveal>
                        <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-emerald-500/20 mb-6">
                            <FaDumbbell className="text-xs" />
                            <span>Elite Equipment</span>
                        </div>
                    </Reveal>

                    <Reveal delay={0.1}>
                        <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight font-heading">
                            Gear That Matches Your{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-red-400">
                                Ambition
                            </span>
                        </h2>
                    </Reveal>

                    <Reveal delay={0.2}>
                        <p className="text-lg text-zinc-400 leading-relaxed max-w-2xl mx-auto font-satoshi">
                            World-class equipment for world-class athletes. Every piece is handpicked, battle-tested,
                            and built to push you beyond limits.
                        </p>
                    </Reveal>
                </div>

                {/* Gear Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {gearItems.map((item, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariants}
                            whileHover={{ y: -8, transition: { duration: 0.3 } }}
                            className={`group relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm cursor-pointer transition-all duration-500 ${item.hoverBorder}`}
                        >
                            {/* Image Section */}
                            <div className="relative h-56 overflow-hidden">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                {/* Image Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent" />

                                {/* Floating Icon Badge */}
                                <div className={`absolute top-4 right-4 w-11 h-11 rounded-xl bg-gradient-to-br ${item.accent} flex items-center justify-center text-white text-lg shadow-lg shadow-black/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                                    {item.icon}
                                </div>

                                {/* Shine sweep effect on hover */}
                                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
                            </div>

                            {/* Content Section */}
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors duration-300 font-heading">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-zinc-400 leading-relaxed font-satoshi">
                                    {item.desc}
                                </p>

                                {/* Bottom accent line */}
                                <div className={`mt-5 h-0.5 w-0 group-hover:w-full bg-gradient-to-r ${item.accent} transition-all duration-500 rounded-full`} />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Bottom CTA / Tagline */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="text-center mt-16"
                >
                    <p className="text-zinc-500 text-sm font-satoshi">
                        All equipment is professionally maintained daily —{" "}
                        <span className="text-emerald-400 font-semibold">zero compromise on safety</span>.
                    </p>
                </motion.div>

            </div>
        </section>
    );
};

export default GearArsenal;
