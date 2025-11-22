import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaDumbbell, FaArrowRight, FaArrowUp } from "react-icons/fa";
import { useEffect, useState } from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [showScrollButton, setShowScrollButton] = useState(false);
  
  // Handle scroll event to show/hide button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    
    // Clean up event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-[#57cc99]/10 rounded-full animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#57cc99]/5 rounded-full animate-pulse"></div>
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <div className="w-10 h-10 bg-[#57cc99] rounded-lg flex items-center justify-center transform transition-transform duration-300 group-hover:rotate-12">
                <FaDumbbell className="text-white text-xl" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-[#57cc99] to-[#80ed99] bg-clip-text text-transparent">Aura Force</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Empowering your fitness journey with personalized workouts, expert trainers, and a supportive community.
            </p>
            <div className="flex space-x-3 pt-2">
              <a href="#" className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center transition-all duration-300 hover:bg-[#57cc99] hover:scale-110">
                <FaFacebook className="text-white" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center transition-all duration-300 hover:bg-[#57cc99] hover:scale-110">
                <FaTwitter className="text-white" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center transition-all duration-300 hover:bg-[#57cc99] hover:scale-110">
                <FaInstagram className="text-white" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center transition-all duration-300 hover:bg-[#57cc99] hover:scale-110">
                <FaYoutube className="text-white" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 relative inline-block">
              Quick Links
              <span className="absolute -bottom-1 left-0 w-12 h-1 bg-[#57cc99] rounded-full"></span>
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-[#57cc99] transition-colors duration-300 flex items-center gap-1 group">
                  <span className="w-0 group-hover:w-2 transition-all duration-300 overflow-hidden">
                    <FaArrowRight className="text-xs" />
                  </span>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/allTrainers" className="text-gray-400 hover:text-[#57cc99] transition-colors duration-300 flex items-center gap-1 group">
                  <span className="w-0 group-hover:w-2 transition-all duration-300 overflow-hidden">
                    <FaArrowRight className="text-xs" />
                  </span>
                  All Trainers
                </Link>
              </li>
              <li>
                <Link href="/allClasses" className="text-gray-400 hover:text-[#57cc99] transition-colors duration-300 flex items-center gap-1 group">
                  <span className="w-0 group-hover:w-2 transition-all duration-300 overflow-hidden">
                    <FaArrowRight className="text-xs" />
                  </span>
                  All Classes
                </Link>
              </li>
              <li>
                <Link href="/posts" className="text-gray-400 hover:text-[#57cc99] transition-colors duration-300 flex items-center gap-1 group">
                  <span className="w-0 group-hover:w-2 transition-all duration-300 overflow-hidden">
                    <FaArrowRight className="text-xs" />
                  </span>
                  Forums
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-4 relative inline-block">
              Our Services
              <span className="absolute -bottom-1 left-0 w-12 h-1 bg-[#57cc99] rounded-full"></span>
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-[#57cc99] transition-colors duration-300 flex items-center gap-1 group">
                  <span className="w-0 group-hover:w-2 transition-all duration-300 overflow-hidden">
                    <FaArrowRight className="text-xs" />
                  </span>
                  Personal Training
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#57cc99] transition-colors duration-300 flex items-center gap-1 group">
                  <span className="w-0 group-hover:w-2 transition-all duration-300 overflow-hidden">
                    <FaArrowRight className="text-xs" />
                  </span>
                  Group Classes
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#57cc99] transition-colors duration-300 flex items-center gap-1 group">
                  <span className="w-0 group-hover:w-2 transition-all duration-300 overflow-hidden">
                    <FaArrowRight className="text-xs" />
                  </span>
                  Nutrition Planning
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#57cc99] transition-colors duration-300 flex items-center gap-1 group">
                  <span className="w-0 group-hover:w-2 transition-all duration-300 overflow-hidden">
                    <FaArrowRight className="text-xs" />
                  </span>
                  Fitness Assessment
                </a>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-4 relative inline-block">
              Newsletter
              <span className="absolute -bottom-1 left-0 w-12 h-1 bg-[#57cc99] rounded-full"></span>
            </h3>
            <p className="text-gray-400 text-sm mb-4">Subscribe to our newsletter for the latest updates and offers.</p>
            <form className="flex flex-col space-y-2">
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-[#57cc99] transition-colors duration-300 text-sm"
                />
                <button 
                  type="submit" 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#57cc99] hover:bg-[#80ed99] transition-colors duration-300 rounded-full w-8 h-8 flex items-center justify-center"
                >
                  <FaArrowRight className="text-white text-sm" />
                </button>
              </div>
              <p className="text-gray-500 text-xs">We respect your privacy. Unsubscribe at any time.</p>
            </form>
          </div>
        </div>
        
        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>
        
        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <p>© {currentYear} Aura Force. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-[#57cc99] transition-colors duration-300">Privacy Policy</Link>
            <Link href="#" className="hover:text-[#57cc99] transition-colors duration-300">Terms of Service</Link>
            <Link href="#" className="hover:text-[#57cc99] transition-colors duration-300">Contact Us</Link>
          </div>
        </div>
      </div>
      
      {/* Scroll to Top Button */}
      {showScrollButton && (
        <button 
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 w-12 h-12 bg-[#16A34A] hover:bg-[#4af071] text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 z-50 animate-fadeIn"
          aria-label="Scroll to top"
        >
          <FaArrowUp className="text-lg" />
        </button>
      )}
    </footer>
  );
};

export default Footer;
