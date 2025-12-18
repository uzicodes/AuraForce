import React from "react";
import Link from "next/link";
// 1. Add Image import
import Image from "next/image";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { checkUser } from "@/lib/checkUser";
import { nutritionPlans } from "@/lib/nutritionData";
import { FaExclamationTriangle, FaUserEdit, FaUtensils, FaDumbbell, FaLeaf } from "react-icons/fa";

// BMI Calculator
const calculateBMI = (weightKg: number, feet: number, inches: number) => {
  const totalInches = (feet * 12) + inches;
  const heightMeters = totalInches * 0.0254;
  const bmi = weightKg / (heightMeters * heightMeters);
  return parseFloat(bmi.toFixed(1));
};

export default async function NutritionPage() {
  const user = await checkUser();
  if (!user) redirect("/login");

  const dbUser = await db.user.findUnique({
    where: { clerkUserId: user.clerkUserId },
  });

  if (!dbUser) redirect("/login");

  // CHECK: Does user have required data?
  const hasData = dbUser.weight && dbUser.heightFeet && dbUser.heightInches;

  // --- SCENARIO 1: Missing Data (Warning View) ---
  if (!hasData) {
    return (
      // Updated Wrapper: Added 'relative' and overflow-hidden
      <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden">
        
        {/* --- BACKGROUND IMAGE START --- */}
        <Image
          src="https://images.unsplash.com/photo-1466637574441-749b8f19452f?q=80&w=2080&auto=format&fit=crop"
          alt="Nutrition Background"
          fill
          className="object-cover opacity-30"
          priority
        />
        {/* Strong overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/90 to-zinc-950" />
        {/* --- BACKGROUND IMAGE END --- */}

        {/* Content Card (Added relative z-10 to sit on top) */}
        <div className="relative z-10 max-w-md w-full bg-zinc-900/80 backdrop-blur-md border border-yellow-500/30 rounded-3xl p-8 text-center shadow-2xl">
          <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-yellow-500 text-3xl">
            <FaExclamationTriangle />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Missing Body Stats</h2>
          <p className="text-zinc-400 mb-8">
            To generate your plan, we need your <strong>Weight</strong> and <strong>Height</strong> to calculate your BMI.
          </p>
          <Link 
            href="/profile/edit"
            className="flex items-center justify-center gap-2 w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-900/20"
          >
            <FaUserEdit /> Update Profile Now
          </Link>
          <Link href="/" className="block mt-4 text-zinc-500 hover:text-white text-sm transition-colors">
            Cancel
          </Link>
        </div>
      </div>
    );
  }

  // --- SCENARIO 2: Data Exists (Plan View) ---
  const weight = parseFloat(dbUser.weight);
  const feet = parseFloat(dbUser.heightFeet);
  const inches = parseFloat(dbUser.heightInches);
  
  const bmi = calculateBMI(weight, feet, inches);

  let selectedPlan = nutritionPlans.find(p => p.category === "Obese");
  if (bmi < 18.5) selectedPlan = nutritionPlans.find(p => p.category === "Underweight");
  else if (bmi >= 18.5 && bmi <= 24.9) selectedPlan = nutritionPlans.find(p => p.category === "Normal Weight");
  else if (bmi >= 25 && bmi <= 29.9) selectedPlan = nutritionPlans.find(p => p.category === "Overweight");

  return (
    // Updated Wrapper: Changed bg-zinc-950 to relative, added overflow-hidden
    <section className="min-h-screen relative py-20 px-4 overflow-hidden">
      
      {/* --- BACKGROUND IMAGE START --- */}
      <Image
          src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2053&auto=format&fit=crop"
          alt="Healthy Food Background"
          fill
          className="object-cover opacity-25"
          priority
        />
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/90 to-zinc-950/80" />
      {/* --- BACKGROUND IMAGE END --- */}

      {/* Main Container (Added relative z-10) */}
      <div className="container relative z-10 mx-auto max-w-5xl">
        
        {/* Header with BMI Result */}
        <div className="text-center mb-16">
          <p className="text-emerald-500 font-bold tracking-widest uppercase mb-2">Analysis Complete</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Plan: <span className={selectedPlan?.color}>{selectedPlan?.category}</span>
          </h1>
          
          {/* Added backdrop-blur to cards for better blending with bg image */}
          <div className="inline-flex items-center gap-8 bg-zinc-900/80 backdrop-blur-md border border-zinc-800/50 p-6 rounded-2xl shadow-xl">
            <div className="text-right border-r border-zinc-800/50 pr-8">
              <div className="text-zinc-500 text-xs uppercase font-bold">Your BMI</div>
              <div className="text-4xl font-bold text-white">{bmi}</div>
            </div>
            <div className="text-left">
              <div className="text-zinc-500 text-xs uppercase font-bold">Daily Target</div>
              <div className="text-4xl font-bold text-white">{selectedPlan?.dailyCalories} <span className="text-sm text-zinc-500 font-normal">kcal</span></div>
            </div>
          </div>
        </div>

        {/* Plan Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-zinc-900/80 backdrop-blur-md border border-zinc-800/50 rounded-3xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><FaDumbbell className="text-emerald-500" /> Goal</h3>
              <p className="text-zinc-300 leading-relaxed">{selectedPlan?.goal}</p>
            </div>

            <div className="bg-zinc-900/80 backdrop-blur-md border border-zinc-800/50 rounded-3xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><FaLeaf className="text-emerald-500" /> Macros</h3>
              <div className="space-y-4">
                {['protein', 'carbs', 'fats'].map((macro) => (
                  <div key={macro}>
                    <div className="flex justify-between text-sm text-zinc-400 mb-1 capitalize">
                      <span>{macro}</span>
                      <span>{selectedPlan?.macros[macro as keyof typeof selectedPlan.macros]}</span>
                    </div>
                    <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                      <div className={`h-full ${macro === 'protein' ? 'bg-blue-500' : macro === 'carbs' ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: selectedPlan?.macros[macro as keyof typeof selectedPlan.macros] }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Daily Menu */}
          <div className="lg:col-span-2 bg-zinc-900/80 backdrop-blur-md border border-zinc-800/50 rounded-3xl p-8 shadow-lg">
             <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3"><FaUtensils className="text-emerald-500" /> Daily Menu</h3>
             <div className="space-y-8">
               {selectedPlan?.meals && Object.entries(selectedPlan.meals).map(([type, meal]: [string, any]) => (
                 <div key={type} className="flex gap-4 sm:gap-6 group">
                   <div className="w-12 flex flex-col items-center">
                      <div className="w-3 h-3 bg-emerald-500 rounded-full mb-1 group-hover:scale-125 transition-transform shadow-[0_0_10px_rgba(16,185,129,0.4)]"></div>
                      <div className="w-0.5 flex-1 bg-zinc-800 group-last:hidden"></div>
                   </div>
                   <div className="pb-8">
                     <p className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-1">{type}</p>
                     <h4 className="text-xl font-bold text-white mb-2">{meal.name}</h4>
                     <p className="text-zinc-400 text-sm mb-3">{meal.desc}</p>
                     
                     <div className="inline-flex items-center gap-4 text-xs font-mono text-zinc-400 bg-zinc-950/60 px-3 py-2 rounded-lg border border-zinc-800/50">
                       <span>{meal.calories} kcal</span><span>|</span><span>{meal.protein} Protein</span>
                     </div>

                   </div>
                 </div>
               ))}
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}