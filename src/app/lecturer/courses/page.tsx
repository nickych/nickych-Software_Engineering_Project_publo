'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface User {
  id: number;
  name: string;
  role: string;
}

interface CourseContent {
  title: string;
  description: string;
  course: string;
  semester: string;
  file?: File | null;
}

export default function CreateUpdateCourse() {
  const [user, setUser] = useState<User | null>(null);

  const [courseContent, setCourseContent] = useState<CourseContent>({
    title: "",
    description: "",
    course: "computer-science",
    semester: "year-1-semester-1",
    file: null,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      router.push("/");
    }
  }, [router]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setCourseContent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files?.[0]) {
      setCourseContent((prev) => ({
        ...prev,
        file: e.target.files![0],
      }));
    }
  };

  const handleSubmit = async () => {
    if (
      !courseContent.title ||
      !courseContent.description ||
      !courseContent.file
    ) {
      setMessage("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("title", courseContent.title);
      formData.append("description", courseContent.description);
      formData.append("course", courseContent.course);
      formData.append("semester", courseContent.semester);
      formData.append("lecturerId", String(user?.id));

      if (courseContent.file) {
        formData.append("file", courseContent.file);
      }

      const res = await fetch("/api/lecturer/courses", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Book uploaded successfully!");

        setCourseContent({
          title: "",
          description: "",
          course: "computer-science",
          semester: "year-1-semester-1",
          file: null,
        });
      } else {
        setMessage(data.error || "Failed to upload");
      }
    } catch (error) {
      console.error(error);
      setMessage("Server error");
    }

    setLoading(false);
  };

  if (!user || user.role !== "lecturer") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        Access Denied
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-gray-900 text-white p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <button
        onClick={() => router.back()}
        className="mb-6 bg-gray-700 px-4 py-2 rounded"
      >
        ← Back
      </button>

      <div className="max-w-3xl mx-auto bg-gray-800 rounded-xl p-6">

        <h1 className="text-3xl font-bold mb-6">
          Upload Course Book
        </h1>

        {message && (
          <p className="mb-4 text-green-400">
            {message}
          </p>
        )}

        <input
          type="text"
          name="title"
          placeholder="Book Title"
          value={courseContent.title}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-gray-700"
        />

        <textarea
          name="description"
          placeholder="Book Description"
          value={courseContent.description}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-gray-700 min-h-[150px]"
        />

        {/* Course Selection */}
        <select
          name="course"
          value={courseContent.course}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-gray-700"
        >
          <option value="computer-science">
            Computer Science
          </option>
        </select>

        {/* Semester Selection */}
        <select
          name="semester"
          value={courseContent.semester}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-gray-700"
        >
          <option value="year-1-semester-1">Year 1 Semester 1</option>
          <option value="year-1-semester-2">Year 1 Semester 2</option>
          <option value="year-2-semester-1">Year 2 Semester 1</option>
          <option value="year-2-semester-2">Year 2 Semester 2</option>
          <option value="year-3-semester-1">Year 3 Semester 1</option>
          <option value="year-3-semester-2">Year 3 Semester 2</option>
          <option value="year-4-semester-1">Year 4 Semester 1</option>
          <option value="year-4-semester-2">Year 4 Semester 2</option>
        </select>

        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="w-full p-3 mb-6 rounded bg-gray-700"
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg"
        >
          {loading ? "Uploading..." : "Upload Book"}
        </button>
      </div>
    </motion.div>
  );
}