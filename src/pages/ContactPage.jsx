import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaEnvelope,
  FaPaperPlane,
  FaCheckCircle,
  FaUser,
  FaVenusMars,
  FaMailBulk,
  FaCommentMedical,
  FaComments,
  FaPhone,
  FaMapMarkerAlt,
  FaClock
} from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import { API_BASE } from "../config";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    problem: "",
    message: "",
    gender: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [activeField, setActiveField] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [floatingIcons, setFloatingIcons] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      role: "bot",
      text: "Hi! I am your support assistant. Ask anything about counseling, appointments, or pricing.",
    },
  ]);

  // Generate floating icons for background
  useEffect(() => {
    const icons = [];
    for (let i = 0; i < 20; i++) {
      icons.push({
        id: i,
        icon: [FaFacebook, FaInstagram, FaLinkedin, FaEnvelope][Math.floor(Math.random() * 4)],
        size: Math.random() * 30 + 20,
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: Math.random() * 10 + 10,
        color: ['#DB4437', '#4267B2', '#E1306C', '#0077B5'][Math.floor(Math.random() * 4)]
      });
    }
    setFloatingIcons(icons);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFocus = (fieldName) => {
    setActiveField(fieldName);
  };

  const handleBlur = () => {
    setActiveField(null);
  };

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    const trimmed = chatInput.trim();
    if (!trimmed || isChatLoading) return;

    const userMessage = { id: Date.now(), role: "user", text: trimmed };
    setChatMessages((prev) => [...prev, userMessage]);
    setChatInput("");
    setIsChatLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/live-chat/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });
      const data = await res.json().catch(() => ({}));
      const fallback = "I could not generate a response right now. Please try again in a moment.";
      const reply = res.ok ? data.reply || fallback : data.error || fallback;
      setChatMessages((prev) => [...prev, { id: Date.now() + 1, role: "bot", text: reply }]);
    } catch (_) {
      setChatMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "bot",
          text: "Chat service is currently unavailable. Please check backend connection and try again.",
        },
      ]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");
    setShowConfetti(false);
    try {
      const response = await fetch(`${API_BASE}/send-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        const detail = data.details || data.error || "Failed to send message";
        throw new Error(detail);
      }

      setSuccessMessage(data.message || "Your message has been sent successfully!");
      setShowConfetti(true);
      // Reset form after success
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          problem: "",
          message: "",
          gender: "",
        });
      }, 2000);
    } catch (error) {
      setErrorMessage(
        error?.message ||
          "Unable to connect or send message. Please ensure the backend is running and try again."
      );
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setSuccessMessage("");
        setErrorMessage("");
        setShowConfetti(false);
      }, 5000);
    }
  };

  const contactInfo = [
    { icon: <FaPhone />, title: "Phone", info: "+91-7905977764", color: "text-blue-600" },
    { icon: <FaEnvelope />, title: "Email", info: "relationshipcare1212@gmail.com", color: "text-red-600" },
    { icon: <FaMapMarkerAlt />, title: "Address", info: " Nagawara Tech Park, Nagawara, Bengaluru, Karnataka 560016", color: "text-green-600" },
    { icon: <FaClock />, title: "Hours", info: "Mon-Sat: 8AM-11PM", color: "text-purple-600" },
  ];

  return (
    <motion.div
      className="relative bg-gradient-to-br from-pink-50 via-white to-blue-50 min-h-screen py-10 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Floating background icons */}
      {floatingIcons.map((item) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={item.id}
            className="absolute opacity-10"
            style={{ left: `${item.left}%` }}
            initial={{ y: -100, rotate: 0 }}
            animate={{ 
              y: window.innerHeight + 100,
              rotate: 360,
            }}
            transition={{
              duration: item.duration,
              delay: item.delay,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <Icon size={item.size} color={item.color} />
          </motion.div>
        );
      })}

      {/* Confetti animation */}
      <AnimatePresence>
        {showConfetti && (
          <motion.div
            className="fixed inset-0 pointer-events-none z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-4 h-4"
                style={{
                  left: `${Math.random() * 100}%`,
                  backgroundColor: ['#FF6B6B', '#4ECDC4', '#FFD166', '#06D6A0'][Math.floor(Math.random() * 4)]
                }}
                initial={{ y: -100, x: 0, rotate: 0, opacity: 1 }}
                animate={{
                  y: window.innerHeight + 100,
                  x: Math.random() * 200 - 100,
                  rotate: 360,
                  opacity: 0
                }}
                transition={{
                  duration: Math.random() * 2 + 1,
                  delay: Math.random() * 0.5,
                  ease: "easeOut"
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animated header */}
      <motion.div
        className="text-center mb-12 relative z-10"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 100,
          damping: 20,
          duration: 0.8 
        }}
      >
        <motion.div
          className="inline-block mb-4"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <FaPaperPlane className="text-pink-500 text-5xl mx-auto" />
        </motion.div>
        <motion.h1
          className="text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
        >
          Contact Us
        </motion.h1>
        <motion.p
          className="text-gray-600 mt-4 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Get in touch with our healthcare professionals
        </motion.p>
      </motion.div>

      {/* Success/Error messages with animations */}
      <AnimatePresence>
        {successMessage && (
          <motion.div
            className="max-w-2xl mx-auto mb-6 px-4"
            initial={{ opacity: 0, y: -50, scale: 0.5 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4 rounded-xl shadow-lg flex items-center space-x-3">
              <FaCheckCircle className="text-2xl animate-pulse" />
              <span className="font-semibold">{successMessage}</span>
            </div>
          </motion.div>
        )}

        {errorMessage && (
          <motion.div
            className="max-w-2xl mx-auto mb-6 px-4"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ type: "spring" }}
          >
            <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white p-4 rounded-xl shadow-lg">
              {errorMessage}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Contact Information Cards */}
          <motion.div
            className="lg:w-2/5"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-xl p-8 mb-8"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <FaComments className="mr-3 text-pink-500" />
                Quick Contact
              </h2>
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-4 p-4 rounded-lg hover:bg-pink-50 transition-colors cursor-pointer"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, x: 10 }}
                  >
                    <div className={`text-2xl ${item.color}`}>
                      {item.icon}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-700">{item.title}</p>
                      <p className="text-gray-600">{item.info}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Map/Office Hours Placeholder */}
            <motion.div
              className="bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl shadow-xl p-8 text-white"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-2xl font-bold mb-4">Response Time</h3>
              <p className="mb-4">We typically respond within 24 hours</p>
              <motion.div
                className="h-2 bg-white/30 rounded-full overflow-hidden"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, delay: 0.5 }}
              >
                <motion.div
                  className="h-full bg-white"
                  initial={{ width: "0%" }}
                  animate={{ width: "85%" }}
                  transition={{ 
                    duration: 2, 
                    delay: 1,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="lg:w-3/5"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl shadow-2xl p-8 relative overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
            >
              {/* Animated form background */}
              <motion.div
                className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-pink-500 to-purple-600"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 1 }}
              />

              <div className="space-y-6">
                {/* Name Field */}
                <motion.div
                  className="relative"
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  whileHover={{ scale: 1.01 }}
                >
                  <label htmlFor="name" className="flex items-center text-gray-700 mb-2">
                    <FaUser className="mr-2 text-pink-500" />
                    Name
                  </label>
                  <motion.input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => handleFocus("name")}
                    onBlur={handleBlur}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-pink-500 transition-all duration-300"
                    required
                    whileFocus={{ scale: 1.02 }}
                  />
                  {activeField === "name" && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-600"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.div>

                {/* Gender Field */}
                <motion.div
                  className="relative"
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <label className="flex items-center text-gray-700 mb-2">
                    <FaVenusMars className="mr-2 text-pink-500" />
                    Gender
                  </label>
                  <div className="flex space-x-6">
                    {["Male", "Female", "Other"].map((gender) => (
                      <motion.label
                        key={gender}
                        className={`flex-1 flex items-center justify-center space-x-2 p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                          formData.gender === gender
                            ? "border-pink-500 bg-pink-50 text-pink-600"
                            : "border-gray-200 hover:border-pink-300"
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <input
                          type="radio"
                          name="gender"
                          value={gender}
                          checked={formData.gender === gender}
                          onChange={handleChange}
                          className="hidden"
                        />
                        <span className="font-medium">{gender}</span>
                      </motion.label>
                    ))}
                  </div>
                </motion.div>

                {/* Email Field */}
                <motion.div
                  className="relative"
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ scale: 1.01 }}
                >
                  <label htmlFor="email" className="flex items-center text-gray-700 mb-2">
                    <FaMailBulk className="mr-2 text-pink-500" />
                    Email
                  </label>
                  <motion.input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => handleFocus("email")}
                    onBlur={handleBlur}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-pink-500 transition-all duration-300"
                    required
                    whileFocus={{ scale: 1.02 }}
                  />
                  {activeField === "email" && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-600"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.div>

                {/* Problem Field */}
                <motion.div
                  className="relative"
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ scale: 1.01 }}
                >
                  <label htmlFor="problem" className="flex items-center text-gray-700 mb-2">
                    <FaCommentMedical className="mr-2 text-pink-500" />
                    Your Concern
                  </label>
                  <motion.select
                    id="problem"
                    name="problem"
                    value={formData.problem}
                    onChange={handleChange}
                    onFocus={() => handleFocus("problem")}
                    onBlur={handleBlur}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-pink-500 transition-all duration-300 appearance-none bg-white"
                    required
                    whileFocus={{ scale: 1.02 }}
                  >
                    <option value="">Select a concern</option>
                    <option value="Relationship Counseling">Relationship Counseling</option>
                    <option value="Breakup Recovery">Breakup Recovery</option>
                    <option value="Marriage Guidance">Marriage Guidance</option>
                    <option value="Pre-Marital Coaching">Pre-Marital Coaching</option>
                  </motion.select>
                </motion.div>

                {/* Message Field */}
                <motion.div
                  className="relative"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <label htmlFor="message" className="flex items-center text-gray-700 mb-2">
                    <FaComments className="mr-2 text-pink-500" />
                    Message
                  </label>
                  <motion.textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => handleFocus("message")}
                    onBlur={handleBlur}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-pink-500 transition-all duration-300 resize-none"
                    rows="6"
                    required
                    whileFocus={{ scale: 1.01 }}
                  />
                  <motion.div
                    className="text-sm text-gray-500 mt-2 flex justify-between"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <span>Please provide detailed information</span>
                    <span>{formData.message.length}/500</span>
                  </motion.div>
                </motion.div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg relative overflow-hidden group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <motion.span
                    className="flex items-center justify-center space-x-3"
                    animate={isSubmitting ? { opacity: 0.5 } : { opacity: 1 }}
                  >
                    <IoMdSend className="text-xl" />
                    <span>{isSubmitting ? "Sending Message..." : "Send Message"}</span>
                  </motion.span>
                  
                  {/* Button shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                </motion.button>
              </div>
            </motion.form>
          </motion.div>
        </div>
      </div>

      {/* Social Media Section */}
      <motion.div
        className="mt-16 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <motion.h2
          className="text-3xl font-bold text-gray-800 mb-8"
          whileInView={{ scale: 1.05 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Connect With Us
        </motion.h2>
        
        <motion.div
          className="flex justify-center space-x-8"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
        >
          {[
            { icon: FaFacebook, color: "bg-blue-600", label: "Facebook", link: "https://www.facebook.com" },
            { icon: FaInstagram, color: "bg-gradient-to-r from-purple-600 to-pink-600", label: "Instagram", link: "https://www.instagram.com/sushi_error404/" },
            { icon: FaLinkedin, color: "bg-blue-700", label: "LinkedIn", link: "https://www.linkedin.com/in/sushant-kumar-6b547328b/" },
            { icon: FaEnvelope, color: "bg-red-600", label: "Email", link: "mailto:sushiitantmi45@gmail.com" },
          ].map((social, index) => (
            <motion.a
              key={social.label}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group"
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ 
                type: "spring",
                stiffness: 100,
                delay: index * 0.1 
              }}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.2 }
              }}
            >
              <motion.div
                className={`${social.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg`}
                whileHover={{ 
                  scale: 1.1,
                  rotate: 360,
                  transition: { duration: 0.5 }
                }}
              >
                <social.icon />
              </motion.div>
              <motion.span
                className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-sm py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
                initial={{ y: 10 }}
              >
                {social.label}
              </motion.span>
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* Live chat widget */}
      <motion.div
        className="fixed bottom-6 right-6 z-40"
        initial={{ scale: 0, rotate: 180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          type: "spring",
          stiffness: 200,
          delay: 1
        }}
      >
        <motion.button
          type="button"
          onClick={() => setIsChatOpen((prev) => !prev)}
          className="bg-gradient-to-r from-pink-600 to-purple-600 text-white p-4 rounded-full shadow-xl flex items-center space-x-2 group"
          whileHover={{ boxShadow: "0 10px 25px rgba(236, 72, 153, 0.5)" }}
          animate={{
            boxShadow: [
              "0 10px 25px rgba(236, 72, 153, 0.3)",
              "0 10px 35px rgba(236, 72, 153, 0.6)",
              "0 10px 25px rgba(236, 72, 153, 0.3)"
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity
          }}
        >
          <FaComments className="text-xl" />
          <span className="font-semibold">{isChatOpen ? "Close Chat" : "Live Chat"}</span>
          <motion.span
            className="w-3 h-3 bg-green-400 rounded-full ml-2"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [1, 0.5, 1]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity
            }}
          />
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-40 w-[340px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border border-pink-100 overflow-hidden"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
          >
            <div className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-4 py-3 font-semibold">
              Relationship Match Chat
            </div>

            <div className="h-72 overflow-y-auto p-3 space-y-2 bg-pink-50/40">
              {chatMessages.map((m) => (
                <div
                  key={m.id}
                  className={`max-w-[85%] px-3 py-2 rounded-xl text-sm ${
                    m.role === "user"
                      ? "ml-auto bg-pink-600 text-white"
                      : "bg-white text-gray-800 border border-pink-100"
                  }`}
                >
                  {m.text}
                </div>
              ))}
              {isChatLoading && (
                <div className="bg-white text-gray-600 border border-pink-100 max-w-[85%] px-3 py-2 rounded-xl text-sm">
                  Typing...
                </div>
              )}
            </div>

            <form onSubmit={handleChatSubmit} className="p-3 border-t border-pink-100 flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-pink-500"
              />
              <button
                type="submit"
                disabled={isChatLoading || !chatInput.trim()}
                className="bg-pink-600 text-white px-3 py-2 rounded-lg text-sm disabled:opacity-50"
              >
                Send
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ContactPage;

