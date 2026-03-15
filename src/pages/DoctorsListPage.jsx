import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import doctorsData from "../data/doctors.json";
import { API_BASE } from "../config";

const DoctorsListPage = () => {
  const { serviceType } = useParams();
  const navigate = useNavigate();

  const fallbackDoctors = useMemo(
    () => doctorsData.doctorsByService[serviceType] || [],
    [serviceType]
  );
  const fallbackServiceTitle = useMemo(
    () => doctorsData.serviceTitles[serviceType] || "Service",
    [serviceType]
  );

  const [doctors, setDoctors] = useState(fallbackDoctors);
  const [serviceTitle, setServiceTitle] = useState(fallbackServiceTitle);

  useEffect(() => {
    setDoctors(fallbackDoctors);
    setServiceTitle(fallbackServiceTitle);
  }, [fallbackDoctors, fallbackServiceTitle]);

  useEffect(() => {
    let active = true;

    const loadDoctors = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/doctors/${serviceType}`);
        if (!res.ok || !active) return;
        const payload = await res.json();
        if (Array.isArray(payload?.doctors)) setDoctors(payload.doctors);
        if (payload?.serviceTitle) setServiceTitle(payload.serviceTitle);
      } catch (_) {
        // Keep fallback data
      }
    };

    loadDoctors();
    return () => {
      active = false;
    };
  }, [serviceType]);

  const handleBookAppointment = (doctorId) => {
    navigate(`/book?doctor=${doctorId}&service=${serviceType}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {serviceTitle} - Our Experts
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Choose from our experienced counselors specialized in {serviceTitle.toLowerCase()}
          </p>
        </motion.div>

        {doctors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {doctors.map((doctor, index) => (
              <motion.div
                key={doctor.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative">
                  <img src={doctor.image} alt={doctor.name} className="w-full h-64 object-cover" />
                  <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 flex items-center gap-1">
                    <span className="text-yellow-400">?</span>
                    <span className="font-semibold text-gray-800">{doctor.rating}</span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{doctor.name}</h3>
                  <p className="text-pink-600 font-semibold mb-3">{doctor.specialty}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600">
                      <span className="mr-2">??</span>
                      <span className="text-sm">{doctor.experience} experience</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <span className="mr-2">??</span>
                      <span className="text-sm">{doctor.sessions}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <span className="mr-2">??</span>
                      <span className="text-sm font-semibold">{doctor.price}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-6 leading-relaxed">{doctor.bio}</p>

                  <motion.button
                    onClick={() => handleBookAppointment(doctor.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Book Appointment
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <p className="text-gray-600 text-lg">No doctors available for this service at the moment.</p>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <motion.button
            onClick={() => navigate("/services")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 border-2 border-pink-400 text-pink-600 font-bold rounded-lg hover:bg-pink-50 transition-all duration-300"
          >
            ? Back to Services
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default DoctorsListPage;
