// app/signup/page.tsx
"use client";
import React, { useState } from "react";
import Link from "next/link";
import { User, Mail, Lock, UserPlus } from "lucide-react";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // <-- ADD THIS FUNCTION
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      alert("❌ Passwords do not match!");
      return;
    }

    // Check if email is a Cavendish student email
    const studentEmailPattern = /^[a-zA-Z0-9._%+-]+@students\.cavendish\.co\.zm$/;
    if (!studentEmailPattern.test(formData.email)) {
      alert("❌ Only Cavendish student emails are allowed!");
      return;
    }

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          name: formData.name,
          role: "student", // Add the role here
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(`✅ Account created for ${formData.name}`);
        // redirect to login page
        window.location.href = "/";
      } else {
        alert(`❌ ${data.error}`);
      }
    } catch (error) {
      console.error(error);
      alert("❌ Something went wrong. Please try again.");
    }
  };

  return (
    <main className="flex flex-col min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="w-full max-w-2xl bg-gray-900/80 rounded-3xl shadow-2xl p-10 text-gray-100">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 drop-shadow-lg">
            Create Your Account
          </h1>
          <p className="text-gray-400 mt-2">
            Join the Cuz E-Learning platform today 
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div className="relative">
            <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              value={formData.name}
              onChange={handleChange} // now works
              className="w-full pl-10 pr-3 py-3 bg-transparent border-b border-gray-600 focus:border-blue-400 outline-none text-base"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-3 bg-transparent border-b border-gray-600 focus:border-blue-400 outline-none text-base"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-3 bg-transparent border-b border-gray-600 focus:border-blue-400 outline-none text-base"
            />
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-3 bg-transparent border-b border-gray-600 focus:border-blue-400 outline-none text-base"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white py-3 rounded-full font-semibold shadow-md text-lg transition"
          >
            <UserPlus className="inline-block mr-2 h-5 w-5" />
            Create Account
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">
            Already have an account?{" "}
            <Link href="/" className="text-blue-400 hover:underline font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
