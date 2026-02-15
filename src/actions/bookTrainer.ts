"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function bookTrainerAction(trainerId: number, startDateStr: string, timeSlot: string, packageType: "WEEKLY" | "MONTHLY") {
    try {
        const { userId } = await auth();

        if (!userId) {
            return { error: "You must be logged in to book a trainer." };
        }

        const startDate = new Date(startDateStr);
        const daysToBook = packageType === "WEEKLY" ? 7 : 30;
        const bookingData = [];

        // Generate booking records for each day in the package
        for (let i = 0; i < daysToBook; i++) {
            const currentDate = new Date(startDate);
            currentDate.setDate(startDate.getDate() + i);

            bookingData.push({
                clerkUserId: userId,
                trainerId: trainerId,
                bookingDate: currentDate,
                timeSlot: timeSlot,
                status: "CONFIRMED"
            });
        }

        // Batch insert bookings
        await db.trainerBookings.createMany({
            data: bookingData
        });

        // Refresh the profile page so the new booking shows up later
        revalidatePath("/profile");

        return { success: true };
    } catch (error) {
        console.error("Booking error:", error);
        return { error: "Failed to book trainer. Please try again." };
    }
}