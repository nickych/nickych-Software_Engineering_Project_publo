'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface User {
  id: number;
  name: string;
  role: string;
}

export default function CreateAssignment() {
  const [user, setUser] = useState<User | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [file, setFile] = useState<File | null>(null);
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!title || !description || !dueDate || !user) return;

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("dueDate", dueDate);
      if (file) formData.append("file", file);
      formData.append("lecturerId", user.id.toString());

      const res = await fetch("/api/lecturer/assignments", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Assignment created successfully!");
        setTitle("");
        setDescription("");
        setDueDate("");
        setFile(null);
      } else {
        setMessage(data.error || "Failed to create assignment");
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error");
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
        Create Assignment
      </motion.h1>

      {/* Form Card */}
      <motion.div
        className="max-w-3xl mx-auto bg-gray-800 p-6 rounded-xl shadow-lg w-full"
        variants={itemVariants}
      >
        {message && (
          <motion.p
            className="mb-4 text-green-400 font-semibold text-center sm:text-left"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {message}
          </motion.p>
        )}

        <motion.input
          type="text"
          placeholder="Assignment Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-4 p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          variants={itemVariants}
        />

        <motion.textarea
          placeholder="Assignment Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full mb-4 p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[150px]"
          rows={6}
          variants={itemVariants}
        />

        <motion.input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full mb-4 p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          variants={itemVariants}
        />

        <motion.input
          type="file"
          onChange={handleFileChange}
          className="w-full mb-4 p-2 rounded-lg bg-gray-700 text-white border border-gray-600 cursor-pointer"
          variants={itemVariants}
        />

        <motion.button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full sm:w-auto px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-xl font-semibold shadow-lg transition"
          variants={itemVariants}
        >
          {loading ? "Saving..." : "Create Assignment"}
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
