import { db } from "@/lib/db";
import ForumsClient from "./ForumsClient";
import { currentUser } from "@clerk/nextjs/server";

export const dynamic = "force-dynamic";

export default async function ForumsPage() {
  const user = await currentUser();
  let userId = "";
  
  if (user) {
    const dbUser = await db.user.findUnique({
      where: { clerkUserId: user.id },
    });
    if (dbUser) userId = dbUser.id;
  }

  // Fetch posts from DB
  const posts = await db.post.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      author: true,
      // @ts-ignore
      votes: {
        where: { userId: userId || "no-user" }
      },
    },
  });

  // Map DB posts to the format expected by the UI
  const dbPosts = posts.map((post: any) => {
    // Determine user's vote status
    let userVote = null;
    if (post.votes && post.votes.length > 0) {
      userVote = post.votes[0].type; // "UP" or "DOWN"
    }

    return {
      _id: post.id,
      title: post.title,
      author_name: post.author.name || "Unknown User",
      author_location: post.author.location || "Unknown Location",
      author_img: post.author.image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=1000",
      short_description: post.content,
      publish_time: new Date(post.createdAt).toLocaleDateString(),
      role: post.author.role === "ADMIN" ? "Admin" : post.author.role === "TRAINER" ? "Trainer" : "Member",
      category: post.category,
      upvotes: post.upvotes,
      userVote: userVote, // Pass the vote status
    };
  });

  return <ForumsClient dbPosts={dbPosts} />;
}

