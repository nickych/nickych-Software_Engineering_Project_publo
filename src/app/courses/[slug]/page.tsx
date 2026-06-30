"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, Variants } from "framer-motion";

/* ==========================
   🎓 All Courses Data
   ========================== */
const courseData = {
  computing: {
    title: "Bachelor of Science in Computing (BSc. Comp)",
    description:
      "Covers programming, networking, operating systems, AI, databases, cybersecurity and more.",
    duration: "4 Years",
    modules: [
      "Year 1 Semester 1",
      "Year 1 Semester 2",
      "Year 2 Semester 1",
      "Year 2 Semester 2",
      "Year 3 Semester 1",
      "Year 3 Semester 2",
      "Year 4 Semester 1",
      "Year 4 Semester 2",
    ],
  },
  economics: {
    title: "Bachelor of Arts in Economics (BA Econ)",
    description:
      "Focuses on economic principles, statistics, development economics and finance.",
    duration: "4 Years",
    modules: [
      "Year 1 Semester 1",
      "Year 1 Semester 2",
      "Year 2 Semester 1",
      "Year 2 Semester 2",
      "Year 3 Semester 1",
      "Year 3 Semester 2",
      "Year 4 Semester 1",
      "Year 4 Semester 2",
    ],
  },
  "bachelor-of-accounting": {
    title: "Bachelor of Accounting (BAcc)",
    description:
      "Accounting principles, financial reporting, taxation, auditing and management accounting.",
    duration: "4 Years",
    modules: [
      "Year 1 Semester 1",
      "Year 1 Semester 2",
      "Year 2 Semester 1",
      "Year 2 Semester 2",
      "Year 3 Semester 1",
      "Year 3 Semester 2",
      "Year 4 Semester 1",
      "Year 4 Semester 2",
    ],
  },
  "bachelor-of-business-administration": {
    title: "Bachelor of Business Administration (BBA)",
    description:
      "Management, marketing, entrepreneurship, human resources, and business law.",
    duration: "4 Years",
    modules: [
      "Year 1 Semester 1",
      "Year 1 Semester 2",
      "Year 2 Semester 1",
      "Year 2 Semester 2",
      "Year 3 Semester 1",
      "Year 3 Semester 2",
      "Year 4 Semester 1",
      "Year 4 Semester 2",
    ],
  },
  "bachelor-of-arts-purchasing-supply": {
    title: "Bachelor of Arts in Purchasing & Supply (BAPS)",
    description:
      "Procurement, supply chain management, logistics, inventory, and contract management.",
    duration: "4 Years",
    modules: [
      "Year 1 Semester 1",
      "Year 1 Semester 2",
      "Year 2 Semester 1",
      "Year 2 Semester 2",
      "Year 3 Semester 1",
      "Year 3 Semester 2",
      "Year 4 Semester 1",
      "Year 4 Semester 2",
    ],
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

/* ==========================
   🎨 Course Details Page
   ========================== */
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
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">❌ Course Not Found</h1>
          <p className="text-gray-400 text-base sm:text-lg">
            This course does not exist.
          </p>
        </motion.div>
      </motion.main>
    );
  }

  // Group modules by year
  const groupedModules: Record<string, string[]> = {};
  course.modules.forEach((mod) => {
    const yearMatch = mod.match(/Year (\d)/);
    if (yearMatch) {
      const year = `Year ${yearMatch[1]}`;
      if (!groupedModules[year]) groupedModules[year] = [];
      groupedModules[year].push(mod);
    }
  });

  return (
    <motion.main
      className="min-h-screen bg-gray-900 text-gray-100 px-4 sm:px-6 lg:px-8 py-8 sm:py-12"
      initial="hidden"
      animate="visible"
      variants={pageVariants}
    >
      {/* Title & Description */}
      <motion.div
        className="max-w-3xl sm:max-w-4xl mx-auto text-center mb-8 sm:mb-10"
        variants={fadeUp}
      >
        <motion.h1 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4" variants={fadeUp}>
          {course.title}
        </motion.h1>
        <motion.p className="text-gray-400 text-sm sm:text-lg" variants={fadeUp}>
          {course.description}
        </motion.p>
        <motion.div
          className="mt-4 sm:mt-6 inline-block bg-gray-800 text-gray-300 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium shadow-sm"
          variants={fadeUp}
        >
          Duration: {course.duration}
        </motion.div>
      </motion.div>

      {/* Modules */}
      <motion.h2
        className="text-xl sm:text-2xl font-semibold text-center mb-6 sm:mb-8 text-gray-200"
        variants={fadeUp}
      >
        Choose a Semester to View Modules
      </motion.h2>

      <motion.div className="max-w-4xl sm:max-w-5xl mx-auto space-y-6 sm:space-y-8">
        {Object.entries(groupedModules).map(([year, semesters]) => (
          <motion.div
            key={year}
            className="bg-gray-800 rounded-2xl shadow-lg p-4 sm:p-6"
            variants={fadeUp}
          >
            <motion.h3 className="text-lg sm:text-xl font-bold text-gray-100 mb-3" variants={fadeUp}>
              {year}
            </motion.h3>
            <motion.div className="flex flex-wrap gap-3 sm:gap-4">
              {semesters.map((semester, idx) => (
                <motion.button
                  key={semester}
                  className="flex-1 sm:flex-auto min-w-[120px] bg-blue-600 hover:bg-blue-700 text-white py-2 sm:py-3 rounded-xl font-medium shadow-md transition text-sm sm:text-base"
                  variants={buttonVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() =>
                    router.push(
                      `/modules/${slug}/${year.toLowerCase().replace(/\s+/g, "-")}-semester-${idx + 1}`
                    )
                  }
                >
                  Semester {idx + 1}
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Back Button */}
      <motion.div className="mt-8 sm:mt-12 text-center" variants={fadeUp}>
        <motion.button
          onClick={() => router.push("/courses")}
          className="inline-block bg-gray-700 hover:bg-gray-600 text-gray-100 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium shadow transition text-sm sm:text-base"
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
