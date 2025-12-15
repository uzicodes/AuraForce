'use client';

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { FaTimes, FaUser, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { HiMenuAlt3 } from "react-icons/hi";
import Image from "next/image";
import { useUser, SignOutButton } from "@clerk/nextjs";

const Navbar = () => {
  const { isSignedIn, user } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setDarkMode(darkModeMediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setDarkMode(e.matches);
    darkModeMediaQuery.addEventListener("change", handleChange);
    return () => darkModeMediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);
      setHidden(currentScrollY > lastScrollY.current && currentScrollY > 300);
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isOpen && !target.closest(".mobile-menu") && !target.closest(".menu-button")) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "All Trainers", path: "/allTrainers" },
    { name: "All Classes", path: "/allClasses" },
    { name: "Forums", path: "/posts" },
  ];

  const getTextColor = () => {
    if (darkMode) return "text-white";
    return scrolled ? "text-black" : "text-black";
  };

  const getGlassEffect = () => {
    if (darkMode) {
      return scrolled ? "backdrop-blur-md bg-black/30 shadow-lg" : "bg-transparent";
    } else {
      return scrolled ? "backdrop-blur-md bg-white/70 shadow-lg" : "bg-transparent";
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
              <div className="relative w-12 h-12 bg-cyan rounded-lg flex items-center justify-center p-1 shadow-sm transform transition-transform duration-300 group-hover:scale-110">
                <Image
                  src="/for favicon.png"
                  alt="Aura Force Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <span className="text-2xl font-bold  text-white tracking-tight" style={{ fontFamily: 'Tenada, sans-serif' }}>
                AURA<span className="text-emerald-500"> FORCE </span> 
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

              {/* Green Profile Avatar (Clickable) - Only shown when logged in */}
              {isSignedIn && (
                <>
                  <Link 
                    href="/profile" 
                    className="group relative flex items-center justify-center w-10 h-10 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white transition-all duration-300 shadow-lg shadow-emerald-500/30 hover:scale-110 hover:shadow-emerald-500/50"
                    title="View Profile"
                  >
                    <FaUser className="text-sm" />
                  </Link>
                  
                  <SignOutButton>
                    <button
                      className={`flex items-center gap-2 px-5 py-2 font-medium rounded-lg border-2 transition-all duration-300 transform hover:scale-105 ${
                        darkMode 
                          ? "border-zinc-700 text-white hover:bg-zinc-800 hover:border-zinc-800" 
                          : "border-zinc-300 text-zinc-800 hover:bg-zinc-100 hover:border-zinc-300"
                      }`}
                    >
                      <FaSignOutAlt className="text-sm" />
                      <span>Logout</span>
                    </button>
                  </SignOutButton>
                </>
              )}

              {/* Login Button - Only shown when NOT logged in */}
              {!isSignedIn && (
                <Link
                  href="/login"
                  className={`flex items-center gap-2 px-5 py-2 font-medium rounded-lg border-2 transition-all duration-300 transform hover:scale-105 ${
                    darkMode 
                      ? "border-zinc-700 text-white hover:bg-zinc-800 hover:border-zinc-800" 
                      : "border-zinc-300 text-zinc-800 hover:bg-zinc-100 hover:border-zinc-300"
                  }`}
                >
                  <FaSignInAlt className="text-sm" />
                  <span>Login</span>
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
          <div className="absolute top-4 right-4">
            <button
              onClick={() => setIsOpen(false)}
              className="focus:outline-none p-2"
              aria-label="Close menu"
            >
              <FaTimes
                className={`w-6 h-6 ${darkMode ? "text-white" : "text-gray-800"}`}
              />
            </button>
          </div>

          <ul className="space-y-6 mb-8">
            {navLinks.map((link, index) => (
              <li
                key={link.path}
                className="transform transition-all duration-300 ease-out"
                style={{
                  transitionDelay: isOpen ? `${index * 100}ms` : "0ms",
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? "translateX(0)" : "translateX(20px)",
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
            {isSignedIn && (
              <li className="transform transition-all duration-300 ease-out" style={{ transitionDelay: '400ms', opacity: isOpen ? 1 : 0 }}>
                  <Link
                    href="/profile"
                    className={`flex items-center gap-3 text-xl font-medium ${
                      darkMode ? "text-white" : "text-gray-800"
                    } hover:text-[#16A34A] transition-colors duration-200 py-2 border-b ${
                      darkMode ? "border-gray-700" : "border-gray-200"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs">
                      <FaUser />
                    </span>
                    My Profile
                  </Link>
              </li>
            )}
          </ul>

          <div className="mt-auto space-y-3">
            {!isSignedIn && (
              <Link
                href="/login"
                className="block w-full py-3 px-4 bg-[#16A34A] text-center text-white font-medium rounded-lg hover:bg-[#22c55e] transition-all duration-200 transform hover:scale-105"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            )}
            
            {isSignedIn && (
              <SignOutButton>
                <button
                  className="block w-full py-3 px-4 bg-red-600 text-center text-white font-medium rounded-lg hover:bg-red-500 transition-all duration-200 transform hover:scale-105"
                  onClick={() => setIsOpen(false)}
                >
                  Logout
                </button>
              </SignOutButton>
            )}
          </div>
        </div>
      </div>

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