import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUser = () => {
    const storedUser = localStorage.getItem("authUser");
    const token = localStorage.getItem("authToken");

    if (!storedUser || !token) {
      setUser(null);
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    } catch (error) {
      console.error("Invalid stored authentication data:", error);

      localStorage.removeItem("authUser");
      localStorage.removeItem("authToken");

      setUser(null);
    }
  };

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
  }, []);

  const signup = (userData, token) => {
    if (!token || !userData) {
      console.error("Signup failed: missing user data or token.");
      return;
    }

    localStorage.setItem(
      "authToken",
      token
    );

    localStorage.setItem(
      "authUser",
      JSON.stringify(userData)
    );

    setUser(userData);

    window.dispatchEvent(
      new Event("authUserUpdated")
    );
  };

  const login = (userData, token) => {
    if (!token || !userData) {
      console.error("Login failed: missing user data or token.");
      return;
    }

    localStorage.setItem(
      "authToken",
      token
    );

    localStorage.setItem(
      "authUser",
      JSON.stringify(userData)
    );

    setUser(userData);

    window.dispatchEvent(
      new Event("authUserUpdated")
    );
  };

  const updateUser = (updatedData) => {
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
  };

  const updateProfilePicture = (profileImage) => {
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
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");

    setUser(null);

    window.dispatchEvent(
      new Event("authUserUpdated")
    );
  };

  const value = {
    user,
    loading,
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