"use client";

import Link from "next/link";
import { FaNewspaper, FaArrowRight } from "react-icons/fa";
// IMPORTANT: Adjust this path to where your Post component is saved
import Post from "./Post";

// STATIC DATA: 6 "Recent" posts
const recentPosts = [
  {
    _id: "101",
    title: "10 Minute Mobility Routine for Stiff Hips",
    author_name: "Coach Sarah",
    author_location: "Austin, TX",
    author_img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000&auto=format&fit=crop",
    short_description: "Sitting at a desk all day? These 3 movements will unlock your hips and improve your squat depth immediately.",
    publish_time: "Just now",
    role: "Trainer",
    upvotes: 45,
    downvotes: 0,
  },
  {
    _id: "102",
    title: "The Science of Sleep & Hypertrophy",
    author_name: "Dr. Kenji",
    author_location: "Tokyo, JP",
    author_img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop",
    short_description: "You grow when you rest. Here is exactly how many hours of deep sleep you need to maximize muscle growth.",
    publish_time: "2 hours ago",
    role: "Expert",
    upvotes: 120,
    downvotes: 2,
  },
  {
    _id: "103",
    title: "Review: The New Metcon 9 Shoes",
    author_name: "Gear Junkie",
    author_location: "London, UK",
    author_img: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=1000&auto=format&fit=crop",
    short_description: "Are they worth the upgrade from the 8s? I tested them on rope climbs, box jumps, and heavy squats.",
    publish_time: "5 hours ago",
    role: "Member",
    upvotes: 89,
    downvotes: 5,
  },
  {
    _id: "104",
    title: "High Protein Vegan Breakfasts",
    author_name: "Plant Power",
    author_location: "Portland, OR",
    author_img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop",
    short_description: "Tired of oatmeal? Here are 3 savory vegan breakfast recipes with over 30g of protein each.",
    publish_time: "8 hours ago",
    role: "Nutritionist",
    upvotes: 210,
    downvotes: 12,
  },
  {
    _id: "105",
    title: "How I Added 50lbs to My Deadlift",
    author_name: "Big Lifter",
    author_location: "Toronto, CA",
    author_img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop",
    short_description: "I was stuck at a plateau for months. Switching to sumo and fixing my bracing changed everything.",
    publish_time: "12 hours ago",
    role: "Member",
    upvotes: 305,
    downvotes: 4,
  },
  {
    _id: "106",
    title: "Stop Doing Crunches.",
    author_name: "Physio Mike",
    author_location: "Sydney, AU",
    author_img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1000&auto=format&fit=crop",
    short_description: "If you want a strong core, stop flexing your spine. Do these anti-rotation movements instead.",
    publish_time: "1 day ago",
    role: "Expert",
    upvotes: 156,
    downvotes: 1,
  },
];

const RecentPosts = () => {
  return (
    // MAIN SECTION: Zinc-950 for seamless dark theme
    <section className="py-24 bg-zinc-950 relative overflow-hidden">
      
      {/* Background Decor (Subtle Glow) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-500 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-emerald-500/20 mb-6">
            <FaNewspaper />
            <span>Fresh Content</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Latest from the <span className="text-emerald-500">Community</span>
          </h2>
          <p className="text-lg text-zinc-400 leading-relaxed">
            Stay updated with the latest fitness tips, workout routines, and wellness insights from our expert community.
          </p>
        </div>

        {/* --- ADDED THIS SECTION: The Posts Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {recentPosts.map((post) => (
            <div key={post._id} className="h-full">
              {/* Passing the data to the Post component */}
              <Post post={post} />
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link href="/posts">
            <button className="group relative inline-flex items-center gap-3 bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/20 overflow-hidden">
              <span className="relative z-10">View All Posts</span>
              <FaArrowRight className="relative z-10 text-sm group-hover:translate-x-1 transition-transform duration-300" />
              
              {/* Button Shine Effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RecentPosts;