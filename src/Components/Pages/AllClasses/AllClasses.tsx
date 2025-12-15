import { useEffect, useRef, useState } from "react";
import { FaFire, FaSearch } from "react-icons/fa";
import ClassCard from "./ClassCard";

// 1. STATIC DATA (Replaces Database)
// I added enough items here to test your pagination (6 per page)
const staticClasses = [
  { _id: 1, classname: "Spartan HIIT", trainer: "Marcus Thorne", duration: "45 Min", intensity: "Extreme", image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=1000&auto=format&fit=crop", description: "High intensity interval training designed to burn fat and build endurance." },
  { _id: 2, classname: "Power Yoga Flow", trainer: "Dr. Kenji Sato", duration: "60 Min", intensity: "Medium", image: "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=1000&auto=format&fit=crop", description: "A strength-focused yoga session to improve mobility and core stability." },
  { _id: 3, classname: "Iron Pump", trainer: "Sarah Jenkins", duration: "75 Min", intensity: "High", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop", description: "Classic bodybuilding hypertrophy training. Isolate muscles and grow." },
  { _id: 4, classname: "Marathon Prep", trainer: "Elena Rodriguez", duration: "90 Min", intensity: "High", image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=1000&auto=format&fit=crop", description: "Endurance running drills mixed with lower body plyometrics." },
  { _id: 5, classname: "Boxing Basics", trainer: "Mike Tyson", duration: "50 Min", intensity: "High", image: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=1000&auto=format&fit=crop", description: "Learn the sweet science. Footwork, jabs, and defensive maneuvers." },
  { _id: 6, classname: "Core Crusher", trainer: "Sarah Jenkins", duration: "30 Min", intensity: "Medium", image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1000&auto=format&fit=crop", description: "A quick, brutal session focused entirely on abdominal strength." },
  { _id: 7, classname: "CrossFit Mayhem", trainer: "Marcus Thorne", duration: "60 Min", intensity: "Extreme", image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1000&auto=format&fit=crop", description: "Functional fitness at its peak. Barbells, gymnastics, and cardio." },
  { _id: 8, classname: "Morning Mobility", trainer: "Dr. Kenji Sato", duration: "40 Min", intensity: "Low", image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1000&auto=format&fit=crop", description: "Wake up your joints and prepare your body for the day ahead." },
];

const AllClasses = () => {
  const [search, setSearch] = useState("");
  const inputRef = useRef(null);

  // PAGINATION LOGIC (Client-side)
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;
  
  // 1. Filter data based on search
  const filteredClasses = staticClasses.filter((item) => 
    search.toLowerCase() === "" 
      ? item 
      : item.classname.toLowerCase().includes(search.toLowerCase())
  );

  // 2. Calculate pagination based on FILTERED results
  const pageCount = Math.ceil(filteredClasses.length / itemsPerPage);
  const pages = [...Array(pageCount).keys()];

  // 3. Slice data for current page
  const displayClasses = filteredClasses.slice(
    currentPage * itemsPerPage, 
    (currentPage + 1) * itemsPerPage
  );

  // Reset to page 0 if search changes
  useEffect(() => {
    setCurrentPage(0);
  }, [search]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        // Optional: clear search on click outside
        // setSearch("");
        // inputRef.current.value = "";
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Pagination Handlers
  const handlePrevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < pages.length - 1) setCurrentPage(currentPage + 1);
  };

  return (
    // MAIN CONTAINER: Zinc-950 for Dark Theme consistency
    <div className="min-h-screen bg-zinc-950 text-zinc-100 px-4 sm:px-6 py-16 relative overflow-hidden transition-colors duration-300">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none" />

      {/* HEADER */}
      <div className="text-center mb-12 relative z-10">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-emerald-500/20 mb-6">
          <FaFire />
          <span>Sweat & Glory</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Our Popular <span className="text-green-600">Classes</span>
        </h1>
        <p className="text-zinc-400 max-w-2xl mx-auto">
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
        {displayClasses.length > 0 ? (
          displayClasses.map((singleClass) => (
            <div key={singleClass._id} className="h-full">
               <ClassCard singleClass={singleClass} />
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-20 text-zinc-500">
            No classes found matching "{search}"
          </div>
        )}
      </div>

      {/* PAGINATION */}
      {pageCount > 1 && (
        <div className="flex justify-center items-center gap-4 relative z-10">
          <button 
            onClick={handlePrevPage} 
            disabled={currentPage === 0}
            className="px-4 py-2 rounded-lg border border-zinc-700 text-zinc-400 hover:bg-zinc-800 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Previous
          </button>
          
          <div className="flex gap-2">
            {pages.map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold transition-all ${
                  currentPage === page 
                    ? "bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.4)]" 
                    : "bg-zinc-900 text-zinc-500 hover:bg-zinc-800 hover:text-white border border-zinc-800"
                }`}
              >
                {page + 1}
              </button>
            ))}
          </div>

          <button 
            onClick={handleNextPage} 
            disabled={currentPage === pages.length - 1}
            className="px-4 py-2 rounded-lg border border-zinc-700 text-zinc-400 hover:bg-zinc-800 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AllClasses;