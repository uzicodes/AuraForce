"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { FaQuoteLeft, FaStar, FaArrowRight, FaArrowLeft } from "react-icons/fa";
import Image from "next/image";

// 1. Static Data: Real-sounding testimonials
const testimonials = [
  {
    id: 1,
    name: "James 'The Tank' Miller",
    location: "Pro Powerlifter",
    rating: 5,
    testimonial: "I've tried every fitness tracker out there,Aura Force is the one that actually handles complex progressive overload calculations without being a headache. My deadlift went up 40kg in 3 months.",
    image: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    location: "Marathon Runner",
    rating: 5,
    testimonial: "The community here is insane. I used to run alone, but connecting with other endurance athletes through the app kept me accountable during my winter training block. Highly recommend the specialized cardio plans.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Marcus Thorne",
    location: "CrossFit Athlete",
    rating: 5,
    testimonial: "The analytics are next level. Being able to see my heart rate variability alongside my lifting volume helped me avoid burnout. This isn't just a workout log; it's a complete coaching system. Gained my trust on myself Thanks to Aura Force.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Emily Chen",
    location: "Yoga Instructor",
    rating: 5,
    testimonial: "Balance is everything. I love that I can switch from a heavy lifting program to a mobility flow seamlessly. The interface is beautiful, dark-mode friendly, and never crashes during a session.I feel stronger and more centered than ever.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1000&auto=format&fit=crop",
  },
];

const Testimonials = () => {
  return (
    // MAIN BACKGROUND: Zinc-950 for that modern dark gym look
    <section className="py-24 bg-zinc-950 relative overflow-hidden">
      
      {/* Background Glow Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-20 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[100px]"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-emerald-500/20 mb-6">
            <span>Success Stories</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Voices of the <span className="text-emerald-500">Strong.</span>
          </h2>
          <p className="text-lg text-zinc-400 leading-relaxed">
            Real results from real athletes. Don't just take our word for it—hear from the community dominating their goals.
          </p>
        </div>

        {/* Testimonials Slider */}
        <div className="max-w-7xl mx-auto relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation={{
              nextEl: '.custom-next',
              prevEl: '.custom-prev',
            }}
            pagination={{
              clickable: true,
              el: '.custom-pagination',
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-12"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id} className="h-auto">
                {/* CARD DESIGN */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 h-full flex flex-col hover:border-emerald-500/50 transition-all duration-300 group">
                  
                  {/* Quote Icon & Rating */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                      <FaQuoteLeft className="text-zinc-500 group-hover:text-emerald-500 transition-colors" />
                    </div>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className="text-emerald-500 text-xs" />
                      ))}
                    </div>
                  </div>
                  
                  {/* Testimonial Text */}
                  <p className="text-zinc-300 leading-relaxed mb-8 flex-grow italic text-sm md:text-base">
                    "{testimonial.testimonial}"
                  </p>
                  
                  {/* Author Info */}
                  <div className="flex items-center gap-4 border-t border-zinc-800 pt-6 mt-auto">
                    <div className="relative w-12 h-12">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        fill
                        className="rounded-full object-cover border-2 border-zinc-700 group-hover:border-emerald-500 transition-colors"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm group-hover:text-emerald-400 transition-colors">
                        {testimonial.name}
                      </h4>
                      <p className="text-xs text-zinc-500 font-mono uppercase tracking-wide">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          
          {/* Custom Navigation & Pagination Wrapper */}
          <div className="flex items-center justify-between mt-8 px-2">
            
            {/* Nav Buttons */}
            <div className="flex gap-4">
              <button className="custom-prev w-12 h-12 rounded-full border border-zinc-700 flex items-center justify-center text-zinc-400 hover:bg-emerald-500 hover:text-black hover:border-emerald-500 transition-all duration-300">
                <FaArrowLeft />
              </button>
              <button className="custom-next w-12 h-12 rounded-full border border-zinc-700 flex items-center justify-center text-zinc-400 hover:bg-emerald-500 hover:text-black hover:border-emerald-500 transition-all duration-300">
                <FaArrowRight />
              </button>
            </div>

            {/* Pagination Dots */}
            <div className="custom-pagination flex gap-2 !w-auto"></div>
          </div>
        </div>
      </div>
      
      {/* Custom Styles for Swiper Dots */}
      <style jsx global>{`
        .custom-pagination .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background-color: #3f3f46; /* zinc-700 */
          opacity: 1;
          border-radius: 50%;
          transition: all 0.3s ease;
        }
        .custom-pagination .swiper-pagination-bullet-active {
          background-color: #10b981; /* emerald-500 */
          transform: scale(1.2);
          width: 24px;
          border-radius: 999px;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;