"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, Variants } from "framer-motion";
import { supabase } from "@/lib/supabase";

interface User {
  name: string;
  role: "student" | "admin" | string;
  email?: string;
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loggingOut, setLoggingOut] = useState(false);
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const router = useRouter();

  // Load user + profile image from DB
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return router.push("/");

    const parsedUser: User = JSON.parse(storedUser);
    setUser(parsedUser);

    const loadProfileImage = async () => {
      const res = await fetch(`/api/user?email=${parsedUser.email}`);
      const data = await res.json();

      if (data?.profileImageUrl) {
        setProfilePic(data.profileImageUrl);
      }
    };

    loadProfileImage();
  }, [router]);

  // Logout
  const handleLogout = () => {
    setLoggingOut(true);
    setTimeout(() => {
      localStorage.removeItem("user");
      router.push("/");
    }, 1500);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0] || !user?.email) return;

    const file = e.target.files[0];

    const filePath = `${user.email}/profile-${Date.now()}.jpg`;

    console.log("Uploading to Supabase:", filePath);

    const { data, error } = await supabase.storage
      .from("profile-pictures")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (error) {
      console.error("UPLOAD ERROR:", error.message);
      alert("Upload failed: " + error.message);
      return;
    }

    console.log("UPLOAD SUCCESS:", data);

    const { data: publicData } = supabase.storage
      .from("profile-pictures")
      .getPublicUrl(filePath);

    // ✅ ONLY ADDITION (SAVE TO DATABASE)
    await fetch("/api/user", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
        profileImageUrl: publicData.publicUrl,
      }),
    });

    setProfilePic(publicData.publicUrl);
  };

  if (loggingOut) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-red-500 border-solid mb-4"></div>
        <p className="text-lg font-medium">Logging out...</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-100">
        <p className="animate-pulse">Loading...</p>
      </main>
    );
  }

  if (user.role !== "student") {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-100 p-6">
        <div className="bg-gray-800 p-8 rounded-xl shadow-xl text-center max-w-md w-full">
          <p className="text-xl font-semibold mb-4">❌ Access Denied</p>
          <p className="text-gray-300">
            You do not have access to the student dashboard.
          </p>
        </div>
      </main>
    );
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.8 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 120, damping: 12 },
    },
  };

  return (
    <main className="min-h-screen bg-gray-900 text-gray-100 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="flex flex-col sm:flex-row justify-between items-center py-6 border-b border-gray-800">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Student Dashboard
        </h1>

        <button
          className="bg-red-500 hover:bg-red-600 px-5 py-2.5 rounded-xl font-medium shadow transition"
          onClick={handleLogout}
        >
          Logout
        </button>
      </header>

      {/* Welcome */}
      <section className="mt-8 text-center">
        <h2 className="text-xl sm:text-2xl font-semibold">
          Welcome To Cuz E-Learning:{" "}
          <span className="text-red-400">{user.name}</span>
        </h2>
        <p className="text-gray-400 mt-2">Here’s what you can do today</p>
      </section>

      {/* Dashboard */}
      <motion.section
        className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6 items-start"
        initial="hidden"
        animate="show"
        variants={containerVariants}
      >
        {/* Left */}
        <motion.div className="space-y-6" variants={itemVariants}>
          <DashboardCard
            href="/courses"
            title="Courses"
            desc="Browse available courses and download materials"
            icon="📚"
          />
          <DashboardCard
            href="/notifications"
            title="Notifications"
            desc="Receive confirmation for assignment submissions"
            icon="🔔"
          />
        </motion.div>

        {/* Profile */}
        <motion.div
          className="hidden lg:flex bg-gray-800 p-6 rounded-2xl shadow-lg text-center border-2 border-dashed border-gray-600 justify-center"
          variants={itemVariants}
        >
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Upload Profile Picture
            </h3>

            <label className="cursor-pointer flex flex-col items-center">
              {profilePic ? (
                <img
                  src={profilePic}
                  className="w-32 h-32 rounded-full border-4 border-gray-500 object-cover mb-3"
                />
              ) : (
                <div className="w-32 h-32 flex items-center justify-center rounded-full border-4 border-dashed border-gray-500 text-gray-400 mb-3">
                  📷
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />

              <span className="mt-2 text-sm text-red-400">
                Click to Upload
              </span>
            </label>
          </div>
        </motion.div>

        {/* Right */}
        <motion.div className="space-y-6" variants={itemVariants}>
          <DashboardCard
            href="/assignments"
            title="Assignments"
            desc="Submit assignments"
            icon="📝"
          />
          <DashboardCard
            href="/grades"
            title="Grades & Progress"
            desc="Check your grades and overall progress"
            icon="📈"
          />
        </motion.div>
      </motion.section>
    </main>
  );
}

function DashboardCard({
  href,
  title,
  desc,
  icon,
}: {
  href: string;
  title: string;
  desc: string;
  icon: string;
}) {
  return (
    <Link
      href={href}
      className="group bg-gray-800 hover:bg-gray-700 rounded-2xl p-6 shadow-lg transition transform hover:-translate-y-1 hover:shadow-2xl block"
    >
      <div className="flex justify-between mb-4">
        <span className="text-3xl">{icon}</span>
        <span className="text-sm text-gray-400">Go →</span>
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400">{desc}</p>
    </Link>
  );
}