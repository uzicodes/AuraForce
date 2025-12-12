"use client";

import Link from "next/link";
import { BiSolidDownvote, BiSolidUpvote } from "react-icons/bi";
import { useState } from "react";
import toast from "react-hot-toast";
import { Clock, MapPin, MessageSquare, TrendingUp } from "lucide-react";
import Image from "next/image";

/* eslint-disable react/prop-types */
const Post = ({ post }: { post: any }) => {
  const [upvotes, setUpvotes] = useState(post.upvotes);
  const [voteType, setVoteType] = useState<"upvote" | "downvote" | null>(null);

  const handleVote = (type: "upvote" | "downvote") => {
    if (voteType === type) {
      // Remove vote
      if (type === "upvote") setUpvotes((prev: number) => prev - 1);
      setVoteType(null);
      toast.success(`Removed ${type}`);
    } else {
      // Add/Change vote
      if (type === "upvote") setUpvotes((prev: number) => prev + 1);
      setVoteType(type);
      toast.success(`Voted ${type}`);
    }
  };

  return (
    <div className="group relative w-full h-full bg-zinc-900 rounded-3xl shadow-lg border border-zinc-800 hover:border-emerald-500/50 transition-all duration-300 flex flex-col overflow-hidden">
      
      {/* Author Header */}
      <div className="p-6 pb-4 flex items-start gap-4">
        <div className="relative flex-shrink-0 w-12 h-12">
          <Image
            src={post.author_img}
            alt={post.author_name}
            fill
            className="rounded-full object-cover border-2 border-zinc-700 group-hover:border-emerald-500 transition-colors"
          />
          <div className="absolute -bottom-1 -right-1 bg-emerald-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider">
            {post.role}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-white text-base truncate">
            {post.author_name}
          </h4>
          <div className="flex items-center gap-3 text-xs text-zinc-500 mt-1">
            <span className="flex items-center gap-1">
              <MapPin size={10} className="text-emerald-500" /> {post.author_location}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={10} className="text-emerald-500" /> {post.publish_time}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pb-6 flex-1 flex flex-col space-y-3">
        {/* Category Pill */}
        <div className="flex">
          <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-md border border-emerald-400/20">
            {post.category}
          </span>
        </div>

        <h2 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-2 leading-tight">
          {post.title}
        </h2>

        <p className="text-zinc-400 text-sm leading-relaxed line-clamp-3">
          {post.short_description}
        </p>
      </div>

      {/* Footer / Actions */}
      <div className="px-6 py-4 bg-zinc-950/50 border-t border-zinc-800 flex items-center justify-between mt-auto">
        
        {/* Vote Buttons */}
        <div className="flex items-center bg-zinc-900 rounded-lg border border-zinc-800 p-1">
          <button
            onClick={() => handleVote("upvote")}
            className={`p-1.5 rounded-md transition-colors ${
              voteType === "upvote" ? "text-emerald-400 bg-emerald-400/10" : "text-zinc-500 hover:text-white"
            }`}
          >
            <BiSolidUpvote size={18} />
          </button>
          <span className={`px-2 text-sm font-bold ${voteType === "upvote" ? "text-emerald-400" : "text-zinc-400"}`}>
            {upvotes}
          </span>
          <button
            onClick={() => handleVote("downvote")}
            className={`p-1.5 rounded-md transition-colors ${
              voteType === "downvote" ? "text-red-400 bg-red-400/10" : "text-zinc-500 hover:text-white"
            }`}
          >
            <BiSolidDownvote size={18} />
          </button>
        </div>

        {/* Comment / View Link */}
        <Link href={`/posts/${post._id}`} className="flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors">
          <MessageSquare size={16} />
          <span>Discussion</span>
        </Link>
      </div>
    </div>
  );
};

export default Post;