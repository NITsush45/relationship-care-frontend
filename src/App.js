import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage.jsx";
import ServicesPage from "./pages/ServicesPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import Navbar from "./components/Navbar";
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

import UserDashboard from "./pages/UserDashboard.jsx";
import TherapistDashboard from "./pages/TherapistDashboard.jsx";

import ProtectedRoute from "./components/ProtectedRoute.jsx";
import PublicOnlyRoute from "./components/PublicOnlyRoute.jsx";
import RoleRedirect from "./components/RoleRedirect.jsx";

import { useTheme } from "./context/ThemeContext";
import { ROLES } from "./utils/roles";

const App = () => {
  const { theme } = useTheme();

  return (
    <Router>
      <div
        className={`app-theme ${
          theme === "dark" ? "theme-dark dark" : "theme-light"
        }`}
      >
        <Navbar />

        <Routes>
          {/* Authentication */}
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

          {/* Public pages */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />

          {/* Protected pages */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/book"
            element={
              <ProtectedRoute>
                <BookAppointment />
              </ProtectedRoute>
            }
          />

          <Route
            path="/services"
            element={
              <ProtectedRoute>
                <ServicesPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/doctors/:serviceType"
            element={
              <ProtectedRoute>
                <DoctorsListPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/about-us"
            element={
              <ProtectedRoute>
                <AboutPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/contact-us"
            element={
              <ProtectedRoute>
                <ContactPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/blog"
            element={
              <ProtectedRoute>
                <BlogPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/faqs"
            element={
              <ProtectedRoute>
                <FAQPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/personal"
            element={
              <ProtectedRoute>
                <PersonalPage />
              </ProtectedRoute>
            }
          />

          {/* Dashboard redirect */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={[ROLES.USER, ROLES.THERAPIST]}>
                <RoleRedirect />
              </ProtectedRoute>
            }
          />

          {/* User dashboard */}
          <Route
            path="/user-dashboard"
            element={
              <ProtectedRoute allowedRoles={[ROLES.USER]}>
                <UserDashboard />
              </ProtectedRoute>
            }
          />

          {/* Therapist dashboard */}
          <Route
            path="/therapist-dashboard"
            element={
              <ProtectedRoute allowedRoles={[ROLES.THERAPIST]}>
                <TherapistDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>

      <Footer />
    </Router>
  );
};

export default App;