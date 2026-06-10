'use client';

import Link from "next/link";
import Image from "next/image";
import { FaTimes, FaUser } from "react-icons/fa";
import DynamicSignOutButtonWrapper from "./DynamicSignOutButton";

interface NavbarMobileMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  darkMode: boolean;
  navLinks: { name: string; path: string }[];
  isActivePath: (path: string) => boolean | null;
  isSignedIn: boolean | undefined;
  hasImage: boolean;
  displayImage: string | null | undefined;
}

const NavbarMobileMenu = ({
  isOpen,
  setIsOpen,
  darkMode,
  navLinks,
  isActivePath,
  isSignedIn,
  hasImage,
  displayImage,
}: NavbarMobileMenuProps) => {
  return (
    <>
      <div
        className={`fixed top-0 right-0 h-full w-[85%] max-w-sm ${
          darkMode ? "bg-gray-900/95 backdrop-blur-md" : "bg-white/95 backdrop-blur-md"
        } shadow-2xl transform transition-transform duration-300 ease-in-out z-[55] mobile-menu ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full pt-20 p-6 overflow-y-auto">
          <div className="absolute top-4 right-4">
            <button type="button"
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
                  className={`flex items-center gap-3 text-xl font-medium py-2 border-b relative group after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#16A34A] after:scale-x-0 after:group-hover:scale-x-100 after:origin-left after:transition-transform after:duration-300 ${
                    isActivePath(link.path)
                      ? "text-gray-400 border-gray-400/50"
                      : darkMode
                      ? "text-white border-gray-700 group-hover:text-[#16A34A]"
                      : "text-gray-800 border-gray-200 group-hover:text-[#16A34A]"
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
                  className={`flex items-center gap-3 text-xl font-medium py-2 border-b relative group after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#16A34A] after:scale-x-0 after:group-hover:scale-x-100 after:origin-left after:transition-transform after:duration-300 ${
                    darkMode ? "text-white" : "text-gray-800"
                  } group-hover:text-[#16A34A] ${
                    darkMode ? "border-gray-700" : "border-gray-200"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <span className={`w-8 h-8 rounded-full ${
                    hasImage
                      ? "bg-transparent overflow-hidden relative"
                      : "bg-emerald-500 flex items-center justify-center text-white text-xs"
                  }`}>
                    {hasImage ? (
                      <Image sizes="100vw"
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
              <DynamicSignOutButtonWrapper
                onClick={() => setIsOpen(false)}
                className="block w-full py-3 px-4 bg-red-600 text-center text-white font-medium rounded-lg hover:bg-red-500 transition-all duration-200 transform hover:scale-105"
              >
                Logout
              </DynamicSignOutButtonWrapper>
            )}
          </div>
        </div>
      </div>

      {isOpen && (
        <button type="button"
          aria-label="Close menu"
          onKeyDown={(e) => { if(e.key === 'Enter' || e.key === ' ') setIsOpen(false); }}
          className="fixed inset-0 bg-black/50 z-[45] transition-opacity duration-300 lg:hidden w-full cursor-default border-none outline-none"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default NavbarMobileMenu;
