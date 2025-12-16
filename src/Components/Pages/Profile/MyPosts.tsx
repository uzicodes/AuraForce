"use client";

import React from "react";
import Post from "@/Components/Pages/Forums/Posts";
import { FaLayerGroup } from "react-icons/fa";

interface MyPostsProps {
  posts: any[];
}

const MyPosts: React.FC<MyPostsProps> = ({ posts }) => {
  if (posts.length === 0) {
    return (
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-zinc-800 rounded-full mb-4">
          <FaLayerGroup className="text-zinc-500 text-2xl" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">No Posts Yet</h3>
        <p className="text-zinc-500">
          You haven't published any posts in the forums yet.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {posts.map((post) => (
        <div key={post._id} className="h-full">
          <Post post={post} isOwner={true} />
        </div>
      ))}
    </div>
  );
};

export default MyPosts;
