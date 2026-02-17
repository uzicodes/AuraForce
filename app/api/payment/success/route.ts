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

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const tran_id = formData.get("tran_id") as string;
        const queryTranId = req.nextUrl.searchParams.get("tran_id");
        const transactionId = tran_id || queryTranId;

        if (!transactionId) {
            return htmlRedirect("/?payment=missing");
        }

        await db.payments.update({
            where: { transactionId },
            data: { status: "SUCCESS" },
        });

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
        await db.payments.update({
            where: { transactionId: tran_id },
            data: { status: "SUCCESS" },
        });

        return htmlRedirect(`/checkout/success?tran_id=${tran_id}`);
    } catch (error) {
        console.error("[PAYMENT_SUCCESS_GET_ERROR]", error);
        return htmlRedirect("/?payment=error");
    }
}
