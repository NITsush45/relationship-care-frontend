import React from 'react';
import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-10">
      <div className="max-w-4xl mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-4xl font-bold text-gray-800"
        >
          Privacy Policy
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-gray-600 mt-6"
        >
          Your privacy is important to us. We are committed to protecting your personal information and ensuring transparency in our data practices.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-8"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Information We Collect</h2>
          <p className="text-gray-600 mb-4">
            We collect information to provide and improve our services. The types of data we may collect include:
          </p>
          <ul className="list-disc pl-6 text-gray-600">
            <motion.li
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="mb-2"
            >
              Personal information you provide during account registration (e.g., name, email address).
            </motion.li>
            <motion.li
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="mb-2"
            >
              Usage data, such as pages visited, time spent on our platform, and interactions with features.
            </motion.li>
            <motion.li
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1, duration: 0.8 }}
              className="mb-2"
            >
              Data collected through cookies or other tracking technologies.
            </motion.li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mt-8"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">How We Use Your Information</h2>
          <p className="text-gray-600 mb-4">
            The information we collect is used to:
          </p>
          <ul className="list-disc pl-6 text-gray-600">
            <motion.li
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="mb-2"
            >
              Provide, maintain, and improve our services.
            </motion.li>
            <motion.li
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.7, duration: 0.8 }}
              className="mb-2"
            >
              Communicate with you about updates, promotions, and support.
            </motion.li>
            <motion.li
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.9, duration: 0.8 }}
              className="mb-2"
            >
              Ensure the security and integrity of our platform.
            </motion.li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.8 }}
          className="mt-8"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Rights</h2>
          <p className="text-gray-600 mb-4">
            As a user, you have the right to:
          </p>
          <ul className="list-disc pl-6 text-gray-600">
            <motion.li
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.3, duration: 0.8 }}
              className="mb-2"
            >
              Access and update your personal information.
            </motion.li>
            <motion.li
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.5, duration: 0.8 }}
              className="mb-2"
            >
              Request the deletion of your data, where applicable.
            </motion.li>
            <motion.li
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.7, duration: 0.8 }}
              className="mb-2"
            >
              Opt out of marketing communications.
            </motion.li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.0, duration: 0.8 }}
          className="mt-8"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h2>
          <p className="text-gray-600 mb-4">
            If you have any questions, concerns, or requests regarding your privacy, please contact us at:
          </p>
          <p className="text-gray-600">
            <strong>Email:</strong> relationshipcare1212@gmail.com
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.3, duration: 0.8 }}
          className="text-gray-600 mt-10"
        >
          By using our services, you agree to the terms outlined in this Privacy Policy. Thank you for trusting us with your data.
        </motion.p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
