"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface Grade {
  id: number;
  course: string;
  assignment: string;
  grade: string;
}

interface Progress {
  course: string;
  completed: number;
  total: number;
}

interface User {
  name: string;
  email: string;
  role: string;
  course: string;
}

export default function GradesPage() {
  const router = useRouter();
  const [grades, setGrades] = useState<Grade[]>([]);
  const [progress, setProgress] = useState<Progress[]>([]);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return router.push("/login");

    const parsedUser: User = JSON.parse(storedUser);
    setUser(parsedUser);

    // Example data
    const allGrades: Grade[] = [
      { id: 1, course: "BSc Computing", assignment: "Assignment 1", grade: "85%" },
      { id: 2, course: "BSc Computing", assignment: "Assignment 2", grade: "90%" },
      { id: 3, course: "BA Economics", assignment: "Essay 1", grade: "B+" },
    ];

    const allProgress: Progress[] = [
      { course: "BSc Computing", completed: 2, total: 4 },
      { course: "BA Economics", completed: 1, total: 3 },
    ];

    // Filter by student's course
    setGrades(allGrades.filter((g) => g.course === parsedUser.course));
    setProgress(allProgress.filter((p) => p.course === parsedUser.course));
  }, [router]);

  return (
    <main className="min-h-screen bg-gray-900 text-gray-100 px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/student/dashboard")}
          className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg shadow"
        >
          ← Back to Dashboard
        </motion.button>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-center mb-8"
      >
        📊 Grades & Progress
      </motion.h1>

      {/* Grades Table */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-4xl mx-auto mb-12"
      >
        <h2 className="text-2xl font-semibold mb-4">Your Grades</h2>
        <div className="overflow-x-auto">
          <motion.table
            whileHover={{ scale: 1.01 }}
            className="min-w-full bg-gray-800 rounded-xl overflow-hidden"
          >
            <thead>
              <tr className="bg-gray-700 text-left">
                <th className="px-6 py-3 text-sm font-medium">Course</th>
                <th className="px-6 py-3 text-sm font-medium">Assignment</th>
                <th className="px-6 py-3 text-sm font-medium">Grade</th>
              </tr>
            </thead>
            <tbody>
              {grades.map((g) => (
                <motion.tr
                  key={g.id}
                  whileHover={{ scale: 1.02 }}
                  className="border-b border-gray-700 hover:bg-gray-700"
                >
                  <td className="px-6 py-3">{g.course}</td>
                  <td className="px-6 py-3">{g.assignment}</td>
                  <td className="px-6 py-3">{g.grade}</td>
                </motion.tr>
              ))}
            </tbody>
          </motion.table>
          {grades.length === 0 && (
            <p className="text-center text-gray-400 mt-4">No grades posted yet.</p>
          )}
        </div>
      </motion.section>

      {/* Progress Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="max-w-4xl mx-auto"
      >
        <h2 className="text-2xl font-semibold mb-4">Progress</h2>
        <div className="space-y-4">
          {progress.map((p) => {
            const percent = Math.round((p.completed / p.total) * 100);
            return (
              <motion.div
                key={p.course}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
                className="bg-gray-800 rounded-xl p-4 shadow"
              >
                <div className="flex justify-between mb-2">
                  <span className="font-medium">{p.course}</span>
                  <span className="text-sm text-gray-400">
                    {p.completed}/{p.total} assignments completed
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percent}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="bg-blue-500 h-4 rounded-full"
                  />
                </div>
              </motion.div>
            );
          })}
          {progress.length === 0 && (
            <p className="text-center text-gray-400">No progress data available yet.</p>
          )}
        </div>
      </motion.section>
    </main>
  );
}
