"use client";

import React, { useState, useEffect } from "react";
import Post from "@/Components/Pages/Forums/Posts"; 
import { FaSearch, FaPlus, FaComments, FaTimes } from "react-icons/fa";
import { createPost } from "@/actions/createPost";
import toast from "react-hot-toast";

// --- STATIC DATA REMOVED ---
const categories = ["All", "Training", "Nutrition", "Gear", "Success Stories", "Injury Prevention"];

export default function ForumsClient({ dbPosts, isLoggedIn }: { dbPosts: any[], isLoggedIn: boolean }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Use only DB posts
  const allPosts = dbPosts;


  // Filter Logic
  const filteredPosts = allPosts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    try {
      await createPost(formData);
      setIsModalOpen(false);
      // Reset form? The modal closes so it's fine.
    } catch (error) {
      console.error(error);
      alert("Failed to create post. Please try again.");
    } finally {
      setLoading(false);
    }
  }

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
          
          <button 
            onClick={() => {
              if (!isLoggedIn) {
                toast.error("Please login to Post");
                return;
              }
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-full font-bold transition-all shadow-lg shadow-emerald-900/20 hover:scale-105"
          >
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

      {/* CREATE POST MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl w-full max-w-2xl p-8 relative shadow-2xl animate-in fade-in zoom-in duration-200">
            
            {/* Close Button */}
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors"
            >
              <FaTimes className="text-xl" />
            </button>

            <h2 className="text-2xl font-bold text-white mb-6">Create New Post</h2>
            
            <form className="space-y-6" action={handleSubmit}>
              
              {/* Title */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Title</label>
                <input 
                  type="text" 
                  name="title"
                  placeholder="What's on your mind?" 
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all placeholder-zinc-600"
                  required
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Category</label>
                <select name="category" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all appearance-none">
                  {categories.filter(c => c !== "All").map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Content */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Content</label>
                <textarea 
                  name="content"
                  rows={6}
                  placeholder="Share your thoughts, questions, or progress..." 
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all placeholder-zinc-600 resize-none"
                  required
                />
              </div>

              {/* Actions */}
              <div className="flex gap-4 pt-2">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold py-3.5 rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-emerald-900/20 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? "Publishing..." : "Publish Post"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </section>
  );
}
