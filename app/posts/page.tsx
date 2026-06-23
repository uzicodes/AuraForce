import { db } from "@/lib/db";
import ForumsClient from "./ForumsClient";
import { currentUser } from "@clerk/nextjs/server";

export const dynamic = "force-dynamic";

export default async function ForumsPage() {
  const user = await currentUser();

  // Run user lookup and posts fetch in parallel instead of sequentially
  const [dbUser, posts] = await Promise.all([
    user
      ? db.user.findUnique({
          where: { clerkUserId: user.id },
          select: { id: true },
        })
      : null,
    db.post.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        author: {
          select: {
            name: true,
            location: true,
            image: true,
            role: true,
          },
        },
        votes: user
          ? { where: { user: { clerkUserId: user.id } } }
          : { where: { userId: "no-user" }, take: 0 },
      },
    }),
  ]);

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
      author_name: post.author?.name || "Unknown User",
      author_location: post.author?.location || "Unknown Location",
      // NOTE: post.author.image comes from DB, which is synced from Clerk (Google or Generated Avatar) on login.
      // If user has custom image, it's also in DB. So this covers all cases correctly.
      author_img: post.author?.image || "/dp.png",
      short_description: post.content,
      publish_time: new Date(post.createdAt).toLocaleDateString(),
      role: post.author?.role === "ADMIN" ? "Admin" : post.author?.role === "TRAINER" ? "Trainer" : "Member",
      category: post.category,
      upvotes: post.upvotes,
      userVote: userVote, // Pass the vote status
    };
  });

  return <ForumsClient dbPosts={dbPosts} isLoggedIn={!!user} />;
}



export const metadata = {
  title: 'Posts | AuraForce',
  description: 'Posts | AuraForce',
};
