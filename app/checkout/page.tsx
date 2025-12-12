"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaLock, FaCreditCard, FaGooglePay, FaCheckCircle, FaArrowLeft, FaMobileAlt, FaKey } from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

const Checkout = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // State
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [loading, setLoading] = useState(false);
  
  // Card State
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");

  // bKash State
  const [bkashNumber, setBkashNumber] = useState("");
  const [bkashPin, setBkashPin] = useState("");

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
  
  const plan = {
    name: `${planName} Membership`,
    price: selectedPlan.price,
    total: selectedPlan.price,
    features: selectedPlan.features
  };

  // --- Handlers ---

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s/g, "").replace(/\D/g, "");
    if (value.length <= 16) {
      const formatted = value.match(/.{1,4}/g)?.join(" ") || value;
      setCardNumber(formatted);
    }
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 1. CARD VALIDATION
    if (paymentMethod === "card") {
      const digitsOnly = cardNumber.replace(/\s/g, "");
      if (digitsOnly.length !== 16) {
        toast.error("Card number must be exactly 16 digits");
        return;
      }
      if (!cardHolder || !expiry || !cvc) {
        toast.error("Please fill in all card details");
        return;
      }
    }

    // 2. BKASH VALIDATION
    if (paymentMethod === "bkash") {
      const mobileRegex = /^01[3-9]\d{8}$/; // Bangladesh number format
      if (!mobileRegex.test(bkashNumber)) {
        toast.error("Please enter a valid 11-digit bKash number (e.g., 017...)");
        return;
      }
      if (bkashPin.length < 4) {
        toast.error("Please enter your PIN");
        return;
      }
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      router.push("/checkout/success"); 
      toast.success("Payment Successful!");
    }, 2000);
  };

  return (
    <section className="min-h-screen bg-zinc-950 py-12 px-4 sm:px-6 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10 pt-4"> 
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          
          {/* LEFT COLUMN: Payment Details */}
          <div className="lg:col-span-2 space-y-4">
            
            {/* Back Button */}
            <div className="mb-4 mt-8">
              <Link href="/#membership" className="inline-flex items-center gap-1 text-zinc-400 hover:text-emerald-500 transition-colors text-sm">
                <FaArrowLeft /> Back to Plans
              </Link>
            </div>
            
            <h1 className="text-2xl font-bold text-white mb-1">Secure Checkout</h1>
            <p className="text-sm text-zinc-400 mb-5">Complete your registration to start your journey.</p>

            {/* Payment Method Selector (More Compact) */}
            <div className="grid grid-cols-3 gap-3 mb-5">
              {[
                { id: "card", icon: FaCreditCard, label: "Card", type: "icon" },
                { id: "bkash", imageSrc: "/bkash.jpg", label: "bKash", type: "image" },
                { id: "googlepay", icon: FaGooglePay, label: "Google Pay", type: "icon" },
              ].map((method) => (
                <button
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id)}
                  className={`flex flex-col items-center justify-center p-3.5 rounded-xl border transition-all duration-200 ${
                    paymentMethod === method.id
                      ? "bg-emerald-500/10 border-emerald-500 text-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.15)]"
                      : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:bg-zinc-800"
                  }`}
                >
                  {method.type === "icon" && method.icon && (
                    <method.icon className="text-xl mb-1.5" />
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
                  <span className="text-[11px] font-bold uppercase tracking-wide">{method.label}</span>
                </button>
              ))}
            </div>

            {/* DYNAMIC FORM AREA (Compact Spacing) */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <form onSubmit={handlePayment} className="space-y-4">
                
                {/* --- OPTION 1: CARD PAYMENT --- */}
                {paymentMethod === "card" && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div>
                      <label className="block text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider">Cardholder Name</label>
                      <input 
                        type="text" 
                        placeholder="Full Name on Card" 
                        required 
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all placeholder-zinc-600" 
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider">Card Number</label>
                      <div className="relative">
                        <input 
                          type="text" 
                          placeholder="0000 0000 0000 0000" 
                          value={cardNumber}
                          onChange={handleCardNumberChange}
                          required 
                          maxLength={19}
                          className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2.5 pl-10 text-sm text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all placeholder-zinc-600" 
                        />
                        <FaCreditCard className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 text-sm" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider">Expiry Date</label>
                        <input 
                          type="text" 
                          placeholder="MM/YY" 
                          required 
                          value={expiry}
                          onChange={(e) => setExpiry(e.target.value)}
                          maxLength={5}
                          className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all placeholder-zinc-600" 
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider">CVC</label>
                        <input 
                          type="text" 
                          placeholder="123" 
                          required 
                          value={cvc}
                          onChange={(e) => setCvc(e.target.value)}
                          maxLength={3}
                          className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all placeholder-zinc-600" 
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* --- OPTION 2: bKash PAYMENT --- */}
                {paymentMethod === "bkash" && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="bg-pink-600/10 border border-pink-600/20 rounded-xl p-3 flex items-center justify-center mb-2">
                      <div className="text-center">
                        <p className="text-pink-500 font-bold text-sm mb-0.5">Pay with bKash</p>
                        <p className="text-zinc-400 text-[10px]">Enter your wallet details securely</p>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider">bKash Account Number</label>
                      <div className="relative">
                        <input 
                          type="text" 
                          placeholder="017XXXXXXXX" 
                          value={bkashNumber}
                          onChange={(e) => setBkashNumber(e.target.value)}
                          required 
                          maxLength={11}
                          className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2.5 pl-10 text-sm text-white focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all placeholder-zinc-600" 
                        />
                        <FaMobileAlt className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 text-sm" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider">PIN</label>
                      <div className="relative">
                        <input 
                          type="password" 
                          placeholder="•••••" 
                          value={bkashPin}
                          onChange={(e) => setBkashPin(e.target.value)}
                          required 
                          maxLength={5}
                          className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2.5 pl-10 text-sm text-white focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all placeholder-zinc-600 tracking-widest" 
                        />
                        <FaKey className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 text-sm" />
                      </div>
                    </div>
                  </div>
                )}

                {/* --- OPTION 3: GOOGLE PAY --- */}
                {paymentMethod === "googlepay" && (
                  <div className="flex flex-col items-center justify-center py-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-lg">
                      <FaGooglePay className="text-3xl text-zinc-800" />
                    </div>
                    <h3 className="text-white font-bold text-base mb-1">Pay with Google Pay</h3>
                    <p className="text-zinc-400 text-center max-w-xs mb-4 text-xs leading-relaxed">
                      You will be redirected to Google secure checkout to complete your purchase.
                    </p>
                  </div>
                )}

                {/* PAY BUTTON */}
                <button 
                  type="submit" 
                  disabled={loading}
                  className={`w-full font-bold py-3.5 rounded-xl transition-all shadow-lg mt-2 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed transform active:scale-[0.98] text-sm ${
                    paymentMethod === 'bkash' 
                      ? "bg-pink-600 hover:bg-pink-500 text-white shadow-pink-600/20"
                      : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-900/20"
                  }`}
                >
                  {loading ? (
                    <span className="animate-pulse">Processing...</span>
                  ) : (
                    <>
                      <FaLock className="text-xs" /> 
                      {paymentMethod === 'googlepay' ? 'Continue to GPay' : `Pay ৳${plan.total.toLocaleString()}`}
                    </>
                  )}
                </button>
                
                <p className="text-center text-[10px] text-zinc-500 flex items-center justify-center gap-1 mt-3">
                  <FaLock className="text-[8px]" /> Payments are secure and encrypted
                </p>
              </form>
            </div>
          </div>

          {/* RIGHT COLUMN: Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sticky top-24 mt-40">
              <h3 className="text-lg font-bold text-white mb-5">Order Summary</h3>
              <div className="flex items-center gap-4 mb-5 pb-5 border-b border-zinc-800">
                <div className="relative w-12 h-12 bg-zinc-800 rounded-lg flex items-center justify-center p-2">
                  <Image
                    src="/for favicon.png"
                    alt="Aura Force Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">{plan.name}</h4>
                  <p className="text-xs text-zinc-400">Monthly Billing</p>
                </div>
              </div>

              <div className="space-y-2 mb-5">
                <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-zinc-800">
                  <span>Total</span>
                  <span className="text-emerald-400">৳{plan.total.toLocaleString()}</span>
                </div>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
                <h5 className="font-bold text-emerald-400 text-xs mb-2 flex items-center gap-2 uppercase tracking-wide">
                  <FaCheckCircle /> Includes:
                </h5>
                <ul className="space-y-2">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="text-[11px] text-emerald-200/80 flex items-center gap-2">
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