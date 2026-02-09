"use client";

import React, { useState, useEffect } from "react";
import { Mail, ArrowRight, CheckCircle, Loader2 } from "lucide-react";
import { subscribeToNewsletter } from "@/actions/subscribe";
import toast from "react-hot-toast";
import { useUser } from "@clerk/nextjs";

const Newsletter = () => {
  const { user, isSignedIn } = useUser();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  // Auto-fill email if user is logged in
  useEffect(() => {
    if (isSignedIn && user?.primaryEmailAddress?.emailAddress) {
      setEmail(user.primaryEmailAddress.emailAddress);
    }
  }, [isSignedIn, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");

    const formData = new FormData();
    formData.append("email", email);

    const result = await subscribeToNewsletter(formData);

    if (result.success) {
      setStatus("success");
      // Only clear email if the user is a guest. 
      // Logged-in users usually prefer seeing their email persists.
      if (!isSignedIn) setEmail("");
      toast.success("Successfully subscribed!");
    } else {
      setStatus("idle");
      toast.error(result.error || "Failed to subscribe");
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">

      {/* Background Ambient Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* The Card Container */}
        <div className="max-w-4xl mx-auto bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-3xl p-8 md:p-12 lg:p-16 text-center relative overflow-hidden group">

          {/* Decor: Subtle Shine Effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          {status === "success" ? (
            // SUCCESS STATE UI
            <div className="animate-in fade-in zoom-in duration-500 py-10">
              <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-emerald-500" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">Welcome to the Inner Circle!</h3>
              <p className="text-zinc-400 font-satoshi">Keep an eye on your inbox. Your first workout guide is on its way.</p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-8 text-sm text-zinc-500 hover:text-white underline underline-offset-4 transition-colors"
              >
                Subscribe another email
              </button>
            </div>
          ) : (
            // FORM STATE UI
            <>
              <div className="inline-flex items-center justify-center w-16 h-16 bg-zinc-800 rounded-2xl mb-8 shadow-lg shadow-emerald-900/10 border border-zinc-700">
                <Mail className="w-8 h-8 text-emerald-500" />
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
                Don't Miss the <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-red-400">Gains !</span>
              </h2>

              <p className="text-lg text-zinc-400 max-w-lg mx-auto mb-10 leading-relaxed font-satoshi">
                Join 10,000+ athletes receiving weekly workout tips, nutrition hacks, and exclusive gear discounts. No spam, just power.
              </p>

              <form onSubmit={handleSubmit} className="max-w-md mx-auto relative">
                <div className="relative group/input">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-6 pr-36 py-4 bg-zinc-950 border border-zinc-700 rounded-full text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all shadow-xl"
                  />

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="absolute right-2 top-2 bottom-2 bg-emerald-600 hover:bg-emerald-500 text-white px-6 rounded-full font-semibold text-sm transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Join Now</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>

                <p className="mt-4 text-xs text-zinc-600 text-center font-satoshi">
                  By subscribing, you agree to our Terms & Privacy Policy.
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Newsletter;