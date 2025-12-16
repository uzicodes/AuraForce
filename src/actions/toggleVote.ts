'use server'

import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function toggleVote(postId: string, type: "UP" | "DOWN") {
  const user = await currentUser();

  if (!user) {
    throw new Error("You must be logged in to vote.");
  }

  const dbUser = await db.user.findUnique({
    where: { clerkUserId: user.id },
  });

  if (!dbUser) {
    throw new Error("User not found.");
  }

  // Check for existing vote
  // @ts-ignore
  const existingVote = await db.vote.findUnique({
    where: {
      userId_postId: {
        userId: dbUser.id,
        postId,
      },
    },
  });

  if (existingVote) {
    if (existingVote.type === type) {
      // Same vote type -> Remove vote (Toggle off)
      // @ts-ignore
      await db.vote.delete({
        where: { id: existingVote.id },
      });
      
      // Update Post count
      await db.post.update({
        where: { id: postId },
        data: {
          upvotes: {
            increment: type === "UP" ? -1 : 1, // UPVOTE & DOWNVOTE adjustment
          },
        },
      });
    } else {
      // Different vote type -> Switch vote
      // @ts-ignore
      await db.vote.update({
        where: { id: existingVote.id },
        data: { type },
      });

      // Update Post count
      // If switching UP to DOWN: -1 (remove up) -1 (add down) = -2
      // If switching DOWN to UP: +1 (remove down) +1 (add up) = +2
      await db.post.update({
        where: { id: postId },
        data: {
          upvotes: {
            increment: type === "UP" ? 2 : -2,
          },
        },
      });
    }
  } else {
    // No existing vote -> Create new vote
    // @ts-ignore
    await db.vote.create({
      data: {
        type,
        userId: dbUser.id,
        postId,
      },
    });

    // Update Post count
    await db.post.update({
      where: { id: postId },
      data: {
        upvotes: {
          increment: type === "UP" ? 1 : -1,
        },
      },
    });
  }

  revalidatePath("/posts");
  revalidatePath("/profile");
}
