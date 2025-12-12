"use client";

import React, { useState } from "react";
import Post from "@/Components/Pages/Forums/Posts"; 
import { FaSearch, FaPlus, FaComments } from "react-icons/fa";

// --- STATIC DATA ---
const allPosts = [
  {
    _id: "1",
    title: "Why Progressive Overload is King 👑",
    author_name: "Coach Marcus",
    author_location: "New York, USA",
    author_img: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=1000&auto=format&fit=crop",
    short_description: "If you aren't adding weight, reps, or intensity, you aren't growing. Here is a breakdown of how to track your lifts effectively.",
    publish_time: "2h ago",
    role: "Admin",
    category: "Training",
    upvotes: 142,
  },
  {
    _id: "2",
    title: "Meal Prep Hacks for Busy People 🥗",
    author_name: "Sarah Jenkins",
    author_location: "London, UK",
    author_img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000&auto=format&fit=crop",
    short_description: "Spending 5 hours on Sunday cooking? Stop. Here is my 1-hour method to prep lunch for the whole week.",
    publish_time: "5h ago",
    role: "Trainer",
    category: "Nutrition",
    upvotes: 89,
  },
  {
    _id: "3",
    title: "Is Creatine Actually Safe?",
    author_name: "Dr. Kenji Sato",
    author_location: "Tokyo, Japan",
    author_img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop",
    short_description: "Clearing up the myths about kidney damage and hair loss. Scientific breakdown of the most researched supplement.",
    publish_time: "1d ago",
    role: "Expert",
    category: "Nutrition",
    upvotes: 256,
  },
  {
    _id: "4",
    title: "My Transformation: 300lbs to 180lbs",
    author_name: "James Doe",
    author_location: "Toronto, Canada",
    author_img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop",
    short_description: "It wasn't easy, but here is exactly what I ate and how I trained to lose over 100lbs in a year.",
    publish_time: "2d ago",
    role: "Member",
    category: "Success Stories",
    upvotes: 567,
  },
  {
    _id: "5",
    title: "Best Gym Shoes for Squatting?",
    author_name: "Emily R.",
    author_location: "Berlin, Germany",
    author_img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1000&auto=format&fit=crop",
    short_description: "Converse vs. Romaleos vs. Barefoot. I tested them all so you don't have to.",
    publish_time: "3d ago",
    role: "Member",
    category: "Gear",
    upvotes: 45,
  },
  {
    _id: "6",
    title: "How to Fix Anterior Pelvic Tilt",
    author_name: "Physio Mike",
    author_location: "Sydney, Aus",
    author_img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1000&auto=format&fit=crop",
    short_description: "Does your lower back hurt after squats? You might have APT. Here are 3 daily stretches to fix it.",
    publish_time: "4d ago",
    role: "Expert",
    category: "Injury Prevention",
    upvotes: 312,
  },
];

const categories = ["All", "Training", "Nutrition", "Gear", "Success Stories", "Injury Prevention"];

const Forums = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  // Filter Logic
  const filteredPosts = allPosts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    // MAIN BACKGROUND: Zinc-950 for seamless dark theme
    <section className="min-h-screen bg-zinc-950 text-zinc-100 py-24 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* PAGE HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-500 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-emerald-500/20 mb-6">
              <FaComments /> Community
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
              Join the <span className="text-emerald-500">Conversation.</span>
            </h1>
            <p className="text-zinc-400 text-lg leading-relaxed">
              Ask questions, share your progress, and learn from over 10,000+ active members and certified trainers.
            </p>
          </div>
          
          <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-full font-bold transition-all shadow-lg shadow-emerald-900/20 hover:scale-105">
            <FaPlus className="text-sm" /> 
            <span>Create Post</span>
          </button>
        </div>

        {/* SEARCH & FILTERS */}
        <div className="bg-zinc-900/50 backdrop-blur-md border border-zinc-800 rounded-3xl p-2 mb-12 flex flex-col lg:flex-row gap-4 sticky top-4 z-30">
          
          {/* Search Input */}
          <div className="relative w-full lg:w-96 group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FaSearch className="text-zinc-500 group-focus-within:text-emerald-500 transition-colors" />
            </div>
            <input 
              type="text" 
              placeholder="Search discussions..." 
              className="w-full pl-11 pr-4 py-3 bg-zinc-950 border border-zinc-800 rounded-2xl focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-white placeholder-zinc-600"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto w-full items-center pb-2 lg:pb-0 px-2 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide whitespace-nowrap transition-all border ${
                  activeCategory === cat
                    ? "bg-emerald-500 text-black border-emerald-500"
                    : "bg-zinc-800 text-zinc-400 border-transparent hover:bg-zinc-700 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* POSTS GRID */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <div key={post._id} className="h-full">
                <Post post={post} />
              </div>
            ))}
          </div>
        ) : (
          // Empty State
          <div className="text-center py-24 border border-dashed border-zinc-800 rounded-3xl bg-zinc-900/30">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-zinc-800 rounded-full mb-4">
              <FaSearch className="text-zinc-500 text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No discussions found</h3>
            <p className="text-zinc-500">Try adjusting your search or category filter.</p>
          </div>
        )}

      </div>
    </section>
  );
};

export default Forums;