"use client"; // 1. Add "use client" directive

import { motion } from "framer-motion"; // 2. Import motion
import { Reveal } from "@/Components/Shared/Reveal"; // 3. Import your Reveal component
import pic1 from "../../../assets/bicep-53.png";
import pic2 from "../../../assets/dumbbells-50.png";
import pic3 from "../../../assets/exercise-50.png";
import pic4 from "../../../assets/stretching-50.png";
import pic5 from "../../../assets/weightlifter-48.png";
import pic6 from "../../../assets/yoga-50.png";
import { FaArrowRight, FaDumbbell } from "react-icons/fa";
import Image from "next/image";

const Features = () => {
  const features = [
    {
      icon: pic1,
      title: "Muscle Building",
      description: "Strengthen and build muscle with tailored workouts and detailed progress tracking. Receive personalized plans, monitor your gains, and achieve your bodybuilding goals.",
      bg: "bg-emerald-400/10 border-emerald-400/20"
    },
    {
      icon: pic2,
      title: "Body Building",
      description: "Achieve your muscle-building goals with our Body Building feature. Access tailored workout plans, track your progress, and get expert tips to maximize your strength.",
      bg: "bg-blue-400/10 border-blue-400/20"
    },
    {
      icon: pic3,
      title: "Running",
      description: "Track your running sessions with precision. Monitor your distance, pace, and calories burned, set personal goals, and analyze your progress.",
      bg: "bg-orange-400/10 border-orange-400/20"
    },
    {
      icon: pic4,
      title: "Stretching",
      description: "Enhance your flexibility and prevent injuries with our Stretching feature. Access guided routines, track your stretching sessions seamlessly.",
      bg: "bg-purple-400/10 border-purple-400/20"
    },
    {
      icon: pic5,
      title: "Weight Lifting",
      description: "Track your weight lifting routines with detailed logs and progress charts. Customize workouts, set personal records, and monitor your strength gains.",
      bg: "bg-red-400/10 border-red-400/20"
    },
    {
      icon: pic6,
      title: "Yoga",
      description: "Discover the benefits of Yoga with our guided sessions. Enhance flexibility, reduce stress, and improve overall well-being with personalized routines.",
      bg: "bg-pink-400/10 border-pink-400/20"
    }
  ];

  return (
    <section className="py-24 bg-zinc-950 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Reveal Animation */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <Reveal>
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-500 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-emerald-500/20 mb-6">
              <FaDumbbell />
              <span>What We Offer</span>
            </div>
          </Reveal>
          
          <Reveal delay={0.1}>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Our Amazing <span className="text-emerald-500">Features</span>
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-lg text-zinc-400 leading-relaxed">
              Discover powerful tools designed to transform your fitness journey and help you achieve your goals faster than ever before.
            </p>
          </Reveal>
        </div>

        {/* Features Grid with Staggered Animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            // 4. Change div to motion.div and add animation props
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }} // Start hidden and 50px lower
              whileInView={{ opacity: 1, y: 0 }} // Animate to visible and original position
              viewport={{ once: true, margin: "-50px" }} // Trigger when 50px in view, only once
              transition={{ duration: 0.5, delay: index * 0.1 }} // Staggered delay based on index
              className="group relative bg-zinc-900 border border-zinc-800 rounded-3xl p-8 hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-900/10 transition-all duration-300 flex flex-col"
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-transform duration-300 group-hover:scale-110 border ${feature.bg}`}>
                <Image
                  src={feature.icon}
                  alt={feature.title}
                  width={32}
                  height={32}
                  className="w-8 h-8 filter brightness-0 invert"
                />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-emerald-400 transition-colors">
                {feature.title}
              </h3>
              <p className="text-zinc-400 leading-relaxed mb-8 text-sm flex-grow">
                {feature.description}
              </p>
              <div className="mt-auto">
                <button className="flex items-center gap-2 text-sm font-bold text-emerald-500 hover:text-emerald-400 transition-colors uppercase tracking-wider group/btn">
                  <span>Learn More</span>
                  <FaArrowRight className="text-xs transition-transform duration-300 group-hover/btn:translate-x-1" />
                </button>
              </div>
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;