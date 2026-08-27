import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { API_BASE } from "../config";
import { useAuth } from "./AuthContext";

const SessionContext = createContext({
  sessionId: null,
  isLoading: true,
});

export const SessionProvider = ({ children }) => {
  const {
    user,
    isAuthenticated,
    loading: authLoading,
  } = useAuth();

  const [sessionId, setSessionId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (authLoading) {
      setIsLoading(true);
      return;
    }

    if (!isAuthenticated || !user) {
      setSessionId(null);
      setIsLoading(false);

      localStorage.removeItem("session_id");
      return;
    }

    const createSession = async () => {
      setIsLoading(true);

      try {
        const storedSessionId =
          localStorage.getItem("session_id");

        const token = localStorage.getItem("authToken");

        const response = await fetch(
          `${API_BASE}/api/user/session`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              ...(token
                ? {
                    Authorization: `Bearer ${token}`,
                  }
                : {}),
            },
            body: JSON.stringify({
              sessionId: storedSessionId,
              userId: user.id,
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();

          const newSessionId =
            data.sessionId || storedSessionId;

          setSessionId(newSessionId);

          if (newSessionId) {
            localStorage.setItem(
              "session_id",
              newSessionId
            );
          }
        } else {
          setSessionId(storedSessionId);
        }
      } catch (error) {
        console.error(
          "Failed to create session:",
          error
        );

        const storedSessionId =
          localStorage.getItem("session_id");

        setSessionId(storedSessionId);
      } finally {
        setIsLoading(false);
      }
    };

    createSession();
  }, [authLoading, isAuthenticated, user]);

  return (
    <SessionContext.Provider
      value={{
        sessionId,
        isLoading,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () =>
  useContext(SessionContext);