import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export const checkUser = async () => {
  const user = await currentUser();

  // 1. Check if user is logged in
  if (!user) {
    return null;
  }

  // 2. Check if user exists in database
  const loggedInUser = await db.user.findUnique({
    where: {
      clerkUserId: user.id,
    },
  });

  // 3. If found, return them
  if (loggedInUser) {
    return loggedInUser;
  }

  // 4. If NOT found, create new user
  const newUser = await db.user.create({
    data: {
      clerkUserId: user.id,
      name: `${user.firstName} ${user.lastName}`,
      image: user.imageUrl, // Mapping Clerk's 'imageUrl' to your 'image' field
      email: user.emailAddresses[0].emailAddress,
    },
  });

  return newUser;
};