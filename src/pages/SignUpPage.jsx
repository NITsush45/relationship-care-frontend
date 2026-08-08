import React, { useState } from "react";
import { SignUp } from "@clerk/react";
import { Link } from "react-router-dom";
import { ROLES, ROLE_LABELS } from "../utils/roles";
import { setPendingRole } from "../hooks/useSyncUserRole";

const SignUpPage = () => {
  const [selectedRole, setSelectedRole] = useState(ROLES.USER);
  const [step, setStep] = useState("role");

  const handleContinue = () => {
    setPendingRole(selectedRole);
    setStep("signup");
  };

  if (step === "role") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex flex-col items-center justify-center py-12 px-4">
        <div className="max-w-lg w-full bg-white rounded-3xl shadow-xl p-8 md:p-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">Create Account</h1>
          <p className="text-gray-600 text-center mb-8">Choose how you&apos;ll use Relationship Care</p>

          <div className="space-y-4 mb-8">
            <button
              type="button"
              onClick={() => setSelectedRole(ROLES.USER)}
              className={`w-full p-6 rounded-2xl border-2 text-left transition-all ${
                selectedRole === ROLES.USER
                  ? "border-pink-500 bg-pink-50 ring-2 ring-pink-200"
                  : "border-gray-200 hover:border-pink-300"
              }`}
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl">👤</span>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{ROLE_LABELS[ROLES.USER]}</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    Book appointments, explore services, and connect with therapists.
                  </p>
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setSelectedRole(ROLES.THERAPIST)}
              className={`w-full p-6 rounded-2xl border-2 text-left transition-all ${
                selectedRole === ROLES.THERAPIST
                  ? "border-purple-500 bg-purple-50 ring-2 ring-purple-200"
                  : "border-gray-200 hover:border-purple-300"
              }`}
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl">🩺</span>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{ROLE_LABELS[ROLES.THERAPIST]}</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    Manage sessions, view bookings, and support clients as a therapist.
                  </p>
                </div>
              </div>
            </button>
          </div>

          <button
            type="button"
            onClick={handleContinue}
            className="w-full py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-lg transition-all"
          >
            Continue as {ROLE_LABELS[selectedRole]}
          </button>

          <p className="mt-6 text-center text-gray-600 text-sm">
            Already have an account?{" "}
            <Link to="/sign-in" className="text-pink-600 font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex flex-col items-center justify-center py-12 px-4">
      <div className="text-center mb-6">
        <p className="text-sm text-pink-600 font-semibold mb-1">
          Signing up as {ROLE_LABELS[selectedRole]}
        </p>
        <button
          type="button"
          onClick={() => setStep("role")}
          className="text-gray-500 text-sm hover:text-pink-600 underline"
        >
          Change role
        </button>
      </div>
      <SignUp
        routing="path"
        path="/sign-up"
        signInUrl="/sign-in"
        forceRedirectUrl="/dashboard"
        fallbackRedirectUrl="/dashboard"
        unsafeMetadata={{ role: selectedRole }}
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "shadow-xl rounded-2xl",
          },
        }}
      />
    </div>
  );
};

export default SignUpPage;
