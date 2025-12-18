export type Meal = {
  name: string;
  calories: number;
  protein: string;
  desc: string;
};

export type DietPlan = {
  bmiRange: string;
  category: string;
  goal: string;
  dailyCalories: number;
  macros: { protein: string; carbs: string; fats: string };
  color: string; // For UI theming
  meals: {
    breakfast: Meal;
    lunch: Meal;
    snack: Meal;
    dinner: Meal;
  };
};

export const nutritionPlans: DietPlan[] = [
  {
    bmiRange: "< 18.5",
    category: "Underweight",
    goal: "Healthy Surplus (Gain Muscle & Mass)",
    dailyCalories: 2800,
    macros: { protein: "30%", carbs: "50%", fats: "20%" },
    color: "text-blue-400",
    meals: {
      breakfast: {
        name: "Power Oats & Peanut Butter",
        calories: 600,
        protein: "25g",
        desc: "Oatmeal cooked with whole milk, 2 tbsp peanut butter, banana, and whey protein scoop.",
      },
      lunch: {
        name: "Chicken Pesto Pasta",
        calories: 850,
        protein: "45g",
        desc: "200g pasta with pesto sauce, grilled chicken breast, and olive oil drizzle.",
      },
      snack: {
        name: "Mass Shake",
        calories: 500,
        protein: "30g",
        desc: "Whole milk, banana, oats, whey protein, and honey blended.",
      },
      dinner: {
        name: "Steak & Loaded Potatoes",
        calories: 850,
        protein: "50g",
        desc: "Grilled beef steak, large baked potato with cheese, and roasted asparagus.",
      },
    },
  },
  {
    bmiRange: "18.5 - 24.9",
    category: "Normal Weight",
    goal: "Maintenance & Athletic Performance",
    dailyCalories: 2400,
    macros: { protein: "30%", carbs: "40%", fats: "30%" },
    color: "text-emerald-400",
    meals: {
      breakfast: {
        name: "Avocado Toast & Eggs",
        calories: 550,
        protein: "25g",
        desc: "2 slices whole grain toast, half avocado, 3 scrambled eggs.",
      },
      lunch: {
        name: "Turkey Quinoa Bowl",
        calories: 700,
        protein: "40g",
        desc: "Ground turkey, quinoa, black beans, corn, and salsa.",
      },
      snack: {
        name: "Greek Yogurt Parfait",
        calories: 350,
        protein: "20g",
        desc: "Greek yogurt, mixed berries, and a handful of almonds.",
      },
      dinner: {
        name: "Salmon & Roasted Veggies",
        calories: 800,
        protein: "45g",
        desc: "Baked salmon fillet, sweet potato mash, and broccoli.",
      },
    },
  },
  {
    bmiRange: "25.0 - 29.9",
    category: "Overweight",
    goal: "Moderate Deficit (Fat Loss)",
    dailyCalories: 1900,
    macros: { protein: "40%", carbs: "30%", fats: "30%" },
    color: "text-orange-400",
    meals: {
      breakfast: {
        name: "Veggie Egg White Omelet",
        calories: 400,
        protein: "30g",
        desc: "4 egg whites, spinach, mushrooms, peppers, and 1 slice toast.",
      },
      lunch: {
        name: "Grilled Chicken Salad",
        calories: 550,
        protein: "45g",
        desc: "Large mixed greens salad, grilled chicken breast, light vinaigrette.",
      },
      snack: {
        name: "Protein Bar & Apple",
        calories: 300,
        protein: "20g",
        desc: "Low-sugar protein bar and a green apple.",
      },
      dinner: {
        name: "Lean Beef Stir-Fry",
        calories: 650,
        protein: "40g",
        desc: "Lean beef strips, broccoli, snap peas, soy sauce, served over cauliflower rice.",
      },
    },
  },
  {
    bmiRange: "30.0 +",
    category: "Obese",
    goal: "Aggressive Deficit (Weight Management)",
    dailyCalories: 1600,
    macros: { protein: "45%", carbs: "20%", fats: "35%" },
    color: "text-red-400",
    meals: {
      breakfast: {
        name: "Protein Smoothie",
        calories: 350,
        protein: "30g",
        desc: "Water/Almond milk, whey protein, spinach, frozen berries.",
      },
      lunch: {
        name: "Tuna Lettuce Wraps",
        calories: 450,
        protein: "40g",
        desc: "2 cans tuna mixed with light mayo, wrapped in romaine lettuce leaves.",
      },
      snack: {
        name: "Cottage Cheese Bowl",
        calories: 200,
        protein: "20g",
        desc: "Low-fat cottage cheese with cucumber slices.",
      },
      dinner: {
        name: "White Fish & Greens",
        calories: 600,
        protein: "45g",
        desc: "Baked cod or tilapia, massive side of steamed green beans and zucchini.",
      },
    },
  },
];