"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function TermsPage() {
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
          Terms and Conditions
        </motion.h1>

        {/* Intro Paragraph */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-6 text-lg leading-relaxed"
        >
          These Terms and Conditions govern your use of our e-learning platform.
          By using our services, you agree to the following:
        </motion.p>

        {/* Section 1 */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-semibold mt-10 mb-4">1. Acceptable Use</h2>
          <p className="mb-6">
            You agree to use the platform only for lawful purposes, and not to
            infringe upon the rights of others or restrict their use of the
            platform.
          </p>
        </motion.div>

        {/* Section 2 */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-semibold mt-10 mb-4">2. Accounts</h2>
          <p className="mb-6">
            You are responsible for maintaining the confidentiality of your
            account credentials and for all activities under your account.
          </p>
        </motion.div>

        {/* Section 3 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-semibold mt-10 mb-4">3. Content Ownership</h2>
          <p className="mb-6">
            All course content, materials, and media on the platform are owned or
            licensed by us. You may not copy, distribute, or modify them without
            permission.
          </p>
        </motion.div>

        {/* Section 4 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-2xl font-semibold mt-10 mb-4">4. Changes to Terms</h2>
          <p className="mb-6">
            We may update these Terms from time to time. Continued use of the
            platform after updates constitutes your acceptance of the changes.
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
