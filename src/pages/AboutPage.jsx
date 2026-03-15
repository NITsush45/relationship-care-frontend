import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import doctorsData from "../data/doctors.json";
import { API_BASE } from "../config";

const AboutPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [doctorsByService, setDoctorsByService] = useState(doctorsData.doctorsByService || {});
  const [serviceTitles, setServiceTitles] = useState(doctorsData.serviceTitles || {});

  useEffect(() => {
    let active = true;

    const loadDoctors = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/doctors`);
        if (!res.ok || !active) return;

        const payload = await res.json();
        if (payload?.doctorsByService && payload?.serviceTitles) {
          setDoctorsByService(payload.doctorsByService);
          setServiceTitles(payload.serviceTitles);
        }
      } catch (_) {
        // Keep fallback data
      }
    };

    loadDoctors();
    return () => {
      active = false;
    };
  }, []);

  const categories = useMemo(() => Object.keys(doctorsByService), [doctorsByService]);
  const allDoctors = useMemo(
    () => categories.flatMap((category) => doctorsByService[category] || []),
    [categories, doctorsByService]
  );
  const filteredDoctors =
    selectedCategory === "all" ? allDoctors : doctorsByService[selectedCategory] || [];

  const openModal = (doctor) => {
    setSelectedDoctor(doctor);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedDoctor(null);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? "text-yellow-400" : "text-gray-300"}>?</span>
      );
    }
    return stars;
  };

  return (
    <div className="bg-gradient-to-b from-pink-100 to-white min-h-screen py-10">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-pink-600">Our Doctors</h1>
        <p className="text-gray-700 mt-4">Meet our expert doctors specializing in relationship counseling and guidance.</p>
      </motion.div>

      <div className="flex justify-center mt-8 flex-wrap">
        <button
          onClick={() => setSelectedCategory("all")}
          className={`px-4 py-2 mx-2 rounded mb-2 ${selectedCategory === "all" ? "bg-pink-600 text-white" : "bg-gray-200 text-gray-700"}`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 mx-2 rounded mb-2 ${selectedCategory === category ? "bg-pink-600 text-white" : "bg-gray-200 text-gray-700"}`}
          >
            {serviceTitles[category]}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-10 mt-8">
        {filteredDoctors.map((doctor, index) => (
          <motion.div
            key={doctor.id}
            className="bg-white shadow-lg rounded-lg p-6 text-center cursor-pointer"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            onClick={() => openModal(doctor)}
          >
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-32 h-32 object-cover rounded-full mx-auto shadow-lg"
            />
            <h3 className="text-2xl font-bold text-pink-600 mt-4">{doctor.name}</h3>
            <p className="text-gray-700 mt-2">{doctor.specialty}</p>
            <div className="flex justify-center mt-2">{renderStars(Math.floor(doctor.rating))}</div>
            <p className="text-gray-600 mt-2">{doctor.experience} experience</p>
            <motion.div className="mt-4 text-gray-600 text-sm" initial={{ opacity: 0 }} whileHover={{ opacity: 1 }}>
              {doctor.bio.substring(0, 100)}...
            </motion.div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {modalOpen && selectedDoctor && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="bg-white rounded-lg p-8 max-w-md w-full mx-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedDoctor.image}
                alt={selectedDoctor.name}
                className="w-32 h-32 object-cover rounded-full mx-auto shadow-lg"
              />
              <h3 className="text-2xl font-bold text-pink-600 mt-4 text-center">{selectedDoctor.name}</h3>
              <p className="text-gray-700 mt-2 text-center">{selectedDoctor.specialty}</p>
              <div className="flex justify-center mt-2">{renderStars(Math.floor(selectedDoctor.rating))}</div>
              <p className="text-gray-600 mt-2 text-center">{selectedDoctor.experience} experience</p>
              <p className="text-gray-700 mt-4">{selectedDoctor.bio}</p>
              <p className="text-gray-600 mt-2">Sessions: {selectedDoctor.sessions}</p>
              <p className="text-gray-600 mt-2">Price: {selectedDoctor.price}</p>
              <button onClick={closeModal} className="mt-4 bg-pink-600 text-white px-4 py-2 rounded w-full">
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AboutPage;
