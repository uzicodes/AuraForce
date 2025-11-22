'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { FaEnvelope, FaLock, FaDumbbell } from "react-icons/fa";

const Login = () => {
  const router = useRouter();
  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log({ email, password });
    
    // TODO: Implement authentication
    toast.success("Login functionality coming soon!");
    // router.push("/");
  };

  const handleGoogleLogin = (e) => {
    e.preventDefault();
    // TODO: Implement Google authentication
    toast.success("Google login functionality coming soon!");
  };

  return (
    <section className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 min-h-screen py-12">
      <div className="container flex items-center justify-center min-h-[calc(100vh-216px)] px-6 mx-auto">
        <div className="w-full max-w-md overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
          {/* Logo and Header */}
          <div className="p-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white">
            <div className="flex justify-center mb-2">
              <div className="p-3 bg-white bg-opacity-20 rounded-full backdrop-blur-sm">
                <FaDumbbell className="w-8 h-8 text-white animate-pulse" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-center">
              Welcome Back!
            </h1>
            <p className="mt-2 text-center text-green-100">Sign in to continue your fitness journey</p>
          </div>

          <form onSubmit={handleLogin} className="p-6 space-y-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaEnvelope className="w-5 h-5 text-green-500" />
              </div>
              <input
                type="email"
                name="email"
                className="block w-full py-3 pl-10 pr-3 text-gray-700 bg-gray-50 border border-gray-200 rounded-lg dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 focus:border-green-500 dark:focus:border-green-500 focus:ring-green-500 focus:outline-none focus:ring focus:ring-opacity-40 transition-all duration-300"
                placeholder="Email address"
                required
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaLock className="w-5 h-5 text-green-500" />
              </div>
              <input
                type="password"
                name="password"
                className="block w-full py-3 pl-10 pr-3 text-gray-700 bg-gray-50 border border-gray-200 rounded-lg dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 focus:border-green-500 dark:focus:border-green-500 focus:ring-green-500 focus:outline-none focus:ring focus:ring-opacity-40 transition-all duration-300"
                placeholder="Password"
                required
              />
            </div>

            <div>
              <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-all duration-300 transform bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring focus:ring-green-300 focus:ring-opacity-50 shadow-md hover:shadow-lg">
                <span className="flex items-center justify-center">
                  Login
                </span>
              </button>
            </div>

            <div className="relative flex items-center">
              <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
              <span className="flex-shrink mx-4 text-gray-600 dark:text-gray-400 text-sm">or sign in with</span>
              <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
            </div>

            <a
              href="#"
              onClick={handleGoogleLogin}
              className="flex items-center justify-center w-full px-6 py-3 text-gray-700 dark:text-gray-200 transition-colors duration-300 transform border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-200 dark:focus:ring-gray-600 focus:ring-opacity-50"
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
            </a>

            <div className="mt-6 text-center">
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

