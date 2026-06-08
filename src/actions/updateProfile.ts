'use server'

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateProfile(formData: FormData) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized. Please log in.");
  }

  const clerkId = formData.get("clerkId") as string;

  // Ensure the authenticated user can only update their own profile
  if (userId !== clerkId) {
    throw new Error("Unauthorized. You can only update your own profile.");
  }

  // Update the user in the database
  await db.user.update({
    where: { clerkUserId: clerkId },
    data: {
      name: formData.get("name") as string,
      location: formData.get("location") as string,
      phone: formData.get("phone") as string,
      dob: formData.get("dob") ? new Date(formData.get("dob") as string) : null,
      gender: formData.get("gender") as string,
      weight: formData.get("weight") as string,
      heightFeet: formData.get("heightFeet") as string,
      heightInches: formData.get("heightInches") as string,
    },
  });

  // Refresh the profile page to show new data
  revalidatePath("/profile");
  
  // Redirect back to profile view
  redirect("/profile");
}

export async function updateProfileImage(clerkId: string, imageUrl: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized. Please log in.");
  }

  // Ensure the authenticated user can only update their own image
  if (userId !== clerkId) {
    throw new Error("Unauthorized. You can only update your own profile image.");
  }

  await db.user.update({
    where: { clerkUserId: clerkId },
    data: {
      image: imageUrl, // Update the image field
    },
  });

  revalidatePath("/profile");
}

