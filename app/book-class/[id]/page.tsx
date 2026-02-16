import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import ClassBookingForm from "@/Components/Pages/BookClass/ClassBookingForm";

// Force dynamic rendering
export const dynamic = "force-dynamic";

export default async function BookClassPage({ params }: { params: { id: string } }) {
    const { id } = await params;

    if (!id) {
        return notFound();
    }


    // use BigInt(id) if it's a valid integer string.
    let classData;
    try {
        // Check ID valid number string
        if (!/^\d+$/.test(id)) {
            return notFound();
        }
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

    const serializedClassData = {
        id: Number(classData.id),
        classname: classData.classname,
        trainer: classData.trainer,
        duration: classData.duration,
    };

    return (
        <div className="min-h-screen bg-black flex items-start justify-center p-4 pt-20 sm:pt-30">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-800 via-black to-black opacity-40 pointer-events-none"></div>

            <div className="relative z-10 w-full max-w-md">
                <ClassBookingForm classData={serializedClassData} />
            </div>
        </div>
    );
}
