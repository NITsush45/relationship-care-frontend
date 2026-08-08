import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth, useUser } from "@clerk/react";
import { getUserRole } from "../utils/roles";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const location = useLocation();

  if (!isLoaded) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="text-gray-600 animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!isSignedIn) {
    return <Navigate to="/sign-in" state={{ from: location.pathname }} replace />;
  }

  if (allowedRoles?.length) {
    const role = getUserRole(user);
    if (!allowedRoles.includes(role)) {
      const fallback = role === "therapist" ? "/therapist-dashboard" : "/user-dashboard";
      return <Navigate to={fallback} replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
