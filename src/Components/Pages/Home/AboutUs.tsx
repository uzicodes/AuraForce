"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaCheck, FaHeart, FaUsers, FaTrophy, FaArrowRight } from "react-icons/fa";

const galleryImages = [
  "/images/features/1.jpg",
  "/images/about/2.jpg",
  "/images/about/4.jpg",

];

const AboutUs = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % galleryImages.length);
    }, 5000); 

    return () => clearInterval(interval); 
  }, []);

  const stats = [
    { icon: FaUsers, number: "10K+", label: "Happy Members" },
    { icon: FaTrophy, number: "500+", label: "Success Stories" },
    { icon: FaHeart, number: "99%", label: "Satisfaction Rate" },
  ];

  const benefits = [
    "Personalized workout plans tailored to your goals",
    "Real-time progress tracking and analytics",
    "Expert guidance from certified trainers",
    "Supportive community of fitness enthusiasts",
    "Flexible scheduling that fits your lifestyle",
  ];

  return (
    <section className="py-20 bg-zinc-950 overflow-hidden relative">
      
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-emerald-500/20 mb-6">
            <span>Our Story</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            About <span className="text-zinc-600">Our Fit Family</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          <div className="order-2 lg:order-1 space-y-8">
            <h3 className="text-3xl font-bold text-white leading-tight">
              Empowering Your Fitness Journey <br />
              <span className="text-emerald-500">Since Day One.</span>
            </h3>

            <div className="space-y-6 text-zinc-400 leading-relaxed text-lg">
              <p>
                Welcome to Aura Force, where your fitness journey becomes a story
                of progress, passion, and personal transformation. We believe in
                empowering you with the tools and insights you need to reach
                your goals, one step at a time.
              </p>

              <p>
                Our mission is to make fitness an integral and enjoyable part of
                your daily life. Whether you're a seasoned athlete or just
                starting out, our intuitive platform offers personalized
                workouts and a vibrant community.
              </p>
            </div>

            <div className="space-y-4 pt-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3 group">
                  <div className="w-6 h-6 bg-emerald-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-emerald-500 transition-colors duration-300">
                    <FaCheck className="text-emerald-500 text-xs group-hover:text-black transition-colors duration-300" />
                  </div>
                  <span className="text-zinc-300 group-hover:text-white transition-colors duration-300">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-zinc-800">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                      {stat.number}
                    </div>
                    <div className="text-xs text-zinc-500 uppercase tracking-wider font-medium">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="order-1 lg:order-2 relative">
            <div className="relative h-[500px] lg:h-[600px] w-full rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl shadow-emerald-900/20 group bg-zinc-900">
                
                {galleryImages.map((src, index) => (
                  <div
                    key={src}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                      index === currentImageIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                    }`}
                  >
                    <Image
                      src={src}
                      alt={`Gallery image ${index + 1}`}
                      fill
                      className="object-cover"
                      priority={index === 0}
                    />
                  </div>
                ))}

                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent z-20 opacity-60" />

                <div className="absolute bottom-6 left-6 right-6 z-30 bg-zinc-900/80 backdrop-blur-md p-6 rounded-xl border border-zinc-700 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="text-white font-bold text-lg">Ready to start?</h4>
                            <p className="text-zinc-400 text-sm">Join the strongest community today.</p>
                        </div>
                        <button className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-black hover:scale-110 transition-transform">
                            <FaArrowRight />
                        </button>
                    </div>
                </div>
            </div>

            <div className="absolute -top-4 -right-4 w-24 h-24 bg-zinc-800 rounded-xl -z-10" />
            <div className="absolute -bottom-4 -left-4 w-full h-full border border-zinc-800 rounded-2xl -z-10" />
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutUs;