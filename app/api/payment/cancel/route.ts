import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

function htmlRedirect(url: string) {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta http-equiv="refresh" content="0;url=${url}" />
        <title>Redirecting...</title>
      </head>
      <body style="background:#09090b;color:#fff;display:flex;align-items:center;justify-content:center;height:100vh;font-family:sans-serif;">
        <p>Redirecting...</p>
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

    // Clean up the pending transaction (no Payments record created)
    if (tran_id) {
      await db.pendingTransactions.delete({
        where: { transactionId: tran_id },
      }).catch(() => { }); // Ignore if not found
    }
  } catch (error) {
    console.error("[PAYMENT_CANCEL_ERROR]", error);
  }

  return htmlRedirect("/?payment=cancelled");
}

export async function GET(req: NextRequest) {
  const tran_id = req.nextUrl.searchParams.get("tran_id");

  if (tran_id) {
    await db.pendingTransactions.delete({
      where: { transactionId: tran_id },
    }).catch(() => { });
  }

  return htmlRedirect("/?payment=cancelled");
}
