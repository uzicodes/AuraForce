"use client";

import React from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { Reveal } from "@/Components/Shared/Reveal";
import { FaDumbbell } from "react-icons/fa";

// --- 12 SHOP ITEMS ---
const shopItems = [
    {
        name: "Hex Dumbbells",
        image: "https://plus.unsplash.com/premium_photo-1671028546491-f70b21a32cc2?fm=jpg&q=80&w=600&auto=format&fit=crop",
    },
    {
        name: "Barbell Set",
        image: "https://images.unsplash.com/photo-1689514226761-336eaf77e311?fm=jpg&q=80&w=600&auto=format&fit=crop",
    },
    {
        name: "Kettlebells",
        image: "https://images.unsplash.com/photo-1632077804406-188472f1a810?q=80&w=1170&auto=format&fit=crop",
    },
    {
        name: "Boxing Gloves",
        image: "https://plus.unsplash.com/premium_photo-1661642133019-b7b859310d9f?q=80&w=1170&auto=format&fit=crop",
    },
    {
        name: "Resistance Bands",
        image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?q=80&w=1171&auto=format&fit=crop",
    },
    {
        name: "Power Rack",
        image: "https://images.unsplash.com/photo-1646656130703-8f95eed6a79b?q=80&w=687&auto=format&fit=crop",
    },
    {
        name: "Jump Rope",
        image: "https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?q=80&w=600&auto=format&fit=crop",
    },
    {
        name: "Yoga Mat",
        image: "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?q=80&w=600&auto=format&fit=crop",
    },
    {
        name: "Weight Plates",
        image: "https://images.unsplash.com/photo-1521804906057-1df8fdb718b7?q=80&w=600&auto=format&fit=crop",
    },
    {
        name: "Foam Roller",
        image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=600&auto=format&fit=crop",
    },
    {
        name: "Battle Ropes",
        image: "https://images.unsplash.com/photo-1520877880798-5ee004e3f11e?q=80&w=600&auto=format&fit=crop",
    },
    {
        name: "Pull-Up Bar",
        image: "https://images.unsplash.com/photo-1597452485669-2c7bb5fef90d?q=80&w=600&auto=format&fit=crop",
    },
];

// Category color map
const categoryColors: Record<string, string> = {
    Strength: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    Functional: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    Combat: "text-red-400 bg-red-500/10 border-red-500/20",
    Accessories: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    Cardio: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    Recovery: "text-teal-400 bg-teal-500/10 border-teal-500/20",
    Calisthenics: "text-orange-400 bg-orange-500/10 border-orange-500/20",
};

// --- ANIMATION VARIANTS ---
const containerVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.06,
        },
    },
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40, scale: 0.96 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.5,
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
                            Our {" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-red-400">
                                Gears
                            </span>
                        </h2>
                    </Reveal>

                    <Reveal delay={0.2}>
                        <p className="text-lg text-zinc-400 leading-relaxed max-w-2xl mx-auto font-satoshi">
                            World-class equipment for world-class athletes to push you beyond limits.
                        </p>
                    </Reveal>
                </div>

                {/* Shop-Style Product Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                    className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5"
                >
                    {shopItems.map((item, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariants}
                            whileHover={{ y: -6, transition: { duration: 0.25 } }}
                            className="group relative rounded-xl overflow-hidden border border-zinc-800/80 bg-zinc-900/60 backdrop-blur-sm cursor-pointer hover:border-emerald-500/40 transition-all duration-400"
                        >
                            {/* Product Image */}
                            <div className="relative h-36 overflow-hidden bg-zinc-800">
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    className="object-cover transition-transform duration-600 group-hover:scale-110"
                                />
                                {/* Subtle overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />


                                {/* Shine sweep */}
                                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/8 to-transparent pointer-events-none" />
                            </div>

                            {/* Product Info */}
                            <div className="px-3 py-2.5">
                                <h3 className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors duration-300 font-ubuntu truncate">
                                    {item.name}
                                </h3>
                                <div className="mt-2 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-emerald-500 to-emerald-400/50 transition-all duration-500 rounded-full" />
                            </div>                        </motion.div>
                    ))}
                </motion.div>

                {/* Bottom Tagline */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-center mt-14"
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
