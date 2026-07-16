import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();



export async function GET(){


  try{


    const modules =
      await prisma.module.findMany({

        orderBy:[

          {
            year:"asc"
          },

          {
            semester:"asc"
          }

        ]

      });



    return NextResponse.json(modules);



  }
  catch(error){


    console.log(error);


    return NextResponse.json(

      {
        message:"Failed to fetch modules"
      },

      {
        status:500
      }

    );


  }


}