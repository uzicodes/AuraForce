'use server'

import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function getNavProfileImage() {
  try {
    const user = await currentUser();
    if (!user) return null;

    const dbUser = await db.user.findUnique({
      where: { clerkUserId: user.id },
      select: { image: true },
    });

    return dbUser?.image || null;
  } catch (error) {
    console.error("Error fetching nav image:", error);
    return null;
  }
}