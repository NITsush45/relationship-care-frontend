import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import ServicesPage from './pages/ServicesPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import Navbar from "./components/Navbar";
import BookAppointment from './pages/BookAppointment.jsx';
import BlogPage from './pages/BlogPage.jsx';
import FAQPage from './pages/FAQPage.jsx';
import PersonalPage from './pages/PersonalPage.jsx';
import PrivacyPolicy from './pages/PrivacyPolicy.jsx';
import TermsOfService from './pages/TermsofService.jsx';
import Footer from './components/Footer.jsx';
import DoctorsListPage from './pages/DoctorsListPage.jsx';
import SignInPage from './pages/SignInPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import UserDashboard from './pages/UserDashboard.jsx';
import TherapistDashboard from './pages/TherapistDashboard.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import PublicOnlyRoute from './components/PublicOnlyRoute.jsx';
import RoleRedirect from './components/RoleRedirect.jsx';
import AuthSync from './components/AuthSync.jsx';
import { useTheme } from './context/ThemeContext';
import { ROLES } from './utils/roles';

const hasClerk = !!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

const ClerkSetupRequired = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-purple-50 px-4">
    <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl p-8 text-center">
      <h1 className="text-2xl font-bold text-gray-900 mb-3">Authentication required</h1>
      <p className="text-gray-600 mb-4">
        Add your Clerk publishable key to <code className="text-pink-600">client/.env</code> so users must sign in before using the site.
      </p>
      <pre className="text-left text-sm bg-gray-50 rounded-lg p-4 overflow-x-auto text-gray-800">
{`REACT_APP_CLERK_PUBLISHABLE_KEY=pk_test_...`}
      </pre>
      <p className="text-gray-500 text-sm mt-4">
        Also set <code className="text-pink-600">CLERK_SECRET_KEY</code> in <code className="text-pink-600">server/.env</code>, then restart both apps.
      </p>
    </div>
  </div>
);

const App = () => {
    const { theme } = useTheme();

    if (!hasClerk) {
      return <ClerkSetupRequired />;
    }

    const content = (
        <Router>
          <div className={`app-theme ${theme === "dark" ? "theme-dark dark" : "theme-light"}`}>
            <Navbar />
            <Routes>
                <Route path="/sign-in/*" element={
                  <PublicOnlyRoute>
                    <SignInPage />
                  </PublicOnlyRoute>
                } />
                <Route path="/sign-up/*" element={
                  <PublicOnlyRoute>
                    <SignUpPage />
                  </PublicOnlyRoute>
                } />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsOfService />} />

                <Route path="/" element={
                  <ProtectedRoute>
                    <HomePage />
                  </ProtectedRoute>
                } />
                <Route path="/book" element={
                  <ProtectedRoute>
                    <BookAppointment />
                  </ProtectedRoute>
                } />
                <Route path="/services" element={
                  <ProtectedRoute>
                    <ServicesPage />
                  </ProtectedRoute>
                } />
                <Route path="/doctors/:serviceType" element={
                  <ProtectedRoute>
                    <DoctorsListPage />
                  </ProtectedRoute>
                } />
                <Route path="/about-us" element={
                  <ProtectedRoute>
                    <AboutPage />
                  </ProtectedRoute>
                } />
                <Route path="/contact-us" element={
                  <ProtectedRoute>
                    <ContactPage />
                  </ProtectedRoute>
                } />
                <Route path="/blog" element={
                  <ProtectedRoute>
                    <BlogPage />
                  </ProtectedRoute>
                } />
                <Route path="/faqs" element={
                  <ProtectedRoute>
                    <FAQPage />
                  </ProtectedRoute>
                } />
                <Route path="/personal" element={
                  <ProtectedRoute>
                    <PersonalPage />
                  </ProtectedRoute>
                } />
                <Route path="/dashboard" element={
                  <ProtectedRoute allowedRoles={[ROLES.USER, ROLES.THERAPIST]}>
                    <RoleRedirect />
                  </ProtectedRoute>
                } />
                <Route path="/user-dashboard" element={
                  <ProtectedRoute allowedRoles={[ROLES.USER]}>
                    <UserDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/therapist-dashboard" element={
                  <ProtectedRoute allowedRoles={[ROLES.THERAPIST]}>
                    <TherapistDashboard />
                  </ProtectedRoute>
                } />
            </Routes>
          </div>
          <Footer />
        </Router>
    );

    return <AuthSync>{content}</AuthSync>;
};

export default App;
