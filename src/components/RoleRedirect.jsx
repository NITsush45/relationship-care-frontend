import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getUserRole } from "../utils/roles";
import { API_BASE } from "../config";

const RoleRedirect = () => {
  const { user, loading } = useAuth();
  const [checkingProfile, setCheckingProfile] = useState(true);
  const [hasProfile, setHasProfile] = useState(false);

  useEffect(() => {
    const checkTherapistProfile = async () => {
      if (!user || getUserRole(user) !== "therapist") {
        setCheckingProfile(false);
        return;
      }

      try {
        const token = localStorage.getItem("authToken");
        const res = await fetch(`${API_BASE}/api/therapist/profile`, {
          headers: token
            ? { Authorization: `Bearer ${token}` }
            : {},
        });

        if (res.ok) {
          const data = await res.json();
          // Check if profile has specialization set
          setHasProfile(Boolean(data?.profile?.specialization));
        }
      } catch (error) {
        console.error("Failed to check therapist profile:", error);
      } finally {
        setCheckingProfile(false);
      }
    };

    if (!loading) {
      checkTherapistProfile();
    }
  }, [user, loading]);

  if (loading || checkingProfile) {
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
    // Redirect to onboarding if profile not completed
    if (!hasProfile) {
      return <Navigate to="/therapist-onboarding" replace />;
    }
    return <Navigate to="/therapist-dashboard" replace />;
  }

  return <Navigate to="/" replace />;
};

export default RoleRedirect;