'use client';

import Link from "next/link";
import { useState, useEffect, useRef, useSyncExternalStore } from "react";
import { FaTimes, FaUser, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { HiMenuAlt3 } from "react-icons/hi";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { getNavProfileImage } from "@/actions/getNavData";
import DynamicSignOutButtonWrapper from "./DynamicSignOutButton";
import NavbarMobileMenu from "./NavbarMobileMenu";

const navLinks = [
  { name: "Trainers", path: "/allTrainers" },
  { name: "Our Classes", path: "/allClasses" },
  { name: "Forums", path: "/posts" },
];

// Pages that should show active indicator
const activeIndicatorPaths = ["/allTrainers", "/allClasses", "/posts"];

const subscribeDarkMode = (callback: () => void) => {
  if (typeof window === 'undefined') return () => {};
  const query = window.matchMedia("(prefers-color-scheme: dark)");
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
};

const getDarkModeSnapshot = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

const getServerDarkModeSnapshot = () => false;

const Navbar = () => {
  const { isSignedIn, user } = useUser();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const darkMode = useSyncExternalStore(subscribeDarkMode, getDarkModeSnapshot, getServerDarkModeSnapshot);
  const [dbImage, setDbImage] = useState<string | null>(null);

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

  // Removed scroll-based hiding logic. Navbar will always stay visible.

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

  // Check if a path should show active indicator
  const isActivePath = (path: string) => {
    return activeIndicatorPaths.includes(path) && pathname === path;
  };

  const getTextColor = () => {
    if (darkMode) return "text-white";
    return "text-black";
  };

  return (
    <>
      {/* Floating Glassmorphism Navbar */}
      <header
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 translate-y-0"
      >
        <nav
          className="flex items-center gap-2 px-3 py-2 rounded-full border border-white/10 backdrop-blur-xl bg-black/40 shadow-[0_8px_32px_rgba(0,0,0,0.4)] w-[95%] lg:w-auto whitespace-nowrap justify-between lg:justify-start"
          style={{
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.37), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
          }}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1.5 group pl-1">
            <div className="relative w-8 h-8 rounded-full overflow-hidden flex items-center justify-center animate-breathe">
              <Image sizes="100vw"
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
          {/* gap between logo text & first nav link */}
          <div className="w-2.5" />


          {/* Mobile Navigation Links - visible on mobile,*/}
          <ul className="flex lg:hidden items-center gap-1">
            <li>
              <Link
                href="/allClasses"
                className={`relative px-2.5 py-1.5 text-xs font-medium rounded-full transition-all duration-300 ${isActivePath("/allClasses")
                  ? "text-white bg-white/20"
                  : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
              >
                Our Classes
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
            <li>
              <Link
                href="/posts"
                className={`relative px-2.5 py-1.5 text-xs font-medium rounded-full transition-all duration-300 ${isActivePath("/posts")
                  ? "text-white bg-white/20"
                  : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
              >
                Forums
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
              <Link
                href="/profile"
                aria-label="View Profile"
                className="relative flex items-center justify-center w-8 h-8 rounded-full overflow-hidden ring-2 ring-emerald-500/50 transition-all duration-300 hover:scale-110 hover:ring-emerald-400"
                title="View Profile"
              >
                {hasImage ? (
                  <Image sizes="100vw"
                    src={displayImage!}
                    alt="Profile"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <FaUser className="text-xs" />
                )}
              </Link>
            )}

            {!isSignedIn && (
              <Link
                href={`/login?redirect_url=${encodeURIComponent(pathname)}`}
                className="flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium text-white bg-emerald-500/80 rounded-full hover:bg-emerald-400 transition-all duration-300"
              >
                <FaSignInAlt className="text-xs" />
                <span>Login</span>
              </Link>
            )}
          </div>

          {/* Mobile Profile Image (Visible only when logged in) */}
          {isSignedIn && (
            <Link
              href="/profile"
              aria-label="View Profile"
              className="lg:hidden relative flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full overflow-hidden ring-2 ring-emerald-500/50 transition-all duration-300 hover:scale-110 hover:ring-emerald-400 mr-1"
            >
              {hasImage ? (
                <Image sizes="100vw"
                  src={displayImage!}
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              ) : (
                <FaUser className="text-xs text-zinc-300" />
              )}
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button type="button"
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
      <NavbarMobileMenu
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        theme={darkMode ? "dark" : "light"}
        navLinks={navLinks}
        isActivePath={isActivePath}
        userProfile={{
          isSignedIn: !!isSignedIn,
          hasImage,
          displayImage,
        }}
      />
    </>
  );
};

export default Navbar;