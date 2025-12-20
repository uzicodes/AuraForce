import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import nodemailer from "nodemailer";

export const checkUser = async () => {
  const user = await currentUser();

  // If no user is logged in via Clerk, return null
  if (!user) {
    return null;
  }

  // Check if user already exists in OUR database
  const loggedInUser = await db.user.findUnique({
    where: {
      clerkUserId: user.id,
    },
  });

  // If user exists (No email sent)
  if (loggedInUser) {
    return loggedInUser;
  }

  // IF USER IS NEW: Create them in DB
  const newUser = await db.user.create({
    data: {
      clerkUserId: user.id,
      name: `${user.firstName} ${user.lastName}`,
      image: user.imageUrl, 
      email: user.emailAddresses[0].emailAddress,
    },
  });

  // SEND WELCOME EMAIL
  // We wrap this in a try/catch so if it fails, the user still gets logged in.
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const email = newUser.email;
    
    // Use live domain for images, fallback to localhost safety
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : 'https://auraforce.vercel.app'; 


    // awaiting ensures it sends before the page loads.
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
              You received this email because you created an account with AuraForce using <span style="color: #d4d4d8;">${email}</span>.
              <br />
              <br />
              © ${new Date().getFullYear()} AuraForce Inc. All rights reserved.
            </p>
            
          </div>
        </div>
      `,
    });
    // Optional: Log to server console only (invisible to user)
    console.log("New user welcome email sent.");
  } catch (error) {
    // Silently fail - User still gets logged in, no toast, no crash.
    console.error("Welcome email failed silently:", error);
  }

  return newUser;
};