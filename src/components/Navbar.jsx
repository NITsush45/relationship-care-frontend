import React, {
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);

  const fileInputRef = useRef(null);
  const profileRef = useRef(null);

  const { theme, toggleTheme } = useTheme();

  const {
    user,
    loading,
    updateUser,
    logout,
  } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const isDark = theme === "dark";

  const navLinks = [
    {
      to: "/",
      label: "Home",
    },
    {
      to: "/services",
      label: "Services",
    },
    {
      to: "/about-us",
      label: "About Us",
    },
    {
      to: "/contact-us",
      label: "Contact Us",
    },
    {
      to: "/blog",
      label: "Blog",
    },
    {
      to: "/faqs",
      label: "FAQs",
    },
    {
      to: "/personal",
      label: "Confess",
    },
  ];

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setProfileOpen(false);
  }, [location.pathname]);

  const handleLinkClick = () => {
    setIsOpen(false);
    setProfileOpen(false);
  };

  const handleProfileClick = () => {
    setProfileOpen((previous) => !previous);
    setIsOpen(false);
  };

  const handleUpdateProfilePicture = () => {
    if (!user) {
      navigate("/sign-in");
      return;
    }

    fileInputRef.current?.click();
  };

  const handleProfilePictureChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image.");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert(
        "Profile picture must be smaller than 5 MB."
      );
      event.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      try {
        updateUser({
          profileImage: reader.result,
        });

        setProfileOpen(false);

        alert(
          "Profile picture updated successfully."
        );
      } catch (error) {
        console.error(
          "Profile picture update error:",
          error
        );

        alert(
          "Unable to update profile picture."
        );
      }
    };

    reader.onerror = () => {
      alert("Unable to read the selected image.");
    };

    reader.readAsDataURL(file);

    event.target.value = "";
  };

  const handleQuestionnaire = () => {
    setProfileOpen(false);
    setIsOpen(false);

    navigate("/questionnaire");
  };

  const handleProgress = () => {
    setProfileOpen(false);
    setIsOpen(false);

    navigate("/progress");
  };

  const handleChangePassword = () => {
    setProfileOpen(false);
    setIsOpen(false);

    navigate("/change-password");
  };

  const handleSignOut = () => {
    const confirmed = window.confirm(
      "Are you sure you want to sign out?"
    );

    if (!confirmed) {
      return;
    }

    logout();

    setProfileOpen(false);
    setIsOpen(false);

    navigate("/sign-in", {
      replace: true,
    });
  };

  const getInitial = () => {
    return (
      user?.firstName?.charAt(0) ||
      user?.username?.charAt(0) ||
      user?.email?.charAt(0) ||
      "U"
    ).toUpperCase();
  };

  const profileImage = user?.profileImage;

  const ProfileAvatar = ({ mobile = false }) => {
    return (
      <div
        className={`${
          mobile ? "w-10 h-10" : "w-11 h-11"
        } rounded-full overflow-hidden border-2 border-white/70 hover:border-blue-300 transition-all`}
      >
        {profileImage ? (
          <img
            src={profileImage}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center font-bold text-white">
            {getInitial()}
          </div>
        )}
      </div>
    );
  };

  const ProfileMenu = ({ mobile = false }) => {
    return (
      <div
        className={`absolute ${
          mobile ? "right-0 top-12" : "right-0 top-14"
        } w-72 max-w-[calc(100vw-2rem)] rounded-2xl shadow-2xl overflow-hidden border z-[100] ${
          isDark
            ? "bg-[#241044] border-white/10 text-white"
            : "bg-white border-gray-100 text-gray-800"
        }`}
      >
        {/* USER INFORMATION */}
        <div
          className={`px-4 py-4 border-b ${
            isDark
              ? "border-white/10"
              : "border-gray-100"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-white font-bold">
                  {getInitial()}
                </div>
              )}
            </div>

            <div className="min-w-0">
              <p className="font-semibold truncate">
                {user?.firstName ||
                  user?.username ||
                  "User"}
              </p>

              <p className="text-sm opacity-60 truncate">
                {user?.email || ""}
              </p>
            </div>
          </div>
        </div>

        {/* UPDATE PROFILE PICTURE */}
        <button
          type="button"
          onClick={handleUpdateProfilePicture}
          className={`w-full flex items-center gap-3 text-left px-4 py-4 transition-all ${
            isDark
              ? "hover:bg-white/10"
              : "hover:bg-pink-50"
          }`}
        >
          <span className="text-xl">
            🖼️
          </span>

          <span className="font-medium">
            Update Profile Picture
          </span>
        </button>

        {/* EDIT QUESTIONNAIRE */}
        <button
          type="button"
          onClick={handleQuestionnaire}
          className={`w-full flex items-center gap-3 text-left px-4 py-4 transition-all ${
            isDark
              ? "hover:bg-white/10"
              : "hover:bg-pink-50"
          }`}
        >
          <span className="text-xl">
            📝
          </span>

          <span className="font-medium">
            Edit Questionnaire
          </span>
        </button>

        {/* TRACK IMPROVEMENTS */}
        <button
          type="button"
          onClick={handleProgress}
          className={`w-full flex items-center gap-3 text-left px-4 py-4 transition-all ${
            isDark
              ? "hover:bg-white/10"
              : "hover:bg-purple-50"
          }`}
        >
          <span className="text-xl">
            📈
          </span>

          <span className="font-medium">
            Track My Improvements
          </span>
        </button>

        {/* CHANGE PASSWORD */}
        <button
          type="button"
          onClick={handleChangePassword}
          className={`w-full flex items-center gap-3 text-left px-4 py-4 transition-all ${
            isDark
              ? "hover:bg-white/10"
              : "hover:bg-blue-50"
          }`}
        >
          <span className="text-xl">
            🔑
          </span>

          <span className="font-medium">
            Change Password
          </span>
        </button>

        {/* SIGN OUT */}
        <div
          className={`border-t ${
            isDark
              ? "border-white/10"
              : "border-gray-100"
          }`}
        >
          <button
            type="button"
            onClick={handleSignOut}
            className={`w-full flex items-center gap-3 text-left px-4 py-4 transition-all ${
              isDark
                ? "hover:bg-red-500/20 text-red-200"
                : "hover:bg-red-50 text-red-600"
            }`}
          >
            <span className="text-xl">
              🚪
            </span>

            <span className="font-medium">
              Sign Out
            </span>
          </button>
        </div>
      </div>
    );
  };

  return (
    <nav
      className={`text-white shadow-lg sticky top-0 z-50 animate-slideDown ${
        isDark
          ? "bg-gradient-to-r from-[#29124f] via-[#331963] to-[#29124f]"
          : "bg-gradient-to-r from-pink-600 via-pink-500 to-pink-600"
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center relative z-10">

        {/* LOGO */}
        <Link
          to="/"
          onClick={handleLinkClick}
          className="text-2xl font-bold group relative"
        >
          <span className="inline-block transition-transform duration-300 group-hover:scale-105">
            RelationShip
          </span>

          <span className="text-blue-400 mx-1 inline-block animate-heartbeat">
            ♥
          </span>

          <span className="inline-block transition-transform duration-300 group-hover:scale-105">
            Care
          </span>

          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-500" />
        </Link>

        {/* DESKTOP NAVIGATION */}
        <div className="hidden md:flex items-center space-x-2 ml-8">

          {navLinks.map((link, index) => (
            <Link
              key={link.to}
              to={link.to}
              onMouseEnter={() =>
                setHoveredLink(index)
              }
              onMouseLeave={() =>
                setHoveredLink(null)
              }
              onClick={handleLinkClick}
              className="relative px-4 py-2 font-medium transition-all duration-300 rounded-lg hover:bg-white/10"
            >
              <span
                className={`transition-all duration-300 ${
                  hoveredLink === index
                    ? "text-blue-300"
                    : isDark
                    ? "text-slate-100"
                    : "text-white"
                }`}
              >
                {link.label}
              </span>

              <span
                className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-blue-400 to-blue-300 transition-all duration-300 ${
                  hoveredLink === index
                    ? "w-3/4 opacity-100"
                    : "w-0 opacity-0"
                }`}
              />
            </Link>
          ))}

          {/* THEME */}
          <button
            type="button"
            onClick={toggleTheme}
            className="ml-2 flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-all"
            aria-label={
              isDark
                ? "Switch to light mode"
                : "Switch to dark mode"
            }
          >
            <span className="text-lg">
              {isDark ? "☀" : "🌙"}
            </span>
          </button>

          {/* AUTH / PROFILE */}
          {!loading && user ? (
            <div
              ref={profileRef}
              className="relative ml-6"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={
                  handleProfilePictureChange
                }
                className="hidden"
              />

              <button
                type="button"
                onClick={handleProfileClick}
                aria-label="Open profile menu"
                aria-expanded={profileOpen}
              >
                <ProfileAvatar />
              </button>

              {profileOpen && (
                <ProfileMenu />
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2 ml-2">

              <Link
                to="/sign-in"
                onClick={handleLinkClick}
                className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all"
              >
                Login
              </Link>

              <Link
                to="/sign-up"
                onClick={handleLinkClick}
                className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition-all"
              >
                Sign Up
              </Link>

            </div>
          )}
        </div>

        {/* MOBILE CONTROLS */}
        <div className="md:hidden flex items-center gap-2">

          {/* THEME */}
          <button
            type="button"
            onClick={toggleTheme}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-all"
            aria-label="Toggle theme"
          >
            {isDark ? "☀" : "🌙"}
          </button>

          {/* MOBILE PROFILE */}
          {!loading && user && (
            <div
              ref={profileRef}
              className="relative"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={
                  handleProfilePictureChange
                }
                className="hidden"
              />

              <button
                type="button"
                onClick={handleProfileClick}
                aria-label="Open profile menu"
                aria-expanded={profileOpen}
              >
                <ProfileAvatar mobile />
              </button>

              {profileOpen && (
                <ProfileMenu mobile />
              )}
            </div>
          )}

          {/* MOBILE HAMBURGER */}
          <button
            type="button"
            onClick={() => {
              setIsOpen(
                (previous) => !previous
              );
              setProfileOpen(false);
            }}
            className="text-white p-2 rounded-lg hover:bg-white/10"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center gap-1">

              <span
                className={`block h-0.5 w-6 bg-white transition-all ${
                  isOpen
                    ? "rotate-45 translate-y-1.5"
                    : ""
                }`}
              />

              <span
                className={`block h-0.5 w-6 bg-white transition-all ${
                  isOpen
                    ? "opacity-0"
                    : ""
                }`}
              />

              <span
                className={`block h-0.5 w-6 bg-white transition-all ${
                  isOpen
                    ? "-rotate-45 -translate-y-1.5"
                    : ""
                }`}
              />

            </div>
          </button>
        </div>
      </div>

      {/* MOBILE NAV */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ${
          isOpen
            ? "max-h-[600px] opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <div
          className={`${
            isDark
              ? "bg-[#2c145d]"
              : "bg-pink-700"
          } text-white space-y-2 px-6 py-4`}
        >

          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={handleLinkClick}
              className="block hover:bg-white/10 rounded-lg px-4 py-3 font-medium transition-all"
            >
              {link.label}
            </Link>
          ))}

          {!loading && !user && (
            <>
              <Link
                to="/sign-in"
                onClick={handleLinkClick}
                className="block px-4 py-3 rounded-lg hover:bg-white/10"
              >
                Login
              </Link>

              <Link
                to="/sign-up"
                onClick={handleLinkClick}
                className="block px-4 py-3 rounded-lg hover:bg-white/10"
              >
                Sign Up
              </Link>
            </>
          )}
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

        @keyframes heartbeat {
          0%, 100% {
            transform: scale(1);
          }

          50% {
            transform: scale(1.2);
          }
        }

        .animate-slideDown {
          animation: slideDown 0.5s ease-out;
        }

        .animate-heartbeat {
          animation: heartbeat 2s ease-in-out infinite;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;