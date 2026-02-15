import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import Image from "next/image";
import TrainerBookingForm from "@/Components/Pages/BookTrainer/TrainerBookingForm";

// Fetch trainer details based on the ID in the URL
export default async function BookTrainerPage({ params }: { params: Promise<{ id: string }> }) {
    // Await params in Next.js 15+ 
    const { id } = await params;
    const trainerId = parseInt(id);

    if (isNaN(trainerId)) {
        notFound();
    }

    const trainer = await db.trainers.findUnique({
        where: { id: trainerId }
    });

    if (!trainer) {
        notFound();
    }

    // Determine image URL
    const imageUrl = `/images/trainers/${Number(trainer.id)}.jpg`;

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-96 bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* LEFT SIDE: Trainer Info */}
                    <div>
                        <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-emerald-500/20 mb-6">
                            <span>Booking Setup</span>
                        </div>

                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 font-heading leading-tight">
                            Train with <br /><span className="text-emerald-500">{trainer.name}</span>
                        </h1>

                        <p className="text-zinc-400 text-lg mb-8 font-mono uppercase tracking-wide">
                            {trainer.role}
                        </p>

                        <div className="relative h-[400px] w-full max-w-md rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl hidden lg:block">
                            <Image
                                src={imageUrl}
                                alt={trainer.name || "Trainer"}
                                fill
                                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />
                        </div>
                    </div>

                    {/* RIGHT SIDE: Booking Form */}
                    <div>
                        <TrainerBookingForm
                            trainerId={Number(trainer.id)}
                            trainerName={trainer.name || "Trainer"}
                        />
                    </div>

                </div>
            </div>
        </div>
    );
}