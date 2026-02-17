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

  switch (type) {
    case "membership": {
      const membership = await db.memberships.findUnique({
        where: { id: numericId },
      });
      if (!membership) redirect("/");
      itemName = membership.name;
      amount = membership.price;
      break;
    }

    case "class": {
      const classItem = await db.classes.findUnique({
        where: { id: BigInt(numericId) },
      });
      if (!classItem) redirect("/");
      itemName = classItem.classname || "Class";
      amount = classItem.class_fees || 0;
      break;
    }

    case "trainer": {
      const trainer = await db.trainers.findUnique({
        where: { id: BigInt(numericId) },
      });
      if (!trainer) redirect("/");
      itemName = trainer.name || "Trainer";
      amount = trainer.fee_per_month || 0;
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
    />
  );
}