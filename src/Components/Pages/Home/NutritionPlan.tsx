"use client";

import React from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { FaAppleAlt, FaFire, FaLeaf, FaChartPie } from "react-icons/fa";
import { Zap } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

// --- DATA ARRAYS ---
// Updated with your local images
const carouselImages = [
  "/images/nutrition/1.jpg",
  "/images/nutrition/2.jpg",
  "/images/nutrition/3.jpg"
];

const features = [
  {
    icon: <FaChartPie />,
    title: "Custom Macros",
    desc: "We calculate your exact protein, carb, and fat needs based on your body type and goals.",
  },
  {
    icon: <FaAppleAlt />,
    title: "Real Food Plans",
    desc: "No boring shakes. Get delicious, easy-to-cook recipes that fit your lifestyle.",
  },
  {
    icon: <FaFire />,
    title: "Calorie Tracking",
    desc: "Log your meals instantly and see how they impact your daily energy limits.",
  },
  {
    icon: <FaLeaf />,
    title: "Vegan & Keto Options",
    desc: "Dietary restrictions? No problem. We have specialized plans for every eater.",
  },
];

// --- ANIMATION VARIANTS ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  },
};

// --- COMPONENT ---
const NutritionPlan = () => {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  const handleStartPlan = () => {
    if (!isSignedIn) {
      toast.error("Please login to access your Nutrition Plan", {
        icon: "🔒",
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      router.push("/login");
    } else {
      router.push("/nutrition");
    }
  };

  return (
    <section id="nutrition-plan" className="relative py-24 overflow-hidden">

      {/* Background Gradient Blob */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* HEADER SECTION */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-6"
          >

            Fuel Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-red-400">Aura</span><Zap className="inline-block ml-4 text-emerald-400/80 mb-2 w-14 h-14" />
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-zinc-400 text-lg font-satoshi"
          >
            Training is only half the battle. Our precision nutrition planning helps you eat for performance without sacrificing flavor.
          </motion.p>
        </div>

        {/* MAIN CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* LEFT: IMAGE CAROUSEL */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative h-[500px] w-full rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl group">
              <Swiper
                modules={[Autoplay, EffectFade]}
                effect="fade"
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop={true}
                className="h-full w-full"
              >
                {carouselImages.map((src, index) => (
                  <SwiperSlide key={index} className="relative h-full w-full">
                    <Image
                      src={src}
                      alt={`Nutrition Slide ${index + 1}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent" />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </motion.div>

          {/* RIGHT: SCROLLING FEATURES LIST */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-6"
          >
            {features.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex gap-5 p-5 rounded-2xl hover:bg-zinc-900/50 border border-transparent hover:border-zinc-800 transition-colors group"
              >
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-emerald-500 text-2xl group-hover:bg-emerald-500 group-hover:text-black transition-all duration-300 shadow-lg group-hover:shadow-emerald-500/20">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed font-satoshi">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}

            <motion.div variants={itemVariants} className="pt-6">
              <button
                onClick={handleStartPlan}
                className="px-8 py-3.5 bg-white text-black font-bold rounded-full hover:bg-zinc-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)]"
              >
                Start Your Nutrition Plan
              </button>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default NutritionPlan;