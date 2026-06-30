"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, Variants } from "framer-motion";

interface Notification {
  id: number;
  title: string;
  message: string;
  date: string;
  course?: string;
  lecturer?: string;
}

interface User {
  name: string;
  email: string;
  role: string;
  course: string;
}

// Framer Motion Variants
const pageVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 12, staggerChildren: 0.15 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } },
};

const buttonVariants: Variants = {
  hover: { scale: 1.05, backgroundColor: "#4B5563", transition: { type: "spring", stiffness: 300 } },
  tap: { scale: 0.95 },
};

export default function NotificationsPage() {
  const router = useRouter();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return router.push("/login");

    const parsedUser: User = JSON.parse(storedUser);
    setUser(parsedUser);

    // Fetch notifications from API
    fetch(`/api/notifications?course=${parsedUser.course}`)
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.notifications.filter(
          (n: Notification) => !n.course || n.course === parsedUser.course
        );
        setNotifications(filtered);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [router]);

  const goBack = () => {
    if (!user) return router.push("/login");

    switch (user.role) {
      case "admin":
        router.push("/admin/dashboard");
        break;
      case "lecturer":
        router.push("/lecturer/dashboard");
        break;
      default:
        router.push("/student/dashboard");
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-100">
        <p className="animate-pulse">Loading notifications...</p>
      </main>
    );
  }

  return (
    <motion.main
      className="min-h-screen bg-gray-900 text-gray-100 px-4 sm:px-6 lg:px-8 py-8"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Back Button */}
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 15 }}
      >
        <motion.button
          onClick={goBack}
          className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg shadow transition"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          ← Back to Dashboard
        </motion.button>
      </motion.div>

      <motion.h1
        className="text-3xl font-bold text-center mb-8"
        variants={pageVariants}
      >
        🔔 Notifications
      </motion.h1>

      {notifications.length === 0 ? (
        <motion.p
          className="text-center text-gray-400"
          variants={pageVariants}
        >
          No notifications yet.
        </motion.p>
      ) : (
        <motion.div
          className="max-w-4xl mx-auto space-y-4"
          variants={pageVariants}
        >
          {notifications.map((n) => (
            <motion.div
              key={n.id}
              className="bg-gray-800 rounded-2xl p-6 shadow hover:bg-gray-700 transition"
              variants={cardVariants}
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold">{n.title}</h2>
                <span className="text-sm text-gray-400">
                  {new Date(n.date).toLocaleString()}
                </span>
              </div>
              {n.course && (
                <p className="text-sm text-blue-400 font-medium mb-1">
                  Course: {n.course}
                </p>
              )}
              {n.lecturer && (
                <p className="text-sm text-gray-400 mb-2">
                  Lecturer: {n.lecturer}
                </p>
              )}
              <p className="text-gray-300">{n.message}</p>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.main>
  );
}
