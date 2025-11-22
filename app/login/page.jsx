'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { FaEnvelope, FaLock } from "react-icons/fa";
import Image from "next/image";

const Login = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    
    try {
      // TODO: Implement actual authentication when backend is ready
      // Simulating login for now
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Logged In Successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      router.push("/");
    } catch (err) {
      console.log(err);
      toast.error(err?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      // TODO: Implement Google authentication when backend is ready
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Logged In Successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      router.push("/");
    } catch (err) {
      console.log(err);
      toast.error(err?.message || "Google login failed");
    }
  };

  return (
    <section className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 min-h-screen pt-32 pb-8">
      <div className="container flex items-center justify-center px-6 mx-auto">
        <div className="w-full max-w-md overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
          {/* Logo and Header */}
          <div className="p-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white">
            <div className="flex justify-center mb-1">
              <div className="relative w-12 h-12 bg-white rounded-lg flex items-center justify-center p-1 shadow-sm">
                <Image
                  src="/logo_bgremoved.png"
                  alt="Aura Force Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-center">
              Welcome Back!
            </h1>
            <p className="mt-1 text-center text-green-100 text-sm">Sign in to continue your fitness journey</p>
          </div>

          <form onSubmit={handleLogin} className="p-5 space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaEnvelope className="w-5 h-5 text-green-500" />
              </div>
              <input
                type="email"
                name="email"
                className="block w-full py-2.5 pl-10 pr-3 text-gray-700 bg-gray-50 border border-gray-200 rounded-lg dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 focus:border-green-500 dark:focus:border-green-500 focus:ring-green-500 focus:outline-none focus:ring focus:ring-opacity-40 transition-all duration-300"
                placeholder="Email address"
                required
                disabled={isLoading}
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaLock className="w-5 h-5 text-green-500" />
              </div>
              <input
                type="password"
                name="password"
                className="block w-full py-2.5 pl-10 pr-3 text-gray-700 bg-gray-50 border border-gray-200 rounded-lg dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 focus:border-green-500 dark:focus:border-green-500 focus:ring-green-500 focus:outline-none focus:ring focus:ring-opacity-40 transition-all duration-300"
                placeholder="Password"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <button 
                type="submit"
                disabled={isLoading}
                className="w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-all duration-300 transform bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring focus:ring-green-300 focus:ring-opacity-50 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="flex items-center justify-center">
                  {isLoading ? "Logging in..." : "Login"}
                </span>
              </button>
            </div>

            <div className="relative flex items-center">
              <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
              <span className="flex-shrink mx-4 text-gray-600 dark:text-gray-400 text-sm">or sign in with</span>
              <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="flex items-center justify-center w-full px-6 py-2.5 text-gray-700 dark:text-gray-200 transition-colors duration-300 transform border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-200 dark:focus:ring-gray-600 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5 mx-2" viewBox="0 0 40 40">
                <path
                  d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                  fill="#FFC107"
                />
                <path
                  d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                  fill="#FF3D00"
                />
                <path
                  d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                  fill="#4CAF50"
                />
                <path
                  d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                  fill="#1976D2"
                />
              </svg>

              <span className="mx-2">Sign in with Google</span>
            </button>

            <div className="text-center">
              <Link
                href="/register"
                className="text-sm text-green-500 hover:text-green-600 dark:text-green-400 dark:hover:text-green-300 font-semibold hover:underline transition-colors duration-300"
              >
                {"Don't"} have an account yet? Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
