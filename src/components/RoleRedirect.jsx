import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getUserRole } from "../utils/roles";

const RoleRedirect = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="text-gray-600 animate-pulse">
          Loading...
        </div>
      </div>
    );
  }

  const role = getUserRole(user);

  if (role === "therapist") {
    return <Navigate to="/therapist-dashboard" replace />;
  }

  return <Navigate to="/user-dashboard" replace />;
};

export default RoleRedirect;