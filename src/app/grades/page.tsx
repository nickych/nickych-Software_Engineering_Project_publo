"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface Result {
  id: number;
  title: string;
  description?: string;
  fileName: string;
  fileUrl: string;
  createdAt: string;
}


interface User {
  name: string;
  email: string;
  role: string;
}


export default function StudentResultsPage() {

  const router = useRouter();

  const [results, setResults] = useState<Result[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);



  useEffect(() => {

    const storedUser =
      localStorage.getItem("user");


    if (!storedUser) {

      router.push("/login");

      return;

    }


    const parsedUser =
      JSON.parse(storedUser);


    setUser(parsedUser);


    fetchResults();


  }, [router]);






  const fetchResults = async () => {

    try {

      const res =
        await fetch("/api/student/results");


      const data =
        await res.json();



      if(res.ok){

        setResults(
          data.results || []
        );

      }


    } catch(error){

      console.error(error);

    }

    finally{

      setLoading(false);

    }

  };






  return (

    <main
      className="
        min-h-screen
        bg-gradient-to-br
        from-gray-950
        via-gray-900
        to-gray-950
        text-gray-100
        px-3
        sm:px-6
        lg:px-10
        py-6
        sm:py-8
      "
    >


      <div
        className="
          max-w-6xl
          mx-auto
        "
      >



        <button

          onClick={() =>
            router.push("/student/dashboard")
          }

          className="
            mb-6
            flex
            items-center
            gap-2
            bg-gray-800
            hover:bg-gray-700
            px-4
            py-2
            rounded-xl
            text-sm
            transition
            shadow-lg
          "

        >

          ← Back to Dashboard

        </button>







        <motion.div

          initial={{
            opacity:0,
            y:-20
          }}

          animate={{
            opacity:1,
            y:0
          }}

          className="
            mb-8
            bg-gradient-to-r
            from-blue-600
            to-cyan-500
            rounded-3xl
            p-5
            sm:p-8
            shadow-xl
          "

        >


          <h1
            className="
              text-2xl
              sm:text-3xl
              lg:text-4xl
              font-bold
            "
          >

            📄 Results Centre

          </h1>



          <p
            className="
              mt-3
              text-blue-100
              text-sm
              sm:text-base
              max-w-xl
            "
          >

            View and download your officially
            published academic results from your lecturers.

          </p>



        </motion.div>







        {loading ? (

          <div
            className="
              bg-gray-900
              border
              border-gray-800
              rounded-2xl
              p-8
              text-center
            "
          >

            <p className="text-gray-400">

              Loading results...

            </p>

          </div>



        ) : results.length === 0 ? (


          <div
            className="
              bg-gray-900
              border
              border-gray-800
              rounded-2xl
              p-8
              sm:p-10
              text-center
              shadow-xl
            "
          >

            <div className="text-5xl mb-4">
              📭
            </div>


            <h2
              className="
                text-lg
                sm:text-xl
                font-semibold
                mb-2
              "
            >

              No Results Available

            </h2>


            <p
              className="
                text-gray-400
                text-sm
              "
            >

              Your lecturer has not published
              any results yet.

            </p>


          </div>        ) : (



          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-1
              lg:grid-cols-2
              gap-4
              sm:gap-6
            "
          >



            {results.map((result)=>(


              <motion.div

                key={result.id}


                initial={{
                  opacity:0,
                  y:25
                }}


                animate={{
                  opacity:1,
                  y:0
                }}


                whileHover={{
                  y:-5
                }}


                className="
                  bg-gray-900
                  border
                  border-gray-800
                  rounded-3xl
                  p-4
                  sm:p-6
                  shadow-xl
                  transition
                  overflow-hidden
                "

              >





                <div
                  className="
                    flex
                    items-start
                    justify-between
                    mb-5
                  "
                >


                  <div
                    className="
                      w-full
                    "
                  >

                    <h2
                      className="
                        text-lg
                        sm:text-xl
                        font-bold
                        text-white
                        break-words
                      "
                    >

                      📄 {result.title}

                    </h2>


                    <p
                      className="
                        text-xs
                        sm:text-sm
                        text-gray-500
                        mt-2
                      "
                    >

                      Published:
                      {" "}
                      {new Date(
                        result.createdAt
                      ).toLocaleDateString()}

                    </p>


                  </div>


                </div>







                <div
                  className="
                    bg-gray-800
                    rounded-xl
                    p-4
                    mb-5
                  "
                >


                  <p
                    className="
                      text-gray-300
                      text-sm
                      leading-relaxed
                      mb-4
                    "
                  >

                    {result.description ||
                    "No description provided."}

                  </p>



                  <div
                    className="
                      flex
                      items-start
                      gap-2
                      text-sm
                      text-blue-400
                    "
                  >

                    <span>
                      📎
                    </span>


                    <span
                      className="
                        break-all
                      "
                    >

                      {result.fileName}

                    </span>


                  </div>



                </div>








                <div
                  className="
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    gap-3
                  "
                >


                  <a

                    href={result.fileUrl}

                    target="_blank"

                    rel="noopener noreferrer"

                    className="
                      text-center
                      bg-blue-600
                      hover:bg-blue-700
                      py-3
                      rounded-xl
                      font-medium
                      text-sm
                      sm:text-base
                      transition
                    "

                  >

                    👁 View File

                  </a>





                  <a

                    href={result.fileUrl}

                    download

                    className="
                      text-center
                      bg-green-600
                      hover:bg-green-700
                      py-3
                      rounded-xl
                      font-medium
                      text-sm
                      sm:text-base
                      transition
                    "

                  >

                    ⬇ Download

                  </a>



                </div>





              </motion.div>


            ))}


          </div>


        )}



      </div>



    </main>

  );

}