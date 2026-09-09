import React from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

/**
 * AuthChrome hides the navbar + footer until the user is signed in.
 * Sign-in / sign-up / OAuth callback pages stay chrome-free so the
 * auth screens never show site navigation.
 */
const AUTH_ROUTES = ["/sign-in", "/sign-up", "/auth/callback"];

const AuthChrome = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  const pathname = location?.pathname || "";

  // Still resolving session: render content only (no flicker of nav).
  if (loading) return <>{children}</>;

  const isAuthRoute = AUTH_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  // Requirement: without login/signup don't show navbar.
  if (!user || isAuthRoute) return <>{children}</>;

  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default AuthChrome;
