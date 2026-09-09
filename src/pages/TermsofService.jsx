import React from 'react';
import { motion } from 'framer-motion';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-950 dark:to-gray-900 py-10 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-4xl font-bold text-gray-800 dark:text-white"
        >
          Terms of Service
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-gray-600 dark:text-gray-300 mt-6"
        >
          By using our services, you agree to abide by our terms and conditions. Any misuse of our services may result in termination of your account.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-8"
        >
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">User Responsibilities</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            As a user, you agree to:
          </p>
          <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300">
            <motion.li
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mb-2"
            >
              Provide accurate information when using the services.
            </motion.li>
            <motion.li
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="mb-2"
            >
              Respect other users and refrain from abusive or harmful behavior.
            </motion.li>
            <motion.li
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="mb-2"
            >
              Not engage in any illegal activities using our platform.
            </motion.li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="mt-8"
        >
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Account Termination</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            We reserve the right to terminate your account for violations of our terms. This can include, but is not limited to, fraudulent activities or harmful behavior.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="mt-8"
        >
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Privacy and Data Usage</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Your privacy is important to us. We collect personal data only for necessary purposes, and we will never sell or misuse your information. For more details, please refer to our Privacy Policy.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="mt-8"
        >
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Contact Us</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            If you have any questions regarding our terms or need assistance, please don't hesitate to contact us at xyz123@gmail.com.
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.0, duration: 0.8 }}
          className="text-gray-600 dark:text-gray-300 mt-10"
        >
          By continuing to use our services, you confirm that you agree with these terms. Thank you for choosing our platform.
        </motion.p>
      </div>
    </div>
  );
};

export default TermsOfService;
