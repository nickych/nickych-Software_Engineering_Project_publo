import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export async function GET(req: NextRequest) {

  try {


    const email =
      new URL(req.url).searchParams.get("email");



    if (!email) {

      return NextResponse.json(
        {
          message:"Student email is required"
        },
        {
          status:400
        }
      );

    }



    const emailRegex =
      /^[a-zA-Z]{2}\d+@students\.cavendish\.co\.zm$/;



    if(!emailRegex.test(email)){


      return NextResponse.json(
        {
          message:"Invalid Cavendish student email"
        },
        {
          status:403
        }
      );


    }




    const student =
      await prisma.user.findUnique({

        where:{
          email
        }

      });





    if(!student || student.role !== "student"){


      return NextResponse.json(
        {
          message:"Student not found"
        },
        {
          status:404
        }
      );


    }







    const results =
      await prisma.result.findMany({

        where:{
          studentEmail:email
        },


        orderBy:{
          createdAt:"desc"
        }


      });








    return NextResponse.json({

      student:{
        name:student.name,
        email:student.email
      },


      results


    });





  }
  catch(error){


    console.log(
      "STUDENT RESULTS ERROR:",
      error
    );



    return NextResponse.json(

      {
        message:"Failed to fetch results"
      },

      {
        status:500
      }

    );


  }


}