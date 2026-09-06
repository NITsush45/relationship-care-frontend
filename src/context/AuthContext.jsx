import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { API_BASE } from "../config";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState(null);
  const [sessionId, setSessionId] = useState(null);

  const loadUser = useCallback(() => {
    const storedUser = localStorage.getItem("authUser");
    const storedToken = localStorage.getItem("authToken");

    if (!storedUser || !storedToken) {
      setUser(null);
      setToken(null);
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setToken(storedToken);
    } catch (error) {
      console.error("Invalid stored authentication data:", error);

      localStorage.removeItem("authUser");
      localStorage.removeItem("authToken");

      setUser(null);
      setToken(null);
    }
  }, []);

  useEffect(() => {
    loadUser();
    setLoading(false);

    const handleUserUpdate = () => {
      loadUser();
    };

    window.addEventListener(
      "authUserUpdated",
      handleUserUpdate
    );

    return () => {
      window.removeEventListener(
        "authUserUpdated",
        handleUserUpdate
      );
    };
  }, [loadUser]);

  const persistAuth = useCallback((userData, authToken) => {
    if (!authToken || !userData) {
      console.error("Auth failed: missing user data or token.");
      return;
    }

    localStorage.setItem(
      "authToken",
      authToken
    );

    localStorage.setItem(
      "authUser",
      JSON.stringify(userData)
    );

    setUser(userData);
    setToken(authToken);

    window.dispatchEvent(
      new Event("authUserUpdated")
    );
  }, []);

  const signup = useCallback(async (username, email, password, role = "user") => {
    setIsLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          role,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Signup failed");
      }

      persistAuth(data.user, data.token);
      return data;
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [persistAuth]);

  const login = useCallback(async (emailOrUsername, password) => {
    setIsLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailOrUsername,
          username: emailOrUsername,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Invalid email or password");
      }

      persistAuth(data.user, data.token);
      return data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [persistAuth]);

  const updateUser = useCallback((updatedData) => {
    if (!user) {
      console.error(
        "Cannot update user because no user is logged in."
      );
      return;
    }

    const updatedUser = {
      ...user,
      ...updatedData,
    };

    localStorage.setItem(
      "authUser",
      JSON.stringify(updatedUser)
    );

    setUser(updatedUser);

    window.dispatchEvent(
      new Event("authUserUpdated")
    );
  }, [user]);

  const updateProfilePicture = useCallback((profileImage) => {
    if (!user || !profileImage) {
      return;
    }

    const updatedUser = {
      ...user,
      profileImage,
    };

    localStorage.setItem(
      "authUser",
      JSON.stringify(updatedUser)
    );

    setUser(updatedUser);

    window.dispatchEvent(
      new Event("authUserUpdated")
    );
  }, [user]);

  const logout = useCallback(() => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
    localStorage.removeItem("session_id");

    setUser(null);
    setToken(null);
    setSessionId(null);

    window.dispatchEvent(
      new Event("authUserUpdated")
    );
  }, []);

  const value = {
    user,
    token,
    sessionId,
    loading,
    isLoading,
    isAuthenticated: Boolean(user),

    signup,
    login,
    updateUser,
    updateProfilePicture,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
};