import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { API_BASE } from "../config";
import {
  getOAuthErrorMessage,
  isSafeInternalPath,
} from "../utils/oauthErrors";

const OAuthCallbackPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [error, setError] = useState("");
  const hasStarted = useRef(false);

  useEffect(() => {
    // React StrictMode runs effects twice in development.
    // Completing OAuth must only happen once.
    if (hasStarted.current) {
      return;
    }

    hasStarted.current = true;

    const token = searchParams.get("token");
    const errorParam = searchParams.get("error");

    // Remove the token / error from the address bar and browser
    // history before doing anything else with it.
    window.history.replaceState({}, "", "/auth/callback");

    if (errorParam) {
      setError(getOAuthErrorMessage(errorParam));
      return;
    }

    if (!token) {
      setError("Authentication failed: no token received from Google.");
      return;
    }

    const completeOAuth = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to load user profile.");
        }

        const data = await res.json();

        if (!data.user) {
          throw new Error("User profile not found.");
        }

        localStorage.setItem("authToken", token);
        localStorage.setItem("authUser", JSON.stringify(data.user));

        window.dispatchEvent(new Event("authUserUpdated"));

        const authAction = localStorage.getItem("google_auth_action"); // "signup" | "login"

        const pendingRedirect = localStorage.getItem(
          "pending_google_redirect"
        );
        const pendingRole = localStorage.getItem("pending_google_role");

        localStorage.removeItem("pending_google_role");
        localStorage.removeItem("google_auth_action");
        localStorage.removeItem("pending_google_redirect");

        // Trust the role stored in the database (returned by the
        // API) over whatever was remembered before the redirect.
        const actualRole = data.user.role || pendingRole || "user";

        if (pendingRedirect && isSafeInternalPath(pendingRedirect)) {
          navigate(pendingRedirect, { replace: true });
        } else if (actualRole === "therapist") {
          // Therapists must complete onboarding (expertise segment +
          // age + mood) before seeing their patient list. Check profile
          // and route accordingly. Canonical route is /therapist-onboarding.
          try {
            const profileRes = await fetch(`${API_BASE}/api/therapist/profile`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            if (profileRes.ok) {
              const profileData = await profileRes.json();
              const profile = profileData?.profile || null;
              if (!profile?.specialization) {
                navigate("/therapist-onboarding", { replace: true });
                return;
              }
            } else {
              // If profile check fails, safest is onboarding (it redirects
              // to dashboard on failure paths anyway).
              navigate("/therapist-onboarding", { replace: true });
              return;
            }
          } catch (_) {
            navigate("/therapist-onboarding", { replace: true });
            return;
          }
          navigate("/therapist-dashboard", { replace: true });
        } else if (authAction === "signup" && !data.user?.hasCompletedQuestionnaire) {
          // Questionnaire runs only during new account registration.
          navigate("/questionnaire", { replace: true });
        } else {
          // Returning users land on the home page without the questionnaire.
          navigate("/", { replace: true });
        }
      } catch (err) {
        console.error("OAuth callback error:", err);
        setError(err?.message || "Failed to complete Google authentication.");
      }
    };

    completeOAuth();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950/40 px-4">
      <div className="w-full max-w-md text-center">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8">
          {error ? (
            <>
              <div className="w-16 h-16 mx-auto rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-500 text-3xl mb-4">
                !
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Authentication Failed
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {error}
              </p>
              <button
                type="button"
                onClick={() => navigate("/sign-in")}
                className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold shadow-lg hover:shadow-xl transition-all"
              >
                Back to Sign In
              </button>
            </>
          ) : (
            <>
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center mb-4">
                <div className="w-8 h-8 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Completing Sign In
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Please wait while we securely connect your Google account...
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OAuthCallbackPage;