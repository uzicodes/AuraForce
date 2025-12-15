"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaCalendarAlt, 
  FaWeight, 
  FaRulerVertical, 
  FaMapMarkerAlt, 
  FaVenusMars,
  FaArrowLeft,
  FaSave,
  FaLock
} from "react-icons/fa";

const EditProfile = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Initial State (Simulating existing user data)
  const [formData, setFormData] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@example.com", // Read-only
    phone: "+8801712345678",           // Read-only
    dob: "",
    age: "",                           // Auto-calculated
    weight: "",
    heightFeet: "",
    heightInches: "",
    gender: "Male",
    location: "Gulshan, Dhaka",
  });

  // Auto-Calculate Age when DOB changes
  useEffect(() => {
    if (formData.dob) {
      const today = new Date();
      const birthDate = new Date(formData.dob);
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      setFormData((prev) => ({ ...prev, age: age.toString() }));
    }
  }, [formData.dob]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API Call
    setTimeout(() => {
      setLoading(false);
      toast.success("Profile Updated Successfully!");
      router.push("/profile");
    }, 1500);
  };

  return (
    <section className="min-h-screen bg-zinc-950 py-12 px-4 sm:px-6 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto max-w-4xl relative z-10 pt-4">
        
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/profile" className="inline-flex items-center gap-2 text-zinc-400 hover:text-emerald-500 transition-colors">
            <FaArrowLeft /> Back to Profile
          </Link>
        </div>

        {/* Main Card */}
        <div className="bg-zinc-900/80 backdrop-blur-md border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl">
          
          {/* Header Banner */}
          <div className="relative h-40 bg-zinc-800">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/20 to-zinc-900/50" />
            <div className="absolute -bottom-12 left-8">
              <div className="relative w-24 h-24 rounded-full border-4 border-zinc-900 overflow-hidden bg-zinc-800 shadow-xl">
                <Image 
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop" 
                  alt="Profile" 
                  fill 
                  className="object-cover"
                />
              </div>
              <button className="absolute bottom-0 right-0 bg-zinc-800 p-1.5 rounded-full border border-zinc-700 text-emerald-500 hover:text-white hover:bg-emerald-600 transition-colors text-xs">
                Change
              </button>
            </div>
          </div>

          <div className="pt-16 px-8 pb-8">
            <h1 className="text-2xl font-bold text-white mb-1">Edit Profile</h1>
            <p className="text-zinc-400 text-sm mb-8">Update your personal details and physical stats.</p>

            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* SECTION 1: Personal Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Full Name</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleChange}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 pl-10 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all placeholder-zinc-600" 
                    />
                    <FaUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 text-sm" />
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Location</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      name="location" 
                      value={formData.location} 
                      onChange={handleChange}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 pl-10 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all placeholder-zinc-600" 
                    />
                    <FaMapMarkerAlt className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 text-sm" />
                  </div>
                </div>

                {/* Email (Read Only) */}
                <div className="space-y-1.5 opacity-60 cursor-not-allowed">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1">
                    Email <FaLock className="text-[10px]" />
                  </label>
                  <div className="relative">
                    <input 
                      type="email" 
                      value={formData.email} 
                      readOnly 
                      className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-3 pl-10 text-zinc-400 cursor-not-allowed" 
                    />
                    <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-600 text-sm" />
                  </div>
                </div>

                {/* Phone (Read Only) */}
                <div className="space-y-1.5 opacity-60 cursor-not-allowed">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1">
                    Phone <FaLock className="text-[10px]" />
                  </label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={formData.phone} 
                      readOnly 
                      className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-3 pl-10 text-zinc-400 cursor-not-allowed" 
                    />
                    <FaPhone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-600 text-sm" />
                  </div>
                </div>
              </div>

              <div className="w-full h-px bg-zinc-800" />

              {/* SECTION 2: Physical Stats */}
              <div>
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <FaWeight className="text-emerald-500" /> Physical Stats
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  {/* Date of Birth */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Date of Birth</label>
                    <div className="relative">
                      <input 
                        type="date" 
                        name="dob" 
                        value={formData.dob} 
                        onChange={handleChange}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 pl-10 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all [color-scheme:dark]" 
                      />
                      <FaCalendarAlt className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 text-sm pointer-events-none" />
                    </div>
                  </div>

                  {/* Age (Auto-Calculated) */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Age</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        value={formData.age ? `${formData.age} years` : ""} 
                        readOnly 
                        placeholder="Select DOB"
                        className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-3 text-emerald-400 font-bold cursor-not-allowed" 
                      />
                    </div>
                  </div>

                  {/* Gender */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Gender</label>
                    <div className="relative">
                      <select 
                        name="gender" 
                        value={formData.gender} 
                        onChange={handleChange}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 pl-10 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all appearance-none"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                      <FaVenusMars className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 text-sm pointer-events-none" />
                    </div>
                  </div>

                  {/* Weight */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Weight (kg)</label>
                    <div className="relative">
                      <input 
                        type="number" 
                        name="weight" 
                        value={formData.weight} 
                        onChange={handleChange}
                        placeholder="00"
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 pl-10 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all" 
                      />
                      <FaWeight className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 text-sm" />
                    </div>
                  </div>

                  {/* Height (Split Fields) */}
                  <div className="md:col-span-2 space-y-1.5">
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Height</label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="relative">
                        <input 
                          type="number" 
                          name="heightFeet" 
                          value={formData.heightFeet} 
                          onChange={handleChange}
                          placeholder="Feet"
                          className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 pl-10 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all" 
                        />
                        <FaRulerVertical className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 text-sm" />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 text-xs font-bold">FT</span>
                      </div>
                      <div className="relative">
                        <input 
                          type="number" 
                          name="heightInches" 
                          value={formData.heightInches} 
                          onChange={handleChange}
                          placeholder="Inches"
                          className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 pl-10 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all" 
                        />
                        <FaRulerVertical className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 text-sm" />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 text-xs font-bold">IN</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4 border-t border-zinc-800">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-emerald-900/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="animate-pulse">Saving Changes...</span>
                  ) : (
                    <>
                      <FaSave /> Save Changes
                    </>
                  )}
                </button>
                <button 
                  type="button"
                  onClick={() => router.back()}
                  className="px-8 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold py-3.5 rounded-xl transition-all"
                >
                  Cancel
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditProfile;