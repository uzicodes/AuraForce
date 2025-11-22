import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { FaEnvelope, FaBell, FaGift } from "react-icons/fa";

const NewsLetter = () => {
  const axiosPublic = useAxiosPublic();
  const formRef = React.createRef();

  const handleSubscribe = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const newEmail = { email };
    if ((email, email.length > 0)) {
      axiosPublic.post("newsletter", newEmail).then((res) => {
        console.log(res);
        toast.success("Thank you for subscribing to our newsletter!");
      });
    }

    // clear form
    formRef.current.reset();
  };

  return (
    <section className="py-20 bg-gradient-to-br from-[#16A34A] via-[#22C55E] to-[#16A34A] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Content Side */}
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6 w-fit">
                  <FaBell className="text-sm" />
                  Stay Updated
                </div>

                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                  Subscribe to{" "}
                  <span className="block text-white/90">
                    Aura Force Newsletter
                  </span>
                </h2>

                <p className="text-white/80 text-lg mb-6">
                  Don't miss anything. Get all the latest posts delivered
                  straight to your inbox. It's free!
                </p>

                {/* Benefits */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-white/90">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span>Weekly fitness tips & workouts</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/90">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span>Exclusive trainer insights</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/90">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span>Early access to new classes</span>
                  </div>
                </div>
              </div>

              {/* Form Side */}
              <div className="p-8 md:p-12 flex flex-col justify-center bg-white/5">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                    <FaGift className="text-2xl text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Join 10,000+ Subscribers
                  </h3>
                  <p className="text-white/70">Get your free workout guide!</p>
                </div>

                <form
                  onSubmit={handleSubscribe}
                  ref={formRef}
                  className="space-y-4"
                >
                  <div className="relative">
                    <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      className="w-full pl-12 pr-4 py-4 bg-white/90 backdrop-blur-sm border border-white/30 rounded-2xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
                      type="email"
                      name="email"
                      placeholder="Enter your email address"
                      aria-label="Enter your email"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-white hover:bg-gray-100 text-[#16A34A] font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2"
                  >
                    <FaEnvelope className="text-sm" />
                    Subscribe Now
                  </button>
                </form>

                <p className="text-white/60 text-sm text-center mt-4">
                  No spam, unsubscribe at any time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;
