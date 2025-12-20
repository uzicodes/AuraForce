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
    // Check DB for duplicates
    const existing = await db.subscriber.findUnique({
      where: { email },
    });

    if (existing) {
      return { success: false, error: "You are already subscribed!" };
    }

    // Save to Database
    await db.subscriber.create({
      data: { email },
    });

    // Configure Gmail Transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });


    // ensures images work on both Vercel and Localhost
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : 'https://auraforce.vercel.app'; // Vercel domain fallback

    // Email (Updated Design)
    await transporter.sendMail({
      from: `"AuraForce Team" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "Welcome to the Inner Circle ⚡",
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #09090b; padding: 40px 20px; color: #ffffff;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #18181b; padding: 40px; border-radius: 16px; border: 1px solid #27272a;">
            
            <div style="text-align: center; margin-bottom: 24px;">
              <img 
                src="${baseUrl}/for favicon.png" 
                alt="AuraForce Logo" 
                width="60" 
                height="60"
                style="display: inline-block; object-fit: contain;"
              />
              <h1 style="font-size: 28px; font-weight: bold; margin: 10px 0 0; color: #ffffff; letter-spacing: -0.5px;">
                AURA<span style="color: #10b981;">FORCE</span>
              </h1>
            </div>
            
            <p style="font-size: 16px; line-height: 1.6; color: #d4d4d8; text-align: center; margin-bottom: 30px;">
              Welcome to the team! You have successfully joined <strong>10,000+ athletes</strong> receiving our weekly insights. We aren't just a gym—we are a movement.
            </p>

            <div style="width: 100%; height: 1px; background-color: #27272a; margin-bottom: 30px;"></div>

            <h2 style="font-size: 18px; font-weight: bold; color: #ffffff; margin-bottom: 20px;">
              What to expect from us:
            </h2>

            <div style="margin-bottom: 20px; padding-left: 15px; border-left: 3px solid #10b981;">
              <h3 style="margin: 0; font-size: 16px; color: #10b981; font-weight: bold;">⚡ Precision Training</h3>
              <p style="margin: 5px 0 0; font-size: 14px; color: #a1a1aa; line-height: 1.5;">
                Weekly breakdowns of advanced lifting techniques, HIIT protocols, and recovery strategies used by pros.
              </p>
            </div>

            <div style="margin-bottom: 20px; padding-left: 15px; border-left: 3px solid #10b981;">
              <h3 style="margin: 0; font-size: 16px; color: #10b981; font-weight: bold;">🍎 Fueling Strategy</h3>
              <p style="margin: 5px 0 0; font-size: 14px; color: #a1a1aa; line-height: 1.5;">
                Real food recipes and macro-tracking tips. We don't believe in starving; we believe in fueling for performance.
              </p>
            </div>

            <div style="margin-bottom: 30px; padding-left: 15px; border-left: 3px solid #10b981;">
              <h3 style="margin: 0; font-size: 16px; color: #10b981; font-weight: bold;">🔥 Inner Circle Access</h3>
              <p style="margin: 5px 0 0; font-size: 14px; color: #a1a1aa; line-height: 1.5;">
                First access to new class schedules, trainer Q&As, and community challenges.
              </p>
            </div>

            <div style="text-align: center; margin-bottom: 30px;">
              <a 
                href="${baseUrl}"
                style="background-color: #10b981; color: #000000; padding: 12px 30px; border-radius: 50px; text-decoration: none; font-weight: bold; font-size: 15px; display: inline-block;"
              >
                Explore Classes & Trainers
              </a>
            </div>

            <p style="font-size: 13px; color: #52525b; border-top: 1px solid #27272a; padding-top: 20px; text-align: center;">
              You received this email because you subscribed to the AuraForce newsletter with <span style="color: #d4d4d8;">${email}</span>.
              <br />
              <br />
              © ${new Date().getFullYear()} AuraForce Inc. All rights reserved.
            </p>
            
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