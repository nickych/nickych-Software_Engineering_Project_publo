'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface User {
  id: number;
  name: string;
  role: string;
}

interface Submission {
  id: number;
  studentName: string;
  assignmentTitle: string;
  fileUrl: string;
  grade?: string;
  feedback?: string;
}

export default function ReviewSubmissions() {
  const [user, setUser] = useState<User | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      // Fetch submissions for this lecturer
      fetchSubmissions(parsedUser.id);
    } else {
      router.push("/");
    }
  }, [router]);

  const fetchSubmissions = async (lecturerId: number) => {
    try {
      const res = await fetch(`/api/lecturer/submissions?lecturerId=${lecturerId}`);
      const data = await res.json();
      if (res.ok) {
        setSubmissions(data.submissions || []);
      } else {
        console.error("Failed to fetch submissions:", data.error);
      }
    } catch (err) {
      console.error("Server error", err);
    }
    setLoading(false);
  };

  if (!user || user.role !== "lecturer") {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-100 bg-gray-900">
        <p>Access Denied</p>
      </div>
    );
  }

  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-900 text-gray-100 px-4 sm:px-6 py-10"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Back Button */}
      <motion.button
        onClick={() => router.back()}
        className="mb-6 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white font-medium shadow transition"
        variants={itemVariants}
      >
        ← Back
      </motion.button>

      <motion.h1
        className="text-2xl sm:text-3xl font-bold mb-6"
        variants={itemVariants}
      >
        Review Submissions
      </motion.h1>

      {loading ? (
        <motion.p className="text-center mt-10" variants={itemVariants}>
          Loading submissions...
        </motion.p>
      ) : submissions.length === 0 ? (
        <motion.p className="text-center mt-10" variants={itemVariants}>
          No submissions yet.
        </motion.p>
      ) : (
        <motion.div
          className="grid gap-6 sm:grid-cols-1 md:grid-cols-2"
          variants={containerVariants}
        >
          {submissions.map((submission) => (
            <motion.div
              key={submission.id}
              className="bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col gap-3"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-xl font-semibold">{submission.assignmentTitle}</h3>
              <p className="text-gray-300">Student: {submission.studentName}</p>
              <a
                href={submission.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                Download Submission
              </a>
              <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center mt-3 gap-2">
                <span className="text-gray-200">
                  Grade: {submission.grade || "Not graded"}
                </span>
                <button
                  onClick={() => alert("Implement grade/feedback modal!")}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-medium shadow transition"
                >
                  Grade & Feedback
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}
