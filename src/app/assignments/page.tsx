"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, Variants } from "framer-motion";

interface SubmittedAssignment {
  id: number;
  title: string;
  course: string;
  year: string;
  studentId: string;
  filename: string;
  submittedAt: string;
}

export default function AssignmentsPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [course, setCourse] = useState("");
  const [year, setYear] = useState("");
  const [studentId, setStudentId] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState<SubmittedAssignment[]>([]);
  const [dashboardRoute, setDashboardRoute] = useState("/student/dashboard");

  // Get dashboard route dynamically
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) return;
      const parsedUser = JSON.parse(storedUser);
      const route =
        parsedUser?.role === "admin"
          ? "/admin/dashboard"
          : parsedUser?.role === "lecturer"
          ? "/lecturer/dashboard"
          : "/student/dashboard";
      setDashboardRoute(route);
    } catch {
      setDashboardRoute("/student/dashboard");
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !course || !year || !studentId || !file) {
      alert("Please fill in all fields and choose a file.");
      return;
    }

    const newAssignment: SubmittedAssignment = {
      id: Date.now(),
      title,
      course,
      year,
      studentId,
      filename: file.name,
      submittedAt: new Date().toLocaleString(),
    };

    setSubmitted((prev) => [...prev, newAssignment]);

    // reset form
    setTitle("");
    setCourse("");
    setYear("");
    setStudentId("");
    setFile(null);

    alert("✅ Assignment submitted successfully!");
  };

  // Framer Motion Variants
  const pageVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
  };

  const entryVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 16 },
    },
  };

  const formVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 110, damping: 18 },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 120, damping: 14 },
    },
  };

  return (
    <motion.main
      className="min-h-screen bg-gray-900 text-gray-100 px-4 sm:px-6 lg:px-8 py-8"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Back button */}
      <motion.div className="mb-6" variants={entryVariants}>
        <motion.button
          onClick={() => router.push(dashboardRoute)}
          className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg shadow transition"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ← Back to Dashboard
        </motion.button>
      </motion.div>

      <motion.h1
        className="text-3xl font-bold mb-6 text-center"
        variants={entryVariants}
      >
        📝 Assignments
      </motion.h1>

      {/* Submit assignment form */}
      <motion.section
        className="max-w-2xl mx-auto bg-gray-800 rounded-2xl shadow-lg p-6 mb-10"
        variants={formVariants}
      >
        <motion.h2 className="text-xl font-semibold mb-4" variants={formVariants}>
          Submit New Assignment
        </motion.h2>

        <motion.form onSubmit={handleSubmit} className="space-y-4">
          {/* Assignment Title */}
          <motion.input
            type="text"
            placeholder="Assignment title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            variants={formVariants}
          />

          {/* Course dropdown */}
          <motion.select
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            variants={formVariants}
          >
            <option value="">Select your course</option>
            <option value="Computing">BSc Computing</option>
            <option value="Economics">BA Economics</option>
            <option value="Accounting">Bachelor of Accounting</option>
            <option value="Business Administration">BBA</option>
            <option value="Purchasing & Supply">BA Purchasing & Supply</option>
          </motion.select>

          {/* Year + Semester dropdown */}
          <motion.select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            variants={formVariants}
          >
            <option value="">Select Year & Semester</option>
            <option value="Y1 S1">Y1 S1</option>
            <option value="Y1 S2">Y1 S2</option>
            <option value="Y2 S1">Y2 S1</option>
            <option value="Y2 S2">Y2 S2</option>
            <option value="Y3 S1">Y3 S1</option>
            <option value="Y3 S2">Y3 S2</option>
            <option value="Y4 S1">Y4 S1</option>
            <option value="Y4 S2">Y4 S2</option>
          </motion.select>

          {/* Student ID */}
          <motion.input
            type="text"
            placeholder="Student ID"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            variants={formVariants}
          />

          {/* File Upload */}
          <motion.div variants={formVariants}>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="w-full text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
            />
          </motion.div>

          {/* Submit button */}
          <motion.div variants={formVariants}>
            <motion.button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold shadow-md text-lg transition"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Submit Assignment
            </motion.button>
          </motion.div>
        </motion.form>
      </motion.section>

      {/* List of submitted assignments */}
      <motion.section className="mb-6" variants={pageVariants}>
        <motion.h2
          className="text-2xl font-semibold mb-4 text-center"
          variants={entryVariants}
        >
          Submitted Assignments
        </motion.h2>

        {submitted.length === 0 ? (
          <motion.p className="text-center text-gray-400" variants={entryVariants}>
            No assignments submitted yet.
          </motion.p>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={pageVariants}
          >
            {submitted.map((a) => (
              <motion.div
                key={a.id}
                className="bg-gray-800 hover:bg-gray-700 rounded-2xl p-6 shadow-lg transition"
                variants={cardVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <h3 className="text-lg font-semibold mb-2">{a.title}</h3>
                <p className="text-sm text-gray-400 mb-1">Course: {a.course}</p>
                <p className="text-sm text-gray-400 mb-1">Year: {a.year}</p>
                <p className="text-sm text-gray-400 mb-1">Student ID: {a.studentId}</p>
                <p className="text-sm text-gray-400 mb-1">File: {a.filename}</p>
                <p className="text-xs text-gray-500">Submitted at: {a.submittedAt}</p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.section>
    </motion.main>
  );
}
