import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@clerk/react";

/** Redirects already-signed-in users away from sign-in / sign-up. */
const PublicOnlyRoute = ({ children }) => {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="text-gray-600 animate-pulse">Loading...</div>
      </div>
    );
  }

  if (isSignedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default PublicOnlyRoute;
