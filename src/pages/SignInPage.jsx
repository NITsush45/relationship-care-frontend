import React from "react";
import { SignIn } from "@clerk/react";
import { Link, useLocation } from "react-router-dom";

const SignInPage = () => {
  const location = useLocation();
  const from = location.state?.from;
  const redirectUrl =
    from && typeof from === "string" && !from.startsWith("/sign-")
      ? from
      : "/dashboard";

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex flex-col items-center justify-center py-12 px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Welcome Back</h1>
        <p className="text-gray-600">Sign in to your Relationship Care account</p>
      </div>
      <SignIn
        routing="path"
        path="/sign-in"
        signUpUrl="/sign-up"
        forceRedirectUrl={redirectUrl}
        fallbackRedirectUrl="/dashboard"
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "shadow-xl rounded-2xl",
          },
        }}
      />
      <p className="mt-6 text-gray-600 text-sm">
        Don&apos;t have an account?{" "}
        <Link to="/sign-up" className="text-pink-600 font-semibold hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default SignInPage;
