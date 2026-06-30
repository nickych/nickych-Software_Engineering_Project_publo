"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Animated Title */}
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600"
        >
          About Cuz E-Learning
        </motion.h1>

        {/* Intro paragraph */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-6 text-lg leading-relaxed text-gray-300"
        >
          Cuz E-Learning is an online education platform designed to make
          learning accessible, interactive, and effective for all students,
          lecturers, and administrators. Our goal is to provide a seamless
          experience for users of all roles.
        </motion.p>

        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-semibold mt-10 mb-4">Our Mission</h2>
          <p className="mb-6 text-gray-300">
            We aim to empower learners by providing a high-quality, secure, and
            easy-to-use platform for online education. We believe that knowledge
            should be accessible to everyone, anytime and anywhere.
          </p>
        </motion.div>

        {/* What We Offer */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-semibold mt-10 mb-4">What We Offer</h2>
          <ul className="list-disc list-inside mb-6 space-y-2 text-gray-300">
            <li>Interactive course materials tailored to students’ needs</li>
            <li>Dedicated dashboards for students, lecturers, and administrators</li>
            <li>Secure authentication and role-based access</li>
            <li>Integrated support for announcements, assignments, and exams</li>
          </ul>
        </motion.div>

        {/* Our Vision */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-semibold mt-10 mb-4">Our Vision</h2>
          <p className="mb-6 text-gray-300">
            To be the leading e-learning platform in the region, continuously
            innovating to improve access to education and support lifelong
            learning for all.
          </p>
        </motion.div>

        {/* Back to Home Button */}
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
