import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";


const prisma = new PrismaClient();




// ===============================
// GET ALL LECTURERS
// ===============================

export async function GET(){


  try{


    const lecturers =
      await prisma.lecturer.findMany({

        orderBy:{
          id:"desc"
        }

      });



    return NextResponse.json(lecturers);



  }
  catch(error:any){


    console.log(
      "FETCH LECTURERS ERROR:",
      error
    );


    return NextResponse.json(
      {
        message:"Failed to fetch lecturers",
        error:error.message
      },
      {
        status:500
      }
    );


  }


}









// ===============================
// CREATE LECTURER
// ===============================

export async function POST(req:NextRequest){


  try{


    const body =
      await req.json();



    const {
      name,
      email,
      password
    } = body;





    if(!name || !email || !password){


      return NextResponse.json(

        {
          message:
          "Name, email and password required"
        },

        {
          status:400
        }

      );


    }






    const cleanEmail =
      email.trim().toLowerCase();







    const existing =
      await prisma.lecturer.findUnique({

        where:{
          email:cleanEmail
        }

      });






    if(existing){


      return NextResponse.json(

        {
          message:
          "Lecturer already exists"
        },

        {
          status:400
        }

      );


    }







    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );







    const lecturer =
      await prisma.lecturer.create({

        data:{


          name:name.trim(),

          email:cleanEmail,

          password:hashedPassword


        }

      });







    return NextResponse.json(

      {
        message:
        "Lecturer created successfully",

        lecturer
      },

      {
        status:201
      }

    );





  }
  catch(error:any){


    console.log(
      "CREATE LECTURER ERROR:",
      error
    );



    return NextResponse.json(

      {
        message:
        "Failed to create lecturer",

        error:error.message,

        code:error.code

      },

      {
        status:500
      }

    );


  }


}











// ===============================
// DELETE LECTURER
// ===============================

export async function DELETE(req:NextRequest){


  try{


    const {searchParams}
      =
      new URL(req.url);



    const id =
      Number(searchParams.get("id"));





    if(!id){


      return NextResponse.json(

        {
          message:
          "Lecturer ID required"
        },

        {
          status:400
        }

      );


    }







    await prisma.lecturer.delete({

      where:{
        id
      }

    });







    return NextResponse.json({

      message:
      "Lecturer deleted successfully"

    });






  }
  catch(error:any){


    console.log(
      "DELETE LECTURER ERROR:",
      error
    );



    return NextResponse.json(

      {
        message:
        "Failed to delete lecturer",

        error:error.message
      },

      {
        status:500
      }

    );


  }


}