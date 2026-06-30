"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600"
        >
          Privacy Policy
        </motion.h1>

        {/* Intro paragraph */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-6 text-lg leading-relaxed"
        >
          Your privacy is important to us. This Privacy Policy explains how we
          collect, use, and safeguard your information when you use our
          e-learning platform.
        </motion.p>

        {/* Section 1 */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-semibold mt-10 mb-4">
            1. Information We Collect
          </h2>
          <p className="mb-6">
            We may collect personal information such as your name, email, and
            login credentials when you create an account or sign in.
          </p>
        </motion.div>

        {/* Section 2 */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-semibold mt-10 mb-4">
            2. How We Use Information
          </h2>
          <p className="mb-6">
            We use your information to provide access to the platform,
            personalize your experience, and improve our services.
          </p>
        </motion.div>

        {/* Section 3 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-semibold mt-10 mb-4">
            3. Data Security
          </h2>
          <p className="mb-6">
            We implement reasonable security measures to protect your personal
            information against unauthorized access, alteration, or disclosure.
          </p>
        </motion.div>

        {/* Section 4 */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-semibold mt-10 mb-4">
            4. Third-Party Services
          </h2>
          <p className="mb-6">
            We may integrate third-party services (like Google login). Their own
            privacy policies apply when you use them.
          </p>
        </motion.div>

        {/* Section 5 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-2xl font-semibold mt-10 mb-4">5. Changes</h2>
          <p className="mb-6">
            We may update this policy from time to time. Please check back
            periodically for any updates.
          </p>
        </motion.div>

        {/* Back Button */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <Link
            href="/"
            className="inline-block px-6 py-3 rounded-full bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow-md transition"
          >
            Back to Home
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
