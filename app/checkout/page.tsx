import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import CheckoutClient from "@/Components/Pages/Checkout/CheckoutClient";

export const dynamic = "force-dynamic";

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; id?: string }>;
}) {
  const { type, id } = await searchParams;

  // ── Validate params ──
  if (!id || !type) {
    redirect("/");
  }

  const numericId = Number(id);
  if (isNaN(numericId)) {
    redirect("/");
  }

  // ── Fetch item based on booking type ──
  let itemName: string = "Item";
  let amount: number = 0;
  let details: any = {};

  switch (type) {
    case "membership": {
      const membership = await db.memberships.findUnique({
        where: { id: numericId },
      });
      if (!membership) redirect("/");
      itemName = membership.name;
      amount = membership.price;
      // features is a string[] in the schema
      details = {
        features: membership.features || [],
        period: membership.period,
      };
      break;
    }

    case "class": {
      const classItem = await db.classes.findUnique({
        where: { id: BigInt(numericId) },
      });
      if (!classItem) redirect("/");
      itemName = classItem.classname || "Class";
      amount = classItem.class_fees || 0;

      // Static images for classes (Copied from AllClasses.tsx)
      const staticClassImages: Record<number, string> = {
        1: "/images/classes/1.jpg",
        2: "/images/classes/2.jpg",
        3: "/images/classes/3.jpg",
        4: "/images/classes/4.jpg",
        5: "/images/classes/5.jpg",
        6: "/images/classes/6.jpg",
        7: "/images/classes/7.jpg",
        8: "/images/classes/8.jpg",
        9: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=2070&auto=format&fit=crop",
      };

      details = {
        trainer: classItem.trainer,
        time: classItem.class_time,
        days: classItem.class_days,
        duration: classItem.duration,
        image: staticClassImages[numericId] || "/images/classes/1.jpg", // Fallback
      };
      break;
    }

    case "trainer": {
      const trainer = await db.trainers.findUnique({
        where: { id: BigInt(numericId) },
      });
      if (!trainer) redirect("/");
      itemName = trainer.name || "Trainer";
      amount = trainer.fee_per_month || 0;

      // Static images override (Copied from AllTrainers.tsx)
      const staticImages: Record<number, string> = {
        1: "/images/trainers/1.jpg",
        2: "/images/trainers/2.jpg",
        3: "/images/trainers/3.jpg",
        4: "/images/trainers/4.jpg",
        5: "/images/trainers/5.jpg",
        6: "/images/trainers/6.jpg",
        7: "/images/trainers/7.jpg",
        8: "/images/trainers/8.jpg",
      };

      details = {
        role: trainer.role,
        image: staticImages[numericId] || "/images/trainers/1.jpg", // Fallback
      };
      break;
    }

    default:
      redirect("/");
  }

  return (
    <CheckoutClient
      type={type}
      referenceId={numericId}
      amount={amount}
      itemName={itemName}
      details={details}
    />
  );
}