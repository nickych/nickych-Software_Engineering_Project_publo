"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Upload, FileSpreadsheet, BookOpen, GraduationCap } from "lucide-react";


interface Module {

  id:number;
  name:string;
  year:string;
  semester:string;

}




export default function UploadResultsPage(){


  const [year,setYear] = useState("");

  const [semester,setSemester] = useState("");

  const [module,setModule] = useState("");

  const [assessment,setAssessment] = useState("");

  const [file,setFile] = useState<File|null>(null);


  const [modules,setModules] = useState<Module[]>([]);

  const [loading,setLoading] = useState(false);


  const [message,setMessage] = useState("");

  const [error,setError] = useState("");







  useEffect(()=>{

    fetchModules();

  },[]);







  const fetchModules = async()=>{


    try{


      const res = await fetch("/api/modules");

      const data = await res.json();


      setModules(data);


    }
    catch(error){

      console.log(error);

    }


  };








  const filteredModules =
    modules.filter((item)=>

      item.year === year &&
      item.semester === semester

    );








  const handleUpload = async()=>{


    setMessage("");

    setError("");



    if(!file){

      setError("Please select a CSV file");

      return;

    }




    if(!year || !semester || !module || !assessment){


      setError(
        "Please complete all fields before uploading"
      );

      return;

    }






    const formData = new FormData();


    formData.append("file",file);

    formData.append("year",year);

    formData.append("semester",semester);

    formData.append("module",module);

    formData.append("assessment",assessment);






    try{


      setLoading(true);



      const res = await fetch(

        "/api/lecturer/results",

        {

          method:"POST",

          body:formData

        }

      );



      const data = await res.json();





      if(res.ok){


        setMessage(
          "Results uploaded successfully"
        );


        setFile(null);

        setModule("");

        setAssessment("");



      }
      else{


        setError(
          data.message || "Upload failed"
        );


      }



    }
    catch(error){


      setError(
        "Something went wrong"
      );


    }
    finally{


      setLoading(false);


    }


  };









  return (



    <main className="
      min-h-screen
      bg-gradient-to-br
      from-gray-950
      via-gray-900
      to-gray-950
      text-white
      p-6
      md:p-10
    ">




      <div className="
        max-w-5xl
        mx-auto
      ">





        {/* HEADER */}


        <motion.div

          initial={{opacity:0,y:-20}}

          animate={{opacity:1,y:0}}

          className="
            bg-gradient-to-r
            from-blue-600
            to-cyan-500
            rounded-3xl
            p-6
            md:p-8
            shadow-xl
            mb-8
          "

        >


          <div className="flex items-center gap-3">

            <GraduationCap size={40}/>


            <div>

              <h1 className="
                text-3xl
                font-bold
              ">

                Upload Student Results

              </h1>


              <p className="
                text-blue-100
                mt-2
              ">

                Upload CAT and examination marks using CSV files.

              </p>


            </div>


          </div>


        </motion.div>









        <div className="
          grid
          md:grid-cols-3
          gap-6
        ">





          {/* INFORMATION CARD */}


          <div className="
            bg-gray-900
            border
            border-gray-800
            rounded-3xl
            p-6
          ">


            <BookOpen
              className="mb-4 text-blue-400"
              size={35}
            />


            <h2 className="
              font-bold
              text-xl
            ">

              Instructions

            </h2>



            <ul className="
              text-gray-400
              mt-4
              space-y-3
              text-sm
            ">

              <li>
                ✓ Select academic year
              </li>

              <li>
                ✓ Select semester
              </li>

              <li>
                ✓ Choose module
              </li>

              <li>
                ✓ Upload CSV file
              </li>

              <li>
                ✓ Emails must be Cavendish students
              </li>


            </ul>


          </div>










          {/* FORM */}



          <div className="
            md:col-span-2
            bg-gray-900
            border
            border-gray-800
            rounded-3xl
            p-6
            shadow-xl
          ">





            {
              message && (

                <div className="
                  bg-green-600/20
                  border
                  border-green-500
                  p-3
                  rounded-xl
                  mb-5
                  text-green-300
                ">

                  {message}

                </div>

              )
            }






            {
              error && (

                <div className="
                  bg-red-600/20
                  border
                  border-red-500
                  p-3
                  rounded-xl
                  mb-5
                  text-red-300
                ">

                  {error}

                </div>

              )
            }









            <div className="
              grid
              md:grid-cols-2
              gap-4
            ">



              <select
                value={year}
                onChange={(e)=>{
                  setYear(e.target.value);
                  setModule("");
                }}
                className="
                bg-gray-800
                border
                border-gray-700
                rounded-xl
                p-3
                "
              >

                <option value="">
                  Select Year
                </option>

                <option>
                  Year 1
                </option>

                <option>
                  Year 2
                </option>

                <option>
                  Year 3
                </option>

                <option>
                  Year 4
                </option>


              </select>






              <select

                value={semester}

                onChange={(e)=>{
                  setSemester(e.target.value);
                  setModule("");
                }}

                className="
                bg-gray-800
                border
                border-gray-700
                rounded-xl
                p-3
                "

              >

                <option value="">
                  Select Semester
                </option>

                <option>
                  Semester 1
                </option>

                <option>
                  Semester 2
                </option>


              </select>



            </div>









            <select

              value={module}

              onChange={(e)=>setModule(e.target.value)}

              className="
              w-full
              bg-gray-800
              border
              border-gray-700
              rounded-xl
              p-3
              mt-4
              "

            >

              <option value="">
                Select Module
              </option>


              {
                filteredModules.map((item)=>(

                  <option
                    key={item.id}
                    value={item.name}
                  >

                    {item.name}

                  </option>

                ))
              }


            </select>










            <select

              value={assessment}

              onChange={(e)=>setAssessment(e.target.value)}

              className="
              w-full
              bg-gray-800
              border
              border-gray-700
              rounded-xl
              p-3
              mt-4
              "

            >

              <option value="">
                Select Assessment
              </option>

              <option>
                CAT 1
              </option>

              <option>
                CAT 2
              </option>

              <option>
                Final Exam
              </option>


            </select>










            <div className="
              mt-5
              bg-gray-800
              rounded-xl
              p-4
            ">


              <label className="
                flex
                items-center
                gap-3
                cursor-pointer
              ">


                <FileSpreadsheet
                  className="text-green-400"
                />


                <span>

                  {
                    file
                    ?
                    file.name
                    :
                    "Choose CSV file"
                  }

                </span>


                <input

                  type="file"

                  accept=".csv"

                  hidden

                  onChange={(e)=>
                    setFile(
                      e.target.files?.[0] || null
                    )
                  }

                />


              </label>


            </div>










            <button

              onClick={handleUpload}

              disabled={loading}

              className="
              mt-6
              w-full
              bg-blue-600
              hover:bg-blue-700
              disabled:bg-gray-700
              py-3
              rounded-xl
              font-semibold
              flex
              justify-center
              items-center
              gap-2
              transition
              "

            >

              <Upload size={20}/>


              {
                loading
                ?
                "Uploading..."
                :
                "Upload Results"
              }


            </button>





          </div>



        </div>





      </div>



    </main>


  );


}