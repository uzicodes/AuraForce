
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import MembershipBookingForm from "@/Components/Pages/BookMembership/MembershipBookingForm";

export const dynamic = "force-dynamic";

export default async function BookMembershipPage({ params }: { params: { id: string } }) {
    const { id } = await params;

    if (!id || !/^\d+$/.test(id)) return notFound();

    const membershipId = parseInt(id);


    const plan = await db.memberships.findUnique({
        where: { id: membershipId },
    });

    if (!plan) return notFound();

    const serializedPlan = {
        id: plan.id,
        name: plan.name,
        price: plan.price,
        features: plan.features
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black opacity-60 pointer-events-none"></div>

            <div className="relative z-10 w-full flex justify-center pt-20">
                <MembershipBookingForm plan={serializedPlan} />
            </div>
        </div>
    );
}
