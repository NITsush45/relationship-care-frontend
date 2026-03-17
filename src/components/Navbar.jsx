import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLinkClick = () => {
    if (isOpen) {
      setIsOpen(false);
    }
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/services", label: "Services" },
    { to: "/about-us", label: "About Us" },
    { to: "/contact-us", label: "Contact Us" },
    { to: "/blog", label: "Blog" },
    { to: "/faqs", label: "FAQs" },
    { to: "/personal", label: "Confess" },
  ];

  return (
    <nav
      className={`text-white shadow-lg sticky top-0 z-50 animate-slideDown ${
        isDark
          ? "bg-gradient-to-r from-[#29124f] via-[#331963] to-[#29124f]"
          : "bg-gradient-to-r from-pink-600 via-pink-500 to-pink-600"
      }`}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
      </div>

      <div className="container mx-auto px-6 py-4 flex justify-between items-center relative z-10">
        <Link to="/" className="text-2xl font-bold group relative">
          <span className="inline-block transition-transform duration-300 group-hover:scale-105">RelationShip</span>
          <span className="text-blue-400 mx-1 inline-block animate-heartbeat">{"\u2665"}</span>
          <span className="inline-block transition-transform duration-300 group-hover:scale-105">Care</span>
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-500 ease-out" />
        </Link>

        <div className="hidden md:flex items-center space-x-2 ml-8">
          {navLinks.map((link, index) => (
            <Link
              key={link.to}
              to={link.to}
              onMouseEnter={() => setHoveredLink(index)}
              onMouseLeave={() => setHoveredLink(null)}
              className="relative px-4 py-2 font-medium transition-all duration-300 rounded-lg hover:bg-white/10"
            >
              <span
                className={`transition-all duration-300 ${
                  hoveredLink === index ? "text-blue-300" : isDark ? "text-slate-100" : "text-white"
                }`}
              >
                {link.label}
              </span>
              <span
                className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-blue-400 to-blue-300 transition-all duration-300 ${
                  hoveredLink === index ? "w-3/4 opacity-100" : "w-0 opacity-0"
                }`}
              />
              <span
                className={`absolute inset-0 rounded-lg bg-white/5 transition-opacity duration-300 ${
                  hoveredLink === index ? "opacity-100" : "opacity-0"
                }`}
              />
            </Link>
          ))}

          <button
            onClick={toggleTheme}
            className="ml-2 flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            title={isDark ? "Light mode" : "Dark mode"}
          >
            <span className="text-lg" role="img" aria-hidden="true">
              {isDark ? "\u2600" : "\ud83c\udf19"}
            </span>
          </button>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            title={isDark ? "Light mode" : "Dark mode"}
          >
            <span className="text-lg" role="img" aria-hidden="true">
              {isDark ? "\u2600" : "\ud83c\udf19"}
            </span>
          </button>
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-lg p-2 transition-all duration-300 hover:bg-white/10 active:scale-95"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span
                className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
                  isOpen ? "rotate-45 translate-y-0.5" : "-translate-y-1"
                }`}
              />
              <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${isOpen ? "opacity-0" : "opacity-100"}`} />
              <span
                className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
                  isOpen ? "-rotate-45 -translate-y-0.5" : "translate-y-1"
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      <div className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className={`${isDark ? "bg-[#2c145d]" : "bg-pink-700"} text-white space-y-2 px-6 py-4`}>
          {navLinks.map((link, index) => (
            <Link
              key={link.to}
              to={link.to}
              className="block hover:bg-white/10 rounded-lg px-4 py-2 font-medium transition-all duration-300 transform hover:translate-x-2 hover:shadow-md active:scale-95"
              onClick={handleLinkClick}
              style={{ animation: isOpen ? `slideInLeft 0.3s ease-out ${index * 0.05}s both` : "none" }}
            >
              <span className="flex items-center justify-between">
                {link.label}
                <span className="text-blue-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{"\u2192"}</span>
              </span>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes slideDown {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes heartbeat {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.2);
          }
        }

        @keyframes slideInLeft {
          from {
            transform: translateX(-20px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .animate-slideDown {
          animation: slideDown 0.5s ease-out;
        }

        .animate-shimmer {
          animation: shimmer 3s linear infinite;
        }

        .animate-heartbeat {
          animation: heartbeat 2s ease-in-out infinite;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;




