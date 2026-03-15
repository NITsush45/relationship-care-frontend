import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [hoveredLink, setHoveredLink] = useState(null);

  const navigationLinks = [
    { to: "/privacy-policy", label: "Privacy Policy", icon: "🔒" },
    { to: "/terms", label: "Terms of Service", icon: "📜" },
    { to: "/contact-us", label: "Contact Us", icon: "💬" },
    { to: "/faqs", label: "FAQ", icon: "❓" },
  ];

  const socialLinks = [
    {
      href: "https://facebook.com",
      src: "https://img.icons8.com/ios-filled/24/ffffff/facebook--v1.png",
      alt: "Facebook",
      label: "Visit our Facebook page",
      color: "from-blue-600 to-blue-400",
    },
    {
      href: "https://www.instagram.com/sushi_error404/",
      src: "https://img.icons8.com/ios-filled/24/ffffff/instagram-new.png",
      alt: "Instagram",
      label: "Follow us on Instagram",
      color: "from-purple-600 via-pink-500 to-orange-400",
    },
    {
      href: "https://www.linkedin.com/in/sushant-kumar-6b547328b/",
      src: "https://img.icons8.com/ios-filled/24/ffffff/linkedin-circled--v1.png",
      alt: "LinkedIn",
      label: "Connect with us on LinkedIn",
      color: "from-blue-700 to-blue-500",
    },
    {
      href: "mailto:sushiitantmi45@gmail.com",
      src: "https://img.icons8.com/ios-filled/24/ffffff/email.png",
      alt: "Email",
      label: "Send us an email",
      color: "from-red-500 to-pink-500",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      },
    },
  };

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <footer 
      className="relative bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white pt-16 pb-8 overflow-hidden"
      role="contentinfo"
      aria-label="Website footer"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Brand Section */}
          <motion.div
            variants={itemVariants}
            className="text-center md:text-left"
          >
            <Link to="/" className="inline-block mb-4 group">
              <motion.div 
                className="flex items-center space-x-2 justify-center md:justify-start"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="text-3xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Relationship Care
                </span>
                <motion.span 
                  className="text-red-500 text-2xl"
                  animate={floatingAnimation}
                >
                  ♥
                </motion.span>
              </motion.div>
              <motion.p 
                className="text-gray-300 text-sm mt-3 group-hover:text-pink-300 transition-colors duration-300"
                initial={{ opacity: 0.8 }}
                whileHover={{ opacity: 1 }}
              >
                Nurturing meaningful connections for a better tomorrow.
              </motion.p>
            </Link>
            
            <motion.div
              className="mt-6 p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10"
              whileHover={{ 
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderColor: "rgba(236, 72, 153, 0.3)",
              }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-xs text-gray-400 mb-2">✨ New Feature</p>
              <p className="text-sm text-pink-300 font-semibold">AI-Powered Relationship Insights</p>
            </motion.div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            variants={itemVariants}
            className="text-center"
          >
            <h3 className="font-semibold text-xl mb-6 bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
              Quick Links
            </h3>
            <nav aria-label="Footer navigation">
              <ul className="space-y-3">
                {navigationLinks.map((link, index) => (
                  <motion.li
                    key={link.to}
                    onHoverStart={() => setHoveredLink(index)}
                    onHoverEnd={() => setHoveredLink(null)}
                  >
                    <Link
                      to={link.to}
                      className="group relative inline-flex items-center space-x-2 text-gray-300 hover:text-pink-400 transition-all duration-300"
                      aria-label={link.label}
                    >
                      <motion.span
                        className="text-lg"
                        animate={hoveredLink === index ? { rotate: [0, -10, 10, 0], scale: 1.2 } : {}}
                        transition={{ duration: 0.5 }}
                      >
                        {link.icon}
                      </motion.span>
                      <span className="relative">
                        {link.label}
                        <motion.span
                          className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-pink-500 to-blue-500"
                          initial={{ width: 0 }}
                          animate={{ width: hoveredLink === index ? "100%" : 0 }}
                          transition={{ duration: 0.3 }}
                        />
                      </span>
                      <motion.span
                        className="text-pink-400 opacity-0 group-hover:opacity-100"
                        initial={{ x: -10 }}
                        animate={{ x: hoveredLink === index ? 0 : -10 }}
                        transition={{ duration: 0.3 }}
                      >
                        →
                      </motion.span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>

          {/* Social Media */}
          <motion.div
            variants={itemVariants}
            className="text-center md:text-right"
          >
            <h3 className="font-semibold text-xl mb-6 bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
              Connect With Us
            </h3>
            <div className="flex justify-center md:justify-end space-x-4 mb-6">
              {socialLinks.map((icon, index) => (
                <motion.a
                  key={index}
                  href={icon.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={icon.label}
                  className={`relative bg-gray-800/50 backdrop-blur-sm p-3 rounded-full transition-all duration-300 border border-gray-700/50 hover:border-transparent group overflow-hidden`}
                  whileHover={{ 
                    scale: 1.15,
                    rotate: 360,
                  }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 300,
                    damping: 20
                  }}
                >
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-r ${icon.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                  />
                  <img 
                    src={icon.src} 
                    alt={icon.alt} 
                    className="w-5 h-5 relative z-10" 
                    loading="lazy"
                  />
                </motion.a>
              ))}
            </div>
            <motion.p 
              className="text-gray-400 text-sm"
              initial={{ opacity: 0.8 }}
              whileHover={{ opacity: 1, scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              Stay updated with our latest insights
            </motion.p>
            
            <motion.div
              className="mt-6 inline-block px-4 py-2 bg-gradient-to-r from-pink-500/20 to-blue-500/20 rounded-full border border-pink-500/30"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 20px rgba(236, 72, 153, 0.3)"
              }}
            >
              <span className="text-xs text-pink-300">💌 Join 10K+ subscribers</span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Animated Divider */}
        <motion.div
          className="relative w-full h-px mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-500 to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.3 }}
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500 to-transparent"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </motion.div>

        {/* Copyright Section */}
        <motion.div
          className="text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.p
            variants={itemVariants}
            className="text-gray-400 text-sm mb-2"
          >
            &copy; {currentYear}{" "}
            <motion.span 
              className="font-bold bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent inline-block"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Relationship Care
            </motion.span>
            . All rights reserved.
          </motion.p>
          
          <motion.p
            variants={itemVariants}
            className="text-gray-500 text-xs"
          >
            Built with <motion.span 
              className="text-red-500 inline-block"
              animate={{
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              ♥
            </motion.span> for better relationships.
            <br className="block sm:hidden" />
            <span className="hidden sm:inline"> · </span>
            <motion.span
              className="inline-block"
              initial={{ opacity: 0.7 }}
              whileHover={{ opacity: 1, scale: 1.05 }}
            >
              Making connections meaningful since 2025.
            </motion.span>
          </motion.p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;