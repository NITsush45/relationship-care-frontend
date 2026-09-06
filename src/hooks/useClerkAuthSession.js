import { useAuth } from "../context/AuthContext";

export function useAuthSession() {
  const {
    user,
    token,
    sessionId,
    isAuthenticated,
    isLoading,
    login,
    logout,
    signup,
  } = useAuth();

  const getAuthHeaders = async (customHeaders = {}) => {
    const headers = {
      "Content-Type": "application/json",
      ...customHeaders,
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    if (sessionId) {
      headers["x-session-id"] = sessionId;
    }

    if (user?.id) {
      headers["x-user-id"] = user.id;
    }

    return headers;
  };

  return {
    isLoaded: !isLoading,
    isSignedIn: isAuthenticated,
    userId: user?.id || null,
    sessionId,
    user,
    token,
    getAuthHeaders,
    login,
    logout,
    signup,
  };
}