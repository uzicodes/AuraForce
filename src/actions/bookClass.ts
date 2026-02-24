"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function bookClass(classId: number, startDate: Date) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return { success: false, error: "Unauthorized. Please log in." };
        }

        if (!classId || !startDate) {
            return { success: false, error: "Missing class or start date." };
        }

        // Verify the class exists
        const classInfo = await db.classes.findUnique({
            where: { id: BigInt(classId) },
            select: { classname: true },
        });

        if (!classInfo) {
            return { success: false, error: "Class not found." };
        }

        // Validation passed — the actual booking record will be created
        // after successful payment in /api/payment/success
        return { success: true, message: "Validation passed. Redirecting to payment..." };
    } catch (error) {
        console.error("Error validating class booking:", error);
        return { success: false, error: "Failed to book class. Please try again." };
    }
}
