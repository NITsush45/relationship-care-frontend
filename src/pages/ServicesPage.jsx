import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
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
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const wellnessServices = [
  {
    title: "Yoga & Breathing Sessions",
    description:
      "Practice guided yoga and breathing exercises designed to improve relaxation, emotional balance, concentration, and overall mental well-being.",
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1000&q=80",
    route: "yoga",
    button: "View Yoga Instructor",
  },
  {
    title: "Mind Relaxation Techniques",
    description:
      "Learn practical relaxation techniques including meditation, mindfulness, breathing exercises, visualization, and calming routines to achieve a peaceful mind.",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1000&q=80",
    route: "mind-relaxation",
    button: "View Relaxation Instructor",
  },
  {
    title: "Diet & Wellness Consultation",
    description:
      "Get personalized nutrition and wellness guidance to support better mental health, energy, sleep, emotional balance, and a healthier lifestyle.",
    image:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1000&q=80",
    route: "diet-wellness",
    button: "View Dietician",
  },
  {
    title: "Stress & Anxiety Relaxation",
    description:
      "Explore guided techniques and professional support to manage everyday stress, anxiety, emotional pressure, overthinking, and mental exhaustion.",
    image:
      "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=1000&q=80",
    route: "stress-anxiety",
    button: "View Therapists",
  },
  {
  title: "Sleep & Mindfulness Sessions",
  description:
    "Improve your sleep and mental calmness through mindfulness, guided meditation, breathing exercises, and relaxing routines created for better rest.",
  image:
    "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=1000&q=80",
  route: "sleep-mindfulness",
  button: "Book Your Meditation Session",
},
  {
    title: "Depression Support / Emotional Wellness",
    description:
      "Access compassionate emotional wellness support and professional guidance when you are experiencing persistent sadness, emotional distress, or feeling overwhelmed.",
    image:
      "https://images.unsplash.com/photo-1493836512294-502baa1986e2?auto=format&fit=crop&w=1000&q=80",
    route: "depression-emotional-wellness",
    button: "Book Emergency Session Right Now",
  },
];

const ServicesPage = () => {
  const navigate = useNavigate();

  const [services, setServices] = useState(servicesData);

  const [testimonials, setTestimonials] = useState(
    testimonialsData.servicesPage || []
  );

  useEffect(() => {
    let active = true;

    const loadData = async () => {
      try {
        const [servicesRes, testimonialsRes, customRes] = await Promise.all([
          fetch(`${API_BASE}/api/services`),
          fetch(`${API_BASE}/api/testimonials?section=servicesPage`),
          fetch(`${API_BASE}/api/testimonials/custom`),
        ]);

        if (!active) return;

        if (servicesRes.ok) {
          const servicesJson = await servicesRes.json();

          if (Array.isArray(servicesJson)) {
            // Only replace the bundled cards with server data that
            // is actually usable (title + route are required).
            const validServices = servicesJson.filter(
              (item) =>
                item &&
                typeof item.title === "string" &&
                typeof item.route === "string" &&
                item.route
            );

            if (validServices.length > 0) {
              setServices(validServices);
            }
          }
        }

        if (testimonialsRes.ok) {
          const testimonialsJson = await testimonialsRes.json();

          if (Array.isArray(testimonialsJson)) {
            let merged = testimonialsJson;

            if (customRes && customRes.ok) {
              const customJson = await customRes.json();

              if (Array.isArray(customJson) && customJson.length) {
                const customMapped = customJson.map((item) => ({
                  quote: item.quote,
                  name: item.name,
                  doctor: "Community Story",
                }));

                merged = [...customMapped, ...testimonialsJson];
              }
            }

            setTestimonials(merged);
          }
        }
      } catch (error) {
        console.error("Unable to load services data:", error);
      }
    };

    loadData();

    return () => {
      active = false;
    };
  }, []);

  const handleServiceClick = (route) => {
    if (!route) {
      return;
    }

    navigate(`/doctors/${encodeURIComponent(route)}`);
  };

  // If an image fails to load (e.g. offline / broken URL),
  // fall back to a bundled image so cards never look broken.
  const handleImageError = (event) => {
    if (event.currentTarget.dataset.fallbackApplied) {
      return;
    }

    event.currentTarget.dataset.fallbackApplied = "true";
    event.currentTarget.src = "/images/rel.jpg";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-white dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-colors duration-300">

      {/* =========================
          PAGE HEADER
      ========================== */}
      <motion.div
        className="text-center py-10 px-4"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-pink-600 dark:text-pink-400">
          Our Services
        </h1>

        <p className="text-gray-700 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
          Explore our range of personalized services tailored to support your
          emotional well-being, mental peace, healthy lifestyle, and personal
          growth.
        </p>
      </motion.div>

      {/* =========================
          EXISTING SERVICES
      ========================== */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6 md:px-10"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {services.map((service, index) => (
          <motion.div
            key={service.id || service.route || index}
            className="bg-white dark:bg-gray-800 shadow-lg dark:shadow-black/30 rounded-lg overflow-hidden transform transition duration-300 hover:rotate-2 hover:shadow-2xl dark:hover:shadow-black/50 cursor-pointer border border-transparent dark:border-gray-700"
            variants={fadeInUp}
            whileHover={{ scale: 1.05 }}
            onClick={() => handleServiceClick(service.route)}
          >
            <img
              src={service.image}
              alt={service.title}
              onError={handleImageError}
              className="w-full h-48 object-cover"
            />

            <div className="p-6">
              <h2 className="text-2xl font-bold text-pink-600 dark:text-pink-400">
                {service.title}
              </h2>

              <p className="text-gray-700 dark:text-gray-300 mt-4">
                {service.description}
              </p>

              <div className="mt-4 text-pink-600 dark:text-pink-400 font-semibold flex items-center gap-2">
                View Doctors/Therapists <FaArrowRight />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* =========================
          WELLNESS SERVICES
      ========================== */}
      <motion.section
        className="px-6 md:px-10 py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInUp}
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-pink-600 dark:text-pink-400">
            Quick Wellness & Relaxation Sessions
          </h2>

          <p className="text-gray-700 dark:text-gray-300 mt-4 max-w-3xl mx-auto">
            Take a quick step toward a calmer and healthier mind. Explore
            guided yoga, breathing exercises, mindfulness, nutrition,
            relaxation, sleep support, and emotional wellness sessions.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {wellnessServices.map((service, index) => (
            <motion.div
              key={service.route}
              role="button"
              tabIndex={0}
              aria-label={service.title}
              onClick={() => handleServiceClick(service.route)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  handleServiceClick(service.route);
                }
              }}
              variants={fadeInUp}
              whileHover={{
                scale: 1.04,
                y: -5,
              }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg dark:shadow-black/30 border border-pink-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 cursor-pointer focus:outline-none focus:ring-4 focus:ring-pink-500/40"
            >
              {/* Image */}
              <img
                src={service.image}
                alt={service.title}
                onError={handleImageError}
                className="w-full h-52 object-cover"
              />

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-pink-600 dark:text-pink-400">
                  {service.title}
                </h3>

                <p className="text-gray-700 dark:text-gray-300 mt-4 leading-relaxed">
                  {service.description}
                </p>

                {/* CTA */}
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleServiceClick(service.route);
                  }}
                  className={`mt-6 w-full px-5 py-3 rounded-xl font-semibold text-white transition-all duration-300 shadow-md hover:shadow-lg ${
                    service.route === "depression-emotional-wellness"
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-pink-500 hover:bg-pink-600"
                  }`}
                >
                  {service.button} <FaArrowRight className="ml-1 inline" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* =========================
          TESTIMONIALS
      ========================== */}
      <motion.div
        className="bg-pink-50 dark:bg-gray-900 py-10 mt-4 transition-colors duration-300"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl font-bold text-center text-pink-600 dark:text-pink-400">
          What Our Clients Say
        </h2>

        <p className="text-center text-gray-600 dark:text-gray-400 mt-4 px-4">
          Hear from our happy clients about their experiences with our expert
          team of Doctors, Therapists & Wellness Instructors.
        </p>

        <motion.div
          className="flex gap-4 overflow-x-auto px-6 md:px-10 mt-8 hide-scrollbar"
          variants={staggerContainer}
        >
          {testimonials.length > 0 ? (
            testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id || index}
                className="bg-white dark:bg-gray-800 shadow-lg dark:shadow-black/30 rounded-lg p-6 min-w-[300px] max-w-[380px] transform transition duration-300 hover:-rotate-1 hover:shadow-xl dark:hover:shadow-black/50 border border-transparent dark:border-gray-700"
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
              >
                <p className="text-gray-700 dark:text-gray-300 italic mb-4">
                  "{testimonial.quote}"
                </p>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <p className="text-pink-600 dark:text-pink-400 font-bold text-right">
                    - {testimonial.name}
                  </p>

                  <p className="text-gray-500 dark:text-gray-400 text-sm text-right mt-1">
                    About {testimonial.doctor}
                  </p>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400 w-full">
              No testimonials available yet.
            </p>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ServicesPage;