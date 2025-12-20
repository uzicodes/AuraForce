'use server'

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function subscribeToNewsletter(formData: FormData) {
  const email = formData.get("email") as string;

  if (!email || !email.includes("@")) {
    return { success: false, error: "Invalid email address" };
  }

  try {
    // Check if already subscribed
    const existing = await db.subscriber.findUnique({
      where: { email },
    });

    if (existing) {
      return { success: false, error: "You are already subscribed!" };
    }

    // Create new subscriber
    await db.subscriber.create({
      data: { email },
    });

    revalidatePath("/"); // Refresh homepage if needed
    return { success: true };
  } catch (error) {
    console.error("Subscription Error:", error);
    return { success: false, error: "Something went wrong. Try again." };
  }
}