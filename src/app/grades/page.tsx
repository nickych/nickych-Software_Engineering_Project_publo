"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";


interface Result {

  id:number;
  module:string;
  year:string;
  semester:string;

  cat1:number | null;
  cat2:number | null;
  finalExam:number | null;

  total:number | null;
  grade:string | null;
  status:string | null;

  createdAt:string;

}



interface Student {

  name:string;
  email:string;

}



export default function StudentResultsPage(){


  const router = useRouter();


  const [results,setResults] =
    useState<Result[]>([]);


  const [student,setStudent] =
    useState<Student | null>(null);


  const [loading,setLoading] =
    useState(true);








  useEffect(()=>{


    const storedUser =
      localStorage.getItem("user");



    if(!storedUser){

      router.push("/login");

      return;

    }



    const user =
      JSON.parse(storedUser);



    fetchResults(user.email);



  },[router]);









  const fetchResults = async(email:string)=>{


    try{


      const response =
        await fetch(
          `/api/student/results?email=${email}`
        );



      const data =
        await response.json();




      if(response.ok){


        setStudent(
          data.student
        );


        setResults(
          data.results || []
        );


      }


    }
    catch(error){


      console.log(
        "FETCH RESULTS ERROR:",
        error
      );


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
      text-white
      px-4
      py-8
      "
    >


      <div
        className="
        max-w-6xl
        mx-auto
        "
      >




        <button

          onClick={()=>
            router.push("/student/dashboard")
          }

          className="
          mb-6
          bg-gray-800
          hover:bg-gray-700
          px-5
          py-3
          rounded-xl
          transition
          "
        >

          ← Back Dashboard

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
          bg-gradient-to-r
          from-blue-600
          to-cyan-500
          rounded-3xl
          p-6
          shadow-xl
          mb-8
          "
        >


          <h1
            className="
            text-3xl
            font-bold
            "
          >

            📊 Academic Results

          </h1>



          {
            student && (

              <p
                className="
                mt-3
                text-blue-100
                "
              >

                {student.name}
                <br/>

                {student.email}

              </p>

            )
          }



        </motion.div>









        {
          loading ? (


            <div
              className="
              bg-gray-900
              p-8
              rounded-2xl
              text-center
              "
            >

              Loading results...

            </div>


          )



          : results.length === 0 ? (


            <div
              className="
              bg-gray-900
              p-10
              rounded-2xl
              text-center
              "
            >

              <div
                className="
                text-5xl
                mb-4
                "
              >
                📭
              </div>


              <h2
                className="
                text-xl
                font-bold
                "
              >

                No Results Available

              </h2>


              <p
                className="
                text-gray-400
                mt-2
                "
              >

                Your lecturer has not uploaded results yet.

              </p>


            </div>



          )



          : (



            <div
              className="
              space-y-6
              "
            >



              {
                results.map((result)=>(


                  <motion.div

                    key={result.id}

                    initial={{
                      opacity:0,
                      y:20
                    }}

                    animate={{
                      opacity:1,
                      y:0
                    }}


                    className="
                    bg-gray-900
                    border
                    border-gray-800
                    rounded-3xl
                    p-6
                    shadow-xl
                    "
                  >



                    <div
                      className="
                      flex
                      justify-between
                      flex-wrap
                      gap-3
                      mb-6
                      "
                    >


                      <div>


                        <h2
                          className="
                          text-xl
                          font-bold
                          "
                        >

                          📘 {result.module}

                        </h2>


                        <p
                          className="
                          text-gray-400
                          mt-1
                          "
                        >

                          {result.year} - {result.semester}

                        </p>


                      </div>





                      <div
                        className={`
                        px-4
                        py-2
                        rounded-xl
                        font-bold
                        ${
                          result.status === "PASS"
                          ?
                          "bg-green-600"
                          :
                          "bg-red-600"
                        }
                        `}
                      >

                        {result.status}

                      </div>



                    </div>








                    <div
                      className="
                      grid
                      grid-cols-2
                      md:grid-cols-4
                      gap-4
                      "
                    >


                      <Score
                        title="CAT 1"
                        value={result.cat1}
                      />


                      <Score
                        title="CAT 2"
                        value={result.cat2}
                      />


                      <Score
                        title="Final Exam"
                        value={result.finalExam}
                      />


                      <Score
                        title="Total"
                        value={result.total}
                      />


                    </div>








                    <div
                      className="
                      mt-6
                      flex
                      justify-between
                      items-center
                      bg-gray-800
                      p-4
                      rounded-xl
                      "
                    >


                      <span>
                        Grade
                      </span>


                      <span
                        className="
                        text-2xl
                        font-bold
                        text-blue-400
                        "
                      >

                        {result.grade}

                      </span>


                    </div>



                  </motion.div>


                ))
              }



            </div>


          )
        }





      </div>


    </main>

  );


}








function Score(
{
 title,
 value
}:
{
 title:string;
 value:number|null;
}

){


return (

<div
className="
bg-gray-800
rounded-xl
p-4
text-center
"
>


<p
className="
text-gray-400
text-sm
"
>

{title}

</p>


<p
className="
text-xl
font-bold
mt-2
"
>

{
value ?? "-"
}

</p>


</div>

);


}