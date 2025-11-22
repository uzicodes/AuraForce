
'use client';

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { FaTimes } from "react-icons/fa";
import { HiMenuAlt3 } from "react-icons/hi";
import Image from "next/image";

const Navbar = () => {
  const user = null; // TODO: Add authentication later
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const lastScrollY = useRef(0);

  // Check for system dark mode preference
  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );
    setDarkMode(darkModeMediaQuery.matches);

    const handleChange = (e) => setDarkMode(e.matches);
    darkModeMediaQuery.addEventListener("change", handleChange);

    return () => darkModeMediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Determine if we've scrolled down enough to apply glass effect
      if (currentScrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Hide navbar when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY.current && currentScrollY > 300) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isOpen &&
        !e.target.closest(".mobile-menu") &&
        !e.target.closest(".menu-button")
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "All Trainers", path: "/allTrainers" },
    { name: "All Classes", path: "/allClasses" },
    { name: "Forums", path: "/posts" },
  ];

  // Determine text color based on theme and scroll state
  const getTextColor = () => {
    if (darkMode) {
      return scrolled ? "text-white" : "text-white";
    } else {
      return scrolled ? "text-black" : "text-black";
    }
  };

  // Determine glassmorphism effect based on theme
  const getGlassEffect = () => {
    if (darkMode) {
      return scrolled
        ? "backdrop-blur-md bg-black/30 shadow-lg"
        : "bg-transparent";
    } else {
      return scrolled
        ? "backdrop-blur-md bg-white/70 shadow-lg"
        : "bg-transparent";
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${getGlassEffect()} ${
          hidden ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative w-12 h-12 bg-white rounded-lg flex items-center justify-center p-1 shadow-sm transform transition-transform duration-300 group-hover:scale-110">
                <Image
                  src="/logo_bgremoved.png"
                  alt="Aura Force Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-[#16A34A] to-[#22c55e] bg-clip-text text-transparent">
                Aura Force
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <ul className="flex space-x-8">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      href={link.path}
                      className={`relative font-medium ${getTextColor()} hover:text-[#16A34A] transition-colors duration-300 py-2 group`}
                    >
                      {link.name}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#16A34A] transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  </li>
                ))}
              </ul>

              {user ? (
                <div className="relative group">
                  <button className="flex items-center space-x-2 focus:outline-none">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#16A34A] transition-transform duration-300 group-hover:scale-110">
                      <img
                        src={user.photoURL || "https://via.placeholder.com/40"}
                        alt="User"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </button>

                  <div
                    className={`absolute right-0 mt-2 w-48 ${
                      darkMode ? "bg-gray-800" : "bg-white"
                    } rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 z-50 overflow-hidden`}
                  >
                    <div className="py-2">
                      <Link
                        href="/dashboard"
                        className={`block px-4 py-2 text-sm ${
                          darkMode
                            ? "text-gray-200 hover:bg-[#16A34A] hover:text-white"
                            : "text-gray-700 hover:bg-[#16A34A] hover:text-white"
                        } transition-colors duration-200`}
                      >
                        Dashboard
                      </Link>
                      <Link
                        href="/dashboard/myProfile"
                        className={`block px-4 py-2 text-sm ${
                          darkMode
                            ? "text-gray-200 hover:bg-[#16A34A] hover:text-white"
                            : "text-gray-700 hover:bg-[#16A34A] hover:text-white"
                        } transition-colors duration-200`}
                      >
                        Profile
                      </Link>
                      <button
                        onClick={() => {/* TODO: Add logout */}}
                        className={`block w-full text-left px-4 py-2 text-sm ${
                          darkMode
                            ? "text-gray-200 hover:bg-[#16A34A] hover:text-white"
                            : "text-gray-700 hover:bg-[#16A34A] hover:text-white"
                        } transition-colors duration-200`}
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="px-6 py-2 bg-[#16A34A] text-white font-medium rounded-lg hover:bg-[#22c55e] transition-colors duration-300 transform hover:scale-105"
                >
                  Login
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden menu-button focus:outline-none z-[60]"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <FaTimes className={`w-6 h-6 ${getTextColor()}`} />
              ) : (
                <HiMenuAlt3 className={`w-6 h-6 ${getTextColor()}`} />
              )}
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-[85%] max-w-sm ${
          darkMode ? "bg-gray-900/95 backdrop-blur-md" : "bg-white/95 backdrop-blur-md"
        } shadow-2xl transform transition-transform duration-300 ease-in-out z-[55] mobile-menu ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full pt-20 p-6 overflow-y-auto">
          {/* Close button - positioned at top right */}
          <div className="absolute top-4 right-4">
            <button
              onClick={() => setIsOpen(false)}
              className="focus:outline-none p-2"
              aria-label="Close menu"
            >
              <FaTimes
                className={`w-6 h-6 ${
                  darkMode ? "text-white" : "text-gray-800"
                }`}
              />
            </button>
          </div>

          {/* Navigation Links */}
          <ul className="space-y-6 mb-8">
            {navLinks.map((link, index) => (
              <li 
                key={link.path}
                className="transform transition-all duration-300 ease-out"
                style={{ 
                  transitionDelay: isOpen ? `${index * 100}ms` : '0ms',
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? 'translateX(0)' : 'translateX(20px)'
                }}
              >
                <Link
                  href={link.path}
                  className={`block text-xl font-medium ${
                    darkMode ? "text-white" : "text-gray-800"
                  } hover:text-[#16A34A] transition-colors duration-200 py-2 border-b ${
                    darkMode ? "border-gray-700" : "border-gray-200"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* User Section */}
          {user ? (
            <div className="mt-auto space-y-4">
              <div className="flex items-center space-x-3 mb-6 p-4 rounded-lg bg-gradient-to-r from-[#16A34A]/10 to-[#22c55e]/10">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#16A34A]">
                  <img
                    src={user.photoURL || "https://via.placeholder.com/48"}
                    alt="User"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p
                    className={`font-medium truncate ${
                      darkMode ? "text-white" : "text-gray-800"
                    }`}
                  >
                    {user.displayName || "User"}
                  </p>
                  <p
                    className={`text-sm truncate ${
                      darkMode ? "text-gray-300" : "text-gray-500"
                    }`}
                  >
                    {user.email}
                  </p>
                </div>
              </div>

              <Link
                href="/dashboard"
                className={`block w-full py-3 px-4 ${
                  darkMode
                    ? "bg-gray-800 text-white hover:bg-gray-700"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                } text-center font-medium rounded-lg transition-all duration-200 transform hover:scale-105`}
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>

              <Link
                href="/dashboard/myProfile"
                className={`block w-full py-3 px-4 ${
                  darkMode
                    ? "bg-gray-800 text-white hover:bg-gray-700"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                } text-center font-medium rounded-lg transition-all duration-200 transform hover:scale-105`}
                onClick={() => setIsOpen(false)}
              >
                Profile
              </Link>

              <button
                onClick={() => {
                  // TODO: Add logout
                  setIsOpen(false);
                }}
                className="block w-full py-3 px-4 bg-[#16A34A] text-center text-white font-medium rounded-lg hover:bg-[#22c55e] transition-all duration-200 transform hover:scale-105"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="mt-auto">
              <Link
                href="/login"
                className="block w-full py-3 px-4 bg-[#16A34A] text-center text-white font-medium rounded-lg hover:bg-[#22c55e] transition-all duration-200 transform hover:scale-105"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[45] transition-opacity duration-300 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;
