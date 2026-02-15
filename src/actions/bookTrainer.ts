"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function bookTrainerAction(trainerId: number, date: string, timeSlot: string) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return { error: "You must be logged in to book a trainer." };
        }

        // Insert the booking into the database
        await db.trainerBookings.create({
            data: {
                clerkUserId: userId,
                trainerId: trainerId,
                bookingDate: new Date(date), // Convert string from form back to Date
                timeSlot: timeSlot,
                status: "CONFIRMED"
            }
        });

        // Refresh the profile page so the new booking shows up later
        revalidatePath("/profile");

        return { success: true };
    } catch (error) {
        console.error("Booking error:", error);
        return { error: "Failed to book trainer. Please try again." };
    }
}