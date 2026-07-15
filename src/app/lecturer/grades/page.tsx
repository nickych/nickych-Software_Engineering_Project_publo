"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";

export default function PublishResultsPage() {

  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");



  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();


    if (!file) {

      setMessage("Please select a file.");

      return;

    }



    try {

      setUploading(true);
      setMessage("");



      const fileName =
        `${Date.now()}-${file.name}`;



      const { error: uploadError } =
        await supabase.storage
          .from("results")
          .upload(fileName, file);



      if (uploadError) {

        throw uploadError;

      }




      const {
        data
      } = supabase.storage
        .from("results")
        .getPublicUrl(fileName);



      const fileUrl = data.publicUrl;





      const res = await fetch(
        "/api/lecturer/results",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({

            title,

            description,

            fileName: file.name,

            fileUrl

          })

        }
      );





      const result = await res.json();




      if (!res.ok) {

        throw new Error(
          result.error
        );

      }




      setMessage(
        "✅ Result published successfully!"
      );


      setTitle("");
      setDescription("");
      setFile(null);




    } catch(error) {

      console.error(error);


      setMessage(
        "❌ Failed to publish result."
      );


    } finally {

      setUploading(false);

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
        px-3
        sm:px-6
        py-6
        sm:py-10
      "
    >


      <div
        className="
          max-w-3xl
          mx-auto
          w-full
        "
      >


        <button

          onClick={() => router.back()}

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

          ← Back

        </button>





        <motion.div

          initial={{
            opacity:0,
            y:30
          }}

          animate={{
            opacity:1,
            y:0
          }}

          transition={{
            duration:0.5
          }}

          className="
            bg-gray-900
            border
            border-gray-800
            rounded-3xl
            shadow-2xl
            overflow-hidden
            w-full
          "

        >




          <div
            className="
              bg-gradient-to-r
              from-blue-600
              to-cyan-500
              px-5
              sm:px-8
              py-6
              sm:py-7
            "
          >

            <h1
              className="
                text-2xl
                sm:text-3xl
                font-bold
              "
            >

              📄 Publish Results

            </h1>


            <p
              className="
                mt-2
                text-blue-100
                text-sm
              "
            >

              Upload student results in PDF or Word format.

            </p>


          </div>





          <div
            className="
              p-5
              sm:p-8
            "
          >


          <form
            onSubmit={handleSubmit}
            className="
              space-y-5
              sm:space-y-6
            "
          >



            <div>

              <label
                className="
                  block
                  text-sm
                  text-gray-300
                  mb-2
                "
              >
                Result Title
              </label>


              <input

                type="text"

                placeholder="Example: Semester 1 Results"

                value={title}

                onChange={(e)=>
                  setTitle(e.target.value)
                }

                required

                className="
                  w-full
                  bg-gray-800
                  border
                  border-gray-700
                  focus:border-blue-500
                  rounded-xl
                  px-3
                  sm:px-4
                  py-3
                  text-sm
                  sm:text-base
                  outline-none
                  transition
                "

              />

            </div>            <div>

              <label
                className="
                  block
                  text-sm
                  text-gray-300
                  mb-2
                "
              >
                Description
              </label>



              <textarea

                placeholder="Add information about these results..."

                value={description}

                onChange={(e)=>
                  setDescription(e.target.value)
                }

                className="
                  w-full
                  bg-gray-800
                  border
                  border-gray-700
                  focus:border-blue-500
                  rounded-xl
                  px-3
                  sm:px-4
                  py-3
                  min-h-[100px]
                  sm:min-h-[120px]
                  text-sm
                  sm:text-base
                  outline-none
                  transition
                "

              />

            </div>






            <div>

              <label
                className="
                  block
                  text-sm
                  text-gray-300
                  mb-2
                "
              >
                Upload Result File
              </label>




              <div
                className="
                  bg-gray-800/50
                  border-2
                  border-dashed
                  border-gray-700
                  hover:border-blue-500
                  rounded-2xl
                  p-4
                  sm:p-6
                  transition
                "
              >


                <input

                  type="file"

                  accept="
                    application/pdf,
                    .doc,
                    .docx
                  "

                  onChange={(e)=>
                    setFile(
                      e.target.files?.[0] || null
                    )
                  }

                  className="
                    w-full
                    text-xs
                    sm:text-sm
                    text-gray-300
                    cursor-pointer
                  "

                />



                <p
                  className="
                    mt-3
                    text-xs
                    text-gray-500
                  "
                >

                  Supported files: PDF, DOC, DOCX

                </p>


              </div>


            </div>







            {file && (

              <div
                className="
                  flex
                  items-start
                  gap-3
                  bg-gray-800
                  border
                  border-gray-700
                  rounded-xl
                  p-3
                  sm:p-4
                "
              >

                <div
                  className="
                    text-xl
                    sm:text-2xl
                  "
                >

                  📎

                </div>



                <div
                  className="
                    min-w-0
                  "
                >

                  <p
                    className="
                      text-xs
                      text-gray-400
                    "
                  >

                    Selected File

                  </p>


                  <p
                    className="
                      text-sm
                      text-blue-400
                      break-all
                    "
                  >

                    {file.name}

                  </p>


                </div>


              </div>

            )}









            <button

              disabled={uploading}

              className="
                w-full
                bg-blue-600
                hover:bg-blue-700
                disabled:bg-gray-600
                py-3
                sm:py-3.5
                rounded-xl
                font-semibold
                text-sm
                sm:text-base
                shadow-lg
                transition
              "

            >

              {uploading
                ? "Uploading Results..."
                : "Publish Results"
              }


            </button>





          </form>








          {message && (

            <div

              className={`
                mt-5
                sm:mt-6
                text-center
                rounded-xl
                py-3
                px-3
                text-sm

                ${
                  message.includes("success")
                  ? "bg-green-900 text-green-300"
                  : "bg-red-900 text-red-300"
                }

              `}

            >

              {message}


            </div>

          )}





        </div>



        </motion.div>



      </div>



    </main>

  );

}