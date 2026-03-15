import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import servicesData from "../data/services.json";
import testimonialsData from "../data/testimonials.json";
import processStepsData from "../data/processSteps.json";
import statsData from "../data/stats.json";

// Component definitions
// Simple icon components

// Reusable Section Wrapper Component
const SectionWrapper = ({ children, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6 }}
      className={`py-24 px-4 md:px-8 relative z-10 ${className}`}
    >
      {children}
    </motion.section>
  );
};

// Enhanced Service Card Component
const ServiceCard = ({ service, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -3 }}
      className="group relative"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-white via-pink-50/50 to-purple-50/50 rounded-3xl shadow-xl group-hover:shadow-2xl transition-all duration-500 border border-pink-100/50"
      />
      <div className="relative p-8 h-full">
        <div className={`inline-flex p-5 rounded-2xl bg-gradient-to-r ${service.color} text-white mb-6 text-5xl shadow-lg`}>
          {service.icon}
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-pink-600 transition-colors">
          {service.title}
        </h3>
        <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
        
        <div className="space-y-3 mb-6">
          {service.features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: index * 0.1 + idx * 0.05 + 0.3 }}
              className="flex items-center text-gray-700"
            >
              <span className="text-green-500 mr-3 text-xl flex-shrink-0">
                ✓
              </span>
              <span className="text-sm font-medium">{feature}</span>
            </motion.div>
          ))}
        </div>
        
        <div className="flex items-center text-gray-500 mb-6">
          <span className="mr-2 text-lg">🕐</span>
          <span className="text-sm font-medium">{service.duration}</span>
        </div>
        
        <div className="pt-6 border-t border-gray-200">
            <a
              href="/book"
              className="inline-flex items-center text-pink-600 font-bold group-hover:text-pink-700 transition-colors"
            >
              Learn More
              <span className="ml-2 inline-block">→</span>
            </a>
        </div>
      </div>
    </motion.div>
  );
};

// Process Step Card Component
const ProcessStepCard = ({ step, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      className="relative group"
    >
        <motion.div
          className="relative bg-white rounded-3xl p-8 shadow-xl text-center border border-pink-100/50"
          whileHover={{ y: -5, scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-2xl">
              {step.icon}
            </div>
          </div>
          <div className="mt-10">
            <div className="text-7xl font-bold bg-gradient-to-b from-gray-200 to-gray-100 bg-clip-text text-transparent mb-3">
              {step.step}
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-pink-600 transition-colors">
              {step.title}
            </h3>
            <p className="text-gray-600 leading-relaxed">{step.description}</p>
          </div>
        </motion.div>
    </motion.div>
  );
};

const HomePage = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    // Generate floating hearts - reduced for better performance
    const generateHearts = () => {
      const heartArray = [];
      for (let i = 0; i < 6; i++) {
        heartArray.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 15 + 12,
          delay: Math.random() * 2,
          duration: 4 + Math.random() * 2,
          opacity: Math.random() * 0.3 + 0.1,
        });
      }
      setHearts(heartArray);
    };
    generateHearts();
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % 3); // Fixed count for 3 testimonials
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const services = servicesData;
  const testimonials = testimonialsData.homePage;
  const processSteps = processStepsData;

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-blue-50 overflow-hidden">
      {/* Enhanced Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute text-pink-300"
            initial={{ opacity: 0, y: 100 }}
            animate={{
              opacity: [0, heart.opacity, 0],
              y: [100, -150],
            }}
            transition={{
              duration: heart.duration,
              delay: heart.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              left: `${heart.x}%`,
              top: `${heart.y}%`,
              fontSize: `${heart.size}px`,
            }}
          >
            ❤️
          </motion.div>
        ))}
        
        {/* Gradient orbs - simplified animations */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
      </div>

      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        style={{ opacity, scale }}
        className="relative min-h-[95vh] flex items-center justify-center px-4 md:px-8 overflow-hidden pt-20"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-pink-200/30 via-purple-200/30 to-blue-200/30 blur-3xl" />

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700 font-semibold mb-8 shadow-lg backdrop-blur-sm border border-pink-200/50"
            >
              <motion.span
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                className="mr-2 text-xl"
              >
                ✨
              </motion.span>
              Trusted by <strong className="mx-1 text-pink-800">5,000+</strong> Couples Worldwide
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight"
            >
              <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                Rekindle Love,
              </span>
              <br />
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-gray-800"
              >
                Rediscover Connection
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed font-light"
            >
              A safe space where hearts heal and relationships flourish.
              <br className="hidden md:block" />
              <span className="text-gray-700">Our experienced counselors help you rebuild connection, clarity, and confidence—together.</span>
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-20"
          >
            <motion.a
              href="/book"
              className="w-full sm:w-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.button
                className="group relative w-full px-10 py-5 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold rounded-full shadow-2xl text-lg"
                whileHover={{ boxShadow: "0 20px 40px rgba(236, 72, 153, 0.4)", scale: 1.02 }}
              >
                Begin Your Journey
                <span className="ml-2 inline-block">→</span>
              </motion.button>
            </motion.a>

            <motion.a
              href="/services"
              className="w-full sm:w-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.button
                className="w-full px-10 py-5 border-2 border-pink-400 text-pink-600 font-bold rounded-full bg-white/80 backdrop-blur-sm hover:bg-pink-50 transition-all duration-300 text-lg shadow-lg"
                whileHover={{ borderColor: "#ec4899", boxShadow: "0 10px 30px rgba(236, 72, 153, 0.2)" }}
              >
                Explore Our Services
              </motion.button>
            </motion.a>
          </motion.div>

          {/* Enhanced Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto"
          >
            {statsData.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="group relative text-center rounded-3xl p-8 bg-white/80 backdrop-blur-lg shadow-xl border border-pink-100/50 hover:border-pink-300 transition-all duration-300"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-pink-50/50 to-purple-50/50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <div className="relative z-10">
                  <motion.div
                    className="text-5xl mb-3"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                  >
                    {stat.icon}
                  </motion.div>
                  <motion.div
                    className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2"
                    animate={{
                      backgroundPosition: ["0%", "100%", "0%"],
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    style={{ backgroundSize: "200% 200%" }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="mt-2 text-sm font-semibold text-gray-600 tracking-wide uppercase">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Enhanced Services Section */}
      <SectionWrapper>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
            >
              Transform Your{" "}
              <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                Relationship Journey
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed"
            >
              Tailored solutions for every stage of your relationship, from first dates to golden anniversaries.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} service={service} index={index} />
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Enhanced How It Works */}
      <SectionWrapper className="bg-gradient-to-b from-white via-pink-50/30 to-purple-50/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
            >
              Your Path to{" "}
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent">
                Lasting Love
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed"
            >
              A simple, compassionate process designed to guide you toward relationship fulfillment.
            </motion.p>
          </motion.div>

          <div className="relative">
            <motion.div
              className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 transform -translate-y-1/2 rounded-full"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <ProcessStepCard key={index} step={step} index={index} />
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Enhanced Testimonials */}
      <SectionWrapper>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
            >
              Stories of{" "}
              <span className="bg-gradient-to-r from-pink-600 via-rose-600 to-pink-500 bg-clip-text text-transparent">
                Love Renewed
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed"
            >
              Hear from couples and individuals who found their way back to love.
            </motion.p>
          </motion.div>

          <div className="relative h-auto md:h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-br from-white via-pink-50/50 to-purple-50/50 rounded-3xl shadow-2xl p-8 md:p-16 border border-pink-100/50 backdrop-blur-sm"
              >
                <div className="flex flex-col md:flex-row items-center h-full">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="md:w-1/3 text-center mb-8 md:mb-0"
                  >
                    <div className="text-9xl mb-6">
                      {testimonials[activeTestimonial].image}
                    </div>
                    <div className="flex justify-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-yellow-400 text-3xl">
                          ⭐
                        </span>
                      ))}
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="md:w-2/3 md:pl-12"
                  >
                    <motion.div
                      className="text-2xl md:text-4xl text-gray-800 mb-8 leading-relaxed font-light italic"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      "{testimonials[activeTestimonial].content}"
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <div className="text-2xl font-bold text-gray-900 mb-2">{testimonials[activeTestimonial].name}</div>
                      <div className="text-gray-600 text-lg">{testimonials[activeTestimonial].role}</div>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="flex justify-center mt-10 space-x-3"
          >
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className={`h-3 rounded-full transition-all duration-300 ${
                  index === activeTestimonial
                    ? "bg-gradient-to-r from-pink-600 to-purple-600 w-12 shadow-lg"
                    : "bg-pink-300 hover:bg-pink-400 w-3"
                }`}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </motion.div>
        </div>
      </SectionWrapper>

      {/* Enhanced Final CTA */}
      <section className="py-24 px-4 md:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-blue-500/20" />
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto text-center relative z-10"
        >
          <motion.div
            className="bg-white/95 backdrop-blur-md rounded-3xl p-12 md:p-16 shadow-2xl border border-pink-100/50"
            whileHover={{ scale: 1.02, boxShadow: "0 30px 60px rgba(236, 72, 153, 0.3)" }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-7xl mx-auto mb-8 inline-block">
              ✨
            </span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight"
            >
              Ready to Write Your{" "}
              <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Love Story?
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              Take the first step toward the relationship you deserve. Our expert counselors are here to guide you.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              <motion.a
                href="/book"
                className="w-full sm:w-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.button
                  className="w-full px-12 py-6 bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 text-white font-bold rounded-full shadow-2xl text-lg relative overflow-hidden"
                  whileHover={{ boxShadow: "0 20px 40px rgba(236, 72, 153, 0.4)" }}
                  animate={{
                    backgroundPosition: ["0%", "100%", "0%"],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  style={{ backgroundSize: "200% 200%" }}
                >
                  <span className="relative z-10">Book Free Consultation</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                </motion.button>
              </motion.a>
              
              <motion.a
                href="/contact-us"
                className="w-full sm:w-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.button
                  className="w-full px-12 py-6 border-2 border-pink-400 text-pink-600 font-bold rounded-full bg-white hover:bg-pink-50 transition-all duration-300 text-lg shadow-lg"
                  whileHover={{ borderColor: "#ec4899", boxShadow: "0 10px 30px rgba(236, 72, 153, 0.2)" }}
                >
                  Talk to an Expert
                </motion.button>
              </motion.a>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="mt-10 text-gray-500 text-lg"
            >
              <span className="inline-block mr-2">
                ❤️
              </span>
              Your journey to better relationships starts here
            </motion.p>
          </motion.div>
        </motion.div>
      </section>

    </div>
  );
};

export default HomePage;
