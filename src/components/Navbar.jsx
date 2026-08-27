import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

  const profileRef = useRef(null);
  const fileInputRef = useRef(null);

  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const isDark = theme === "dark";

  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);

        if (parsedUser?.profileImage) {
          setProfileImage(parsedUser.profileImage);
        }
      } catch {
        setProfileImage(null);
      }
    }
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen((previous) => !previous);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
    setProfileOpen(false);
  };

  const handleProfileClick = () => {
    setProfileOpen((previous) => !previous);
  };

  const handleProfileImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Profile picture must be less than 5MB.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const image = reader.result;

      setProfileImage(image);

      const storedUser = localStorage.getItem("authUser");

      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);

          const updatedUser = {
            ...parsedUser,
            profileImage: image,
          };

          localStorage.setItem(
            "authUser",
            JSON.stringify(updatedUser)
          );
        } catch {
          return;
        }
      }
    };

    reader.readAsDataURL(file);
  };

  const handleUpdateProfilePicture = () => {
    fileInputRef.current?.click();
  };

  const handleSignOut = () => {
    setProfileOpen(false);
    setIsOpen(false);

    logout();

    navigate("/");
  };

  const getInitial = () => {
    if (user?.firstName) {
      return user.firstName.charAt(0).toUpperCase();
    }

    if (user?.username) {
      return user.username.charAt(0).toUpperCase();
    }

    if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }

    return "U";
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
      <div className="container mx-auto px-6 py-4 flex justify-between items-center relative z-10">

        <Link
          to="/"
          onClick={handleLinkClick}
          className="text-2xl font-bold group relative"
        >
          <span className="inline-block transition-transform duration-300 group-hover:scale-105">
            RelationShip
          </span>

          <span className="text-blue-400 mx-1 inline-block animate-heartbeat">
            {"\u2665"}
          </span>

          <span className="inline-block transition-transform duration-300 group-hover:scale-105">
            Care
          </span>

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
                className={`relative z-10 transition-all duration-300 ${
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

              <span
                className={`absolute inset-0 rounded-lg bg-white/5 transition-opacity duration-300 ${
                  hoveredLink === index
                    ? "opacity-100"
                    : "opacity-0"
                }`}
              />
            </Link>
          ))}

          <button
            onClick={toggleTheme}
            className="ml-2 flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
            aria-label={
              isDark
                ? "Switch to light mode"
                : "Switch to dark mode"
            }
            title={isDark ? "Light mode" : "Dark mode"}
          >
            <span
              className="text-lg"
              role="img"
              aria-hidden="true"
            >
              {isDark ? "\u2600" : "\ud83c\udf19"}
            </span>
          </button>

          {!user ? (
            <div className="flex items-center gap-2 ml-3">
              <Link
                to="/login"
                className="px-4 py-2 rounded-xl font-medium hover:bg-white/10 transition-all"
              >
                Sign In
              </Link>

              <Link
                to="/signup"
                className="px-5 py-2 rounded-xl bg-white text-pink-600 font-semibold hover:shadow-lg hover:scale-105 transition-all"
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <div
              ref={profileRef}
              className="relative ml-3"
            >
              <button
                onClick={handleProfileClick}
                className={`w-11 h-11 rounded-full overflow-hidden border-2 border-white/70 shadow-md hover:scale-105 transition-all duration-300 ${
                  profileOpen
                    ? "ring-4 ring-blue-300/40"
                    : ""
                }`}
                aria-label="Open profile menu"
              >
                {profileImage || user?.profileImage ? (
                  <img
                    src={profileImage || user.profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                    {getInitial()}
                  </div>
                )}
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl overflow-hidden text-gray-800 border border-gray-100">

                  <div className="p-5 bg-gradient-to-r from-pink-50 to-purple-50 border-b border-gray-100">

                    <div className="flex items-center gap-4">

                      <div className="relative">

                        <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-md">

                          {profileImage || user?.profileImage ? (
                            <img
                              src={
                                profileImage ||
                                user.profileImage
                              }
                              alt="Profile"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-white text-xl font-bold">
                              {getInitial()}
                            </div>
                          )}

                        </div>

                        <button
                          onClick={handleUpdateProfilePicture}
                          className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-pink-500 text-white flex items-center justify-center text-xs shadow-md hover:bg-pink-600 transition"
                          title="Change profile picture"
                        >
                          ✎
                        </button>

                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleProfileImageChange}
                          className="hidden"
                        />

                      </div>

                      <div className="min-w-0">

                        <h3 className="font-bold text-lg truncate">
                          {user?.firstName ||
                            user?.username ||
                            "Welcome"}
                        </h3>

                        <p className="text-sm text-gray-500 truncate">
                          {user?.email || ""}
                        </p>

                        <button
                          onClick={handleUpdateProfilePicture}
                          className="text-xs text-pink-600 font-medium mt-1 hover:underline"
                        >
                          Update profile picture
                        </button>

                      </div>

                    </div>

                  </div>

                  <div className="p-3">

                    <Link
                      to="/questionnaire"
                      onClick={handleLinkClick}
                      className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-pink-50 transition-all group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center text-lg group-hover:scale-110 transition">
                        📝
                      </div>

                      <div>
                        <p className="font-semibold">
                          Edit Questionnaire
                        </p>
                        <p className="text-xs text-gray-500">
                          Update your personal answers
                        </p>
                      </div>
                    </Link>

                    <Link
                      to="/progress"
                      onClick={handleLinkClick}
                      className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-purple-50 transition-all group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center text-lg group-hover:scale-110 transition">
                        📈
                      </div>

                      <div>
                        <p className="font-semibold">
                          Track My Improvements
                        </p>
                        <p className="text-xs text-gray-500">
                          View progress with your therapist
                        </p>
                      </div>
                    </Link>

                    <Link
                      to="/change-password"
                      onClick={handleLinkClick}
                      className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-blue-50 transition-all group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-lg group-hover:scale-110 transition">
                        🔑
                      </div>

                      <div>
                        <p className="font-semibold">
                          Change Password
                        </p>
                        <p className="text-xs text-gray-500">
                          Update your account password
                        </p>
                      </div>
                    </Link>

                  </div>

                  <div className="border-t border-gray-100 p-3">

                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all"
                    >
                      <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center text-lg">
                        🚪
                      </div>

                      <div className="text-left">
                        <p className="font-semibold">
                          Sign Out
                        </p>
                        <p className="text-xs text-gray-500">
                          Sign out of your account
                        </p>
                      </div>
                    </button>

                  </div>

                </div>
              )}
            </div>
          )}

        </div>

        <div className="md:hidden flex items-center gap-2">

          <button
            onClick={toggleTheme}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
            aria-label={
              isDark
                ? "Switch to light mode"
                : "Switch to dark mode"
            }
          >
            <span
              className="text-lg"
              role="img"
              aria-hidden="true"
            >
              {isDark ? "\u2600" : "\ud83c\udf19"}
            </span>
          </button>

          {user && (
            <button
              onClick={handleProfileClick}
              className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/70 shadow-md"
            >
              {profileImage || user?.profileImage ? (
                <img
                  src={profileImage || user.profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold">
                  {getInitial()}
                </div>
              )}
            </button>
          )}

          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-lg p-2 transition-all duration-300 hover:bg-white/10 active:scale-95"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">

              <span
                className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
                  isOpen
                    ? "rotate-45 translate-y-0.5"
                    : "-translate-y-1"
                }`}
              />

              <span
                className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
                  isOpen
                    ? "opacity-0"
                    : "opacity-100"
                }`}
              />

              <span
                className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
                  isOpen
                    ? "-rotate-45 -translate-y-0.5"
                    : "translate-y-1"
                }`}
              />

            </div>
          </button>

        </div>

      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen
            ? "max-h-[700px] opacity-100"
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

          {navLinks.map((link, index) => (
            <Link
              key={link.to}
              to={link.to}
              className="block hover:bg-white/10 rounded-lg px-4 py-3 font-medium transition-all duration-300 transform hover:translate-x-2 active:scale-95"
              onClick={handleLinkClick}
              style={{
                animation: isOpen
                  ? `slideInLeft 0.3s ease-out ${
                      index * 0.05
                    }s both`
                  : "none",
              }}
            >
              <span className="flex items-center justify-between">
                {link.label}
                <span className="text-blue-300">
                  {"\u2192"}
                </span>
              </span>
            </Link>
          ))}

          {!user ? (
            <div className="pt-3 mt-3 border-t border-white/20 grid grid-cols-2 gap-3">

              <Link
                to="/login"
                onClick={handleLinkClick}
                className="text-center px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 font-medium"
              >
                Sign In
              </Link>

              <Link
                to="/signup"
                onClick={handleLinkClick}
                className="text-center px-4 py-3 rounded-xl bg-white text-pink-600 font-semibold"
              >
                Sign Up
              </Link>

            </div>
          ) : (
            <div className="pt-3 mt-3 border-t border-white/20">

              <div className="flex items-center gap-3 px-4 py-3 mb-2">

                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/70">

                  {profileImage || user?.profileImage ? (
                    <img
                      src={
                        profileImage ||
                        user.profileImage
                      }
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center font-bold">
                      {getInitial()}
                    </div>
                  )}

                </div>

                <div className="min-w-0">

                  <p className="font-semibold truncate">
                    {user?.firstName ||
                      user?.username ||
                      "Welcome"}
                  </p>

                  <p className="text-xs text-white/70 truncate">
                    {user?.email || ""}
                  </p>

                </div>

              </div>

              <button
                onClick={() => {
                  fileInputRef.current?.click();
                }}
                className="w-full text-left px-4 py-3 rounded-lg hover:bg-white/10"
              >
                🖼️ Update Profile Picture
              </button>

              <Link
                to="/questionnaire"
                onClick={handleLinkClick}
                className="block px-4 py-3 rounded-lg hover:bg-white/10"
              >
                📝 Edit Questionnaire
              </Link>

              <Link
                to="/progress"
                onClick={handleLinkClick}
                className="block px-4 py-3 rounded-lg hover:bg-white/10"
              >
                📈 Track My Improvements
              </Link>

              <Link
                to="/change-password"
                onClick={handleLinkClick}
                className="block px-4 py-3 rounded-lg hover:bg-white/10"
              >
                🔑 Change Password
              </Link>

              <button
                onClick={handleSignOut}
                className="w-full text-left px-4 py-3 rounded-lg hover:bg-red-500/20 text-red-200"
              >
                🚪 Sign Out
              </button>

            </div>
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

        .animate-heartbeat {
          animation: heartbeat 2s ease-in-out infinite;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;