"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { Plan } from "@prisma/client";


export async function bookMembership(membershipId: number, startDate: Date) {
    try {
        const { userId: clerkUserId } = await auth();

        if (!clerkUserId) {
            return { success: false, error: "Unauthorized. Please log in first." };
        }

        // Look up the internal User record using the Clerk user ID
        const dbUser = await db.user.findUnique({
            where: { clerkUserId },
        });

        if (!dbUser) {
            return { success: false, error: "User not found. Please complete your profile." };
        }

        // Fetch the membership plan to map its name to the Plan enum
        const membership = await db.memberships.findUnique({
            where: { id: membershipId },
        });

        if (!membership) {
            return { success: false, error: "Membership plan not found." };
        }

        // Map the membership name to the Plan enum (BASIC, STANDARD, PREMIUM)
        const planName = membership.name.toUpperCase() as keyof typeof Plan;
        const planEnum: Plan = Plan[planName] || Plan.BASIC;

        // Calculate endDate (exactly 1 month from the selected start date)
        const endDate = new Date(startDate);
        endDate.setMonth(endDate.getMonth() + 1);

        // Upsert subscription — create or update if the user already has one
        await db.subscription.upsert({
            where: { userId: dbUser.id },
            update: {
                plan: planEnum,
                startDate: startDate,
                endDate: endDate,
                isActive: true,
            },
            create: {
                userId: dbUser.id,
                plan: planEnum,
                startDate: startDate,
                endDate: endDate,
                isActive: true,
            },
        });

        revalidatePath("/profile");
        return { success: true, message: "Subscription confirmed!" };
    } catch (error) {
        console.error("Booking error:", error);
        return { success: false, error: "Failed to confirm subscription." };
    }
}