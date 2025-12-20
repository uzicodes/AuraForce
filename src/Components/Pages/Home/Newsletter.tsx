"use client";

import React, { useState, useEffect } from "react"; // 1. Add useEffect
import { Mail, ArrowRight, CheckCircle, Loader2 } from "lucide-react";
import { subscribeToNewsletter } from "@/actions/subscribe";
import toast from "react-hot-toast";
import { useUser } from "@clerk/nextjs"; // 2. Import Clerk hook

const Newsletter = () => {
  const { user, isSignedIn } = useUser(); // 3. Get user info
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  // 4. Auto-fill email if user is logged in
  useEffect(() => {
    if (isSignedIn && user?.primaryEmailAddress?.emailAddress) {
      setEmail(user.primaryEmailAddress.emailAddress);
    }
  }, [isSignedIn, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    // ... (Keep your existing submit logic) ...
    e.preventDefault();
    if (!email) return;

    setStatus("loading");

    const formData = new FormData();
    formData.append("email", email);

    const result = await subscribeToNewsletter(formData);

    if (result.success) {
      setStatus("success");
      // Don't clear email if logged in, keeps it persistent
      if (!isSignedIn) setEmail(""); 
      toast.success("Successfully subscribed!");
    } else {
      setStatus("idle");
      toast.error(result.error || "Failed to subscribe");
    }
  };

  return (
    // ... (Keep your existing JSX return) ...
    // ...
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    // Optional: Make it read-only if you don't want logged-in users to change it
                    // readOnly={isSignedIn} 
                    className="..."
                  />
    // ...
  );
};

export default Newsletter;