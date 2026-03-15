import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import servicesData from "../data/services.json";
import testimonialsData from "../data/testimonials.json";
import { API_BASE } from "../config";

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3 },
  },
};

const ServicesPage = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState(servicesData);
  const [testimonials, setTestimonials] = useState(testimonialsData.servicesPage || []);

  useEffect(() => {
    let active = true;

    const loadData = async () => {
      try {
        const [servicesRes, testimonialsRes] = await Promise.all([
          fetch(`${API_BASE}/api/services`),
          fetch(`${API_BASE}/api/testimonials?section=servicesPage`),
        ]);

        if (!active) return;

        if (servicesRes.ok) {
          const servicesJson = await servicesRes.json();
          if (Array.isArray(servicesJson)) setServices(servicesJson);
        }

        if (testimonialsRes.ok) {
          const testimonialsJson = await testimonialsRes.json();
          if (Array.isArray(testimonialsJson)) setTestimonials(testimonialsJson);
        }
      } catch (_) {
        // Keep fallback data when API is unavailable
      }
    };

    loadData();
    return () => {
      active = false;
    };
  }, []);

  const handleServiceClick = (route) => {
    navigate(`/doctors/${route}`);
  };

  return (
    <div className="bg-gradient-to-b from-pink-100 to-white min-h-screen">
      <motion.div
        className="text-center py-10"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl font-bold text-pink-600">Our Services</h1>
        <p className="text-gray-700 mt-4">
          Explore our range of personalized services tailored to your needs.
        </p>
      </motion.div>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-10"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {services.map((service, index) => (
          <motion.div
            key={index}
            className="bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:rotate-2 hover:shadow-2xl cursor-pointer"
            variants={fadeInUp}
            whileHover={{ scale: 1.1 }}
            onClick={() => handleServiceClick(service.route)}
          >
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-bold text-pink-600">
                {service.title}
              </h2>
              <p className="text-gray-700 mt-4">{service.description}</p>
              <div className="mt-4 text-pink-600 font-semibold">
                View Doctors/Therapists ?
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
      <motion.div
        className="bg-pink-50 py-10 mt-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl font-bold text-center text-pink-600">
          What Our Clients Say
        </h2>
        <p className="text-center text-gray-600 mt-4">
          Hear from our happy clients about their experiences with our expert team of Doctors & Therapists.
        </p>
        <motion.div
          className="flex gap-4 overflow-x-scroll px-10 mt-8 hide-scrollbar"
          variants={staggerContainer}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-white shadow-lg rounded-lg p-6 min-w-[300px] transform transition duration-300 hover:-rotate-1 hover:shadow-xl"
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
            >
              <p className="text-gray-700 italic mb-4">"{testimonial.quote}"</p>
              <div className="border-t border-gray-200 pt-4">
                <p className="text-pink-600 font-bold text-right">
                  - {testimonial.name}
                </p>
                <p className="text-gray-500 text-sm text-right mt-1">
                  About {testimonial.doctor}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ServicesPage;
