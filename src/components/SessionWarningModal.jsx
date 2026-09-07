import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaClock, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const SessionWarningModal = () => {
  const [showWarning, setShowWarning] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const { logout } = useAuth();

  useEffect(() => {
    const handleSessionWarning = () => {
      setShowWarning(true);
      setCountdown(60);
    };

    const handleSessionExpired = () => {
      setShowWarning(false);
    };

    const handleWarningDismissed = () => {
      setShowWarning(false);
    };

    window.addEventListener("sessionWarning", handleSessionWarning);
    window.addEventListener("sessionExpired", handleSessionExpired);
    window.addEventListener("sessionWarningDismissed", handleWarningDismissed);

    return () => {
      window.removeEventListener("sessionWarning", handleSessionWarning);
      window.removeEventListener("sessionExpired", handleSessionExpired);
      window.removeEventListener("sessionWarningDismissed", handleWarningDismissed);
    };
  }, []);

  useEffect(() => {
    if (!showWarning) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [showWarning]);

  const handleStayLoggedIn = () => {
    setShowWarning(false);
    // Dispatch event to reset the timer
    window.dispatchEvent(new CustomEvent("userActivity"));
  };

  const handleLogout = () => {
    setShowWarning(false);
    logout();
  };

  return (
    <AnimatePresence>
      {showWarning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-md mx-4 text-center"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
              <FaClock className="text-yellow-500 text-2xl" />
            </div>

            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              Session Expiring Soon
            </h2>

            <p className="text-gray-600 dark:text-gray-300 mb-4">
              You've been inactive for a while. Your session will expire in:
            </p>

            <div className="text-4xl font-bold text-red-500 mb-4">
              {countdown} seconds
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              You will be automatically logged out if you don't respond.
            </p>

            <div className="flex gap-3">
              <button
                onClick={handleStayLoggedIn}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:shadow-lg transition-all"
              >
                Stay Logged In
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 py-3 px-4 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-all flex items-center justify-center gap-2"
              >
                <FaSignOutAlt />
                Logout
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SessionWarningModal;