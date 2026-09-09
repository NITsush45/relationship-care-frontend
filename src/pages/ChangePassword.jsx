import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaKey } from "react-icons/fa";

const ChangePassword = () => {
  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    setError("");
    setMessage("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (newPassword.length < 6) {
      setError(
        "New password must contain at least 6 characters."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setError(
        "New password and confirm password do not match."
      );
      return;
    }

    const storedPassword =
      localStorage.getItem("authPassword");

    if (
      storedPassword &&
      storedPassword !== currentPassword
    ) {
      setError("Current password is incorrect.");
      return;
    }

    localStorage.setItem(
      "authPassword",
      newPassword
    );

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

    setMessage(
      "Password changed successfully."
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950/40 flex items-center justify-center px-4 py-10 transition-colors duration-300">

      <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-3xl shadow-xl dark:shadow-black/30 p-8 dark:border dark:border-gray-700">

        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-purple-500 dark:from-blue-600 dark:to-purple-700 flex items-center justify-center text-white text-3xl">
            <FaKey className="text-3xl text-white" />
          </div>

          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mt-4">
            Change Password
          </h1>

          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Update your account password.
          </p>
        </div>

        {error && (
          <div className="mb-5 p-4 rounded-xl bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-300">
            {error}
          </div>
        )}

        {message && (
          <div className="mb-5 p-4 rounded-xl bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-300">
            {message}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div>
            <label className="block font-medium text-gray-700 dark:text-gray-300 mb-2">
              Current Password
            </label>

            <input
              type="password"
              value={currentPassword}
              onChange={(event) =>
                setCurrentPassword(
                  event.target.value
                )
              }
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white focus:border-blue-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 dark:text-gray-300 mb-2">
              New Password
            </label>

            <input
              type="password"
              value={newPassword}
              onChange={(event) =>
                setNewPassword(
                  event.target.value
                )
              }
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white focus:border-blue-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 dark:text-gray-300 mb-2">
              Confirm New Password
            </label>

            <input
              type="password"
              value={confirmPassword}
              onChange={(event) =>
                setConfirmPassword(
                  event.target.value
                )
              }
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white focus:border-blue-400 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-600 dark:to-purple-700 text-white font-semibold hover:shadow-lg transition-all"
          >
            Change Password
          </button>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="w-full py-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
          >
            Cancel
          </button>

        </form>
      </div>
    </div>
  );
};

export default ChangePassword;