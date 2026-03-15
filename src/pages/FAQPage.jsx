import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaQuestionCircle, 
  FaChevronDown, 
  FaChevronUp,
  FaSearch,
  FaLightbulb,
  FaHeadset,
  FaShieldAlt,
  FaClock,
  FaCalendarAlt,
  FaVideo,
  FaUserMd,
  FaLock,
  FaCommentDots,
  FaStar,
  FaMagic,
  FaRocket,
  FaHeartbeat,
  FaComments,
  FaPhoneAlt,
  FaEnvelope,
  FaWhatsapp,
  FaSeedling,
  FaLeaf,
  FaHandHoldingHeart,
  FaShareAlt  // Added this import
} from "react-icons/fa";

const FAQPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const faqCategories = [
    { id: "all", label: "All Questions", icon: <FaQuestionCircle />, count: 14 },
    { id: "consultation", label: "Consultation", icon: <FaUserMd />, count: 5 },
    { id: "confidentiality", label: "Privacy", icon: <FaLock />, count: 3 },
    { id: "appointment", label: "Appointments", icon: <FaCalendarAlt />, count: 4 },
    { id: "technical", label: "Technical", icon: <FaVideo />, count: 2 },
  ];

  const faqs = [
    {
      id: 1,
      question: "How does the consultation process work?",
      answer: "Our consultation process is simple and seamless. You can book an appointment online through our platform, and our relationship experts will guide you through each step. We begin with an initial assessment to understand your concerns, followed by personalized sessions tailored to your needs.",
      category: "consultation",
      icon: <FaRocket className="text-blue-500" />,
      tags: ["Process", "Booking", "Guidance"]
    },
    {
      id: 2,
      question: "What is the cost of a consultation?",
      answer: "We offer flexible pricing plans to suit different needs. Initial 30-minute sessions start at $79, with package discounts available for multiple sessions. We also provide sliding scale options for those in need. Contact our team for a personalized quote.",
      category: "consultation",
      icon: <FaStar className="text-yellow-500" />,
      tags: ["Pricing", "Plans", "Payment"]
    },
    {
      id: 3,
      question: "Are the consultations confidential?",
      answer: "Absolutely. All consultations are 100% confidential and protected by HIPAA compliance. Your privacy is our utmost priority. We use end-to-end encryption for all communications and secure storage for session notes. Our professionals are bound by strict confidentiality agreements.",
      category: "confidentiality",
      icon: <FaShieldAlt className="text-green-500" />,
      tags: ["Privacy", "Security", "Trust"]
    },
    {
      id: 4,
      question: "How long does each consultation last?",
      answer: "Sessions typically last between 50 to 60 minutes to ensure we have ample time to address your concerns. We also offer 30-minute follow-up sessions and 90-minute intensive sessions for specific needs. The duration can be customized based on your requirements.",
      category: "appointment",
      icon: <FaClock className="text-purple-500" />,
      tags: ["Duration", "Timing", "Custom"]
    },
    {
      id: 5,
      question: "Can I reschedule or cancel my appointment?",
      answer: "Yes, you can reschedule or cancel your appointment up to 24 hours before the scheduled time without any charges. You can do this through your account dashboard or by contacting our support team. Late cancellations may incur a small fee as per our policy.",
      category: "appointment",
      icon: <FaCalendarAlt className="text-pink-500" />,
      tags: ["Reschedule", "Cancel", "Policy"]
    },
    {
      id: 6,
      question: "Do you offer virtual consultations?",
      answer: "Yes, we offer both in-person and virtual consultations through our secure video platform. Virtual sessions provide the same quality of care and are accessible from anywhere. All you need is a stable internet connection and a private space for the session.",
      category: "technical",
      icon: <FaVideo className="text-teal-500" />,
      tags: ["Virtual", "Online", "Remote"]
    },
    {
      id: 7,
      question: "What qualifications do your experts have?",
      answer: "Our team consists of licensed therapists, certified relationship coaches, and mental health professionals with extensive experience. All experts undergo rigorous vetting and continuous training to ensure the highest quality of service.",
      category: "consultation",
      icon: <FaUserMd className="text-indigo-500" />,
      tags: ["Experts", "Qualifications", "Quality"]
    },
    {
      id: 8,
      question: "Is there any preparation needed before a session?",
      answer: "No special preparation is needed. We recommend being in a quiet, comfortable space for virtual sessions and having a notebook handy if you wish to take notes. Some clients find it helpful to jot down key points they want to discuss.",
      category: "consultation",
      icon: <FaMagic className="text-amber-500" />,
      tags: ["Preparation", "Tips", "Guide"]
    },
    {
      id: 9,
      question: "Can I choose my preferred expert?",
      answer: "Absolutely. You can browse expert profiles, read reviews, and select the professional who best aligns with your needs. If you're unsure, our matching algorithm can suggest experts based on your concerns and preferences.",
      category: "appointment",
      icon: <FaHandHoldingHeart className="text-rose-500" />,
      tags: ["Choice", "Matching", "Preferences"]
    },
    {
      id: 10,
      question: "What if I need urgent support?",
      answer: "For urgent matters, we offer emergency sessions within 24 hours. Additionally, we provide 24/7 chat support and have partnerships with crisis helplines for immediate assistance when needed.",
      category: "confidentiality",
      icon: <FaHeadset className="text-red-500" />,
      tags: ["Emergency", "Support", "Urgent"]
    },
    {
      id: 11,
      question: "Are sessions covered by insurance?",
      answer: "We work with several insurance providers and can help you verify coverage. Many of our services are eligible for reimbursement through HSA/FSA accounts. Our billing team can provide detailed information about your specific plan.",
      category: "consultation",
      icon: <FaHeartbeat className="text-emerald-500" />,
      tags: ["Insurance", "Payment", "Coverage"]
    },
    {
      id: 12,
      question: "How do I know if this is right for me?",
      answer: "We offer a free 15-minute consultation to help you understand our approach and determine if it's a good fit. This allows you to meet an expert, discuss your concerns, and ask any questions before committing to a full session.",
      category: "all",
      icon: <FaSeedling className="text-lime-500" />,
      tags: ["Suitability", "Free Trial", "Assessment"]
    },
    {
      id: 13,
      question: "Can I switch experts if needed?",
      answer: "Yes, you can switch experts at any time. We believe the right match is crucial for progress. Our team will help you find another expert who might be a better fit for your needs and preferences.",
      category: "appointment",
      icon: <FaComments className="text-cyan-500" />,
      tags: ["Switch", "Flexibility", "Match"]
    },
    {
      id: 14,
      question: "What technology do I need for virtual sessions?",
      answer: "You'll need a device with a camera and microphone (computer, tablet, or smartphone) and a stable internet connection. Our platform works on all modern browsers and has dedicated apps for iOS and Android.",
      category: "technical",
      icon: <FaLeaf className="text-green-500" />,
      tags: ["Technology", "Requirements", "Setup"]
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = searchQuery === "" || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-10 px-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <motion.div
        className="absolute top-0 left-0 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        animate={{
          x: [0, -100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/3 w-48 h-48 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        animate={{
          x: [0, 80, 0],
          y: [0, -80, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="text-center mb-12 relative z-10"
      >
        <motion.div
          className="inline-block mb-6"
          animate={floatingAnimation}
        >
          <FaQuestionCircle className="text-6xl text-blue-500" />
        </motion.div>
        <motion.h1
          className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
        >
          Questions & Answers
        </motion.h1>
        <motion.p
          className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Find clarity and guidance for your relationship journey
        </motion.p>

        {/* Search Bar */}
        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="relative">
            <FaSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
            <input
              type="text"
              placeholder="Search questions or topics..."
              className="w-full pl-14 pr-6 py-4 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none shadow-lg bg-white/80 backdrop-blur-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <motion.button
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                ✕
              </motion.button>
            )}
          </div>
        </motion.div>
      </motion.div>

      {/* Category Filter */}
      <motion.div
        className="max-w-6xl mx-auto mb-8 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {faqCategories.map((category) => (
            <motion.button
              key={category.id}
              variants={itemVariants}
              className={`px-5 py-3 rounded-xl flex items-center gap-3 transition-all ${
                activeCategory === category.id
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-blue-50 border border-gray-200"
              }`}
              onClick={() => setActiveCategory(category.id)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-lg">{category.icon}</span>
              <span className="font-medium">{category.label}</span>
              <span className={`px-2 py-1 rounded-full text-sm ${
                activeCategory === category.id
                  ? "bg-white/20"
                  : "bg-blue-100 text-blue-600"
              }`}>
                {category.count}
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* FAQ Content */}
      <motion.div
        className="max-w-4xl mx-auto relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence>
          {filteredFaqs.length > 0 ? (
            <div className="space-y-4">
              {filteredFaqs.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  variants={itemVariants}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className={`bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden ${
                    activeIndex === index ? "ring-2 ring-blue-500" : ""
                  }`}
                  whileHover={{ 
                    y: -3,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                  }}
                >
                  <motion.button
                    className="w-full p-6 text-left flex items-center justify-between"
                    onClick={() => toggleFAQ(index)}
                    whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.05)" }}
                    aria-expanded={activeIndex === index}
                    aria-controls={`faq-answer-${faq.id}`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="mt-1">
                        {faq.icon}
                      </div>
                      <div className="flex-1">
                        <motion.h3
                          className="text-xl font-semibold text-gray-800 mb-2"
                          animate={activeIndex === index ? { color: "#3b82f6" } : {}}
                        >
                          {faq.question}
                        </motion.h3>
                        <div className="flex flex-wrap gap-2">
                          {faq.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: activeIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="ml-4 text-blue-500"
                    >
                      {activeIndex === index ? (
                        <FaChevronUp className="text-xl" />
                      ) : (
                        <FaChevronDown className="text-xl" />
                      )}
                    </motion.div>
                  </motion.button>

                  <AnimatePresence>
                    {activeIndex === index && (
                      <motion.div
                        id={`faq-answer-${faq.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ 
                          height: "auto",
                          opacity: 1,
                          transition: {
                            height: {
                              duration: 0.4
                            },
                            opacity: {
                              duration: 0.25,
                              delay: 0.15
                            }
                          }
                        }}
                        exit={{ 
                          height: 0,
                          opacity: 0,
                          transition: {
                            height: {
                              duration: 0.4
                            },
                            opacity: {
                              duration: 0.25
                            }
                          }
                        }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6">
                          <div className="pl-10 border-l-2 border-blue-200">
                            <p className="text-gray-600 text-lg leading-relaxed mb-4">
                              {faq.answer}
                            </p>
                            {faq.id === 2 && (
                              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl mb-4">
                                <h4 className="font-semibold text-blue-700 mb-2 flex items-center gap-2">
                                  <FaLightbulb className="text-yellow-500" />
                                  Pricing Plans
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                  {[
                                    { plan: "Basic", price: "$79", sessions: "1 session" },
                                    { plan: "Premium", price: "$199", sessions: "3 sessions" },
                                    { plan: "Elite", price: "$349", sessions: "6 sessions" }
                                  ].map((plan) => (
                                    <div key={plan.plan} className="bg-white p-3 rounded-lg text-center">
                                      <div className="font-bold text-gray-800">{plan.plan}</div>
                                      <div className="text-2xl font-bold text-blue-600">{plan.price}</div>
                                      <div className="text-sm text-gray-500">{plan.sessions}</div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                            <div className="flex flex-wrap gap-4 mt-4">
                              <button className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
                                <FaCommentDots /> Was this helpful?
                              </button>
                              <button className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
                                <FaShareAlt /> Share answer
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <FaQuestionCircle className="text-8xl text-gray-300 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-600 mb-2">
                No questions found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or browse by category
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Stats & CTA Section */}
      <motion.div
        className="max-w-6xl mx-auto mt-16 relative z-10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-8 md:p-12 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-lg">Support Available</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-lg">Confidential</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">4.9★</div>
              <div className="text-lg">Satisfaction Rate</div>
            </div>
          </div>
        </div>

        {/* Contact Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {[
            { icon: <FaPhoneAlt />, title: "Call Us", desc: "+1 (555) 123-HELP", color: "bg-green-500" },
            { icon: <FaEnvelope />, title: "Email", desc: "support@relationship.com", color: "bg-blue-500" },
            { icon: <FaWhatsapp />, title: "WhatsApp", desc: "Chat instantly", color: "bg-green-400" }
          ].map((contact, idx) => (
            <motion.div
              key={contact.title}
              className="bg-white rounded-2xl p-6 shadow-lg text-center"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className={`${contact.color} w-14 h-14 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4`}>
                {contact.icon}
              </div>
              <h4 className="font-bold text-gray-800 mb-2">{contact.title}</h4>
              <p className="text-gray-600">{contact.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Still Have Questions */}
      <motion.div
        className="max-w-4xl mx-auto mt-16 text-center relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-3xl p-8 border-2 border-dashed border-pink-200">
          <FaLightbulb className="text-5xl text-yellow-500 mx-auto mb-4" />
          <h3 className="text-3xl font-bold text-gray-800 mb-4">
            Still have questions?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Can't find the answer you're looking for? Our support team is here to help.
          </p>
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-shadow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Support
          </motion.button>
        </div>
      </motion.div>

      {/* Floating Help Button */}
      <motion.button
        className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-2xl flex items-center justify-center text-white"
        initial={{ scale: 0, rotate: 180 }}
        animate={{ scale: 1, rotate: 0 }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
      >
        <FaHeadset className="text-2xl" />
        <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full text-xs flex items-center justify-center animate-pulse">
          !
        </span>
      </motion.button>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
      `}</style>
    </div>
  );
};

export default FAQPage;