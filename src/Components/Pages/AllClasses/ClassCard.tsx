"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaClock, FaFire, FaArrowRight } from 'react-icons/fa';

interface ClassCardProps {
  singleClass: {
    _id: number;
    classname: string;
    trainer: string;
    duration: string;
    intensity: string;
    image: string;
    description: string;
  };
  index?: number;
}

const ClassCard = ({ singleClass, index = 0 }: ClassCardProps) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 50,
        scale: 0.95
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1
      }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        delay: (index % 3) * 0.1, // Faster stagger
        type: "spring",
        stiffness: 100,
        damping: 20
      }}
      whileHover={{
        y: -10,
        transition: { duration: 0.25 }
      }}
      className="group relative bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-emerald-500/50 transition-all duration-300 flex flex-col h-full hover:shadow-xl hover:shadow-emerald-500/10"
    >

      {/* IMAGE AREA */}
      <div className="relative h-48 w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent z-10 opacity-80" />
        <img
          src={singleClass.image}
          alt={singleClass.classname}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Floating Badge (Intensity) */}
        <div className="absolute top-3 left-3 z-20 bg-zinc-950/80 backdrop-blur border border-zinc-700 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
          <FaFire /> {singleClass.intensity || "High"} Intensity
        </div>
      </div>

      {/* CONTENT AREA */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors font-heading">
          {singleClass.classname}
        </h3>

        <p className="text-zinc-400 text-sm line-clamp-2 mb-4 flex-grow font-satoshi">
          {singleClass.description}
        </p>

        {/* METADATA ROW */}
        <div className="flex items-center justify-between text-xs text-zinc-500 font-satoshi mb-4 border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-1">
            <FaClock className="text-emerald-500" />
            <span>{singleClass.duration || "60 mins"}</span>
          </div>
          <div>
            By {singleClass.trainer || "Expert Coach"}
          </div>
        </div>

        {/* BUTTON */}
        <Link href={`/book-class/${singleClass._id}`} className="w-full py-2 rounded-none bg-zinc-800 text-white font-semibold text-sm hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2 group/btn">
          Join Class
          <FaArrowRight className="text-xs transition-transform group-hover/btn:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
};

export default ClassCard;