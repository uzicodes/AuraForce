"use client";

import React, { useState } from "react";
import { FaSearch, FaFilter, FaPlus, FaFire, FaBullhorn, FaDumbbell } from "react-icons/fa";

// --- STATIC DATA (12+ Posts for a "Big" Page feel) ---
const allPosts = [
  {
    _id: "1",
    title: "Why Progressive Overload is King 👑",
    author_name: "Coach Marcus",
    author_location: "New York, USA",
    author_img: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=1000&auto=format&fit=crop",
    short_description: "If you aren't adding weight, reps, or intensity, you aren't growing. Here is a breakdown of how to track your lifts effectively.",
    publish_time: "2 hours ago",
    role: "Admin",
    category: "Training",
    upvotes: 142,
    downvotes: 3,
  },
  {
    _id: "2",
    title: "Meal Prep Hacks for Busy People 🥗",
    author_name: "Sarah Jenkins",
    author_location: "London, UK",
    author_img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000&auto=format&fit=crop",
    short_description: "Spending 5 hours on Sunday cooking? Stop. Here is my 1-hour method to prep lunch for the whole week.",
    publish_time: "5 hours ago",
    role: "Trainer",
    category: "Nutrition",
    upvotes: 89,
    downvotes: 1,
  },
  {
    _id: "3",
    title: "Is Creatine Actually Safe?",
    author_name: "Dr. Kenji Sato",
    author_location: "Tokyo, Japan",
    author_img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop",
    short_description: "Clearing up the myths about kidney damage and hair loss. Scientific breakdown of the most researched supplement.",
    publish_time: "1 day ago",
    role: "Expert",
    category: "Nutrition",
    upvotes: 256,
    downvotes: 12,
  },
  {
    _id: "4",
    title: "My Transformation: 300lbs to 180lbs",
    author_name: "James Doe",
    author_location: "Toronto, Canada",
    author_img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop",
    short_description: "It wasn't easy, but here is exactly what I ate and how I trained to lose over 100lbs in a year.",
    publish_time: "2 days ago",
    role: "Member",
    category: "Success Stories",
    upvotes: 567,
    downvotes: 2,
  },
  {
    _id: "5",
    title: "Best Gym Shoes for Squatting?",
    author_name: "Emily R.",
    author_location: "Berlin, Germany",
    author_img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1000&auto=format&fit=crop",
    short_description: "Converse vs. Romaleos vs. Barefoot. I tested them all so you don't have to.",
    publish_time: "3 days ago",
    role: "Member",
    category: "Gear",
    upvotes: 45,
    downvotes: 5,
  },
  {
    _id: "6",
    title: "How to Fix Anterior Pelvic Tilt",
    author_name: "Physio Mike",
    author_location: "Sydney, Aus",
    author_img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1000&auto=format&fit=crop",
    short_description: "Does your lower back hurt after squats? You might have APT. Here are 3 daily stretches to fix it.",
    publish_time: "4 days ago",
    role: "Expert",
    category: "Injury Prevention",
    upvotes: 312,
    downvotes: 0,
  },
  {
    _id: "7",
    title: "The Truth About 'Starvation Mode'",
    author_name: "Nutrition Lisa",
    author_location: "Austin, USA",
    author_img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop",
    short_description: "Why you aren't losing weight on 1200 calories (hint: you're probably tracking wrong).",
    publish_time: "5 days ago",
    role: "Trainer",
    category: "Nutrition",
    upvotes: 98,
    downvotes: 15,
  },
  {
    _id: "8",
    title: "Home Gym Setup Under $500",
    author_name: "Budget Builder",
    author_location: "Mumbai, India",
    author_img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
    short_description: "You don't need a commercial gym membership. Here is my garage setup with links.",
    publish_time: "1 week ago",
    role: "Member",
    category: "Gear",
    upvotes: 220,
    downvotes: 1,
  },
  {
    _id: "9",
    title: "Mindset: Discipline > Motivation",
    author_name: "David G.",
    author_location: "Chicago, USA",
    author_img: "https://images.unsplash.com/photo-1521119989659-a83eee488058?q=80&w=1000&auto=format&fit=crop",
    short_description: "Motivation is a feeling. Discipline is a skill. Learn how to train when you don't want to.",
    publish_time: "1 week ago",
    role: "Member",
    category: "Mindset",
    upvotes: 450,
    downvotes: 0,
  },
  {
    _id: "10",
    title: "5x5 Stronglifts Review",
    author_name: "Newbie Gainz",
    author_location: "Paris, France",
    author_img: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1000&auto=format&fit=crop",
    short_description: "I ran this program for 6 months. Here are my results and why I switched to PPL.",
    publish_time: "2 weeks ago",
    role: "Member",
    category: "Training",
    upvotes: 67,
    downvotes: 2,
  },
  {
    _id: "11",
    title: "Yoga for Powerlifters",
    author_name: "Flexy Ben",
    author_location: "Denver, USA",
    author_img: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=1000&auto=format&fit=crop",
    short_description: "Tight hips? Can't hit depth? Try this 15-minute routine before your next leg day.",
    publish_time: "2 weeks ago",
    role: "Trainer",
    category: "Injury Prevention",
    upvotes: 189,
    downvotes: 4,
  },
  {
    _id: "12",
    title: "Protein Powder: Whey vs. Plant",
    author_name: "Green Vegan",
    author_location: "Portland, USA",
    author_img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=1000&auto=format&fit=crop",
    short_description: "A complete amino acid profile comparison. Is plant protein finally catching up?",
    publish_time: "3 weeks ago",
    role: "Member",
    category: "Nutrition",
    upvotes: 112,
    downvotes: 35,
  },
];

const categories = ["All", "Training", "Nutrition", "Gear", "Success Stories", "Injury Prevention", "Mindset"];

const Forums = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filter Logic
  const filteredPosts = allPosts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.short_description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Pagination Logic
  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300 relative">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Main Container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        
        {/* PAGE HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-500 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-emerald-500/20 mb-4">
              <FaBullhorn /> Community Forum
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight mb-4">
              Join the <span className="text-emerald-500">Conversation</span>
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400 text-lg">
              Ask questions, share your progress, and learn from over 10,000+ active members and certified trainers.
            </p>
          </div>
          
          <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-emerald-500/20 transform hover:-translate-y-1">
            <FaPlus /> Create Post
          </button>
        </div>

        {/* SEARCH & FILTER BAR */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 shadow-sm mb-10 flex flex-col lg:flex-row gap-4 justify-between items-center sticky top-4 z-30 backdrop-blur-md bg-opacity-90 dark:bg-opacity-90">
          
          {/* Search Input */}
          <div className="relative w-full lg:w-96 group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FaSearch className="text-zinc-400 group-focus-within:text-emerald-500 transition-colors" />
            </div>
            <input 
              type="text" 
              placeholder="Search discussions..." 
              className="w-full pl-11 pr-4 py-3 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-zinc-900 dark:text-white"
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to page 1 on search
              }}
            />
          </div>

          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all border ${
                  activeCategory === cat
                    ? "bg-emerald-500 text-white border-emerald-500 shadow-md"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-transparent hover:bg-zinc-200 dark:hover:bg-zinc-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-16 gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Previous
            </button>
            
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`w-10 h-10 rounded-lg font-bold transition-all ${
                  currentPage === index + 1
                    ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                    : "bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Next
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default Forums;