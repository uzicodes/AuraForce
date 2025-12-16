import { db } from "@/lib/db";
import ForumsClient from "./ForumsClient";

export const dynamic = "force-dynamic";

export default async function ForumsPage() {
  // Fetch posts from DB
  const posts = await db.post.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      author: true,
    },
  });

  // Map DB posts to the format expected by the UI
  const dbPosts = posts.map((post) => ({
    _id: post.id,
    title: post.title,
    author_name: post.author.name || "Unknown User",
    author_location: post.author.location || "Unknown Location",
    author_img: post.author.image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=1000",
    short_description: post.content,
    publish_time: new Date(post.createdAt).toLocaleDateString(), // Simple formatting
    role: post.author.role === "ADMIN" ? "Admin" : post.author.role === "TRAINER" ? "Trainer" : "Member",
    category: post.category,
    upvotes: post.upvotes,
  }));

  return <ForumsClient dbPosts={dbPosts} />;
}
