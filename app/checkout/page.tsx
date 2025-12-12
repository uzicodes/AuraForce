"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaLock, FaCreditCard, FaGooglePay, FaCheckCircle, FaArrowLeft } from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

const Checkout = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [loading, setLoading] = useState(false);
  const [cardNumber, setCardNumber] = useState("");

  // Plan data based on URL parameter
  const planName = searchParams.get("plan") || "Premium";
  
  const planDetails: Record<string, { price: number; features: string[] }> = {
    "Basic": {
      price: 4999,
      features: ["Access to Gym Equipment", "Locker Room Access", "Free WiFi", "1 Intro PT Session"]
    },
    "Standard": {
      price: 9999,
      features: ["All Basic Features", "Group Fitness Classes", "Sauna & Steam Room", "Nutrition Guide", "Monthly Progress Check"]
    },
    "Premium": {
      price: 14999,
      features: ["All Standard Features", "Unlimited Personal Training", "Massage Therapy Access", "Priority Support", "Exclusive Merch"]
    }
  };

  const selectedPlan = planDetails[planName] || planDetails["Premium"];
  const total = selectedPlan.price;

  const plan = {
    name: `${planName} Membership`,
    price: selectedPlan.price,
    total: total,
    features: selectedPlan.features
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s/g, "").replace(/\D/g, "");
    if (value.length <= 16) {
      const formatted = value.match(/.{1,4}/g)?.join(" ") || value;
      setCardNumber(formatted);
    }
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate card number is exactly 16 digits
    const digitsOnly = cardNumber.replace(/\s/g, "");
    if (digitsOnly.length !== 16) {
      toast.error("Card number must be exactly 16 digits");
      return;
    }
    
    setLoading(true);

    // Simulate payment processing delay
    setTimeout(() => {
      setLoading(false);
      router.push("/checkout/success"); // Redirect to success page
      toast.success("Payment Successful!");
    }, 2000);
  };

  return (
    <section className="min-h-screen bg-zinc-950 py-12 px-4 sm:px-6 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="container mx-auto max-w-6xl relative z-10 pt-8"> 
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          
          {/* LEFT COLUMN: Payment Details */}
          <div className="lg:col-span-2 space-y-4">
            
            {/* Back Button - MOVED HERE */}
            <div className="mb-6">
              <Link href="/#membership" className="inline-flex items-center gap-2 text-zinc-400 hover:text-emerald-500 transition-colors">
                <FaArrowLeft /> Back to Plans
              </Link>
            </div>
            
            <h1 className="text-3xl font-bold text-white mb-1">Secure Checkout</h1>
            <p className="text-zinc-400 mb-6">Complete your registration to start your journey.</p>

            {/* Payment Method Selector */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[
                { id: "card", icon: FaCreditCard, label: "Card", type: "icon" },
                { id: "bkash", imageSrc: "/bkash.jpg", label: "bKash", type: "image" },
                { id: "googlepay", icon: FaGooglePay, label: "Google Pay", type: "icon" },
              ].map((method) => (
                <button
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id)}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                    paymentMethod === method.id
                      ? "bg-emerald-500/10 border-emerald-500 text-emerald-500"
                      : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-600"
                  }`}
                >
                  {method.type === "icon" && method.icon && (
                    <method.icon className="text-xl mb-1" />
                  )}
                  {method.type === "image" && method.imageSrc && (
                    <div className="relative w-10 h-6 mb-1">
                      <Image
                        src={method.imageSrc}
                        alt={method.label}
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                  <span className="text-xs font-medium">{method.label}</span>
                </button>
              ))}
            </div>

            {/* Payment Form */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
              <form onSubmit={handlePayment} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1 uppercase tracking-wide">Cardholder Name</label>
                  <input type="text" placeholder="Enter the Full Name " required className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all" />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1 uppercase tracking-wide">Card Number</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="0000 0000 0000 0000" 
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                      required 
                      maxLength={19}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all pl-10" 
                    />
                    <FaCreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-zinc-400 mb-1 uppercase tracking-wide">Expiry Date</label>
                    <input type="text" placeholder="MM/YY" required className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-zinc-400 mb-1 uppercase tracking-wide">CVC</label>
                    <input type="text" placeholder="123" required className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all" />
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-emerald-900/20 mt-3 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="animate-pulse">Processing...</span>
                  ) : (
                    <>
                      <FaLock className="text-sm" /> Pay ৳{plan.total.toFixed(2)}
                    </>
                  )}
                </button>
                
                <p className="text-center text-xs text-zinc-500 flex items-center justify-center gap-1 mt-3">
                  <FaLock className="text-[10px]" /> Payments are secure and encrypted
                </p>
              </form>
            </div>
          </div>

          {/* RIGHT COLUMN: Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sticky top-8">
              <h3 className="text-xl font-bold text-white mb-6">Order Summary</h3>
              
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-zinc-800">
                <div className="w-16 h-16 bg-zinc-800 rounded-lg flex items-center justify-center text-3xl">
                  💪
                </div>
                <div>
                  <h4 className="font-bold text-white">{plan.name}</h4>
                  <p className="text-sm text-zinc-400">Monthly Billing</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-lg font-bold text-white pt-2 border-t border-zinc-800">
                  <span>Total</span>
                  <span className="text-emerald-400">৳{plan.total.toFixed(2)}</span>
                </div>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
                <h5 className="font-bold text-emerald-400 text-sm mb-2 flex items-center gap-2">
                  <FaCheckCircle /> Includes:
                </h5>
                <ul className="space-y-2">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="text-xs text-emerald-200/80 flex items-center gap-2">
                      <span className="w-1 h-1 bg-emerald-500 rounded-full"></span> {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Checkout;