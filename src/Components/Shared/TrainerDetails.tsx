'use client';

import Link from "next/link";
import { format, parse } from "date-fns";
import { FaCertificate, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaUtensils, FaMountain, FaDumbbell } from "react-icons/fa";

const TrainerDetails = ({ trainer }) => {
  const trainerDatas = trainer || {};
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
  } = trainerDatas;

  function convertTo12HourFormatFunny(time) {
    const [hour, minute] = time.split(':');
    const period = hour >= 12 ? 'PM' : 'AM';
    const adjustedHour = hour % 12 || 12;

    return `${adjustedHour}:${minute} ${period}`;
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#16a34a]/10 to-[#16a34a]/5 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between py-16 md:py-24 gap-8">
            {/* Content */}
            <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
              <div className="inline-block px-4 py-1 rounded-full bg-[#16a34a]/10 text-[#16a34a] dark:bg-[#16a34a]/20 dark:text-green-400 font-medium text-sm mb-4">
                Meet Your {expertise} Coach
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white">
                Hi there, <br />
                <span className="text-[#16a34a] dark:text-green-400">I'm {name}!</span>
              </h1>
              
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
                {bio}
              </p>
              
              <div className="flex flex-wrap gap-3 mt-6">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#16a34a]/10 text-[#16a34a] dark:bg-[#16a34a]/20 dark:text-green-400">
                  <FaDumbbell className="mr-1" /> {expertise}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                  {experience} Years Experience
                </span>
              </div>
            </div>
            
            {/* Image */}
            <div className="w-full md:w-1/2 flex justify-center md:justify-end">
              <div className="relative">
                <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-[#16a34a] to-[#22C55E] opacity-75 blur"></div>
                <img 
                  src={pic} 
                  alt={name}
                  className="relative w-64 h-64 md:w-80 md:h-80 object-cover rounded-full border-4 border-white dark:border-gray-800 shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Certifications Section */}
      <div className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Professional <span className="text-[#16a34a] dark:text-green-400">Certifications</span>
            </h2>
            <div className="mt-2 h-1 w-20 bg-[#16a34a] mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certification.map((certificate, index) => (
              <div 
                key={index}
                className="p-6 rounded-xl bg-gray-50 dark:bg-gray-700 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 dark:border-gray-600"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-[#16a34a]/10 flex items-center justify-center">
                      <FaCertificate className="w-6 h-6 text-[#16a34a] dark:text-green-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {certificate.value}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* About Coach */}
            <div className="w-full lg:w-1/2">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
                <div className="p-8">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    About Coach <span className="text-[#16a34a] dark:text-green-400">{name}</span>
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-[#16a34a]/10 flex items-center justify-center">
                          <FaMapMarkerAlt className="w-5 h-5 text-[#16a34a] dark:text-green-400" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-[#16a34a] dark:text-green-400">
                          Where I'm from & where I now call home
                        </h3>
                        <p className="mt-2 text-gray-600 dark:text-gray-300">
                          I was born in Pozzuoli, Italy and now live in Indiana.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-[#16a34a]/10 flex items-center justify-center">
                          <FaMountain className="w-5 h-5 text-[#16a34a] dark:text-green-400" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-[#16a34a] dark:text-green-400">
                          How I like to spend my free time
                        </h3>
                        <p className="mt-2 text-gray-600 dark:text-gray-300">
                          I really enjoy being outdoors (mountain climbing), reading,
                          cooking for family and friends. I am a big foodie!
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-[#16a34a]/10 flex items-center justify-center">
                          <FaDumbbell className="w-5 h-5 text-[#16a34a] dark:text-green-400" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-[#16a34a] dark:text-green-400">
                          My go-to workout
                        </h3>
                        <p className="mt-2 text-gray-600 dark:text-gray-300">
                          A kettlebell total body workout! It'll leave you on the floor for
                          at least 15 minutes afterward in glorious exhaustion.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Training Slots */}
            <div className="w-full lg:w-1/2">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden h-full">
                <div className="p-8">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    <span className="text-[#16a34a] dark:text-green-400">{name}'s</span> Training Slots
                  </h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {availableDay.map((day, i) => (
                      <Link 
                        key={i} 
                        href={`/trainer-booked/${_id}`}
                        className="group"
                      >
                        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-100 dark:border-gray-600 transition-all duration-300 hover:bg-[#16a34a] hover:border-[#16a34a] dark:hover:bg-[#16a34a]/80 dark:hover:border-[#16a34a]/80 group-hover:transform group-hover:scale-105 group-hover:shadow-lg">
                          <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 group-hover:text-white mb-2">
                            <FaCalendarAlt className="w-4 h-4" />
                            <p className="font-medium">{day.value}</p>
                          </div>
                          <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 group-hover:text-white">
                            <FaClock className="w-4 h-4" />
                            <p className="font-medium">{convertTo12HourFormatFunny(availableTime[0])}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Be a Trainer CTA */}
      <div className="relative">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1554284126-3e2f5b0b6c8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmlybmVzcyUyMHRyYWluZXJ8ZW58MHx8MHx8&w=1000&q=80')` }}
        ></div>
        <div className="absolute inset-0 bg-black opacity-70 z-10"></div>
        
        <div className="relative z-20 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Become a <span className="text-[#16a34a]">Fitness Trainer</span>
          </h2>
          
          <p className="text-xl text-gray-200 max-w-2xl mx-auto mb-10">
            Join our team of expert trainers and help clients achieve their
            wellness goals. Enjoy access to top-notch facilities, ongoing
            professional growth, and a supportive community.
          </p>
          
          <Link href="/be-a-trainer">
            <button className="px-8 py-4 bg-[#16a34a] hover:bg-[#16a34a]/90 text-white font-medium rounded-lg text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              Start Your Journey
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TrainerDetails;

