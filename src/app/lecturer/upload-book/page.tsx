"use client";

import React, { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function UploadBookPage() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [course, setCourse] = useState("computer-science");
  const [semester, setSemester] = useState("year-1-semester-1");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!title || !description || !file) {
      alert("Please fill in all fields and select a PDF.");
      return;
    }

    setLoading(true);

    try {
      // Upload file to Supabase Storage
      const fileName = `${Date.now()}-${file.name}`;

      const { error: uploadError } = await supabase.storage
        .from("books")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Public URL
      const fileUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/books/${fileName}`;

      // Extract year and semester
      const year = Number(semester.split("-")[1]);
      const sem = Number(semester.split("-")[3]);

      // Save metadata to database
      const res = await fetch("/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          author,
          description,
          course,
          year,
          semester: sem,
          fileUrl,
          lecturerId: 1, // Replace later with logged-in lecturer ID
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to save book");
      }

      setMessage("Book uploaded successfully!");

      // Reset form
      setTitle("");
      setAuthor("");
      setDescription("");
      setCourse("computer-science");
      setSemester("year-1-semester-1");
      setFile(null);
    } catch (error) {
      console.error(error);
      setMessage("Failed to upload book.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-xl mx-auto bg-gray-800 p-6 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6">
          Upload Book
        </h1>

        {message && (
          <p className="mb-4 text-center text-green-400">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            placeholder="Book Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 rounded bg-gray-700"
            required
          />

          <input
            type="text"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full p-3 rounded bg-gray-700"
            required
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 rounded bg-gray-700"
            rows={5}
          />

          <select
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            className="w-full p-3 rounded bg-gray-700"
          >
            <option value="computer-science">
              Computer Science
            </option>
          </select>

          <select
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            className="w-full p-3 rounded bg-gray-700"
          >
            <option value="year-1-semester-1">
              Year 1 Semester 1
            </option>

            <option value="year-1-semester-2">
              Year 1 Semester 2
            </option>

            <option value="year-2-semester-1">
              Year 2 Semester 1
            </option>

            <option value="year-2-semester-2">
              Year 2 Semester 2
            </option>

            <option value="year-3-semester-1">
              Year 3 Semester 1
            </option>

            <option value="year-3-semester-2">
              Year 3 Semester 2
            </option>

            <option value="year-4-semester-1">
              Year 4 Semester 1
            </option>

            <option value="year-4-semester-2">
              Year 4 Semester 2
            </option>
          </select>

          <input
            type="file"
            accept=".pdf"
            onChange={(
              e: React.ChangeEvent<HTMLInputElement>
            ) => {
              if (
                e.target.files &&
                e.target.files.length > 0
              ) {
                setFile(e.target.files[0]);
              }
            }}
            className="w-full"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded"
          >
            {loading ? "Uploading..." : "Upload Book"}
          </button>
        </form>
      </div>
    </main>
  );
}