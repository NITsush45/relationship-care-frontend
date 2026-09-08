import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUserMd, FaSpinner, FaCheckCircle, FaHeart, FaBrain, FaHandsHelping } from "react-icons/fa";
import { API_BASE } from "../config";
import { useAuth } from "../context/AuthContext";

const SPECIALIZATIONS = [
  { id: "relationship-counseling", name: "Relationship Counseling", icon: "💕", description: "Help couples build stronger connections" },
  { id: "breakup-recovery", name: "Breakup Recovery", icon: "💔", description: "Support clients through heartbreak" },
  { id: "marriage-guidance", name: "Marriage Guidance", icon: "💍", description: "Guide couples through marital challenges" },
  { id: "pre-marital-coaching", name: "Pre-Marital Coaching", icon: "💒", description: "Prepare couples for marriage" },
  { id: "yoga", name: "Yoga & Breathing Sessions", icon: "🧘", description: "Teach mindful movement and breathing" },
  { id: "mind-relaxation", name: "Mind Relaxation Techniques", icon: "🧠", description: "Help clients find mental peace" },
  { id: "diet-wellness", name: "Diet & Wellness Consultation", icon: "🥗", description: "Guide holistic wellness journeys" },
  { id: "stress-anxiety", name: "Stress & Anxiety Relaxation", icon: "😌", description: "Help clients manage stress" },
  { id: "sleep-mindfulness", name: "Sleep & Mindfulness Sessions", icon: "😴", description: "Improve sleep quality" },
  { id: "depression-emotional-wellness", name: "Depression Support / Emotional Wellness", icon: "🌈", description: "Support emotional healing" },
];

const MOOD_OPTIONS = [
  { id: "energetic", label: "Energetic & Ready", emoji: "⚡", color: "from-yellow-400 to-orange-500" },
  { id: "calm", label: "Calm & Focused", emoji: "🧘", color: "from-blue-400 to-cyan-500" },
  { id: "compassionate", label: "Compassionate & Empathetic", emoji: "💜", color: "from-purple-400 to-pink-500" },
  { id: "motivated", label: "Motivated & Inspired", emoji: "🔥", color: "from-red-400 to-pink-500" },
  { id: "reflective", label: "Reflective & Thoughtful", emoji: "🌙", color: "from-indigo-400 to-purple-500" },
];

const TherapistOnboarding = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState("welcome");
  const [specialization, setSpecialization] = useState("");
  const [age, setAge] = useState("");
  const [mood, setMood] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const therapistName = user?.firstName || user?.name || user?.username || "Doctor";

  // Prefill if therapist already onboarded (supports Edit Profile + returning logins)
  useEffect(() => {
    let active = true;
    const loadExisting = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) return;
        const res = await fetch(`${API_BASE}/api/therapist/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok || !active) return;
        const data = await res.json().catch(() => ({}));
        const p = data?.profile;
        if (p) {
          if (p.specialization) setSpecialization(p.specialization);
          if (p.age) setAge(String(p.age));
          if (p.mood) setMood(p.mood);
        }
      } catch (_) {
        // ignore - fresh onboarding
      }
    };
    loadExisting();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (step === "splash") {
      const timer = setTimeout(() => {
        navigate("/therapist-dashboard", { replace: true });
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [step, navigate]);

  useEffect(() => {
    if (step === "welcome") {
      const timer = setTimeout(() => {
        setStep("questions");
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!specialization) {
      setError("Please select your area of expertise.");
      return;
    }
    if (!age || Number(age) < 18 || Number(age) > 100) {
      setError("Please enter a valid age (18-100).");
      return;
    }
    if (!mood) {
      setError("Please tell us how you are feeling today.");
      return;
    }
    setSaving(true);
    try {
      const token = localStorage.getItem("authToken");
      const res = await fetch(`${API_BASE}/api/therapist/profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ specialization, age: Number(age), mood }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to save profile");
      }
      setStep("splash");
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (step === "welcome") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center px-4"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 150 }}
            className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 flex items-center justify-center shadow-2xl"
          >
            <FaUserMd className="text-white text-5xl" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-white mb-4"
          >
            Welcome, <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">Dr. {therapistName}</span>! 🎉
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-xl text-gray-600 dark:text-gray-300 mb-8"
          >
            We're excited to have you on our platform
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="flex items-center justify-center gap-4"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <FaHeart className="text-pink-500 text-2xl" />
            </motion.div>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
            >
              <FaBrain className="text-purple-500 text-2xl" />
            </motion.div>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
            >
              <FaHandsHelping className="text-indigo-500 text-2xl" />
            </motion.div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="text-sm text-gray-500 dark:text-gray-400 mt-8"
          >
            Setting up your personalized experience...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  if (step === "splash") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center px-4"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-28 h-28 mx-auto mb-6 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center shadow-2xl"
          >
            <FaCheckCircle className="text-white text-5xl" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4"
          >
            All Set, <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">Dr. {therapistName}</span>! 🎉
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-lg text-gray-600 dark:text-gray-300 mb-6"
          >
            Your profile is complete. Preparing your personalized dashboard...
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex items-center justify-center gap-2 text-emerald-500"
          >
            <FaSpinner className="animate-spin text-xl" />
            <span className="text-sm">Loading your patient list...</span>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center">
            <FaUserMd className="text-white text-2xl" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            Welcome, {therapistName}!
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Let's set up your profile so we can match you with the right patients.
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-3 h-3 rounded-full bg-pink-500"></div>
          <div className={`w-3 h-3 rounded-full ${age ? "bg-pink-500" : "bg-gray-300 dark:bg-gray-600"}`}></div>
          <div className={`w-3 h-3 rounded-full ${mood ? "bg-pink-500" : "bg-gray-300 dark:bg-gray-600"}`}></div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg mb-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              1. What is your area of expertise?
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Select the service you specialize in. We'll match you with patients seeking help in this area.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SPECIALIZATIONS.map((spec) => (
                <button
                  key={spec.id}
                  type="button"
                  onClick={() => setSpecialization(spec.id)}
                  className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                    specialization === spec.id
                      ? "border-pink-500 bg-pink-50 dark:bg-pink-900/20 shadow-md"
                      : "border-gray-200 dark:border-gray-700 hover:border-pink-300 hover:bg-pink-50/50 dark:hover:bg-gray-700"
                  }`}
                >
                  <span className="text-2xl mr-2">{spec.icon}</span>
                  <span className="font-medium text-gray-700 dark:text-gray-200">{spec.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg mb-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              2. How old are you?
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              This helps us provide a personalized experience.
            </p>
            <input
              type="number"
            min="18"
            max="100"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Enter your age (e.g., 35)"
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white focus:border-pink-500 focus:outline-none transition-colors"
          />
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            3. How are you feeling today?
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            We care about your well-being too!
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {MOOD_OPTIONS.map((m) => (
              <button
                key={m.id}
                onClick={() => setMood(m.id)}
                className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                  mood === m.id
                    ? "border-pink-500 bg-pink-50 dark:bg-pink-900/20 shadow-md"
                    : "border-gray-200 dark:border-gray-700 hover:border-pink-300 hover:bg-pink-50/50 dark:hover:bg-gray-700"
                }`}
              >
                <span className="text-2xl mr-2">{m.emoji}</span>
                <span className="font-medium text-gray-700 dark:text-gray-200">{m.label}</span>
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 mb-6">
            <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={saving}
          className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-200 ${
            saving
              ? "bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
          }`}
        >
          {saving ? (
            <span className="flex items-center justify-center gap-2">
              <FaSpinner className="animate-spin" />
              Saving...
            </span>
          ) : (
            "Complete Setup →"
          )}
        </button>
        </form>
      </div>
    </div>
  );
};

export default TherapistOnboarding;