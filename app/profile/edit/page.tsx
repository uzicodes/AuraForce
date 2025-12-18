import React from "react";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import EditForm from "./EditForm";
// 1. Import the ImageUpload component we created
import ImageUpload from "@/Components/Shared/ImageUpload"; 
import { FaCamera } from "react-icons/fa";

export default async function EditProfilePage() {
  const clerkUser = await currentUser();
  
  if (!clerkUser) {
    redirect("/login");
  }

  const user = await db.user.findUnique({
    where: { clerkUserId: clerkUser.id },
  });

  if (!user) {
    redirect("/profile");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-900 pt-28 pb-16 px-4">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* --- NEW: PROFILE PICTURE UPLOAD SECTION --- */}
        <div className="bg-zinc-900/80 backdrop-blur-md border border-zinc-800 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-6">
            {/* Visual Icon */}
            <div className="w-16 h-16 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-emerald-500 text-2xl">
              <FaCamera />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Profile Photo</h2>
              <p className="text-zinc-400 text-sm">Upload a new avatar. Recommended size: 400x400px.</p>
            </div>
          </div>

          {/* The Upload Component */}
          {/* We pass the clerkUser.id so the uploader knows which user to update */}
          <div className="flex-shrink-0">
             <ImageUpload clerkId={clerkUser.id} />
          </div>
        </div>
        {/* ------------------------------------------- */}

        {/* Existing Edit Form */}
        <EditForm user={user} />
        
      </div>
    </div>
  );
}