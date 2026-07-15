import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {

    const submissions = await prisma.assignmentSubmission.findMany({
      orderBy:{
        submittedAt:"desc"
      }
    });


    return NextResponse.json({
      submissions
    });


  } catch(error){

    console.error(error);

    return NextResponse.json(
      {
        error:"Failed to fetch submissions"
      },
      {
        status:500
      }
    );
  }
}