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

// Create the actual booking record after successful payment
async function createBookingFromPayment(payment: {
    clerkUserId: string;
    bookingType: string;
    referenceId: number;
}) {
    const { clerkUserId, bookingType, referenceId } = payment;

    if (bookingType === "class") {
        // Fetch user name
        const user = await db.user.findUnique({
            where: { clerkUserId },
            select: { name: true },
        });

        // Fetch class name
        const classInfo = await db.classes.findUnique({
            where: { id: BigInt(referenceId) },
            select: { classname: true },
        });

        // Calculate booking date (1st of next month) and validTill (last day of that month)
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
        // Trainer booking - already handled if TrainerBookings uses same pattern
        // Add trainer booking creation here if needed
    } else if (bookingType === "membership") {
        // Membership subscription - already handled if Subscription uses same pattern
        // Add subscription creation here if needed
    }
}

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const tran_id = formData.get("tran_id") as string;
        const queryTranId = req.nextUrl.searchParams.get("tran_id");
        const transactionId = tran_id || queryTranId;

        if (!transactionId) {
            return htmlRedirect("/?payment=missing");
        }

        // Update payment status
        const payment = await db.payments.update({
            where: { transactionId },
            data: { status: "SUCCESS" },
        });

        // Create the actual booking record
        await createBookingFromPayment(payment);

        return htmlRedirect(`/checkout/success?tran_id=${transactionId}`);
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
        // Update payment status
        const payment = await db.payments.update({
            where: { transactionId: tran_id },
            data: { status: "SUCCESS" },
        });

        // Create the actual booking record
        await createBookingFromPayment(payment);

        return htmlRedirect(`/checkout/success?tran_id=${tran_id}`);
    } catch (error) {
        console.error("[PAYMENT_SUCCESS_GET_ERROR]", error);
        return htmlRedirect("/?payment=error");
    }
}
