import { useEffect, useRef } from "react";
import { useAuth, useUser } from "@clerk/react";
import { API_BASE } from "../config";
import { getUserRole } from "../utils/roles";
import { useSession } from "../context/SessionContext";

const PENDING_ROLE_KEY = "pendingClerkRole";

export function setPendingRole(role) {
  sessionStorage.setItem(PENDING_ROLE_KEY, role);
}

export function getPendingRole() {
  return sessionStorage.getItem(PENDING_ROLE_KEY);
}

export function clearPendingRole() {
  sessionStorage.removeItem(PENDING_ROLE_KEY);
}

/**
 * After sign-up, syncs the selected role (User / Therapist)
 * to Clerk publicMetadata via backend.
 */
export function useSyncUserRole() {
  const { isSignedIn, getToken } = useAuth();
  const { user, isLoaded } = useUser();
  const { sessionId } = useSession();
  const syncingRef = useRef(false);

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !user || syncingRef.current) {
      return;
    }

    const pendingRole = getPendingRole();
    const currentRole = getUserRole(user);

    if (!pendingRole && user.publicMetadata?.role) {
      return;
    }

    if (
      pendingRole &&
      currentRole === pendingRole &&
      user.publicMetadata?.role
    ) {
      clearPendingRole();
      return;
    }

    const roleToSet = pendingRole || currentRole;

    if (!roleToSet) {
      return;
    }

    syncingRef.current = true;

    (async () => {
      try {
        const token = await getToken();

        const res = await fetch(`${API_BASE}/api/user/set-role`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "X-Session-Id": sessionId || "",
          },
          body: JSON.stringify({
            role: roleToSet,
          }),
        });

        if (res.ok) {
          await user.reload();
          clearPendingRole();
        }
      } catch (_) {
        // Role sync is best-effort; user can retry on next visit
      } finally {
        syncingRef.current = false;
      }
    })();
  }, [isLoaded, isSignedIn, user, getToken, sessionId]);
}