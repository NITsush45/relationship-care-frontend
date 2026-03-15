import React, { useState, useEffect } from "react";
import bookingServicesData from "../data/bookingServices.json";
import timeSlotsData from "../data/timeSlots.json";
import { API_BASE } from "../config";

const BookAppointment = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    gender: "",
    message: "",
  });
  const [hearts, setHearts] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [services, setServices] = useState(bookingServicesData);
  const [timeSlots, setTimeSlots] = useState(timeSlotsData);
  useEffect(() => {
    // Generate floating hearts
    const heartArray = [];
    for (let i = 0; i < 10; i++) {
      heartArray.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 15 + 10,
        delay: Math.random() * 2,
        duration: 3 + Math.random() * 2,
      });
    }
    setHearts(heartArray);
  }, []);

  

  useEffect(() => {
    let active = true;

    const loadBookingMeta = async () => {
      try {
        const [servicesRes, timeSlotsRes] = await Promise.all([
          fetch(`${API_BASE}/api/booking-services`),
          fetch(`${API_BASE}/api/time-slots`),
        ]);

        if (!active) return;

        if (servicesRes.ok) {
          const servicesJson = await servicesRes.json();
          if (Array.isArray(servicesJson)) setServices(servicesJson);
        }

        if (timeSlotsRes.ok) {
          const timeSlotsJson = await timeSlotsRes.json();
          if (Array.isArray(timeSlotsJson)) setTimeSlots(timeSlotsJson);
        }
      } catch (_) {
        // Keep fallback data
      }
    };

    loadBookingMeta();
    return () => {
      active = false;
    };
  }, []);
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startingDayOfWeek };
  };

  const handleDateSelect = (day) => {
    const selected = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    setSelectedDate(selected);
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch(`${API_BASE}/api/appointments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          date: selectedDate?.toDateString() || null,
          time: selectedTime || null,
          doctorId: new URLSearchParams(window.location.search).get("doctor") || null,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Failed to book appointment");
      setStep(4);
    } catch (err) {
      setSubmitError(
        err.message || "Unable to connect. Please check that the server is running and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);
  const today = new Date();
  const isToday = (day) => {
    return today.getDate() === day && 
           today.getMonth() === currentMonth.getMonth() && 
           today.getFullYear() === currentMonth.getFullYear();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-rose-50 to-pink-50 py-20 px-4 relative overflow-hidden">
      {/* Floating Hearts Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {hearts.map((heart) => (
          <div
            key={heart.id}
            className="absolute text-pink-300 dark:text-pink-600 animate-float"
            style={{
              left: `${heart.x}%`,
              top: `${heart.y}%`,
              fontSize: `${heart.size}px`,
              opacity: 0.3,
              animationDelay: `${heart.delay}s`,
              animationDuration: `${heart.duration}s`,
            }}
          >
            ❤️
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-pink-100 rounded-full mb-6">
            <span className="text-3xl animate-pulse">💝</span>
            <span className="text-pink-600">Book Your Session</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-black mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 dark:from-pink-400 dark:via-rose-400 dark:to-purple-400">
              Begin Your Journey
            </span>
          </h1>
          
          <p className="text-xl text-gray-600">
            Schedule a consultation with our expert counselors and take the first step toward a healthier relationship
          </p>
        </div>

        {/* Progress Steps */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex items-center justify-between">
            {[
              { num: 1, label: "Service", icon: "💼" },
              { num: 2, label: "Date & Time", icon: "📅" },
              { num: 3, label: "Details", icon: "📝" },
            ].map((s, idx) => (
              <React.Fragment key={s.num}>
                <div className="flex flex-col items-center">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold transition-all duration-500 ${
                    step >= s.num
                      ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white scale-110 shadow-lg'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
                  }`}>
                    {s.icon}
                  </div>
                  <span className={`mt-2 text-sm font-semibold ${
                    step >= s.num ? 'text-pink-600 dark:text-pink-400' : 'text-gray-400 dark:text-gray-500'
                  }`}>
                    {s.label}
                  </span>
                </div>
                {idx < 2 && (
                  <div className={`flex-1 h-1 mx-4 rounded-full transition-all duration-500 ${
                    step > s.num ? 'bg-gradient-to-r from-pink-500 to-purple-500' : 'bg-gray-200 dark:bg-gray-700'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Step 1: Select Service */}
        {step === 1 && (
          <div className="max-w-5xl mx-auto animate-fade-in-up">
            <h2 className="text-3xl font-bold text-center text-gray-900">
              Choose Your Service
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => {
                    setFormData({ ...formData, service: service.name });
                    setStep(2);
                  }}
                  className={`group relative p-8 bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 text-left ${
                    formData.service === service.name ? 'ring-4 ring-pink-500' : ''
                  }`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500`} />
                  
                  <div className="relative">
                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${service.color} text-white mb-4 text-5xl group-hover:scale-110 transition-transform duration-300`}>
                      {service.icon}
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {service.name}
                    </h3>
                    
                    <p className="text-gray-600">
                      Professional guidance tailored to your needs
                    </p>
                    
                    <div className="mt-6 flex items-center text-pink-600 font-semibold">
                      <span>Select Service</span>
                      <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Select Date & Time */}
        {step === 2 && (
          <div className="max-w-6xl mx-auto animate-fade-in-up">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Calendar */}
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <button
                    onClick={handlePrevMonth}
                    className="p-2 hover:bg-pink-100 dark:hover:bg-pink-900/20 rounded-full transition-colors"
                  >
                    <span className="text-2xl">←</span>
                  </button>
                  
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
                  </h3>
                  
                  <button
                    onClick={handleNextMonth}
                    className="p-2 hover:bg-pink-100 dark:hover:bg-pink-900/20 rounded-full transition-colors"
                  >
                    <span className="text-2xl">→</span>
                  </button>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-2">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div key={day} className="text-center font-semibold text-gray-500 dark:text-gray-400 text-sm py-2">
                      {day}
                    </div>
                  ))}
                  
                  {Array.from({ length: startingDayOfWeek }).map((_, idx) => (
                    <div key={`empty-${idx}`} />
                  ))}
                  
                  {Array.from({ length: daysInMonth }).map((_, idx) => {
                    const day = idx + 1;
                    const isSelected = selectedDate?.getDate() === day && 
                                      selectedDate?.getMonth() === currentMonth.getMonth();
                    const isTodayDate = isToday(day);
                    
                    return (
                      <button
                        key={day}
                        onClick={() => handleDateSelect(day)}
                        className={`aspect-square rounded-xl flex items-center justify-center font-semibold transition-all duration-300 ${
                          isSelected
                            ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white scale-110 shadow-lg'
                            : isTodayDate
                            ? 'bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 hover:scale-105'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 hover:scale-105'
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>

                {selectedDate && (
                  <div className="mt-6 p-4 bg-pink-50 dark:bg-pink-900/20 rounded-xl text-center">
                    <p className="text-gray-600 dark:text-gray-300">Selected Date</p>
                    <p className="text-xl font-bold text-pink-600 dark:text-pink-400">
                      {selectedDate.toDateString()}
                    </p>
                  </div>
                )}
              </div>

              {/* Time Slots */}
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Available Time Slots
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`p-4 rounded-xl font-semibold transition-all duration-300 ${
                        selectedTime === time
                          ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white scale-105 shadow-lg'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:scale-105'
                      }`}
                    >
                      🕐 {time}
                    </button>
                  ))}
                </div>

                {selectedDate && selectedTime && (
                  <button
                    onClick={() => setStep(3)}
                    className="w-full mt-8 px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                  >
                    Continue to Details →
                  </button>
                )}
              </div>
            </div>

            <button
              onClick={() => setStep(1)}
              className="mt-6 px-6 py-3 border-2 border-pink-300 dark:border-pink-500 text-pink-600 dark:text-pink-400 font-semibold rounded-xl hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-all duration-300"
            >
              ← Back to Services
            </button>
          </div>
        )}

        {/* Step 3: Personal Details */}
        {step === 3 && (
          <div className="max-w-3xl mx-auto animate-fade-in-up">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                Your Information
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {submitError && (
                  <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl">
                    {submitError}
                  </div>
                )}
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:ring-4 focus:ring-pink-500/20 focus:border-pink-500 transition-all duration-300"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                    Gender *
                  </label>
                  <div className="flex gap-4">
                    {['Male', 'Female', 'Other'].map((gender) => (
                      <button
                        key={gender}
                        type="button"
                        onClick={() => setFormData({ ...formData, gender })}
                        className={`flex-1 py-3 rounded-xl font-semibold transition-all duration-300 ${
                          formData.gender === gender
                            ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white scale-105 shadow-lg'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        {gender}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:ring-4 focus:ring-pink-500/20 focus:border-pink-500 transition-all duration-300"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:ring-4 focus:ring-pink-500/20 focus:border-pink-500 transition-all duration-300"
                    placeholder="+1 (555) 000-0000"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-4 py-4 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:ring-4 focus:ring-pink-500/20 focus:border-pink-500 transition-all duration-300"
                    placeholder="Tell us more about what you'd like to discuss..."
                  />
                </div>

                <div className="pt-6 space-y-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-8 py-5 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Booking..." : "Confirm Booking ✨"}
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="w-full px-6 py-3 border-2 border-pink-300 dark:border-pink-500 text-pink-600 dark:text-pink-400 font-semibold rounded-xl hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-all duration-300"
                  >
                    ← Back to Date & Time
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Step 4: Success Message */}
        {step === 4 && (
          <div className="max-w-2xl mx-auto text-center animate-fade-in-up">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-12">
              <div className="text-7xl mb-6 animate-bounce">🎉</div>
              
              <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 dark:from-pink-400 dark:to-purple-400 mb-4">
                Booking Confirmed!
              </h2>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Your consultation has been successfully scheduled
              </p>

              <div className="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 rounded-2xl p-6 mb-8 text-left">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">💼</span>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Service</p>
                      <p className="font-bold text-gray-900 dark:text-white">{formData.service}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📅</span>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Date & Time</p>
                      <p className="font-bold text-gray-900 dark:text-white">
                        {selectedDate?.toDateString()} at {selectedTime}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📧</span>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Confirmation sent to</p>
                      <p className="font-bold text-gray-900 dark:text-white">{formData.email}</p>
                    </div>
                  </div>
                </div>
              </div>

              <a href="/" className="inline-block">
                <button className="px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  Back to Home
                </button>
              </a>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-float {
          animation: float 5s ease-in-out infinite;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
      `}</style>
    </div>
  );
};

export default BookAppointment;











