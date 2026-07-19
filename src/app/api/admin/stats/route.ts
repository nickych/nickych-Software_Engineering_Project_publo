import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();



export async function GET(){


  try{


    const students = await prisma.user.count({

      where:{
        role:"student"
      }

    });



    const lecturers = await prisma.lecturer.count();



    const modules = await prisma.module.count();



    const results = await prisma.result.count();



    const assignments = await prisma.assignment.count();



    const activeUsers = await prisma.user.count();





    return NextResponse.json({

      students,
      lecturers,
      modules,
      results,
      assignments,
      activeUsers

    });



  }
  catch(error){


    console.log(
      "ADMIN STATS ERROR:",
      error
    );


    return NextResponse.json(

      {
        message:"Failed to load statistics"
      },

      {
        status:500
      }

    );


  }



}