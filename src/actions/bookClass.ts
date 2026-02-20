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

        // Fetch the user's real name from DB
        const user = await db.user.findUnique({
            where: { clerkUserId: userId },
            select: { name: true },
        });

        // Fetch the class name from DB
        const classInfo = await db.classes.findUnique({
            where: { id: BigInt(classId) },
            select: { classname: true },
        });

        // Calculate validTill (1 month from start, last day of the month)
        const validTill = new Date(startDate);
        validTill.setMonth(validTill.getMonth() + 1);
        validTill.setDate(validTill.getDate() - 1);

        // Create the booking
        await db.classBookings.create({
            data: {
                clerkUserId: userId,
                classId: classId,
                name: user?.name || null,
                className: classInfo?.classname || null,
                bookingDate: startDate,
                validTill: validTill,
                status: "CONFIRMED",
            },
        });

        revalidatePath("/profile");
        revalidatePath(`/book-class/${classId}`);

        return { success: true, message: "Class booked successfully!" };
    } catch (error) {
        console.error("Error booking class:", error);
        return { success: false, error: "Failed to book class. Please try again." };
    }
}
