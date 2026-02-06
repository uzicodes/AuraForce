'use client';

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { FaTimes, FaUser, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { HiMenuAlt3 } from "react-icons/hi";
import Image from "next/image";
import { useUser, SignOutButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { getNavProfileImage } from "@/actions/getNavData";

const Navbar = () => {
  const { isSignedIn, user } = useUser();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [dbImage, setDbImage] = useState<string | null>(null);
  const lastScrollY = useRef(0);

  // Fetch DB Image on Mount & Navigation ---
  useEffect(() => {
    if (isSignedIn) {
      getNavProfileImage().then((img) => {
        if (img) setDbImage(img);
      });
    }
  }, [isSignedIn, pathname]); // Re-fetch when user logs in OR changes pages
  // ------------------------------------------------

  // Determine which image to show (DB > Clerk > None)
  const displayImage = dbImage || user?.imageUrl;
  const hasImage = Boolean(displayImage);

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

  // Pages that should show active indicator
  const activeIndicatorPaths = ["/allTrainers", "/allClasses", "/posts"];

  // Check if a path should show active indicator
  const isActivePath = (path: string) => {
    return activeIndicatorPaths.includes(path) && pathname === path;
  };

  const getTextColor = () => {
    if (darkMode) return "text-white";
    return scrolled ? "text-black" : "text-black";
  };

  return (
    <>
      {/* Floating Glassmorphism Navbar */}
      <header
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${hidden ? "-translate-y-[150%]" : "translate-y-0"
          }`}
      >
        <nav
          className="flex items-center gap-2 px-3 py-2 rounded-full border border-white/10 backdrop-blur-xl bg-black/40 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
          style={{
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.37), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
          }}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1.5 group pl-1">
            <div className="relative w-8 h-8 rounded-full overflow-hidden flex items-center justify-center animate-breathe">
              <Image
                src="/for favicon.png"
                alt="Aura Force Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="text-base font-bold text-white tracking-tight hidden sm:block mt-1" style={{ fontFamily: 'Tenada, sans-serif' }}>
              AURA<span className="text-emerald-400">FORCE</span>
            </span>
          </Link>


          {/* Mobile Navigation Links - visible on mobile,*/}
          <ul className="flex lg:hidden items-center gap-1">
            <li>
              <Link
                href="/"
                className="px-2.5 py-1.5 text-xs font-medium text-white/80 hover:text-white rounded-full hover:bg-white/10 transition-all duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/allClasses"
                className={`relative px-2.5 py-1.5 text-xs font-medium rounded-full transition-all duration-300 ${isActivePath("/allClasses")
                  ? "text-white bg-white/20"
                  : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
              >
                Classes
              </Link>
            </li>
            <li>
              <Link
                href="/allTrainers"
                className={`relative px-2.5 py-1.5 text-xs font-medium rounded-full transition-all duration-300 ${isActivePath("/allTrainers")
                  ? "text-white bg-white/20"
                  : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
              >
                Trainers
              </Link>
            </li>
          </ul>

          {/* Desktop Navigation Links - hidden on mobile, visible on lg */}
          <ul className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  href={link.path}
                  className={`relative px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-300 ${isActivePath(link.path)
                    ? "text-white bg-white/20"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                    }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>


          {/* Profile & Auth Buttons */}
          <div className="hidden lg:flex items-center gap-2">
            {isSignedIn && (
              <>
                <Link
                  href="/profile"
                  className={`relative flex items-center justify-center w-8 h-8 rounded-full ${hasImage
                    ? "overflow-hidden ring-2 ring-emerald-500/50"
                    : "bg-emerald-500/80 hover:bg-emerald-400 text-white"
                    } transition-all duration-300 hover:scale-110 hover:ring-emerald-400`}
                  title="View Profile"
                >
                  {hasImage ? (
                    <Image
                      src={displayImage!}
                      alt="Profile"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <FaUser className="text-xs" />
                  )}
                </Link>

                <SignOutButton>
                  <button
                    className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white/80 rounded-full border border-white/20 hover:bg-white/10 hover:text-white transition-all duration-300"
                  >
                    <FaSignOutAlt className="text-xs" />
                    <span>Logout</span>
                  </button>
                </SignOutButton>
              </>
            )}

            {!isSignedIn && (
              <Link
                href="/login"
                className="flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium text-white bg-emerald-500/80 rounded-full hover:bg-emerald-400 transition-all duration-300"
              >
                <FaSignInAlt className="text-xs" />
                <span>Login</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden menu-button focus:outline-none p-2 rounded-full hover:bg-white/10 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <FaTimes className="w-5 h-5 text-white" />
            ) : (
              <HiMenuAlt3 className="w-5 h-5 text-white" />
            )}
          </button>
        </nav>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-[85%] max-w-sm ${darkMode ? "bg-gray-900/95 backdrop-blur-md" : "bg-white/95 backdrop-blur-md"
          } shadow-2xl transform transition-transform duration-300 ease-in-out z-[55] mobile-menu ${isOpen ? "translate-x-0" : "translate-x-full"
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
                  className={`flex items-center gap-3 text-xl font-medium transition-colors duration-200 py-2 border-b ${isActivePath(link.path)
                    ? "text-gray-400 border-gray-400/50"
                    : darkMode
                      ? "text-white border-gray-700 hover:text-[#16A34A]"
                      : "text-gray-800 border-gray-200 hover:text-[#16A34A]"
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
                  className={`flex items-center gap-3 text-xl font-medium ${darkMode ? "text-white" : "text-gray-800"
                    } hover:text-[#16A34A] transition-colors duration-200 py-2 border-b ${darkMode ? "border-gray-700" : "border-gray-200"
                    }`}
                  onClick={() => setIsOpen(false)}
                >
                  <span className={`w-8 h-8 rounded-full ${hasImage
                    ? "bg-transparent overflow-hidden relative"
                    : "bg-emerald-500 flex items-center justify-center text-white text-xs"
                    }`}>
                    {hasImage ? (
                      <Image
                        src={displayImage!}
                        alt="Profile"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <FaUser />
                    )}
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