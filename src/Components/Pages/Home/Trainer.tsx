/* eslint-disable react/prop-types */
import {
  FaFacebook,
  FaHeadSideVirus,
  FaInstagram,
  FaTwitterSquare,
} from "react-icons/fa";
import { LiaDumbbellSolid } from "react-icons/lia";
import { Link } from "react-router-dom";

const Trainer = ({ trainer }) => {
  const {
    _id,
    name,
    availableDay,
    availableTime,
    expertise,
    email,
    experience,
    category,
    bio,
    certification,
    pic,
  } = trainer;
  const shortBio = bio.split(".").splice(0, 2).join(".");

  return (
    <div className="group h-[600px] w-full max-w-md mx-auto overflow-hidden bg-white dark:bg-[#111827] rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-800">
      {/* Image Container with Overlay */}
      <div className="relative overflow-hidden h-[280px]">
        <img
          className="object-cover object-center w-full h-full transition-transform duration-500 group-hover:scale-110"
          src={pic}
          alt={name}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60"></div>
        
        {/* Expertise Badge - Positioned on image */}
        <div className="absolute bottom-4 left-4 z-10">
          <div className="relative px-4 py-1.5 rounded-full bg-green-600 shadow-lg">
            <span className="text-xs font-bold text-white tracking-wide uppercase flex items-center gap-2">
              <LiaDumbbellSolid className="text-white w-4 h-4" />
              {expertise}
            </span>
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="px-6 py-6 flex flex-col h-[320px]">
        {/* Name Section */}
        <h1 className="text-xl font-bold text-gray-800 dark:text-white mb-1">
          {name}
        </h1>
        
        {/* Experience Badge */}
        <div className="flex items-center gap-x-2 mb-4">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <p className="text-sm font-medium text-green-600 dark:text-green-500">
              {experience} {"Year's"} of Experience
            </p>
          </div>
        </div>
        
        {/* Bio Section - Fixed Height */}
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-4">
            {shortBio}
          </p>
        </div>
        
        {/* Connect With Me Section */}
        <div className="mt-auto">
          <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Connect With Me</h3>
          <div className="flex items-center gap-x-3 mb-5">
            <a href="#" className="text-gray-600 dark:text-white hover:text-green-600 dark:hover:text-green-500 transition-colors duration-200">
              <FaFacebook className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-600 dark:text-white hover:text-green-600 dark:hover:text-green-500 transition-colors duration-200">
              <FaInstagram className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-600 dark:text-white hover:text-green-600 dark:hover:text-green-500 transition-colors duration-200">
              <FaTwitterSquare className="w-5 h-5" />
            </a>
          </div>
          
          {/* CTA Button */}
          <Link to={`/trainerDetails/${_id}`} className="block w-full">
            <button type="button" className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 px-5 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 text-sm">
              View Details
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Trainer;
