import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { supabase } from "@/lib/supabase";

const prisma = new PrismaClient();


// GET ALL STUDENT SUBMISSIONS
export async function GET() {
  try {

    const submissions = await prisma.assignmentSubmission.findMany({
      orderBy: {
        submittedAt: "desc",
      },
    });


    return NextResponse.json({
      submissions,
    });


  } catch (error) {

    console.error(
      "Fetching assignments error:",
      error
    );


    return NextResponse.json(
      {
        error: "Failed to fetch assignments",
      },
      {
        status: 500,
      }
    );

  }
}




// SUBMIT ASSIGNMENT
export async function POST(req: Request) {
  try {

    const formData = await req.formData();


    const title = formData.get("title") as string;
    const studentId = formData.get("studentId") as string;
    const file = formData.get("file") as File;



    if (!title || !studentId || !file) {

      return NextResponse.json(
        {
          error: "Missing required fields",
        },
        {
          status: 400,
        }
      );

    }



    // Create unique file name
    const fileName = `${Date.now()}-${file.name}`;



    // Convert file for Supabase upload
    const arrayBuffer = await file.arrayBuffer();

    const buffer = Buffer.from(arrayBuffer);




    // Upload file to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from("assignments")
      .upload(
        fileName,
        buffer,
        {
          contentType: file.type,
        }
      );



    if (uploadError) {

      console.error(uploadError);


      return NextResponse.json(
        {
          error: "File upload failed",
        },
        {
          status: 500,
        }
      );

    }





    // Get public URL
    const { data: publicUrlData } =
      supabase.storage
        .from("assignments")
        .getPublicUrl(fileName);



    const fileUrl = publicUrlData.publicUrl;





    // Save submission to database
    const submission =
      await prisma.assignmentSubmission.create({

        data: {

          title,

          studentId,

          fileUrl,

          fileName: file.name,

        },

      });






    return NextResponse.json({

      message:
        "Assignment submitted successfully",

      submission,

    });




  } catch (error) {


    console.error(
      "Assignment submission error:",
      error
    );



    return NextResponse.json(

      {
        error: "Server error",
      },

      {
        status: 500,
      }

    );

  }
}