import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { API_BASE } from "../config";

const prettyService = (s) => {
  if (!s) return "Other";
  return String(s).replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
};

const TherapistDashboard = () => {
  const { user, loading: authLoading, logout } = useAuth();
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSplash, setShowSplash] = useState(true);
  const [serviceFilter, setServiceFilter] = useState("all");
  const [profileChecked, setProfileChecked] = useState(false);

  useEffect(() => {
    if (authLoading || !user) return;

    let active = true;

    const loadDashboardData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const profileRes = await fetch(`${API_BASE}/api/therapist/profile`, {
          headers,
        });

        let loadedProfile = null;
        if (profileRes.ok && active) {
          const profileData = await profileRes.json().catch(() => ({}));
          loadedProfile = profileData?.profile || null;
          setProfile(loadedProfile);
        }
        if (active) setProfileChecked(true);

        if (!loadedProfile?.specialization) {
          navigate("/therapist-onboarding", { replace: true });
          return;
        }

        const appointmentsRes = await fetch(
          `${API_BASE}/api/therapist/appointments`,
          { headers }
        );

        if (appointmentsRes.ok && active) {
          const data = await appointmentsRes.json().catch(() => ({}));
          const list = Array.isArray(data)
            ? data
            : Array.isArray(data?.appointments)
            ? data.appointments
            : [];
          setAppointments(list);
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
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (loading) return;
    const timer = setTimeout(() => setShowSplash(false), 2200);
    return () => clearTimeout(timer);
  }, [loading]);

  // All hooks must run before any early return (rules-of-hooks).
  const appointmentsByService = useMemo(() => {
    return appointments.reduce((groups, apt) => {
      const service = apt.service || "Other";
      if (!groups[service]) {
        groups[service] = [];
      }
      groups[service].push(apt);
      return groups;
    }, {});
  }, [appointments]);

  const serviceOptions = useMemo(() => {
    const keys = Object.keys(appointmentsByService);
    return ["all", ...keys];
  }, [appointmentsByService]);

  const visibleEntries = useMemo(() => {
    const entries = Object.entries(appointmentsByService);
    if (serviceFilter === "all") return entries;
    return entries.filter(([service]) => service === serviceFilter);
  }, [appointmentsByService, serviceFilter]);

  const therapistName = user?.username || user?.name || "Therapist";
  const specializationRaw = profile?.specialization || "";
  const specialization = specializationRaw
    ? prettyService(specializationRaw)
    : "General";

  const totalPatients = appointments.length;

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 animate-pulse">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-950 dark:via-gray-900 dark:to-pink-950/40 py-12 px-4 transition-colors duration-300">
      <AnimatePresence>
        {showSplash && !loading && (
          <motion.div
            key="therapist-splash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-purple-700 via-purple-800 to-pink-700"
          >
            <motion.div
              initial={{ scale: 0.85, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center px-6"
            >
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-white/20 flex items-center justify-center text-white text-4xl font-bold border-2 border-white/40">
                {therapistName.charAt(0).toUpperCase()}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
                Welcome Doctor {therapistName}
              </h1>
              <p className="text-purple-100 text-lg">{specialization} Specialist</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="max-w-6xl mx-auto">

        {/* Welcome Header */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-6">

            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white text-3xl font-bold">
              {therapistName.charAt(0).toUpperCase()}
            </div>

            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome Doctor {therapistName}
              </h1>

              <p className="text-purple-600 font-semibold mt-1">
                {specialization} Specialist
              </p>

              <p className="text-gray-600 mt-2">
                Here are your patients seeking help in your area of expertise.
              </p>
              {(profile?.age || profile?.mood) && (
                <p className="text-sm text-gray-500 mt-1">
                  {profile?.age ? `Age: ${profile.age}` : ""}
                  {profile?.age && profile?.mood ? "  •  " : ""}
                  {profile?.mood ? `Feeling: ${profile.mood}` : ""}
                </p>
              )}
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
          <div className="mt-6 pt-6 border-t border-gray-100">
            <p className="text-sm font-semibold text-gray-700 mb-3">
              Filter patients by service / segment:
            </p>
            <div className="flex flex-wrap gap-2">
              {serviceOptions.map((svc) => (
                <button
                  key={svc}
                  type="button"
                  onClick={() => setServiceFilter(svc)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                    serviceFilter === svc
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow"
                      : "bg-gray-100 text-gray-700 hover:bg-purple-100 hover:text-purple-700"
                  }`}
                >
                  {svc === "all"
                    ? `All Services (${totalPatients})`
                    : `${prettyService(svc)} (${(appointmentsByService[svc] || []).length})`}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Patient List by Service Sections */}
        <div className="space-y-8">
          {loading || !profileChecked ? (
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <p className="text-gray-500 animate-pulse text-center py-12">
                Loading your patient list...
              </p>
            </div>
          ) : visibleEntries.length === 0 ? (
            <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
              <div className="py-12">
                <p className="text-gray-500 text-lg mb-4">
                  {serviceFilter === "all"
                    ? "No patients have booked appointments yet."
                    : "No patients in this service yet."}
                </p>
                {serviceFilter !== "all" ? (
                  <button
                    type="button"
                    onClick={() => setServiceFilter("all")}
                    className="px-5 py-2 rounded-xl bg-purple-100 text-purple-700 font-semibold hover:bg-purple-200 transition"
                  >
                    Show all services
                  </button>
                ) : (
                  <p className="text-gray-400">
                    Patients seeking help in <span className="font-semibold text-purple-600">{specialization}</span> will appear here.
                  </p>
                )}
              </div>
            </div>
          ) : (
            visibleEntries.map(([service, serviceAppointments]) => (
              <div key={service} className="bg-white rounded-3xl shadow-xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {prettyService(service)}
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
                      {(apt.notes || apt.message) && (
                        <p className="text-sm text-gray-600 mt-3 p-3 bg-gray-50 rounded-lg">
                          <span className="font-medium">Notes:</span> {apt.notes || apt.message}
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
            View team profile <FaArrowRight className="ml-1 inline" />
          </Link>
        </div>

      </div>
    </div>
  );
};

export default TherapistDashboard;