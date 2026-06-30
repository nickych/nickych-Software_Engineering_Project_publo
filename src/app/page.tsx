"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ReactTyped } from "react-typed";
import { useRouter } from "next/navigation";

interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "lecturer" | "student";
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const router = useRouter();

  // ✅ Auto-redirect if "keepLoggedIn"
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedKeepLoggedIn = localStorage.getItem("keepLoggedIn") === "true";

    if (storedKeepLoggedIn && storedUser) {
      try {
        const user: User = JSON.parse(storedUser);
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
      } catch {
        localStorage.removeItem("user");
        localStorage.removeItem("keepLoggedIn");
      }
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        alert(`❌ ${data.error || "Login failed"}`);
        return;
      }

      const data = await res.json();
      const user: User = data.user;

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("keepLoggedIn", keepLoggedIn.toString());

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
    } catch (err) {
      console.error("⚠️ Login error:", err);
      alert("⚠️ Something went wrong");
    }
  };

  const showSignup =
    !email.endsWith("@cavendish.co.zm") && email !== "name@gmail.com";

  return (
    <main className="flex flex-col min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6 space-y-10">
      <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 drop-shadow-lg text-center">
        <ReactTyped
          strings={["Welcome To", "Cuz E-Learning"]}
          typeSpeed={70}
          backSpeed={50}
          loop
          showCursor
        />
      </h1>

      <div className="flex w-full max-w-6xl h-[650px] bg-gray-900/80 rounded-3xl shadow-2xl overflow-hidden">
        <div className="hidden md:block w-1/2">
          <img
            src="/pics/cuz.jpg"
            alt="Login background"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 p-14 flex flex-col justify-center text-gray-100">
          <div className="flex space-x-10 mb-12 text-xl font-semibold">
            <button className="text-white border-b-2 border-blue-500 pb-2">
              Sign In
            </button>
            {showSignup && (
              <Link href="/signup" className="text-gray-400 hover:text-white">
                Sign Up
              </Link>
            )}
          </div>

          <form onSubmit={handleLogin} className="space-y-8">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                required
                className="w-full bg-transparent border-b border-gray-600 focus:border-blue-400 outline-none py-3 text-base"
              />
            </div>

            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                required
                className="w-full bg-transparent border-b border-gray-600 focus:border-blue-400 outline-none py-3 text-base"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="accent-blue-500"
                  checked={keepLoggedIn}
                  onChange={(e) => setKeepLoggedIn(e.target.checked)}
                />
                <span>Keep me logged in</span>
              </label>
              <Link href="#" className="text-blue-400 hover:underline">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-full font-semibold shadow-md text-lg transition"
            >
              SIGN IN
            </button>

            <button
              type="button"
              className="w-full bg-gradient-to-r from-blue-400 to-cyan-400 hover:from-blue-500 hover:to-cyan-500 text-white py-3 rounded-full font-semibold shadow-md text-lg transition"
            >
              SIGN IN WITH GOOGLE
            </button>
          </form>

          {/* ✅ Correct links to your actual pages */}
          <div className="flex justify-center space-x-8 text-sm text-gray-500 mt-12">
            <Link href="/privacy" className="hover:text-white">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms
            </Link>
            <Link href="/about" className="hover:text-white">
              About
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
