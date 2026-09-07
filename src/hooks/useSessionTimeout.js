import { useEffect, useRef, useCallback } from "react";
import { useAuth } from "../context/AuthContext";

const SESSION_TIMEOUT = 20 * 60 * 1000; // 20 minutes in milliseconds
const WARNING_BEFORE_TIMEOUT = 60 * 1000; // Show warning 1 minute before timeout

export const useSessionTimeout = () => {
  const { logout, isAuthenticated } = useAuth();
  const timeoutRef = useRef(null);
  const warningRef = useRef(null);

  const resetTimer = useCallback(() => {
    // Clear existing timers
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (warningRef.current) {
      clearTimeout(warningRef.current);
    }

    if (!isAuthenticated) return;

    // Set warning timer (19 minutes)
    warningRef.current = setTimeout(() => {
      // Dispatch custom event for warning
      window.dispatchEvent(new CustomEvent("sessionWarning"));
    }, SESSION_TIMEOUT - WARNING_BEFORE_TIMEOUT);

    // Set logout timer (20 minutes)
    timeoutRef.current = setTimeout(() => {
      logout();
      window.dispatchEvent(new CustomEvent("sessionExpired"));
    }, SESSION_TIMEOUT);
  }, [logout, isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) return;

    // Events that indicate user activity
    const events = [
      "mousedown",
      "mousemove",
      "keypress",
      "scroll",
      "touchstart",
      "click",
    ];

    const handleActivity = () => {
      resetTimer();
    };

    // Listen for user activity from the warning modal
    const handleUserActivity = () => {
      resetTimer();
      // Dispatch event to hide warning
      window.dispatchEvent(new CustomEvent("sessionWarningDismissed"));
    };

    // Add event listeners
    events.forEach((event) => {
      document.addEventListener(event, handleActivity, true);
    });

    window.addEventListener("userActivity", handleUserActivity);

    // Initial timer setup
    resetTimer();

    // Cleanup
    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, handleActivity, true);
      });
      window.removeEventListener("userActivity", handleUserActivity);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (warningRef.current) {
        clearTimeout(warningRef.current);
      }
    };
  }, [isAuthenticated, resetTimer]);

  return { resetTimer };
};