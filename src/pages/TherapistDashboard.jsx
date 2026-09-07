import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { API_BASE } from "../config";

const TherapistDashboard = () => {
  const { user, loading: authLoading, logout } = useAuth();

  const [appointments, setAppointments] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading || !user) return;

    let active = true;

    const loadDashboardData = async () => {
      try {
        const token = localStorage.getItem("authToken");

        // Fetch therapist profile to get specialization
        const profileRes = await fetch(`${API_BASE}/api/therapist/profile`, {
          headers: token
            ? { Authorization: `Bearer ${token}` }
            : {},
        });

        if (profileRes.ok && active) {
          const profileData = await profileRes.json();
          setProfile(profileData?.profile || null);
        }

        // Fetch appointments filtered by therapist's specialization
        const appointmentsRes = await fetch(`${API_BASE}/api/therapist/appointments`, {
          headers: token
            ? { Authorization: `Bearer ${token}` }
            : {},
        });

        if (appointmentsRes.ok && active) {
          const data = await appointmentsRes.json();
          setAppointments(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadDashboardData();

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

  // Group appointments by service type
  const appointmentsByService = appointments.reduce((groups, apt) => {
    const service = apt.service || "Other";
    if (!groups[service]) {
      groups[service] = [];
    }
    groups[service].push(apt);
    return groups;
  }, {});

  const therapistName = user.username || user.name || "Therapist";
  const specialization = profile?.specialization
    ? profile.specialization.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    : "General";

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Welcome Header */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-6">

            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white text-3xl font-bold">
              {therapistName.charAt(0).toUpperCase()}
            </div>

            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome Dr. {therapistName}
              </h1>

              <p className="text-purple-600 font-semibold mt-1">
                {specialization} Specialist
              </p>

              <p className="text-gray-600 mt-2">
                Here are your patients seeking help in your area of expertise.
              </p>
            </div>

            <div className="md:ml-auto flex gap-3">
              <Link
                to="/therapist-onboarding"
                className="px-5 py-2 rounded-xl bg-purple-100 text-purple-700 font-semibold hover:bg-purple-200 transition"
              >
                Edit Profile
              </Link>
              <button
                onClick={logout}
                className="px-5 py-2 rounded-xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition"
              >
                Logout
              </button>
            </div>

          </div>
        </div>

        {/* Patient List by Service Sections */}
        <div className="space-y-8">
          {loading ? (
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <p className="text-gray-500 animate-pulse text-center py-12">
                Loading your patient list...
              </p>
            </div>
          ) : appointments.length === 0 ? (
            <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
              <div className="py-12">
                <p className="text-gray-500 text-lg mb-4">
                  No patients have booked appointments yet.
                </p>
                <p className="text-gray-400">
                  Patients seeking help in <span className="font-semibold text-purple-600">{specialization}</span> will appear here.
                </p>
              </div>
            </div>
          ) : (
            Object.entries(appointmentsByService).map(([service, serviceAppointments]) => (
              <div key={service} className="bg-white rounded-3xl shadow-xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {service}
                  </h2>
                  <span className="px-4 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-semibold">
                    {serviceAppointments.length} patient{serviceAppointments.length !== 1 ? "s" : ""}
                  </span>
                </div>

                <div className="grid gap-4">
                  {serviceAppointments.map((apt) => (
                    <div
                      key={apt.id}
                      className="p-4 rounded-xl border border-gray-100 hover:border-purple-200 hover:shadow-md transition-all"
                    >
                      <div className="flex flex-wrap justify-between gap-2 items-start">
                        <div>
                          <h3 className="font-semibold text-gray-900 text-lg">
                            {apt.name}
                          </h3>
                          <p className="text-sm text-gray-500">{apt.email}</p>
                          {apt.phone && (
                            <p className="text-sm text-gray-500">{apt.phone}</p>
                          )}
                        </div>
                        <div className="text-right">
                          <span className="inline-block px-3 py-1 rounded-lg bg-pink-100 text-pink-700 text-sm font-medium">
                            {apt.date || "Date TBD"}
                          </span>
                          {apt.time && (
                            <p className="text-sm text-gray-500 mt-1">at {apt.time}</p>
                          )}
                        </div>
                      </div>
                      {apt.notes && (
                        <p className="text-sm text-gray-600 mt-3 p-3 bg-gray-50 rounded-lg">
                          <span className="font-medium">Notes:</span> {apt.notes}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))
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