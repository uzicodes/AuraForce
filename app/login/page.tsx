'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaEnvelope, FaLock } from "react-icons/fa";
import Image from "next/image";
import { useSignIn } from "@clerk/nextjs";
import { useState } from "react";

const Login = () => {
  const router = useRouter();
  const { isLoaded, signIn, setActive } = useSignIn();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isLoaded) return;
    setLoading(true);

    const form = e.currentTarget;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        toast.success("Welcome back, athlete!");
        router.push("/");
      } else {
        console.log(result);
        toast.error("Login failed. Check your credentials.");
      }
    } catch (err: any) {
      console.error("error", err.errors[0]?.longMessage);
      toast.error(err.errors[0]?.longMessage || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (!isLoaded) return;
    try {
      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/"
      });
    } catch (err) {
      toast.error("Google Login failed");
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-12 px-4 sm:px-6 lg:px-8 bg-zinc-950 overflow-hidden">

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-zinc-950/90 z-10" />
        <Image
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop"
          alt="Gym Background"
          fill
          className="object-cover opacity-50"
          priority
        />
      </div>

      <div className="relative z-20 w-full max-w-sm bg-zinc-900/80 backdrop-blur-md border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden">

        <div className="px-8 pt-8 pb-6 text-center">
          <div className="relative w-12 h-12 mx-auto mb-4">
            <Image
              src="/logo_bgremoved.png"
              alt="Aura Force Logo"
              fill
              className="object-contain drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]"
            />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Welcome Back
          </h2>
          <p className="text-xs text-zinc-400 mt-2">
            Enter your credentials to access your account
          </p>
        </div>

        <form onSubmit={handleLogin} className="px-8 pb-8 space-y-4">

          <div className="space-y-1">
            <label className="text-xs font-medium text-zinc-300 ml-1">Email Address</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaEnvelope className="w-3.5 h-3.5 text-zinc-500 group-focus-within:text-emerald-500 transition-colors" />
              </div>
              <input
                type="email"
                name="email"
                className="block w-full py-2.5 pl-9 pr-3 text-sm text-white bg-zinc-950/50 border border-zinc-700 rounded-lg focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none transition-all placeholder-zinc-600"
                placeholder="name@example.com"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-zinc-300 ml-1">Password</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaLock className="w-3.5 h-3.5 text-zinc-500 group-focus-within:text-emerald-500 transition-colors" />
              </div>
              <input
                type="password"
                name="password"
                className="block w-full py-2.5 pl-9 pr-3 text-sm text-white bg-zinc-950/50 border border-zinc-700 rounded-lg focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none transition-all placeholder-zinc-600"
                placeholder="••••••••"
                required
              />
            </div>

            {/* --- UPDATED LINK IS HERE --- */}
            <div className="text-right">
              <Link
                href="/forgot-password"
                className="text-[10px] text-zinc-400 hover:text-emerald-400 transition-colors"
              >
                Forgot password?
              </Link>
            </div>

          </div>

          <button disabled={loading} className="w-full py-2.5 text-sm font-bold text-black bg-emerald-500 rounded-lg hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_20px_rgba(16,185,129,0.5)] transform active:scale-[0.98] disabled:opacity-50">
            {loading ? "Signing In..." : "Sign In"}
          </button>

          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-zinc-700"></div>
            <span className="flex-shrink mx-3 text-[10px] text-zinc-500 uppercase tracking-widest">Or continue with</span>
            <div className="flex-grow border-t border-zinc-700"></div>
          </div>

          <a
            href="#"
            onClick={handleGoogleLogin}
            className="flex items-center justify-center w-full py-2.5 text-sm font-medium text-zinc-300 bg-zinc-800 border border-zinc-700 rounded-lg hover:bg-zinc-700 hover:text-white transition-all duration-200"
          >
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Google
          </a>

          <div className="text-center pt-2">
            <p className="text-xs text-zinc-400">
              Not a member?{" "}
              <Link
                href="/register"
                className="text-emerald-500 hover:text-emerald-400 font-bold hover:underline transition-colors"
              >
                Register Now !
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;