import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import HomePage from "./pages/HomePage.jsx";
import ServicesPage from "./pages/ServicesPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import Navbar from "./components/Navbar.jsx";
import BookAppointment from "./pages/BookAppointment.jsx";
import BlogPage from "./pages/BlogPage.jsx";
import FAQPage from "./pages/FAQPage.jsx";
import PersonalPage from "./pages/PersonalPage.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import TermsOfService from "./pages/TermsofService.jsx";
import Footer from "./components/Footer.jsx";
import DoctorsListPage from "./pages/DoctorsListPage.jsx";

import SignInPage from "./pages/SignInPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import OAuthCallbackPage from "./pages/OAuthCallbackPage.jsx";

import UserDashboard from "./pages/UserDashboard.jsx";
import TherapistDashboard from "./pages/TherapistDashboard.jsx";
import TherapistOnboarding from "./pages/TherapistOnboarding.jsx";

import Progress from "./pages/Progress.jsx";
import ChangePassword from "./pages/ChangePassword.jsx";

import ProtectedRoute from "./components/ProtectedRoute.jsx";
import PublicOnlyRoute from "./components/PublicOnlyRoute.jsx";
import RoleRedirect from "./components/RoleRedirect.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import SessionWarningModal from "./components/SessionWarningModal.jsx";

import { useTheme } from "./context/ThemeContext";
import { ROLES } from "./utils/roles";
import { useSessionTimeout } from "./hooks/useSessionTimeout";

const App = () => {
  const { theme } = useTheme();

  // Initialize session timeout (20 minutes of inactivity)
  useSessionTimeout();

  return (
    <Router>
      <ScrollToTop />
      <SessionWarningModal />
      <div
        className={`app-theme min-h-screen ${
          theme === "dark"
            ? "theme-dark dark"
            : "theme-light"
        }`}
      >
        <Navbar />

        <Routes>

          {/* ================= AUTHENTICATION ================= */}

          <Route
            path="/sign-in"
            element={
              <PublicOnlyRoute>
                <SignInPage />
              </PublicOnlyRoute>
            }
          />

          <Route
            path="/sign-up"
            element={
              <PublicOnlyRoute>
                <SignUpPage />
              </PublicOnlyRoute>
            }
          />

          <Route
            path="/auth/callback"
            element={<OAuthCallbackPage />}
          />

          {/* ================= PUBLIC PAGES ================= */}

          <Route
            path="/privacy-policy"
            element={<PrivacyPolicy />}
          />

          <Route
            path="/terms"
            element={<TermsOfService />}
          />

          {/* ================= HOME ================= */}

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />

          {/* ================= SERVICES ================= */}

          <Route
            path="/services"
            element={
              <ProtectedRoute>
                <ServicesPage />
              </ProtectedRoute>
            }
          />

          {/* ================= DOCTORS ================= */}

          <Route
            path="/doctors/:serviceType"
            element={
              <ProtectedRoute>
                <DoctorsListPage />
              </ProtectedRoute>
            }
          />

          {/* ================= BOOK APPOINTMENT ================= */}

          <Route
            path="/book"
            element={
              <ProtectedRoute>
                <BookAppointment />
              </ProtectedRoute>
            }
          />

          {/* ================= ABOUT ================= */}

          <Route
            path="/about-us"
            element={
              <ProtectedRoute>
                <AboutPage />
              </ProtectedRoute>
            }
          />

          {/* ================= CONTACT ================= */}

          <Route
            path="/contact-us"
            element={
              <ProtectedRoute>
                <ContactPage />
              </ProtectedRoute>
            }
          />

          {/* ================= BLOG ================= */}

          <Route
            path="/blog"
            element={
              <ProtectedRoute>
                <BlogPage />
              </ProtectedRoute>
            }
          />

          {/* ================= FAQ ================= */}

          <Route
            path="/faqs"
            element={
              <ProtectedRoute>
                <FAQPage />
              </ProtectedRoute>
            }
          />

          {/* ================= CONFESS ================= */}

          <Route
            path="/personal"
            element={
              <ProtectedRoute>
                <PersonalPage />
              </ProtectedRoute>
            }
          />

          {/* ================= DASHBOARD REDIRECT ================= */}

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute
                allowedRoles={[
                  ROLES.USER,
                  ROLES.THERAPIST,
                ]}
              >
                <RoleRedirect />
              </ProtectedRoute>
            }
          />

          {/* ================= USER DASHBOARD ================= */}

          <Route
            path="/user-dashboard"
            element={
              <ProtectedRoute
                allowedRoles={[ROLES.USER]}
              >
                <UserDashboard />
              </ProtectedRoute>
            }
          />

          {/* ================= QUESTIONNAIRE ================= */}

          <Route
            path="/questionnaire"
            element={
              <ProtectedRoute
                allowedRoles={[ROLES.USER]}
              >
                <UserDashboard />
              </ProtectedRoute>
            }
          />

          {/* ================= PROGRESS ================= */}

          <Route
            path="/progress"
            element={
              <ProtectedRoute
                allowedRoles={[ROLES.USER]}
              >
                <Progress />
              </ProtectedRoute>
            }
          />

          {/* ================= CHANGE PASSWORD ================= */}

          <Route
            path="/change-password"
            element={
              <ProtectedRoute
                allowedRoles={[
                  ROLES.USER,
                  ROLES.THERAPIST,
                ]}
              >
                <ChangePassword />
              </ProtectedRoute>
            }
          />

          {/* ================= THERAPIST ONBOARDING ================= */}

          <Route
            path="/therapist-onboarding"
            element={
              <ProtectedRoute
                allowedRoles={[ROLES.THERAPIST]}
              >
                <TherapistOnboarding />
              </ProtectedRoute>
            }
          />

          {/* ================= THERAPIST DASHBOARD ================= */}

          <Route
            path="/therapist-dashboard"
            element={
              <ProtectedRoute
                allowedRoles={[ROLES.THERAPIST]}
              >
                <TherapistDashboard />
              </ProtectedRoute>
            }
          />

          {/* ================= FALLBACK ================= */}

          <Route
            path="*"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />

        </Routes>

        <Footer />
      </div>
    </Router>
  );
};

export default App;