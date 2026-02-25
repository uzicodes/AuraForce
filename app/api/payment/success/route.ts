import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// Helper: return a simple HTML page that redirects via JavaScript
function htmlRedirect(url: string) {
    const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta http-equiv="refresh" content="0;url=${url}" />
        <title>Redirecting...</title>
      </head>
      <body style="background:#09090b;color:#fff;display:flex;align-items:center;justify-content:center;height:100vh;font-family:sans-serif;">
        <p>Redirecting to your receipt...</p>
        <script>window.location.href = "${url}";</script>
      </body>
    </html>
  `;
    return new NextResponse(html, {
        status: 200,
        headers: { "Content-Type": "text/html" },
    });
}

// Create payment record + booking after confirmed successful payment
async function handleSuccessfulPayment(
    transactionId: string,
    pending: {
        clerkUserId: string;
        amount: number;
        bookingType: string;
        referenceId: number;
    },
    paymentType?: string
) {
    const { clerkUserId, amount, bookingType, referenceId } = pending;

    // Fetch user details
    const user = await db.user.findUnique({
        where: { clerkUserId },
        select: { MemberID: true, name: true },
    });

    // ── Create the Payments record (only successful ones reach here) ──
    await db.payments.create({
        data: {
            clerkUserId,
            MemberID: user?.MemberID || null,
            name: user?.name || null,
            transactionId,
            amount,
            paymentType: paymentType || null,
            bookingType,
            referenceId,
        },
    });

    // ── Create the corresponding booking record ──
    if (bookingType === "class") {
        const classInfo = await db.classes.findUnique({
            where: { id: BigInt(referenceId) },
            select: { classname: true },
        });

        const now = new Date();
        const bookingDate = new Date(now.getFullYear(), now.getMonth() + 1, 1);
        const validTill = new Date(bookingDate);
        validTill.setMonth(validTill.getMonth() + 1);
        validTill.setDate(validTill.getDate() - 1);

        await db.classBookings.create({
            data: {
                clerkUserId,
                classId: referenceId,
                name: user?.name || null,
                className: classInfo?.classname || null,
                bookingDate,
                validTill,
                status: "CONFIRMED",
            },
        });
    } else if (bookingType === "trainer") {
        const trainer = await db.trainers.findUnique({
            where: { id: BigInt(referenceId) },
            select: {
                name: true,
                trainer_time: true,
                fee_per_week: true,
                fee_per_month: true,
            },
        });

        const plan = amount === trainer?.fee_per_week ? "WEEKLY" : "MONTHLY";

        await db.trainerBookings.create({
            data: {
                clerkUserId,
                MemberID: user?.MemberID || null,
                trainerId: referenceId,
                trainerName: trainer?.name || null,
                timeSlot: trainer?.trainer_time || "N/A",
                plan,
                pricing: amount,
            },
        });
    } else if (bookingType === "membership") {
        const membership = await db.memberships.findUnique({
            where: { id: referenceId },
            select: { name: true },
        });

        const startDate = new Date();
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + 30);

        await db.membershipBookings.create({
            data: {
                clerkUserId,
                MemberID: user?.MemberID || null,
                name: user?.name || null,
                plan: membership?.name || null,
                price: amount,
                startDate,
                endDate,
                status: "ACTIVE",
            },
        });
    }

    // ── Delete the pending transaction (cleanup) ──
    await db.pendingTransactions.delete({
        where: { transactionId },
    });
}

async function processPayment(transactionId: string, paymentType?: string) {
    // Check if already processed (prevent duplicates)
    const existingPayment = await db.payments.findUnique({
        where: { transactionId },
    });
    if (existingPayment) {
        return; // Already processed
    }

    // Look up the pending transaction metadata
    const pending = await db.pendingTransactions.findUnique({
        where: { transactionId },
    });

    if (!pending) {
        throw new Error(`No pending transaction found for ${transactionId}`);
    }

    await handleSuccessfulPayment(transactionId, pending, paymentType);
}

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();

        // SSLCommerz sends tran_id in the POST body
        const tran_id = formData.get("tran_id") as string;

        // SSLCommerz may return the payment method
        const cardType = formData.get("card_type") as string | null;
        const cardBrand = formData.get("card_brand") as string | null;
        const paymentType = cardBrand || cardType || null;

        console.log("[PAYMENT_SUCCESS] tran_id:", tran_id);

        if (!tran_id) {
            console.error("[PAYMENT_SUCCESS] Missing tran_id");
            return htmlRedirect("/?payment=missing");
        }

        await processPayment(tran_id, paymentType || undefined);

        return htmlRedirect(`/checkout/success?tran_id=${tran_id}`);
    } catch (error) {
        console.error("[PAYMENT_SUCCESS_ERROR]", error);
        return htmlRedirect("/?payment=error");
    }
}

export async function GET(req: NextRequest) {
    const tran_id = req.nextUrl.searchParams.get("tran_id");

    if (!tran_id) {
        return htmlRedirect("/?payment=missing");
    }

    try {
        await processPayment(tran_id);
        return htmlRedirect(`/checkout/success?tran_id=${tran_id}`);
    } catch (error) {
        console.error("[PAYMENT_SUCCESS_GET_ERROR]", error);
        return htmlRedirect("/?payment=error");
    }
}
