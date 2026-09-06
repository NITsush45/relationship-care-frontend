import React, { useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import {
  FaEye,
  FaEyeSlash,
  FaHeart,
  FaGoogle,
  FaLock,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { API_BASE } from "../config";
import {
  getOAuthErrorMessage,
  isSafeInternalPath,
} from "../utils/oauthErrors";

const SignInPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const from = location.state?.from;

  const redirectUrl =
    from &&
    typeof from === "string" &&
    !from.startsWith("/sign-")
      ? from
      : "/dashboard";

  useEffect(() => {
    const oauthError = searchParams.get("error");

    if (oauthError) {
      setError(getOAuthErrorMessage(oauthError));

      // Clean the error out of the address bar so it does not
      // reappear on refresh or navigation.
      window.history.replaceState({}, "", "/sign-in");
    }
  }, [searchParams]);

      const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const trimmedEmail = email.trim();

    if (!trimmedEmail || !password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      await login(trimmedEmail, password);

      navigate(redirectUrl, { replace: true });
    } catch (err) {
      setError(err?.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    try {
      // The browser leaves the app during the Google redirect,
      // so remember the context in localStorage for the callback.
      localStorage.setItem("pending_google_role", "user");
      localStorage.setItem("google_auth_action", "login");

      if (isSafeInternalPath(redirectUrl)) {
        localStorage.setItem("pending_google_redirect", redirectUrl);
      } else {
        localStorage.removeItem("pending_google_redirect");
      }
    } catch (_) {
      // localStorage unavailable – the callback falls back
      // to the role-aware dashboard redirect.
    }

    window.location.href = `${API_BASE}/api/auth/google?role=user`;
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-pink-50 via-white to-purple-50 px-4 py-10 transition-colors duration-300 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950/40">

      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-pink-300/30 blur-3xl dark:bg-pink-600/10" />

      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-purple-300/30 blur-3xl dark:bg-purple-600/10" />

      <div className="pointer-events-none absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-indigo-200/20 blur-3xl dark:bg-indigo-500/10" />

      {/* Main Content */}
      <div className="relative z-10 flex min-h-[calc(100vh-5rem)] items-center justify-center">

        <div className="w-full max-w-md">

          {/* Brand / Welcome */}
          <div className="mb-8 text-center">

            <p className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-pink-600 dark:text-pink-400">
              Welcome again to{" "}
              <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Relationship-Care
              </span>
            </p>

            {/* Logo */}
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 text-white shadow-xl shadow-pink-500/20">
              <FaHeart className="text-2xl" />
            </div>

            <h1 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white md:text-4xl">
              Welcome Back
            </h1>

            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Sign in to continue your relationship journey
            </p>
          </div>

          {/* Sign In Card */}
          <div className="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-2xl shadow-purple-500/10 backdrop-blur-xl transition-colors duration-300 dark:border-gray-700/60 dark:bg-gray-900/80 dark:shadow-black/30 sm:p-8">

            {/* Card Header */}
            <div className="mb-7">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Sign in to your account
              </h2>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Enter your credentials below to get started.
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div
                role="alert"
                className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300"
              >
                <span className="mt-0.5 font-bold">!</span>

                <span>{error}</span>
              </div>
            )}

            {/* Sign In Form */}
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  Email address
                </label>

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  disabled={loading}
                  required
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-700 dark:bg-gray-800/80 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-pink-500 dark:focus:ring-pink-500/10"
                />
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between">

                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
                  >
                    Password
                  </label>

                  <Link
                    to="/forgot-password"
                    className="text-sm font-semibold text-pink-600 transition-colors hover:text-pink-700 hover:underline dark:text-pink-400 dark:hover:text-pink-300"
                  >
                    Forgot password?
                  </Link>

                </div>

                <div className="relative">

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    disabled={loading}
                    required
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 pr-12 text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-700 dark:bg-gray-800/80 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-pink-500 dark:focus:ring-pink-500/10"
                  />

                  {/* Show / Hide Password */}
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    disabled={loading}
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500 dark:hover:bg-gray-700 dark:hover:text-gray-200"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>

                </div>
              </div>

              {/* Security Message */}
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <FaLock className="text-pink-500" />

                <span>
                  Your connection is secure and protected.
                </span>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 py-3.5 font-bold text-white shadow-lg shadow-pink-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-purple-500/25 focus:outline-none focus:ring-4 focus:ring-pink-500/20 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
              >

                <span className="relative z-10">

                  {loading ? (
                    <span className="flex items-center justify-center gap-2">

                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                      Signing in...

                    </span>
                  ) : (
                    "Sign In"
                  )}

                </span>

                <span className="absolute inset-0 -translate-x-full bg-white/10 transition-transform duration-500 group-hover:translate-x-0" />

              </button>

            </form>

            {/* Divider */}
            <div className="my-7 flex items-center gap-4">

              <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />

              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Or continue with
              </span>

              <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />

            </div>

            {/* Google Login */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white py-3.5 font-semibold text-gray-700 transition-all hover:-translate-y-0.5 hover:bg-gray-50 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-gray-500/10 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-750"
            >
              <FaGoogle className="text-red-500" />

              Continue with Google
            </button>

            {/* Terms */}
            <p className="mt-6 text-center text-xs leading-relaxed text-gray-400 dark:text-gray-500">

              By continuing, you agree to our{" "}

              <Link
                to="/terms"
                className="font-medium text-gray-600 hover:underline dark:text-gray-300"
              >
                Terms of Service
              </Link>

              {" "}and{" "}

              <Link
                to="/privacy"
                className="font-medium text-gray-600 hover:underline dark:text-gray-300"
              >
                Privacy Policy
              </Link>

              .

            </p>

          </div>

          {/* Sign Up */}
          <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">

            Don't have an account?{" "}

            <Link
              to="/sign-up"
              className="font-bold text-pink-600 transition-colors hover:text-pink-700 hover:underline dark:text-pink-400 dark:hover:text-pink-300"
            >
              Create an account
            </Link>

          </p>

          {/* Footer */}
          <div className="mt-8 flex items-center justify-center gap-2 text-xs text-gray-400 dark:text-gray-600">

            <FaHeart className="text-pink-500" />

            <span>Relationship Care</span>

          </div>

        </div>

      </div>
    </div>
  );
};

export default SignInPage;