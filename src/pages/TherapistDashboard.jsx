import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { API_BASE } from "../config";

const TherapistDashboard = () => {
  const { user, loading: authLoading, logout } = useAuth();

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading || !user) return;

    let active = true;

    const loadAppointments = async () => {
      try {
        const token = localStorage.getItem("authToken");

        const res = await fetch(`${API_BASE}/api/appointments`, {
          headers: token
            ? {
                Authorization: `Bearer ${token}`,
              }
            : {},
        });

        if (res.ok && active) {
          const data = await res.json();
          setAppointments(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error("Failed to load appointments:", error);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadAppointments();

    return () => {
      active = false;
    };
  }, [user, authLoading]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 animate-pulse">
          Loading...
        </p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">

        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-6">

            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white text-3xl font-bold">
              {(user.username || user.name || "T").charAt(0).toUpperCase()}
            </div>

            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-900">
                Dr. {user.username || user.name || "Therapist"}
              </h1>

              <p className="text-purple-600 font-semibold mt-1">
                Therapist Dashboard
              </p>

              <p className="text-gray-600 mt-2">
                View upcoming bookings and manage your client sessions.
              </p>
            </div>

            <div className="md:ml-auto">
              <button
                onClick={logout}
                className="px-5 py-2 rounded-xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition"
              >
                Logout
              </button>
            </div>

          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Recent Appointments
          </h2>

          {loading ? (
            <p className="text-gray-500 animate-pulse">
              Loading appointments...
            </p>
          ) : appointments.length === 0 ? (
            <p className="text-gray-500">
              No appointments yet.
            </p>
          ) : (
            <ul className="space-y-4">
              {appointments.slice(0, 10).map((apt) => (
                <li
                  key={apt.id}
                  className="p-4 rounded-xl border border-gray-100 hover:border-purple-200 transition-colors"
                >
                  <div className="flex flex-wrap justify-between gap-2">
                    <span className="font-semibold text-gray-900">
                      {apt.name}
                    </span>

                    <span className="text-sm text-purple-600">
                      {apt.service}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 mt-1">
                    {apt.date || "Date TBD"}
                    {apt.time ? ` at ${apt.time}` : ""}
                  </p>

                  <p className="text-sm text-gray-500">
                    {apt.email}
                  </p>

                  {apt.phone && (
                    <p className="text-sm text-gray-500">
                      {apt.phone}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-6 text-center">
          <Link
            to="/about-us"
            className="text-purple-600 font-semibold hover:underline"
          >
            View team profile →
          </Link>
        </div>

      </div>
    </div>
  );
};

export default TherapistDashboard;