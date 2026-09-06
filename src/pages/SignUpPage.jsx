import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaHeart,
  FaUser,
  FaStethoscope,
  FaExclamationTriangle,
} from "react-icons/fa";
import { ROLES, ROLE_LABELS } from "../utils/roles";
import { useAuth } from "../context/AuthContext";
import { API_BASE } from "../config";

const SignUpPage = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState(ROLES.USER);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const cleanUsername = username.trim();
    const cleanEmail = email.trim();

    if (!cleanUsername || !cleanEmail || !password || !confirmPassword) {
      setError("Please fill in all the required fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      const data = await signup(
        cleanUsername,
        cleanEmail,
        password,
        selectedRole
      );

      if (data.user?.role === ROLES.THERAPIST) {
        navigate("/therapist-onboarding", { replace: true });
      } else {
        navigate("/user-dashboard", { replace: true });
      }
    } catch (err) {
      setError(err?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    if (loading || googleLoading) return;

    setError("");
    setGoogleLoading(true);

    /*
     * Save the selected role because the browser will leave
     * the React application and go to Google's OAuth page.
     *
     * Your backend callback should read this role after OAuth
     * and create/update the user accordingly.
     */
    localStorage.setItem("pending_google_role", selectedRole);

    /*
     * Optional: remember that this OAuth flow started from signup.
     * This can be useful in the backend/frontend callback.
     */
    localStorage.setItem("google_auth_action", "signup");

    /*
     * A pending redirect saved by a previous sign-in attempt must
     * not leak into the signup flow – signup always lands on the
     * role-aware dashboard.
     */
    localStorage.removeItem("pending_google_redirect");

    /*
     * Backend route:
     * GET /api/auth/google
     */
    window.location.assign(`${API_BASE}/api/auth/google?role=${selectedRole}`);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-pink-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950/40 px-4 py-10 sm:py-14 transition-colors duration-300">

      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-pink-300/20 dark:bg-pink-600/10 blur-3xl" />
        <div className="absolute top-1/3 -right-32 w-96 h-96 rounded-full bg-purple-300/20 dark:bg-purple-600/10 blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 rounded-full bg-indigo-300/20 dark:bg-indigo-600/10 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-lg mx-auto">

        {/* Welcome Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 shadow-lg shadow-pink-500/20 mb-5">
            <FaHeart className="text-3xl text-white" />
          </div>

          <p className="text-sm sm:text-base font-semibold tracking-wide text-pink-600 dark:text-pink-400 mb-3">
            Welcome to Relationship-Care
          </p>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
            Create Your Account
          </h1>

          <p className="mt-3 text-gray-600 dark:text-gray-300 text-sm sm:text-base">
            Hope you are having a great day.
          </p>

          <p className="mt-1 text-gray-500 dark:text-gray-400 text-sm">
            Start your journey toward healthier and happier relationships.
          </p>
        </div>

        {/* Main Card */}
        <div className="relative rounded-3xl border border-white/70 dark:border-gray-700/70 bg-white/85 dark:bg-gray-900/85 backdrop-blur-xl shadow-2xl shadow-purple-900/10 dark:shadow-black/30 p-6 sm:p-8">

          <div className="absolute top-0 left-8 right-8 h-1 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500" />

          {/* Role Selection */}
          <div className="mb-7">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  Choose your role
                </h2>

                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Select how you want to use Relationship-Care.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              {/* User */}
              <button
                type="button"
                disabled={loading || googleLoading}
                onClick={() => setSelectedRole(ROLES.USER)}
                aria-pressed={selectedRole === ROLES.USER}
                className={`group relative text-left rounded-2xl border-2 p-4 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500/50 ${
                  selectedRole === ROLES.USER
                    ? "border-pink-500 bg-pink-50 dark:bg-pink-950/30 shadow-lg shadow-pink-500/10"
                    : "border-gray-200 dark:border-gray-700 bg-gray-50/70 dark:bg-gray-800/60 hover:border-pink-300 dark:hover:border-pink-700 hover:bg-pink-50/50 dark:hover:bg-pink-950/20"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center text-xl ${
                      selectedRole === ROLES.USER
                        ? "bg-gradient-to-br from-pink-500 to-rose-500 text-white shadow-md"
                        : "bg-pink-100 dark:bg-pink-950/50"
                    }`}
                  >
                    <FaUser className="text-xl" />
                  </div>

                  <div className="min-w-0">
                    <h3 className="font-bold text-gray-900 dark:text-white">
                      {ROLE_LABELS[ROLES.USER]}
                    </h3>

                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                      Book appointments and connect with therapists.
                    </p>
                  </div>
                </div>

                {selectedRole === ROLES.USER && (
                  <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-pink-500 flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </button>

              {/* Therapist */}
              <button
                type="button"
                disabled={loading || googleLoading}
                onClick={() => setSelectedRole(ROLES.THERAPIST)}
                aria-pressed={selectedRole === ROLES.THERAPIST}
                className={`group relative text-left rounded-2xl border-2 p-4 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50 ${
                  selectedRole === ROLES.THERAPIST
                    ? "border-purple-500 bg-purple-50 dark:bg-purple-950/30 shadow-lg shadow-purple-500/10"
                    : "border-gray-200 dark:border-gray-700 bg-gray-50/70 dark:bg-gray-800/60 hover:border-purple-300 dark:hover:border-purple-700 hover:bg-purple-50/50 dark:hover:bg-purple-950/20"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center text-xl ${
                      selectedRole === ROLES.THERAPIST
                        ? "bg-gradient-to-br from-purple-500 to-indigo-500 text-white shadow-md"
                        : "bg-purple-100 dark:bg-purple-950/50"
                    }`}
                  >
                    <FaStethoscope className="text-xl" />
                  </div>

                  <div className="min-w-0">
                    <h3 className="font-bold text-gray-900 dark:text-white">
                      {ROLE_LABELS[ROLES.THERAPIST]}
                    </h3>

                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                      Manage sessions and support clients.
                    </p>
                  </div>
                </div>

                {selectedRole === ROLES.THERAPIST && (
                  <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div
              role="alert"
              className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 dark:border-red-900/60 bg-red-50 dark:bg-red-950/30 px-4 py-3 text-sm text-red-700 dark:text-red-300"
            >
              <FaExclamationTriangle className="text-lg leading-none" />

              <div>
                <p className="font-semibold">
                  Unable to create account
                </p>

                <p className="mt-1">{error}</p>
              </div>
            </div>
          )}

          {/* Google Signup */}
          <button
            type="button"
            onClick={handleGoogleSignup}
            disabled={loading || googleLoading}
            className="w-full flex items-center justify-center gap-3 py-3.5 px-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 font-semibold shadow-sm hover:bg-gray-50 dark:hover:bg-gray-750 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {googleLoading ? (
              <>
                <span className="w-5 h-5 rounded-full border-2 border-gray-300 border-t-pink-500 animate-spin" />
                Connecting to Google...
              </>
            ) : (
              <>
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fill="#4285F4"
                    d="M21.35 12.23c0-.79-.07-1.55-.22-2.27H12v4.3h5.22a4.46 4.46 0 0 1-1.94 2.93v2.44h3.14c1.84-1.69 2.93-4.18 2.93-7.4Z"
                  />

                  <path
                    fill="#34A853"
                    d="M12 21.6c2.63 0 4.84-.87 6.45-2.37l-3.14-2.44c-.87.58-1.98.92-3.31.92-2.55 0-4.71-1.72-5.49-4.03H3.26v2.52A9.75 9.75 0 0 0 12 21.6Z"
                  />

                  <path
                    fill="#FBBC05"
                    d="M6.51 13.68A5.86 5.86 0 0 1 6.2 12c0-.58.1-1.15.31-1.68V7.8H3.26A9.75 9.75 0 0 0 2.25 12c0 1.57.38 3.06 1.01 4.2l3.25-2.52Z"
                  />

                  <path
                    fill="#EA4335"
                    d="M12 6.29c1.43 0 2.72.49 3.73 1.45l2.8-2.8C16.84 3.36 14.63 2.4 12 2.4a9.75 9.75 0 0 0-8.74 5.4l3.25 2.52C7.29 8.01 9.45 6.29 12 6.29Z"
                  />
                </svg>

                Continue with Google
              </>
            )}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 my-7">
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />

            <span className="text-xs font-semibold tracking-wider text-gray-400 dark:text-gray-500">
              OR
            </span>

            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2"
              >
                Username
              </label>

              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                disabled={loading || googleLoading}
                required
                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500/40 focus:border-pink-500 transition-all"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2"
              >
                Email Address
              </label>

              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                disabled={loading || googleLoading}
                required
                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500/40 focus:border-pink-500 transition-all"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                disabled={loading || googleLoading}
                required
                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500/40 focus:border-pink-500 transition-all"
              />

              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                Password must contain at least 6 characters.
              </p>
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2"
              >
                Confirm Password
              </label>

              <input
                id="confirmPassword"
                type="password"
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
                disabled={loading || googleLoading}
                required
                className={`w-full px-4 py-3.5 rounded-xl border bg-gray-50 dark:bg-gray-800/80 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${
                  confirmPassword && password !== confirmPassword
                    ? "border-red-400 focus:ring-red-500/30 focus:border-red-500"
                    : "border-gray-200 dark:border-gray-700 focus:ring-pink-500/40 focus:border-pink-500"
                }`}
              />

              {confirmPassword && password === confirmPassword && (
                <p className="mt-2 text-xs text-green-600 dark:text-green-400 font-medium">
                  ✓ Passwords match
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || googleLoading}
              className="w-full relative overflow-hidden py-3.5 px-6 rounded-xl bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 text-white font-bold shadow-lg shadow-purple-500/20 hover:shadow-xl hover:shadow-purple-500/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <span className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    Creating account...
                  </>
                ) : (
                  <>
                    Create Account
                    <span>→</span>
                  </>
                )}
              </span>
            </button>
          </form>

          {/* Login */}
          <div className="mt-7 pt-6 border-t border-gray-100 dark:border-gray-800">
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <Link
                to="/sign-in"
                className="font-bold text-pink-600 dark:text-pink-400 hover:text-purple-600 dark:hover:text-purple-400 hover:underline transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>

          {/* Privacy */}
          <p className="mt-5 text-center text-xs text-gray-400 dark:text-gray-500 leading-relaxed">
            By creating an account, you agree to use Relationship-Care
            responsibly and respectfully.
          </p>
        </div>

        {/* Bottom Branding */}
        <div className="text-center mt-7">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            Your journey matters. Your story matters.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;