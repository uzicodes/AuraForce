"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";


export async function bookMembership(membershipId: number, startDate: Date) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return { success: false, error: "Unauthorized. Please log in first." };
        }

        // Calculate endDate (exactly 1 month from the selected start date)
        const endDate = new Date(startDate);
        endDate.setMonth(endDate.getMonth() + 1);

        // Create subscription
        // @ts-ignore
        await db.userSubscriptions.create({
            data: {
                clerkUserId: userId,
                membershipId: membershipId,
                startDate: startDate,
                endDate: endDate,
                status: "ACTIVE",
            },
        });

        revalidatePath("/profile");
        return { success: true, message: "Subscription confirmed!" };
    } catch (error) {
        console.error("Booking error:", error);
        return { success: false, error: "Failed to confirm subscription." };
    }
}