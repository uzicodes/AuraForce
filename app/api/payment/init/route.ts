import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    // ── 1. Authentication ──────────────────────────────────────────────
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized. Please sign in to continue." },
        { status: 401 }
      );
    }

    // ── 2. Parse Payload ───────────────────────────────────────────────
    const { amount, bookingType, referenceId, userName, userEmail } =
      await req.json();

    if (!amount || !bookingType || !referenceId) {
      return NextResponse.json(
        { error: "Missing required fields: amount, bookingType, referenceId." },
        { status: 400 }
      );
    }

    // ── 3. Generate Transaction ID ─────────────────────────────────────
    const tran_id = `TXN_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

    // ── 4. Database Entry (status defaults to "PENDING") ───────────────
    await db.payments.create({
      data: {
        clerkUserId: userId,
        amount: Number(amount),
        transactionId: tran_id,
        bookingType,
        referenceId: Number(referenceId),
      },
    });

    // ── 5. SSLCommerz Config ───────────────────────────────────────────
    const store_id = process.env.SSLCOMMERZ_STORE_ID!;
    const store_passwd = process.env.SSLCOMMERZ_STORE_PASSWORD!;
    const is_live = process.env.SSLCOMMERZ_IS_LIVE === "true";

    const baseURL = is_live
      ? "https://securepay.sslcommerz.com"
      : "https://sandbox.sslcommerz.com";

    const APP_URL = process.env.NEXT_PUBLIC_APP_URL;

    // ── 6. Build FormData for SSLCommerz API ───────────────────────────
    const formData = new URLSearchParams();
    formData.append("store_id", store_id);
    formData.append("store_passwd", store_passwd);
    formData.append("total_amount", String(Number(amount)));
    formData.append("currency", "BDT");
    formData.append("tran_id", tran_id);

    formData.append("success_url", `${APP_URL}/api/payment/success?tran_id=${tran_id}`);
    formData.append("fail_url", `${APP_URL}/api/payment/fail?tran_id=${tran_id}`);
    formData.append("cancel_url", `${APP_URL}/api/payment/cancel?tran_id=${tran_id}`);
    formData.append("ipn_url", `${APP_URL}/api/payment/ipn`);

    // Customer details (required by SSLCommerz sandbox)
    formData.append("cus_name", userName || "Customer");
    formData.append("cus_email", userEmail || "customer@example.com");
    formData.append("cus_add1", "Dhaka");
    formData.append("cus_city", "Dhaka");
    formData.append("cus_postcode", "1000");
    formData.append("cus_country", "Bangladesh");
    formData.append("cus_phone", "01700000000");

    // Shipping & product details (required dummy values for sandbox)
    formData.append("shipping_method", "NO");
    formData.append("product_name", bookingType);
    formData.append("product_category", "fitness");
    formData.append("product_profile", "non-physical-goods");

    // ── 7. Call SSLCommerz Init API directly ────────────────────────────
    const sslRes = await fetch(`${baseURL}/gwprocess/v4/api.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });

    const apiResponse = await sslRes.json();

    if (apiResponse?.GatewayPageURL) {
      return NextResponse.json(
        { url: apiResponse.GatewayPageURL },
        { status: 200 }
      );
    }

    console.error("[SSLCOMMERZ_RESPONSE]", apiResponse);
    return NextResponse.json(
      { error: "Failed to initialize payment session. No gateway URL received." },
      { status: 400 }
    );
  } catch (error: any) {
    console.error("[PAYMENT_INIT_ERROR]", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error during payment initialization." },
      { status: 500 }
    );
  }
}
