import React from "react";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import EditForm from "./EditForm";

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
      <div className="max-w-5xl mx-auto">
        <EditForm user={user} />
      </div>
    </div>
  );
}