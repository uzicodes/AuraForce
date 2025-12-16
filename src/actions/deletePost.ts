'use server'

import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function deletePost(postId: string) {
  const user = await currentUser();

  if (!user) {
    throw new Error("You must be logged in to delete a post.");
  }

  const dbUser = await db.user.findUnique({
    where: { clerkUserId: user.id },
  });

  if (!dbUser) {
    throw new Error("User not found.");
  }

  // Verify ownership
  const post = await db.post.findUnique({
    where: { id: postId },
  });

  if (!post) {
    throw new Error("Post not found.");
  }

  if (post.authorId !== dbUser.id) {
    throw new Error("You are not authorized to delete this post.");
  }

  await db.post.delete({
    where: { id: postId },
  });

  revalidatePath("/profile");
  revalidatePath("/posts");
}
