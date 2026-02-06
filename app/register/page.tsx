'use client';

import { FaPhone, FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useSignUp } from "@clerk/nextjs";
import { useState } from "react";

const Register = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [verifying, setVerifying] = useState(false);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isLoaded) return;

    const form = e.currentTarget;
    const fullName = (form.elements.namedItem('name') as HTMLInputElement).value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const phoneNumber = (form.elements.namedItem('phoneNumber') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;

    const emailPattern = /^[^@]+@[^@]+\.[^@]+$/;
    if (!emailPattern.test(email)) {
      toast.error("Please use a valid email address");
      return;
    }

    if (!/^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*\d).{6,}$/.test(password)) {
      toast.error("Password must have 1 uppercase, 1 special char, 1 number & min 6 chars");
      return;
    }

    setLoading(true);

    try {
      const nameParts = fullName.trim().split(" ");
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(" ") || "";

      await signUp.create({
        emailAddress: email,
        password,
        firstName: firstName,
        lastName: lastName,
        unsafeMetadata: {
          phoneNumber: `+880${phoneNumber}`,
          role: "member"
        }
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setVerifying(true);
      toast.success("Verification code sent to email!");
    } catch (err: any) {
      console.error("REGISTRATION ERROR:", err);
      toast.error(err.errors[0]?.longMessage || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    const cleanCode = code.trim();
    if (!cleanCode) {
      toast.error("Please enter the code");
      return;
    }

    setLoading(true);

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: cleanCode,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        toast.success("Account Created Successfully!");
        router.push("/");
      } else if (completeSignUp.status === "missing_requirements") {
        console.log("Missing:", completeSignUp.missingFields);
        toast.error("Further steps required. Check console.");
      } else {
        toast.error("Verification failed. Try again.");
      }
    } catch (err: any) {
      console.error("VERIFICATION ERROR:", JSON.stringify(err, null, 2));
      toast.error(err.errors?.[0]?.longMessage || "Invalid Code");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (!isLoaded) return;
    try {
      await signUp.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/"
      });
    } catch (err) {
      toast.error("Google Sign Up failed");
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-12 px-4 sm:px-6 lg:px-8 bg-zinc-950 overflow-hidden">

      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-zinc-950/90 z-10" />
        <Image
          src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=2075&auto=format&fit=crop"
          alt="Dark Gym Atmosphere"
          fill
          className="object-cover opacity-50"
          priority
        />
      </div>

      <div className="relative z-20 w-full max-w-sm bg-zinc-900/80 backdrop-blur-md border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden pb-4">

        <div className="px-6 pt-4 pb-2 text-center">
          <div className="relative w-8 h-8 mx-auto mb-2">
            <Image
              src="/for favicon.png"
              alt="Aura Force Logo"
              fill
              className="object-contain drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]"
            />
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            {verifying ? "Verify Email" : "Create Account"}
          </h2>
          <p className="text-[11px] text-zinc-400 mt-1">
            {verifying ? "Enter the code sent to your email" : "Join the AuraForce community today"}
          </p>
        </div>

        {verifying ? (
          <form onSubmit={handleVerify} className="px-6 pb-2 space-y-3">
            <div className="space-y-1">
              <label className="text-[11px] font-medium text-zinc-300 ml-1">Verification Code</label>
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="block w-full py-2 px-3 text-center text-base tracking-[0.5em] font-mono text-white bg-zinc-950/50 border border-zinc-700 rounded-lg focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none transition-all"
                placeholder="000000"
              />
            </div>
            <button disabled={loading} className="w-full py-2 text-sm font-bold text-black bg-emerald-500 rounded-lg hover:bg-emerald-400 transition-all">
              {loading ? "Verifying..." : "Verify & Login"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="px-5 pb-2 space-y-1.5">
            {/* Google Sign Up Button - Quick Option First */}
            <a
              href="#"
              onClick={handleGoogleSignUp}
              className="flex items-center justify-center w-full py-2 text-sm font-medium text-zinc-300 bg-zinc-800 border border-zinc-700 rounded-lg hover:bg-zinc-700 hover:text-white transition-all duration-200"
            >
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Continue with Google
            </a>

            <div className="relative flex items-center py-1">
              <div className="flex-grow border-t border-zinc-700"></div>
              <span className="flex-shrink mx-3 text-[10px] text-zinc-500 uppercase tracking-widest">Or register manually</span>
              <div className="flex-grow border-t border-zinc-700"></div>
            </div>

            {/* Name */}
            <div>
              <label className="text-[11px] font-medium text-zinc-300 ml-1">Full Name</label>
              <div className="relative group mt-0.5">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaUser className="w-3 h-3 text-zinc-500 group-focus-within:text-emerald-500 transition-colors" />
                </div>
                <input type="text" name="name" className="block w-full py-2 pl-8 pr-3 text-sm text-white bg-zinc-950/50 border border-zinc-700 rounded-lg focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none transition-all placeholder-zinc-600" placeholder="Enter your full name" required />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-[11px] font-medium text-zinc-300 ml-1">Email</label>
              <div className="relative group mt-0.5">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaEnvelope className="w-3 h-3 text-zinc-500 group-focus-within:text-emerald-500 transition-colors" />
                </div>
                <input type="email" name="email" className="block w-full py-2 pl-8 pr-3 text-sm text-white bg-zinc-950/50 border border-zinc-700 rounded-lg focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none transition-all placeholder-zinc-600" placeholder="name@example.com" required />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label className="text-[11px] font-medium text-zinc-300 ml-1">Phone Number</label>
              <div className="relative group mt-0.5">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaPhone className="w-3 h-3 text-zinc-500 group-focus-within:text-emerald-500 transition-colors" />
                </div>
                <div className="absolute inset-y-0 left-8 flex items-center pointer-events-none">
                  <span className="text-zinc-400 text-xs font-medium">+880</span>
                </div>
                <input
                  type="tel"
                  name="phoneNumber"
                  pattern="[0-9]{11}"
                  maxLength={11}
                  minLength={11}
                  className="block w-full py-2 pl-[4.5rem] pr-3 text-sm text-white bg-zinc-950/50 border border-zinc-700 rounded-lg focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none transition-all placeholder-zinc-600"
                  placeholder="XXXXXXXXXX"
                  title="Please enter exactly 11 digits"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-[11px] font-medium text-zinc-300 ml-1">Password</label>
              <div className="relative group mt-0.5">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaLock className="w-3 h-3 text-zinc-500 group-focus-within:text-emerald-500 transition-colors" />
                </div>
                <input type="password" name="password" className="block w-full py-2 pl-8 pr-3 text-sm text-white bg-zinc-950/50 border border-zinc-700 rounded-lg focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none transition-all placeholder-zinc-600" placeholder="••••••••" required />
              </div>
              <p className="text-[9px] text-zinc-500 ml-1 mt-0.5">
                1 uppercase, 1 special char, 1 number (min 6)
              </p>
            </div>

            <div className="pt-1">
              <button disabled={loading} type="submit" className="w-full py-2 text-sm font-bold text-black bg-emerald-500 rounded-lg hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_20px_rgba(16,185,129,0.5)] transform active:scale-[0.98] disabled:opacity-50">
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </div>

            <div className="text-center">
              <p className="text-xs text-zinc-400">
                Already have an account?{" "}
                <Link href="/login" className="text-emerald-500 hover:text-emerald-400 font-bold hover:underline transition-colors">
                  Login
                </Link>
              </p>
            </div>
          </form>
        )}

        {/* Clerk Captcha */}
        <div id="clerk-captcha" className="px-6 pb-3"></div>

      </div>
    </section>
  );
};

export default Register;