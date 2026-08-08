import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth, useUser } from "@clerk/react";
import { API_BASE } from "../config";
import { ROLE_LABELS, getUserRole } from "../utils/roles";

const TherapistDashboard = () => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const role = getUserRole(user);

  useEffect(() => {
    let active = true;

    (async () => {
      try {
        const token = await getToken();
        const res = await fetch(`${API_BASE}/api/appointments`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (res.ok && active) {
          const data = await res.json();
          setAppointments(Array.isArray(data) ? data : []);
        }
      } catch (_) {
        // Keep empty list on error
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [getToken]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 mb-8">
          <div className="flex items-center gap-4 mb-6">
            {user?.imageUrl && (
              <img
                src={user.imageUrl}
                alt=""
                className="w-16 h-16 rounded-full border-2 border-purple-200"
              />
            )}
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Dr. {user?.firstName || user?.username || "Therapist"}
              </h1>
              <p className="text-purple-600 font-medium">
                {ROLE_LABELS[role] || "Therapist"} Dashboard
              </p>
            </div>
          </div>
          <p className="text-gray-600">
            View upcoming bookings and manage your client sessions.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Appointments</h2>
          {loading ? (
            <p className="text-gray-500 animate-pulse">Loading appointments...</p>
          ) : appointments.length === 0 ? (
            <p className="text-gray-500">No appointments yet.</p>
          ) : (
            <ul className="space-y-4">
              {appointments.slice(0, 10).map((apt) => (
                <li
                  key={apt.id}
                  className="p-4 rounded-xl border border-gray-100 hover:border-purple-200 transition-colors"
                >
                  <div className="flex flex-wrap justify-between gap-2">
                    <span className="font-semibold text-gray-900">{apt.name}</span>
                    <span className="text-sm text-purple-600">{apt.service}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {apt.date || "Date TBD"} {apt.time ? `at ${apt.time}` : ""}
                  </p>
                  <p className="text-sm text-gray-500">{apt.email}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-6 text-center">
          <Link to="/about-us" className="text-purple-600 font-semibold hover:underline">
            View team profile →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TherapistDashboard;
