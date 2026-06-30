'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface User {
  id: number;
  name: string;
  role: string;
}

export default function LecturerAnnouncements() {
  const [user, setUser] = useState<User | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    } else {
      router.push("/");
    }
  }, [router]);

  const handlePost = async () => {
    if (!title || !content || !user) return;

    setLoading(true);
    try {
      const res = await fetch("/api/lecturer/announcement", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          content,
          lecturerId: user.id,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Announcement posted successfully!");
        setTitle("");
        setContent("");
      } else {
        setMessage(data.error || "Failed to post announcement");
      }
    } catch (err) {
      setMessage("Server error");
      console.error(err);
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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
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

      {/* Heading */}
      <motion.h1
        className="text-2xl sm:text-3xl font-bold mb-6 text-center sm:text-left"
        variants={itemVariants}
      >
        Post Announcement
      </motion.h1>

      {/* Form Card */}
      <motion.div
        className="max-w-2xl mx-auto bg-gray-800 p-6 rounded-xl shadow-lg w-full"
        variants={itemVariants}
      >
        {message && (
          <p className="mb-4 text-green-400 font-semibold text-center sm:text-left">
            {message}
          </p>
        )}

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-4 p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full mb-4 p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[150px]"
          rows={7}
        />

        <button
          onClick={handlePost}
          disabled={loading}
          className="w-full sm:w-auto px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-xl font-semibold shadow-lg transition"
        >
          {loading ? "Posting..." : "Post Announcement"}
        </button>
      </motion.div>
    </motion.div>
  );
}
