"use client";

import Link from "next/link";
import Image from "next/image";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaArrowUp } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Send } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [showScrollButton, setShowScrollButton] = useState(false);

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-zinc-950 text-zinc-300 pt-8 pb-4 relative overflow-hidden border-t border-zinc-900">

      {/* Background Glow Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">

          {/* Brand Section */}
          <div className="space-y-3">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative w-8 h-8 transition-transform duration-300 group-hover:scale-110">
                <Image
                  src="/for favicon.png"
                  alt="Aura Force Logo"
                  fill
                  className="object-contain"
                />
              </div>

              <span className="text-xl font-bold text-white tracking-tight" style={{ fontFamily: 'Tenada, sans-serif' }}>
                AURA <span className="text-emerald-500">FORCE</span>
              </span>
            </Link>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-xs font-satoshi">
              Empowering your fitness journey with data-driven workouts, expert coaching, and a community that never quits.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3">
              {[FaFacebookF, FaTwitter, FaInstagram, FaYoutube].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-emerald-500 hover:border-emerald-500 hover:bg-emerald-500/10 transition-all duration-300"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-base mb-2 font-heading">Quick Links</h3>
            <ul className="space-y-1">
              {[
                { name: "Home", path: "/" },
                { name: "All Trainers", path: "/allTrainers" },
                { name: "All Classes", path: "/allClasses" },
                { name: "Community Forum", path: "/posts" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.path}
                    className="text-zinc-500 hover:text-emerald-400 transition-all duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-800 group-hover:bg-emerald-500 transition-colors" />
                    <span className="group-hover:translate-x-1 transition-transform">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-bold text-base mb-2 font-heading">Services</h3>
            <ul className="space-y-1">
              {[
                { name: "Personal Training", path: "/allTrainers" },
                { name: "Group Classes", path: "/allClasses" },
                { name: "Nutrition Planning", path: "/#nutrition-plan" },
                { name: "Fitness Assessment", path: "/#features" }
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.path} className="text-zinc-500 hover:text-emerald-400 transition-all duration-300 flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-800 group-hover:bg-emerald-500 transition-colors" />
                    <span className="group-hover:translate-x-1 transition-transform">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-bold text-base mb-2 font-heading">Stay Updated</h3>
            <p className="text-zinc-500 text-xs mb-2 font-satoshi">
              Get the latest workout tips and exclusive offers sent to your inbox.
            </p>
            <form className="relative group">
              <input
                type="email"
                placeholder="Email address"
                className="w-full pl-3 pr-10 py-1.5 bg-zinc-900/50 border border-zinc-800 rounded-lg text-zinc-300 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all placeholder-zinc-600 text-xs"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 p-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors duration-300 shadow-lg shadow-emerald-900/20"
              >
                <Send size={14} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-zinc-900 pt-4 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-zinc-600">
          <p>© {currentYear} <span style={{ fontFamily: 'Tenada, sans-serif' }}>AURA FORCE</span>. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-emerald-500 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-emerald-500 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-emerald-500 transition-colors">Cookies</a>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 w-12 h-12 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-2xl shadow-emerald-900/50 flex items-center justify-center transition-all duration-500 z-50 group ${showScrollButton ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none"
          }`}
        aria-label="Scroll to top"
      >
        <FaArrowUp className="text-lg group-hover:-translate-y-1 transition-transform duration-300" />
      </button>
    </footer>
  );
};

export default Footer;