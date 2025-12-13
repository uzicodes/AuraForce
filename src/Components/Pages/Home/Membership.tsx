"use client"; // 1. Required for Framer Motion

import Link from "next/link";
import { FaCheck, FaCrown, FaTags } from "react-icons/fa";
import { motion } from "framer-motion"; // 2. Import motion
import { Reveal } from "@/Components/Shared/Reveal"; // 3. Import Reveal wrapper

const Membership = () => {
  const packages = [
    {
      name: "Basic",
      price: "৳4999",
      period: "/month",
      desc: "Essential access for the casual gym-goer.",
      features: ["Access to Gym Equipment", "Locker Room Access", "Free WiFi", "1 Intro PT Session"],
      button: "Get Basic",
      highlight: false
    },
    {
      name: "Standard",
      price: "৳9999",
      period: "/month",
      desc: "Perfect for dedicated fitness enthusiasts.",
      features: ["All Basic Features", "Group Fitness Classes", "Sauna & Steam Room", "Nutrition Guide", "Monthly Progress Check"],
      button: "Join Now",
      highlight: true
    },
    {
      name: "Premium",
      price: "৳14999",
      period: "/month",
      desc: "The ultimate all-inclusive experience.",
      features: ["All Standard Features", "Unlimited Personal Training", "Massage Therapy Access", "Priority Support", "Exclusive Merch"],
      button: "Go Premium",
      highlight: false
    }
  ];

  return (
    <section id="membership" className="py-24 bg-zinc-950 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header with Reveal Animation */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <Reveal>
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-500 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-emerald-500/20 mb-6">
              <FaTags />
              <span>Membership Plans</span>
            </div>
          </Reveal>
          
          <Reveal delay={0.1}>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Choose Your <span className="text-emerald-500">Power Level</span>
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-lg text-zinc-400 leading-relaxed">
              Flexible plans designed for everyone. From beginners to pro athletes, we have the perfect package for you.
            </p>
          </Reveal>
        </div>

        {/* Pricing Grid with Staggered Animation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            // 4. Converted div to motion.div
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50 }} // Start hidden and lower
              whileInView={{ opacity: 1, y: 0 }} // Animate to visible
              viewport={{ once: true, margin: "-50px" }} // Trigger once
              transition={{ duration: 0.5, delay: index * 0.2 }} // Stagger delay (0s, 0.2s, 0.4s)
              className={`relative flex flex-col p-8 rounded-3xl border transition-all duration-300 ${
                pkg.highlight 
                  ? "bg-zinc-900 border-emerald-500 shadow-2xl shadow-emerald-900/20 scale-105 z-10" 
                  : "bg-zinc-950 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/50"
              }`}
            >
              {pkg.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-black text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                  <FaCrown className="text-xs" /> Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-2">{pkg.name}</h3>
                <p className="text-zinc-400 text-sm">{pkg.desc}</p>
              </div>

              <div className="mb-8">
                <span className="text-4xl font-bold text-white">{pkg.price}</span>
                <span className="text-zinc-500 text-sm">{pkg.period}</span>
              </div>

              <ul className="space-y-4 mb-8 flex-grow">
                {pkg.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-zinc-300">
                    <span className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${pkg.highlight ? "bg-emerald-500 text-black" : "bg-zinc-800 text-zinc-400"}`}>
                      <FaCheck className="text-[10px]" />
                    </span>
                    {feat}
                  </li>
                ))}
              </ul>

              <Link 
                href={`/checkout?plan=${pkg.name}`} 
                className={`w-full py-3 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center ${
                  pkg.highlight 
                    ? "bg-emerald-500 text-black hover:bg-emerald-400 shadow-lg shadow-emerald-500/20" 
                    : "bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-700"
                }`}
              >
                {pkg.button}
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Membership;