import { useAuth, useUser, useSession } from "@clerk/react";

export function useClerkAuthSession() {
  const { isSignedIn, isLoaded, getToken, userId, sessionId } = useAuth();
  const { user } = useUser();
  const { session } = useSession();

  const getAuthHeaders = async (customHeaders = {}) => {
    const headers = { ...customHeaders };
    try {
      if (isSignedIn && getToken) {
        const token = await getToken();
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }
      }
    } catch (_) {
      // Ignore token retrieval error
    }

    const activeSessionId = sessionId || session?.id || null;
    const activeUserId = userId || user?.id || null;

    if (activeSessionId) {
      headers["x-session-id"] = activeSessionId;
    }
    if (activeUserId) {
      headers["x-user-id"] = activeUserId;
    }

    return headers;
  };

  return {
    isLoaded,
    isSignedIn,
    userId: userId || user?.id || null,
    sessionId: sessionId || session?.id || null,
    user,
    session,
    getToken,
    getAuthHeaders,
  };
}
