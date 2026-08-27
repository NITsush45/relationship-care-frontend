import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const data = await signup(
        username,
        email,
        password,
        selectedRole
      );

      if (data.user?.role === ROLES.THERAPIST) {
        navigate("/therapist-dashboard", { replace: true });
      } else {
        navigate("/user-dashboard", { replace: true });
      }
    } catch (err) {
      setError(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    localStorage.setItem("pending_google_role", selectedRole);
    window.location.href = `${API_BASE}/api/auth/google`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Create Account
          </h1>

          <p className="text-gray-600">
            Join Relationship Care
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">

          <div className="space-y-3 mb-6">

            <button
              type="button"
              onClick={() => setSelectedRole(ROLES.USER)}
              className={`w-full p-4 rounded-xl border-2 text-left transition ${
                selectedRole === ROLES.USER
                  ? "border-pink-500 bg-pink-50"
                  : "border-gray-200"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">👤</span>

                <div>
                  <h3 className="font-bold">
                    {ROLE_LABELS[ROLES.USER]}
                  </h3>

                  <p className="text-sm text-gray-600">
                    Book appointments and connect with therapists.
                  </p>
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setSelectedRole(ROLES.THERAPIST)}
              className={`w-full p-4 rounded-xl border-2 text-left transition ${
                selectedRole === ROLES.THERAPIST
                  ? "border-purple-500 bg-purple-50"
                  : "border-gray-200"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">🩺</span>

                <div>
                  <h3 className="font-bold">
                    {ROLE_LABELS[ROLES.THERAPIST]}
                  </h3>

                  <p className="text-sm text-gray-600">
                    Manage sessions and support clients.
                  </p>
                </div>
              </div>
            </button>

          </div>

          {error && (
            <div className="mb-5 p-3 rounded-lg bg-red-50 text-red-600 text-sm">
              {error}
            </div>
          )}

          <button
            type="button"
            onClick={handleGoogleSignup}
            className="w-full py-3 border border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition"
          >
            Continue with Google
          </button>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-gray-400 text-sm">OR</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:outline-none"
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:outline-none"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:outline-none"
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:outline-none"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-lg transition disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>

          </form>

          <p className="mt-6 text-center text-gray-600 text-sm">
            Already have an account?{" "}
            <Link
              to="/sign-in"
              className="text-pink-600 font-semibold hover:underline"
            >
              Sign in
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default SignUpPage;