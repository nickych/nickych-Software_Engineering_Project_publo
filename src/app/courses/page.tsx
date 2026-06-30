"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, Variants } from "framer-motion";
import Link from "next/link";

interface Course {
  slug: string;
  title: string;
  brief: string;
  duration: string;
}

const coursesData: Course[] = [
  {
    slug: "computing",
    title: "Bachelor of Science in Computing (BSc. Comp)",
    brief: "A computing programme covering programming, networks, OS, AI and more.",
    duration: "4 Years",
  },
  {
    slug: "economics",
    title: "Bachelor of Arts Economics (BA Econ)",
    brief: "Economics principles, statistics, development economics and finance.",
    duration: "4 Years",
  },
  {
    slug: "accounting",
    title: "Bachelor of Accounting (BAC)",
    brief: "Financial, management accounting, auditing, and taxation modules.",
    duration: "4 Years",
  },
  {
    slug: "business-administration",
    title: "Bachelor of Business Administration (BBA)",
    brief: "Management, marketing, finance, operations & strategic business skills.",
    duration: "4 Years",
  },
  {
    slug: "purchasing-supply",
    title: "Bachelor of Arts Purchasing & Supply (BA PS)",
    brief: "Procurement, supply chain, logistics and supply management.",
    duration: "4 Years",
  },
];

// Framer Motion Variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 12 } },
};

const buttonVariants: Variants = {
  hover: { scale: 1.05, backgroundColor: "#4B5563", transition: { type: "spring", stiffness: 300 } },
  tap: { scale: 0.95 },
};

export default function CoursesPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const filtered = coursesData.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gray-900 text-gray-100 px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <motion.div
        className="mb-6 inline-block"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Use a normal button for router */}
        <button
          onClick={() => router.push("/student/dashboard")}
          className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg shadow transition"
        >
          ← Back to Dashboard
        </button>
      </motion.div>

      <h1 className="text-3xl font-bold text-center mb-8">Courses Offered</h1>

      {/* Search input */}
      <div className="max-w-md mx-auto mb-8">
        <input
          type="text"
          placeholder="Search courses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Courses Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {filtered.map((course) => (
          <motion.div key={course.slug} variants={cardVariants}>
            <Link
              href={`/courses/${course.slug}`}
              className="group bg-gray-800 hover:bg-gray-700 rounded-2xl p-6 shadow-lg transition transform hover:-translate-y-1 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 block"
            >
              <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-400">
                {course.title}
              </h2>
              <p className="text-gray-400 mb-4">{course.brief}</p>
              <span className="text-sm text-gray-500">Duration: {course.duration}</span>
            </Link>
          </motion.div>
        ))}

        {filtered.length === 0 && (
          <p className="col-span-full text-center text-gray-400">
            No courses found for “{search}”
          </p>
        )}
      </motion.div>
    </main>
  );
}
