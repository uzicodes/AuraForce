"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

  // Use only DB posts
  const allPosts = dbPosts;


  // Filter Logic
  const filteredPosts = allPosts.reduce((acc: typeof allPosts, post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    if (matchesSearch && matchesCategory) acc.push(post);
    return acc;
  }, []);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    try {
      await createPost(formData);
      setIsModalOpen(false);
      // Reset form? The modal closes so it's fine.
    } catch (error: any) {
      console.error(error);
      const msg = error?.message || '';
      if (msg.toLowerCase().includes('too many requests') || msg.toLowerCase().includes('rate limit')) {
        toast.error("You are doing that too fast! Please wait a few seconds and try again.", {
          style: { background: '#18181b', color: '#fff', border: '1px solid #27272a' }
        });
      } else {
        toast.error("Failed to create post. Please try again.");
      }
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
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4 font-heading">
              Join the <span className="text-emerald-500">Conversation.</span>
            </h1>
            <p className="text-zinc-400 text-lg leading-relaxed font-satoshi">
              Ask questions, share your progress, and learn from over 10,000+ active members and certified trainers.
            </p>
          </div>

          <button type="button"
            onClick={() => {
              if (!isLoggedIn) {
                toast.error("Please login to Post");
                router.push('/login?redirect_url=/posts');
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
              aria-label="Search discussions"
              className="w-full pl-11 pr-4 py-3 bg-zinc-950 border border-zinc-800 rounded-2xl focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-white placeholder-zinc-600"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto w-full items-center pb-2 lg:pb-0 px-2 scrollbar-hide">
            {categories.map((cat) => (
              <button type="button"
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide whitespace-nowrap transition-all border ${activeCategory === cat
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
            <h3 className="text-xl font-bold text-white mb-2 font-heading">No discussions found</h3>
            <p className="text-zinc-500 font-satoshi">Try adjusting your search or category filter.</p>
          </div>
        )}

      </div>

      {/* CREATE POST MODAL */}
      {isModalOpen && typeof document !== "undefined" && createPortal(
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-md overflow-y-auto">
          <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-700/50 rounded-3xl w-full max-w-xl p-6 sm:p-8 relative shadow-2xl my-auto sm:my-8 animate-in fade-in zoom-in duration-300">

            {/* Decorative Gradient */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-500/0 via-emerald-500 to-emerald-500/0 opacity-50 rounded-t-3xl" />

            {/* Close Button */}
            <button type="button"
              aria-label="Close modal"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 bg-black/20 rounded-full text-zinc-400 hover:text-white hover:bg-black/40 transition-all backdrop-blur-sm"
            >
              <FaTimes className="text-lg" />
            </button>

            <div className="mb-6 pr-10">
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400 mb-1.5 font-heading">
                  Create New Post
                </h2>
                <p className="text-zinc-400 font-satoshi text-xs">
                  Share your knowledge, ask a question, or start a discussion.
                </p>
            </div>

            <form className="space-y-4" action={handleSubmit}>

              {/* Title */}
              <div className="space-y-1.5 group">
                <label htmlFor="postTitle" className="text-[10px] font-bold text-emerald-500/80 uppercase tracking-widest flex items-center gap-2">
                    Title
                </label>
                <input
                  id="postTitle"
                  type="text"
                  name="title"
                  placeholder="What's on your mind?"
                  className="w-full bg-black/40 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all placeholder-zinc-600 font-satoshi text-sm shadow-inner"
                  required
                />
              </div>

              {/* Category */}
              <div className="space-y-1.5 group">
                <label htmlFor="postCategory" className="text-[10px] font-bold text-emerald-500/80 uppercase tracking-widest flex items-center gap-2">
                    Category
                </label>
                <div className="relative">
                    <select id="postCategory" name="category" className="w-full bg-black/40 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all appearance-none font-satoshi text-sm shadow-inner cursor-pointer">
                      {categories.reduce((acc: React.ReactNode[], cat) => {
                        if (cat !== "All") acc.push(<option key={cat} value={cat} className="bg-zinc-900">{cat}</option>);
                        return acc;
                      }, [])}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-zinc-500">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                    </div>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-1.5 group">
                <label htmlFor="postContent" className="text-[10px] font-bold text-emerald-500/80 uppercase tracking-widest flex items-center gap-2">
                    Content
                </label>
                <textarea
                  id="postContent"
                  name="content"
                  rows={4}
                  placeholder="Share your thoughts, questions, or progress..."
                  className="w-full bg-black/40 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all placeholder-zinc-600 resize-y min-h-[100px] font-satoshi text-sm shadow-inner"
                  required
                />
              </div>

              {/* Actions */}
              <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4 mt-2 border-t border-zinc-800/50">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-full sm:w-1/3 bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-300 font-bold py-3 text-sm rounded-xl transition-all border border-zinc-700/50 hover:border-zinc-600 backdrop-blur-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-2/3 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold py-3 text-sm rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                      <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Publishing...</span>
                      </>
                  ) : (
                      "Publish Post"
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>, document.body
      )}

    </section>
  );
}
