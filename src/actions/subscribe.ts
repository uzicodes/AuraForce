'use server'

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import nodemailer from "nodemailer";

export async function subscribeToNewsletter(formData: FormData) {
  const email = formData.get("email") as string;

  if (!email || !email.includes("@")) {
    return { success: false, error: "Invalid email address" };
  }

  try {
    // 1. Check DB for duplicates
    const existing = await db.subscriber.findUnique({
      where: { email },
    });

    if (existing) {
      return { success: false, error: "You are already subscribed!" };
    }

    // 2. Save to Database
    await db.subscriber.create({
      data: { email },
    });

    // 3. Configure Gmail Transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // 4. Send the Email
    await transporter.sendMail({
      from: '"AuraForce Team" <' + process.env.GMAIL_USER + '>', // Sender address
      to: email, // Receiver (The subscriber)
      subject: "Welcome to the Inner Circle ⚡",
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #09090b; padding: 40px 20px; color: #ffffff;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #18181b; padding: 30px; border-radius: 12px; border: 1px solid #27272a;">
            <h1 style="color: #ffffff; margin-bottom: 20px;">AURA<span style="color: #10b981;">FORCE</span></h1>
            <p style="color: #a1a1aa; font-size: 16px;">Welcome to the team!</p>
            <p style="color: #d4d4d8; font-size: 16px; line-height: 1.5;">
              You have successfully joined <strong>10,000+ athletes</strong> receiving our weekly insights.
            </p>
            <div style="background-color: #10b981; color: #000000; padding: 20px; border-radius: 8px; text-align: center; margin: 30px 0;">
              <h2 style="margin: 0; font-size: 18px;">Your First Perk Unlocked 🔓</h2>
              <p style="margin: 10px 0 0;">Use code <strong>NEWFORCE20</strong> for 20% off.</p>
            </div>
          </div>
        </div>
      `,
    });

    revalidatePath("/");
    return { success: true };
    
  } catch (error) {
    console.error("Subscription Error:", error);
    return { success: false, error: "Something went wrong. Try again." };
  }
}