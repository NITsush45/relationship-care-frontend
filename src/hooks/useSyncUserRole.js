import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { API_BASE } from "../config";

/**
 * Syncs the user's role from the backend after authentication.
 * This ensures role changes (e.g. therapist signup via Google) are reflected.
 */
export function useSyncUserRole() {
  const { user, token } = useAuth();

  useEffect(() => {
    if (!user || !token) {
      return;
    }

    let active = true;

    const syncRole = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok || !active) {
          return;
        }

        const data = await res.json();

        if (data.user && active) {
          const currentUser = JSON.parse(localStorage.getItem("authUser") || "null");

          if (currentUser && currentUser.role !== data.user.role) {
            const updatedUser = {
              ...currentUser,
              ...data.user,
            };

            localStorage.setItem("authUser", JSON.stringify(updatedUser));
            window.dispatchEvent(new Event("authUserUpdated"));
          }
        }
      } catch (error) {
        // Silent fail - role sync is best-effort
      }
    };

    syncRole();

    return () => {
      active = false;
    };
  }, [user?.id, token]);
}