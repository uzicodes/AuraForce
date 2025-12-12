'use client';

import { FaPhone, FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Register = () => {
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const phoneNumber = form.phoneNumber.value;
    const password = form.password.value;

    // Email validation - check for exactly one @
    const emailPattern = /^[^@]+@[^@]+\.[^@]+$/;
    if (!emailPattern.test(email)) {
      toast.error("Please use a valid email address & try again");
      return;
    }

    // Password validation
    if (
      !/^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*\d).{6,}$/.test(password)
    ) {
      toast.error(
        `Password doesn't meet the criteria. Please use at least one uppercase letter, special character, one digit and Minimum length of 6 characters`
      );
      return;
    }

    // TODO: Implement user registration
    console.log({ email, name, phoneNumber, password });
    toast.success("Registration functionality coming soon!");
  };

  return (
    <section className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 min-h-screen py-12">
      <div className="container flex items-center justify-center min-h-[calc(100vh-216px)] px-6 mx-auto">
        <div className="w-full max-w-md overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
          {/* Logo and Header */}
          <div className="p-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white">
            <div className="flex justify-center mb-2">
              <div className="relative w-16 h-16 bg-white rounded-lg flex items-center justify-center p-2 shadow-md">
                <Image
                  src="/logo_bgremoved.png"
                  alt="Aura Force Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-center">
              Create An Account
            </h1>
            <p className="mt-2 text-center text-green-100">
              Join AuraForce today !
            </p>
          </div>

          <form onSubmit={handleRegister} className="p-6 space-y-4">
            {/* Name field */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaUser className="w-5 h-5 text-green-500" />
              </div>
              <input
                type="text"
                name="name"
                className="block w-full py-3 pl-10 pr-3 text-gray-700 bg-gray-50 border border-gray-200 rounded-lg dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 focus:border-green-500 dark:focus:border-green-500 focus:ring-green-500 focus:outline-none focus:ring focus:ring-opacity-40 transition-all duration-300"
                placeholder="Your Name"
                required
              />
            </div>

            {/* Email field */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaEnvelope className="w-5 h-5 text-green-500" />
              </div>
              <input
                type="text"
                name="email"
                className="block w-full py-3 pl-10 pr-3 text-gray-700 bg-gray-50 border border-gray-200 rounded-lg dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 focus:border-green-500 dark:focus:border-green-500 focus:ring-green-500 focus:outline-none focus:ring focus:ring-opacity-40 transition-all duration-300"
                placeholder="Email address"
                required
              />
            </div>

            {/* Phone Number field */}
            <div className="relative">
              <div className="absolute top-1/2 -translate-y-1/2 left-0 flex items-center pl-3 pointer-events-none">
                <FaPhone className="w-5 h-5 text-green-500" />
              </div>
              <div className="absolute top-1/2 -translate-y-1/2 left-10 flex items-center pl-3 pointer-events-none text-gray-700 dark:text-gray-300 font-medium">
                +880
              </div>
              <input
                type="tel"
                name="phoneNumber"
                pattern="[0-9]{11}"
                maxLength={11}
                minLength={11}
                className="block w-full py-3 pl-24 pr-3 text-gray-700 bg-gray-50 border border-gray-200 rounded-lg dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 focus:border-green-500 dark:focus:border-green-500 focus:ring-green-500 focus:outline-none focus:ring focus:ring-opacity-40 transition-all duration-300"
                placeholder="17123456789"
                title="Please enter exactly 11 digits"
                required
              />
            </div>

            {/* Password field */}
            <div className="relative">
              <div className="absolute top-1/3 -translate-y-1/2 left-0 flex items-center pl-3 pointer-events-none">
                <FaLock className="w-5 h-5 text-green-500" />
              </div>
              <input
                type="password"
                name="password"
                className="block w-full py-3 pl-10 pr-3 text-gray-700 bg-gray-50 border border-gray-200 rounded-lg dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 focus:border-green-500 dark:focus:border-green-500 focus:ring-green-500 focus:outline-none focus:ring focus:ring-opacity-40 transition-all duration-300"
                placeholder="Password"
                required
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Must contain uppercase, special character, number (min 6 chars)
              </p>
            </div>

            <div className="mt-2">
              <button type="submit" className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-all duration-300 transform bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring focus:ring-green-300 focus:ring-opacity-50 shadow-md hover:shadow-lg">
                <span className="flex items-center justify-center">
                  Sign Up
                </span>
              </button>
            </div>

            <div className="mt-6 text-center">
              <Link
                href="/login"
                className="text-sm text-green-500 hover:text-green-600 dark:text-green-400 dark:hover:text-green-300 font-semibold hover:underline transition-colors duration-300"
              >
                Already have an account? Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
