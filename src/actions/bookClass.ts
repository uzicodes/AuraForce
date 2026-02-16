"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function bookClass(classId: number, startDate: Date) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return { success: false, error: "Unauthorized. Please log in." };
        }

        if (!classId || !startDate) {
            return { success: false, error: "Missing class or start date." };
        }

        // Create the booking
        await db.classBookings.create({
            data: {
                clerkUserId: userId,
                classId: classId,
                bookingDate: startDate,
                status: "CONFIRMED",
            },
        });

        revalidatePath("/profile"); // Revalidate profile page where bookings might be shown
        revalidatePath(`/book-class/${classId}`);

        return { success: true, message: "Class booked successfully!" };
    } catch (error) {
        console.error("Error booking class:", error);
        return { success: false, error: "Failed to book class. Please try again." };
    }
}
