"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, Variants } from "framer-motion";

interface SubmittedAssignment {
  id: number;
  title: string;
  studentId: string;
  filename: string;
  submittedAt: string;
}

export default function AssignmentsPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [studentId, setStudentId] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState<SubmittedAssignment[]>([]);
  const [dashboardRoute, setDashboardRoute] = useState("/student/dashboard");


  const fetchSubmittedAssignments = async () => {
    try {
      const res = await fetch("/api/student/assignment");

      const data = await res.json();

      if (res.ok) {
        const assignments = data.submissions.map((item: any) => ({
          id: item.id,
          title: item.title,
          studentId: item.studentId,
          filename: item.fileName,
          submittedAt: new Date(
            item.submittedAt
          ).toLocaleString(),
        }));

        setSubmitted(assignments);
      }

    } catch (error) {
      console.error(
        "Failed to fetch assignments:",
        error
      );
    }
  };


  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");

      if (!storedUser) return;

      const parsedUser = JSON.parse(storedUser);

      const route =
        parsedUser?.role === "admin"
          ? "/admin/dashboard"
          : parsedUser?.role === "lecturer"
          ? "/lecturer/dashboard"
          : "/student/dashboard";

      setDashboardRoute(route);

      fetchSubmittedAssignments();

    } catch {
      setDashboardRoute("/student/dashboard");
    }
  }, []);



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !studentId || !file) {
      alert("Please fill in all fields and choose a file.");
      return;
    }


    try {

      const formData = new FormData();

      formData.append("title", title);
      formData.append("studentId", studentId);
      formData.append("file", file);



      const res = await fetch(
        "/api/student/assignment",
        {
          method: "POST",
          body: formData,
        }
      );


      const data = await res.json();


      if (!res.ok) {
        alert(
          data.error ||
          "Failed to submit assignment"
        );
        return;
      }



      const newAssignment: SubmittedAssignment = {
        id: data.submission.id,
        title: data.submission.title,
        studentId: data.submission.studentId,
        filename: data.submission.fileName,
        submittedAt: new Date(
          data.submission.submittedAt
        ).toLocaleString(),
      };



      setSubmitted((prev) => [
        ...prev,
        newAssignment
      ]);



      setTitle("");
      setStudentId("");
      setFile(null);



      alert(
        "✅ Assignment submitted successfully!"
      );


    } catch(error){

      console.error(error);

      alert(
        "❌ Server error"
      );
    }
  };



  const pageVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12
      }
    },
  };


  const entryVariants: Variants = {
    hidden: {
      opacity:0,
      y:15
    },
    visible:{
      opacity:1,
      y:0,
      transition:{
        type:"spring",
        stiffness:100,
        damping:16
      }
    },
  };


  const formVariants: Variants = {
    hidden:{
      opacity:0,
      y:20
    },
    visible:{
      opacity:1,
      y:0,
      transition:{
        type:"spring",
        stiffness:110,
        damping:18
      }
    },
  };


  const cardVariants: Variants = {
    hidden:{
      opacity:0,
      scale:0.9
    },
    visible:{
      opacity:1,
      scale:1,
      transition:{
        type:"spring",
        stiffness:120,
        damping:14
      }
    },
  };
    return (
    <motion.main
      className="min-h-screen bg-gray-900 text-gray-100 px-4 sm:px-6 lg:px-8 py-8"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >

      <motion.div
        className="mb-6"
        variants={entryVariants}
      >
        <motion.button
          onClick={() => router.push(dashboardRoute)}
          className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg shadow transition"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ← Back to Dashboard
        </motion.button>
      </motion.div>



      <motion.h1
        className="text-3xl font-bold mb-6 text-center"
        variants={entryVariants}
      >
        📝 Assignments
      </motion.h1>



      <motion.section
        className="max-w-2xl mx-auto bg-gray-800 rounded-2xl shadow-lg p-6 mb-10"
        variants={formVariants}
      >

        <motion.h2
          className="text-xl font-semibold mb-4"
          variants={formVariants}
        >
          Submit New Assignment
        </motion.h2>



        <motion.form
          onSubmit={handleSubmit}
          className="space-y-4"
        >


          <motion.input
            type="text"
            placeholder="Assignment title"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            variants={formVariants}
          />



          <motion.input
            type="text"
            placeholder="Student ID"
            value={studentId}
            onChange={(e)=>setStudentId(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            variants={formVariants}
          />



          <motion.div variants={formVariants}>
            <input
              type="file"
              onChange={(e)=>
                setFile(
                  e.target.files?.[0] || null
                )
              }
              className="w-full text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
            />
          </motion.div>



          <motion.div variants={formVariants}>
            <motion.button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold shadow-md text-lg transition"
              whileHover={{scale:1.03}}
              whileTap={{scale:0.97}}
            >
              Submit Assignment
            </motion.button>
          </motion.div>


        </motion.form>

      </motion.section>





      <motion.section
        className="mb-6"
        variants={pageVariants}
      >

        <motion.h2
          className="text-2xl font-semibold mb-4 text-center"
          variants={entryVariants}
        >
          Submitted Assignments
        </motion.h2>




        {submitted.length === 0 ? (

          <motion.p
            className="text-center text-gray-400"
            variants={entryVariants}
          >
            No assignments submitted yet.
          </motion.p>


        ) : (


          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={pageVariants}
          >


            {submitted.map((a)=>(


              <motion.div
                key={a.id}
                className="bg-gray-800 hover:bg-gray-700 rounded-2xl p-6 shadow-lg transition"
                variants={cardVariants}
                whileHover={{scale:1.02}}
                whileTap={{scale:0.98}}
              >


                <h3 className="text-lg font-semibold mb-2">
                  {a.title}
                </h3>



                <p className="text-sm text-gray-400 mb-1">
                  Student ID: {a.studentId}
                </p>



                <p className="text-sm text-gray-400 mb-1">
                  File: {a.filename}
                </p>



                <p className="text-xs text-gray-500">
                  Submitted at: {a.submittedAt}
                </p>



              </motion.div>


            ))}


          </motion.div>


        )}


      </motion.section>



    </motion.main>
  );
}