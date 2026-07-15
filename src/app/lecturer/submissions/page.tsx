'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface User {
  id: number;
  name: string;
  role: string;
}

interface Submission {
  id: number;
  title: string;
  studentId: string;
  fileUrl: string;
  fileName: string;
  grade?: string;
  feedback?: string;
  submittedAt: string;
}

export default function ReviewSubmissions() {
  const [user, setUser] = useState<User | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();


  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      fetchSubmissions();
    } else {
      router.push("/");
    }
  }, [router]);


  const fetchSubmissions = async () => {
    try {
      const res = await fetch("/api/lecturer/submissions");

      const data = await res.json();

      if (res.ok) {
        setSubmissions(data.submissions || []);
      } else {
        console.error(data.error);
      }

    } catch (error) {
      console.error("Fetch error:", error);
    }

    setLoading(false);
  };


  if (!user || user.role !== "lecturer") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-gray-100 px-4">
        <div className="bg-gray-800 px-6 sm:px-8 py-6 rounded-2xl shadow-xl text-center w-full max-w-sm">
          <h2 className="text-xl font-semibold mb-2">
            Access Denied
          </h2>

          <p className="text-gray-400">
            Only lecturers can view submissions.
          </p>
        </div>
      </div>
    );
  }


  return (
    <motion.div
      className="
        min-h-screen
        bg-gray-950
        text-gray-100
        px-3
        sm:px-6
        lg:px-8
        py-6
        sm:py-10
        overflow-x-hidden
      "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >

      <div className="max-w-6xl mx-auto w-full">


        <button
          onClick={() => router.back()}
          className="
            mb-6
            flex
            items-center
            gap-2
            px-4
            py-2.5
            bg-gray-800
            hover:bg-gray-700
            rounded-xl
            text-sm
            font-medium
            transition
            shadow
          "
        >
          ← Back
        </button>


        <div className="mb-8">

          <h1 className="
            text-2xl
            sm:text-3xl
            lg:text-4xl
            font-bold
          ">
            Assignment Submissions
          </h1>


          <p className="
            text-gray-400
            mt-2
            text-sm
            sm:text-base
          ">
            Review student assignments, download files, and provide feedback.
          </p>

        </div>



        {loading ? (

          <div className="flex justify-center py-16">

            <div className="
              bg-gray-800
              px-6
              py-5
              rounded-2xl
              shadow-xl
              text-gray-300
            ">
              Loading submissions...
            </div>

          </div>


        ) : submissions.length === 0 ? (

          <div className="
            bg-gray-800
            rounded-2xl
            p-6
            sm:p-10
            text-center
            shadow-lg
          ">

            <h2 className="text-xl font-semibold">
              No submissions yet
            </h2>

            <p className="text-gray-400 mt-2">
              Student assignments will appear here once submitted.
            </p>

          </div>


        ) : (

          <div className="
            grid
            grid-cols-1
            sm:grid-cols-1
            md:grid-cols-2
            xl:grid-cols-3
            gap-4
            sm:gap-6
          ">

            {submissions.map((submission)=>(

              <motion.div
                key={submission.id}
                className="
                  bg-gray-900
                  border
                  border-gray-800
                  rounded-2xl
                  p-4
                  sm:p-6
                  shadow-xl
                  hover:border-blue-500
                  transition
                  w-full
                  overflow-hidden
                "
                initial={{opacity:0,y:20}}
                animate={{opacity:1,y:0}}
                whileHover={{scale:1.02}}
              >


                <div className="mb-5">

                  <h2 className="
                    text-lg
                    sm:text-xl
                    font-bold
                    text-white
                    mb-3
                    break-words
                  ">
                    {submission.title}
                  </h2>


                  <div className="space-y-3 text-sm">

                    <p className="text-gray-300 break-words">
                      <span className="font-semibold text-white">
                        Student ID:
                      </span>{" "}
                      {submission.studentId}
                    </p>


                    <p className="text-gray-300 break-all">

                      <span className="font-semibold text-white">
                        File:
                      </span>{" "}

                      {submission.fileName}

                    </p>


                    <p className="text-gray-400 text-xs sm:text-sm">
                      Submitted:
                      {" "}
                      {new Date(
                        submission.submittedAt
                      ).toLocaleString()}
                    </p>

                  </div>

                </div>



                <a
                  href={submission.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    block
                    text-center
                    bg-blue-600
                    hover:bg-blue-700
                    text-white
                    py-3
                    rounded-xl
                    font-medium
                    transition
                  "
                >
                  Download Assignment
                </a>




                <div className="
                  mt-6
                  bg-gray-800
                  rounded-xl
                  p-4
                ">


                  <h3 className="font-semibold mb-3">
                    Evaluation
                  </h3>


                  <p className="text-sm text-gray-300 mb-2 break-words">

                    <span className="font-semibold">
                      Grade:
                    </span>{" "}

                    {submission.grade || "Not graded"}

                  </p>


                  <p className="text-sm text-gray-300 break-words">

                    <span className="font-semibold">
                      Feedback:
                    </span>{" "}

                    {submission.feedback || "No feedback"}

                  </p>



                  <button
                    onClick={() => alert("Grade modal coming next")}
                    className="
                      mt-4
                      w-full
                      bg-green-600
                      hover:bg-green-700
                      py-2.5
                      rounded-xl
                      font-medium
                      transition
                    "
                  >
                    Grade & Feedback
                  </button>


                </div>


              </motion.div>

            ))}

          </div>

        )}

      </div>

    </motion.div>
  );
}