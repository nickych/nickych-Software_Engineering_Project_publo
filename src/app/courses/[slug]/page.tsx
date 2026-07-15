"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, Variants } from "framer-motion";

/* ==========================
   🎓 ONLY COMPUTER SCIENCE
   ========================== */
const courseData = {
  computing: {
    title: "Bachelor of Science in Computing (BSc. Comp)",
    description:
      "Covers programming, networking, operating systems, AI, databases, cybersecurity and more.",
    duration: "4 Years",
    modules: ["Year 1 to Year 4"],
  },
} as const;

/* ==========================
   ✨ Framer Motion Variants
   ========================== */
const pageVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, when: "beforeChildren" } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 15 } },
};

const buttonVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 20 } },
  hover: { scale: 1.05, boxShadow: "0 4px 14px rgba(37,99,235,0.4)" },
  tap: { scale: 0.95 },
};

export default function CourseDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const slug = params.slug?.toString().toLowerCase().replace(/\s+/g, "-");
  const course = slug ? courseData[slug as keyof typeof courseData] : null;

  if (!course) {
    return (
      <motion.main
        className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center px-4"
        initial="hidden"
        animate="visible"
        variants={pageVariants}
      >
        <motion.div className="text-center" variants={fadeUp}>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            ❌ Course Not Found
          </h1>
          <p className="text-gray-400 text-base sm:text-lg">
            This course does not exist.
          </p>
        </motion.div>
      </motion.main>
    );
  }

  return (
    <motion.main
      className="min-h-screen bg-gray-900 text-gray-100 px-4 sm:px-6 lg:px-8 py-8 sm:py-12"
      initial="hidden"
      animate="visible"
      variants={pageVariants}
    >
      {/* Title */}
      <motion.div
        className="max-w-3xl mx-auto text-center mb-10"
        variants={fadeUp}
      >
        <motion.h1 className="text-4xl font-bold mb-4" variants={fadeUp}>
          {course.title}
        </motion.h1>

        <motion.p className="text-gray-400" variants={fadeUp}>
          {course.description}
        </motion.p>

        <motion.div
          className="mt-6 inline-block bg-gray-800 text-gray-300 px-5 py-2 rounded-full text-sm"
          variants={fadeUp}
        >
          Duration: {course.duration}
        </motion.div>
      </motion.div>

      {/* SINGLE BOX */}
      <motion.div
        className="max-w-4xl mx-auto bg-gray-800 rounded-2xl shadow-lg p-8 text-center"
        variants={fadeUp}
      >
        <motion.h2
          className="text-2xl font-bold mb-6"
          variants={fadeUp}
        >
          Books (Year 1 to Year 4)
        </motion.h2>

        <motion.button
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-medium shadow-md"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={() =>
            router.push(`/modules/${slug}/year-1-to-year-4`)
          }
        >
          View All Books
        </motion.button>
      </motion.div>

      {/* Back Button */}
      <motion.div className="mt-12 text-center" variants={fadeUp}>
        <motion.button
          onClick={() => router.push("/courses")}
          className="bg-gray-700 hover:bg-gray-600 text-gray-100 px-6 py-3 rounded-lg"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          ← Back to Courses
        </motion.button>
      </motion.div>
    </motion.main>
  );
}