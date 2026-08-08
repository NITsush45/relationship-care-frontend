import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { useAuth, useUser } from "@clerk/react";
import { API_BASE } from "../config";

const SessionContext = createContext({
  sessionId: null,
  isLoading: true,
});

export const SessionProvider = ({ children }) => {
  const { isSignedIn, getToken, sessionId: clerkSessionId } = useAuth();
  const { user, isLoaded } = useUser();
  const [sessionId, setSessionId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const syncedRef = useRef(false);

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !user || !clerkSessionId) {
      if (!isSignedIn) {
        syncedRef.current = false;
        setSessionId(null);
        setIsLoading(false);
        if (typeof window !== "undefined") {
          localStorage.removeItem("clerk_session_id");
        }
      }
      return;
    }

    if (syncedRef.current) return;

    syncedRef.current = true;
    setIsLoading(true);

    (async () => {
      try {
        const token = await getToken();

        // Sync session with backend
        const res = await fetch(`${API_BASE}/api/user/session`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            sessionId: clerkSessionId,
            userId: user.id,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          setSessionId(data.sessionId || clerkSessionId);
          // Persist session ID for subsequent visits
          if (typeof window !== "undefined") {
            localStorage.setItem("clerk_session_id", data.sessionId || clerkSessionId);
          }
        } else {
          setSessionId(clerkSessionId);
        }
      } catch (_) {
        setSessionId(clerkSessionId);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [isLoaded, isSignedIn, user, clerkSessionId, getToken]);

  // Restore session ID from localStorage on mount
  useEffect(() => {
    if (!isSignedIn) return;

    const stored =
      typeof window !== "undefined"
        ? localStorage.getItem("clerk_session_id")
        : null;
    if (stored && !sessionId) {
      setSessionId(stored);
    }
  }, [isSignedIn, sessionId]);

  const value = { sessionId, isLoading };

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);
