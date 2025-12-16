'use server'

import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function createPost(formData: FormData) {
  const user = await currentUser();

  if (!user) {
    throw new Error("You must be logged in to create a post.");
  }

  const dbUser = await db.user.findUnique({
    where: { clerkUserId: user.id },
  });

  if (!dbUser) {
    throw new Error("User not found in database.");
  }

  const title = formData.get("title") as string;
  const category = formData.get("category") as string;
  const content = formData.get("content") as string;

  if (!title || !content || !category) {
    throw new Error("Missing required fields");
  }

  await db.post.create({
    data: {
      title,
      content,
      category,
      authorId: dbUser.id,
    },
  });

  revalidatePath("/posts");
}
