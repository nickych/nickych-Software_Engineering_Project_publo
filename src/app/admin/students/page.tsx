"use client";

import { useEffect, useState } from "react";
import {
  Trash2,
  KeyRound,
  Search,
  ArrowLeft,
  Eye,
  EyeOff
} from "lucide-react";

import { useRouter } from "next/navigation";


interface Student {

  id:number;

  name:string | null;

  email:string;

  course:string | null;

  createdAt:string;

}




export default function ManageStudentsPage(){


  const router = useRouter();


  const [students,setStudents] = useState<Student[]>([]);

  const [filtered,setFiltered] = useState<Student[]>([]);

  const [search,setSearch] = useState("");

  const [loading,setLoading] = useState(true);



  const [showPasswordModal,setShowPasswordModal] = useState(false);

  const [selectedStudent,setSelectedStudent] = useState<number | null>(null);

  const [newPassword,setNewPassword] = useState("");

  const [showPassword,setShowPassword] = useState(false);






  useEffect(()=>{

    loadStudents();

  },[]);








  useEffect(()=>{


    const results =
      students.filter((student)=>{


        const name =
          student.name?.toLowerCase() || "";


        const email =
          student.email.toLowerCase();


        const course =
          student.course?.toLowerCase() || "";


        const value =
          search.toLowerCase();




        return (

          name.includes(value)

          ||

          email.includes(value)

          ||

          course.includes(value)

        );


      });



    setFiltered(results);



  },[search,students]);









  async function loadStudents(){


    try{


      const response =
        await fetch(
          "/api/admin/students"
        );



      const data =
        await response.json();



      if(response.ok){


        setStudents(data);

        setFiltered(data);


      }



    }
    catch(error){


      console.log(
        "LOAD STUDENTS ERROR:",
        error
      );


    }
    finally{


      setLoading(false);


    }


  }









  async function deleteStudent(id:number){


    const confirmDelete =
      confirm(
        "Are you sure you want to delete this student?"
      );



    if(!confirmDelete)
      return;




    try{


      const response =
        await fetch(
          `/api/admin/students?id=${id}`,
          {

            method:"DELETE"

          }
        );




      const data =
        await response.json();




      alert(data.message);



      if(response.ok){

        loadStudents();

      }



    }
    catch(error){


      console.log(
        "DELETE ERROR:",
        error
      );


    }


  }









  function openResetPassword(id:number){


    setSelectedStudent(id);

    setNewPassword("");

    setShowPassword(false);

    setShowPasswordModal(true);


  }









  async function resetPassword(){


    if(!selectedStudent || !newPassword)
      return;




    try{


      const response =
        await fetch(
          "/api/admin/students",
          {


            method:"PUT",


            headers:{

              "Content-Type":
              "application/json"

            },


            body:JSON.stringify({

              id:selectedStudent,

              password:newPassword

            })


          }
        );




      const data =
        await response.json();




      alert(data.message);




      if(response.ok){


        setShowPasswordModal(false);

        setNewPassword("");

      }



    }
    catch(error){


      console.log(
        "RESET PASSWORD ERROR:",
        error
      );


    }


  }  return (

    <div
      className="
      min-h-screen
      bg-gray-950
      text-white
      p-4
      sm:p-8
      "
    >



      <button

        onClick={() =>
          router.back()
        }


        className="
        flex
        items-center
        gap-2
        mb-8
        bg-gray-800
        hover:bg-gray-700
        px-4
        py-2
        rounded-lg
        "
      >

        <ArrowLeft size={18}/>

        Back

      </button>







      <h1
        className="
        text-3xl
        sm:text-4xl
        font-bold
        mb-6
        "
      >

        Manage Students

      </h1>







      <div
        className="
        relative
        mb-8
        "
      >

        <Search

          className="
          absolute
          left-3
          top-3
          text-gray-500
          "

          size={18}

        />



        <input

          className="
          w-full
          bg-gray-800
          rounded-xl
          py-3
          pl-10
          pr-4
          outline-none
          border
          border-gray-700
          "

          placeholder="
          Search student by name, email or course
          "


          value={search}


          onChange={(e)=>
            setSearch(e.target.value)
          }

        />

      </div>









      {
        loading ? (


          <p className="text-gray-400">

            Loading students...

          </p>



        ) : (


        <div

          className="
          overflow-x-auto
          rounded-xl
          border
          border-gray-800
          "

        >



          <table
            className="
            w-full
            text-sm
            "
          >



            <thead
              className="
              bg-gray-800
              "
            >

              <tr>


                <th className="p-4 text-left">
                  Name
                </th>



                <th className="p-4 text-left">
                  Email
                </th>



                <th className="p-4 text-left">
                  Course
                </th>



                <th className="p-4 text-left">
                  Registered
                </th>



                <th className="p-4 text-center">
                  Actions
                </th>


              </tr>


            </thead>







            <tbody>


            {
              filtered.map((student)=>(


                <tr

                  key={student.id}

                  className="
                  border-b
                  border-gray-800
                  hover:bg-gray-900
                  "

                >



                  <td className="p-4">

                    {student.name || "No name"}

                  </td>





                  <td className="p-4">

                    {student.email}

                  </td>





                  <td className="p-4">

                    {student.course || "N/A"}

                  </td>





                  <td className="p-4">

                    {
                      new Date(
                        student.createdAt
                      ).toLocaleDateString()
                    }

                  </td>







                  <td className="p-4">


                    <div
                      className="
                      flex
                      justify-center
                      gap-3
                      "
                    >



                      <button

                        onClick={() =>
                          openResetPassword(student.id)
                        }


                        className="
                        bg-blue-600
                        hover:bg-blue-700
                        p-2
                        rounded-lg
                        "

                      >

                        <KeyRound size={18}/>


                      </button>







                      <button

                        onClick={() =>
                          deleteStudent(student.id)
                        }


                        className="
                        bg-red-600
                        hover:bg-red-700
                        p-2
                        rounded-lg
                        "

                      >

                        <Trash2 size={18}/>


                      </button>



                    </div>


                  </td>





                </tr>


              ))
            }



            </tbody>



          </table>



        </div>


        )

      }












      {
        showPasswordModal && (


          <div

            className="
            fixed
            inset-0
            bg-black/70
            flex
            items-center
            justify-center
            z-50
            "

          >



            <div

              className="
              bg-gray-900
              border
              border-gray-700
              rounded-xl
              p-6
              w-[90%]
              max-w-md
              "

            >



              <h2
                className="
                text-xl
                font-bold
                mb-4
                "
              >

                Reset Student Password

              </h2>






              <div className="relative">


                <input

                  type={
                    showPassword
                    ?
                    "text"
                    :
                    "password"
                  }


                  value={newPassword}


                  onChange={(e)=>
                    setNewPassword(e.target.value)
                  }


                  placeholder="Enter new password"


                  className="
                  w-full
                  bg-gray-800
                  border
                  border-gray-700
                  rounded-lg
                  p-3
                  pr-12
                  mb-4
                  outline-none
                  "

                />





                <button

                  type="button"


                  onClick={() =>
                    setShowPassword(!showPassword)
                  }


                  className="
                  absolute
                  right-3
                  top-3
                  text-gray-400
                  "

                >


                  {
                    showPassword
                    ?
                    <EyeOff size={20}/>
                    :
                    <Eye size={20}/>
                  }


                </button>


              </div>







              <div
                className="
                flex
                justify-end
                gap-3
                "
              >



                <button

                  onClick={() =>
                    setShowPasswordModal(false)
                  }


                  className="
                  bg-gray-700
                  px-4
                  py-2
                  rounded-lg
                  "

                >

                  Cancel

                </button>







                <button

                  onClick={resetPassword}


                  className="
                  bg-blue-600
                  hover:bg-blue-700
                  px-4
                  py-2
                  rounded-lg
                  "

                >

                  Reset

                </button>



              </div>




            </div>



          </div>


        )
      }





    </div>

  );


}