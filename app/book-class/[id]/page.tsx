import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import ClassBookingForm from "@/Components/Pages/BookClass/ClassBookingForm";

// Force dynamic rendering as we depend on params and DB
export const dynamic = "force-dynamic";

export default async function BookClassPage({ params }: { params: { id: string } }) {
    const { id } = await params; // Next.js 15+ compatible approach just in case, though Next 13/14 work with un-awaited params too.

    if (!id) {
        return notFound();
    }

    // Convert id to number for DB query if possible. 
    // Since db.classes.id is BigInt, we use BigInt(id) if it's a valid integer string.
    let classData;
    try {
        // Check if ID is a valid number string
        if (!/^\d+$/.test(id)) {
            return notFound();
        }

        // Using BigInt directly for the where clause since the schema defines id as BigInt
        // To handle serialization safely, we cast it later.
        const bigIntId = BigInt(id);

        classData = await db.classes.findUnique({
            where: {
                id: bigIntId,
            },
        });
    } catch (error) {
        console.error("Error fetching class:", error);
        return notFound();
    }

    if (!classData) {
        return notFound();
    }

    // Safely convert BigInt to Number to prevent serialization errors passed to Client Component
    // We explicitly map the fields we need.
    const serializedClassData = {
        id: Number(classData.id),
        classname: classData.classname,
        trainer: classData.trainer,
        duration: classData.duration,
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            {/* Background effect matching the dark theme request */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-800 via-black to-black opacity-40 pointer-events-none"></div>

            <div className="relative z-10 w-full max-w-md">
                <ClassBookingForm classData={serializedClassData} />
            </div>
        </div>
    );
}
