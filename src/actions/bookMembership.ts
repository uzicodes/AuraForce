"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function bookMembership(membershipId: number, startDate: Date) {
    try {
        const { userId: clerkUserId } = await auth();

        if (!clerkUserId) {
            return { success: false, error: "Unauthorized. Please log in first." };
        }

        // Look up the internal User record using the Clerk user ID
        const dbUser = await db.user.findUnique({
            where: { clerkUserId },
            select: { MemberID: true, name: true },
        });

        if (!dbUser) {
            return { success: false, error: "User not found. Please complete your profile." };
        }

        // Fetch the membership plan
        const membership = await db.memberships.findUnique({
            where: { id: membershipId },
        });

        if (!membership) {
            return { success: false, error: "Membership plan not found." };
        }

        // Calculate endDate (exactly 1 month from the selected start date)
        const endDate = new Date(startDate);
        endDate.setMonth(endDate.getMonth() + 1);

        // Create membership booking
        await db.membershipBookings.create({
            data: {
                clerkUserId,
                MemberID: dbUser.MemberID || null,
                name: dbUser.name || null,
                plan: membership.name,
                price: membership.price,
                startDate: startDate,
                endDate: endDate,
                status: "ACTIVE",
            },
        });

        revalidatePath("/profile");
        return { success: true, message: "Membership booking confirmed!" };
    } catch (error) {
        console.error("Booking error:", error);
        return { success: false, error: "Failed to confirm membership booking." };
    }
}