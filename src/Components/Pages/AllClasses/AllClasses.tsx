import { useEffect, useRef, useState } from "react";
import { FaFire, FaSearch } from "react-icons/fa";
import ClassCard from "./ClassCard";

// STATIC DATA 
const staticClasses = [
  {
    _id: 1,
    classname: "Spartan HIIT",
    trainer: "Jack Chen",
    duration: "45 Min",
    intensity: "Extreme",
    image: "/images/classes/1.jpg",
    description: "High intensity interval training designed to burn fat and build endurance."
  },
  {
    _id: 2,
    classname: "Power Yoga Flow",
    trainer: "Maya Johansson",
    duration: "60 Min",
    intensity: "Medium",
    image: "/images/classes/2.jpg",
    description: "A strength-focused yoga session to improve mobility and core stability."
  },
  {
    _id: 3,
    classname: "Iron Pump",
    trainer: "Marcus Anvil",
    duration: "75 Min",
    intensity: "High",
    image: "/images/classes/3.jpg",
    description: "Classic bodybuilding hypertrophy training. Isolate muscles and grow."
  },
  {
    _id: 4,
    classname: "Marathon Prep",
    trainer: "Elena Rodriguez",
    duration: "90 Min",
    intensity: "High",
    image: "/images/classes/4.jpg",
    description: "Endurance running drills mixed with lower body plyometrics."
  },
  {
    _id: 5,
    classname: "Boxing Basics",
    trainer: "Tyrone Williams",
    duration: "50 Min",
    intensity: "High",
    image: "/images/classes/5.jpg",
    description: "Learn the sweet science. Footwork, jabs, and defensive maneuvers."
  },
  {
    _id: 6,
    classname: "Core Crusher",
    trainer: "David Okonkwo",
    duration: "30 Min",
    intensity: "Medium",
    image: "/images/classes/6.jpg",
    description: "A quick, brutal session focused entirely on abdominal strength."
  },
  {
    _id: 7,
    classname: "CrossFit Mayhem",
    trainer: "Marcus Thorne",
    duration: "60 Min",
    intensity: "Extreme",
    image: "/images/classes/7.jpg",
    description: "Functional fitness at its peak. Barbells, gymnastics, and cardio."
  },
  {
    _id: 8,
    classname: "Morning Mobility",
    trainer: "Dr. Kenji Sato",
    duration: "40 Min",
    intensity: "Low",
    image: "/images/classes/8.jpg",
    description: "Wake up your joints and prepare your body for the day ahead."
  },
  {
    _id: 9,
    classname: "Pilates Precision",
    trainer: "Dr. Kenji Sato",
    duration: "55 Min",
    intensity: "Medium",
    image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=2070&auto=format&fit=crop",
    description: "Build core strength, flexibility, and lean muscle with controlled low-impact movements."
  },
];

const AllClasses = () => {
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter data based on search
  const filteredClasses = staticClasses.filter((item) =>
    search.toLowerCase() === ""
      ? item
      : item.classname.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);



  return (
    // MAIN CONTAINERency
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">

      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-96 bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

      {/* HEADER */}
      <div className="text-center mb-12 relative z-10">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-emerald-500/20 mb-6">
          <FaFire />
          <span>Sweat & Glory</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-heading">
          Our Popular <span className="text-green-600">Classes</span>
        </h1>
        <p className="text-zinc-400 max-w-2xl mx-auto font-satoshi">
          From high-intensity interval training to restorative yoga, we have a program designed to push your limits. Choose your class and ignite your potential !
        </p>
      </div>

      {/* SEARCH BAR */}
      <div className="max-w-md mx-auto mb-12 relative z-10">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-zinc-500 group-focus-within:text-emerald-500 transition-colors" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-zinc-800 rounded-xl leading-5 bg-zinc-900/50 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:bg-zinc-900 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-all shadow-lg"
            placeholder="Search by class name..."
            ref={inputRef}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* GRID LAYOUT */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16 relative z-10">
        {filteredClasses.length > 0 ? (
          filteredClasses.map((singleClass, index) => (
            <div key={singleClass._id} className="h-full">
              <ClassCard singleClass={singleClass} index={index} />
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-20 text-zinc-500">
            No classes found matching "{search}"
          </div>
        )}
      </div>


    </div>
  );
};

export default AllClasses;