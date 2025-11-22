import { useEffect, useRef, useState } from "react";
import CompoHeading from "../../Shared/CompoHeading";
import useAllClasses from "../../hooks/useAllClasses";
import ClassCard from "./ClassCard";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import { FaDumbbell, FaFire } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const AllClasses = () => {
  const [search, setSearch] = useState("");
  const inputRef = useRef(null);
  const axiosPublic = useAxiosPublic();

  // Fetch total count for pagination
  const { data: countData } = useQuery({
    queryKey: ["classCount"],
    queryFn: async () => {
      const res = await axiosPublic.get("/classesCount");
      return res.data;
    },
  });

  const count = countData?.count || 0;
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;
  const numberOfPages = Math.ceil(count / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()];
  const [classes, isLoading] = useAllClasses(currentPage, itemsPerPage);
  //

  useEffect(() => {
    const handleClickOutside = (event) => {
      // console.log("Clicked outside:", event.target); // Debugging log
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        // console.log("Clearing input field"); // Debugging log
        setSearch("");
        inputRef.current.value = "";
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [inputRef]);

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  // handle previous page button
  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  //   //   handle next page button
  const handleNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="px-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-300 relative overflow-hidden">
       <div className="text-center my-16">
        <div className="inline-flex items-center gap-2 bg-[#16A34A]/10 text-[#16A34A] px-4 py-2 rounded-full text-sm font-semibold mb-4">
          <FaFire className="text-sm" />
          Best Classes
        </div>
        <CompoHeading
          normHeading={"Our Popular"}
          colorHeading="Classes"
          desc="Meet our certified fitness professionals who are dedicated to helping you achieve your health and wellness goals."
        />
      </div>
      <div className="my-12 w-full px-4">
        <br />
        <form onChange={(e) => setSearch(e.target.value)}>
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              name="text"
              className="grow"
              placeholder="Search"
              ref={inputRef}
            />
            <button type="Submit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </label>
        </form>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
        {classes
          .filter((item) => {
            return search.toLowerCase() === ""
              ? item
              : item.classname.toLowerCase().includes(search);
          })
          .map((singleClass) => (
            <div
              key={singleClass._id}
              className="group transform hover:scale-105 transition-all duration-300"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-[#16A34A]/10 transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700">
                <ClassCard singleClass={singleClass} />
              </div>
            </div>
          ))}
      </div>
      <div className="text-center my-10 space-x-8">
        {/* pagination */}

        <button onClick={handlePrevPage} className="join-item btn btn-outline">
          Previous page
        </button>
        {pages.map((page, i) => (
          <button
            className={currentPage === page && `selected-btn btn`}
            onClick={() => setCurrentPage(page)}
            key={i}
          >
            {page}
          </button>
        ))}
        <button onClick={handleNextPage} className="join-item btn btn-outline">
          Next
        </button>
      </div>
    </div>
  );
};

export default AllClasses;

// /////
// {
//   classes.map((singleClass) => (
//     <ClassCard key={singleClass._id} singleClass={singleClass}></ClassCard>
//   ));
// }
