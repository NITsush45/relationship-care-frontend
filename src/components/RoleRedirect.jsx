import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "@clerk/react";
import { getUserRole } from "../utils/roles";

/**
 * Sends signed-in users to the correct dashboard based on role.
 */
const RoleRedirect = () => {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center">
        <div className="text-gray-600 animate-pulse">Loading...</div>
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
