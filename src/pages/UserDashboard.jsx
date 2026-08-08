import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "@clerk/react";
import { ROLE_LABELS, getUserRole } from "../utils/roles";

const UserDashboard = () => {
  const { user } = useUser();
  const role = getUserRole(user);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10">
          <div className="flex items-center gap-4 mb-8">
            {user?.imageUrl && (
              <img
                src={user.imageUrl}
                alt=""
                className="w-16 h-16 rounded-full border-2 border-pink-200"
              />
            )}
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Hello, {user?.firstName || user?.username || "there"}!
              </h1>
              <p className="text-pink-600 font-medium">
                {ROLE_LABELS[role] || "User"} Dashboard
              </p>
            </div>
          </div>

          <p className="text-gray-600 mb-8">
            Welcome to your personal space. Book sessions, explore services, and track your journey.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              to="/book"
              className="p-6 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 text-white hover:shadow-lg transition-all"
            >
              <span className="text-2xl block mb-2">📅</span>
              <h3 className="font-bold text-lg">Book Appointment</h3>
              <p className="text-pink-100 text-sm mt-1">Schedule a session with a therapist</p>
            </Link>
            <Link
              to="/services"
              className="p-6 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-500 text-white hover:shadow-lg transition-all"
            >
              <span className="text-2xl block mb-2">💑</span>
              <h3 className="font-bold text-lg">Browse Services</h3>
              <p className="text-purple-100 text-sm mt-1">Explore counseling & coaching options</p>
            </Link>
            <Link
              to="/personal"
              className="p-6 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white hover:shadow-lg transition-all"
            >
              <span className="text-2xl block mb-2">💬</span>
              <h3 className="font-bold text-lg">Confess / Chat</h3>
              <p className="text-blue-100 text-sm mt-1">Join anonymous support rooms</p>
            </Link>
            <Link
              to="/contact-us"
              className="p-6 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 text-white hover:shadow-lg transition-all"
            >
              <span className="text-2xl block mb-2">✉️</span>
              <h3 className="font-bold text-lg">Contact Us</h3>
              <p className="text-amber-100 text-sm mt-1">Get in touch with our team</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
