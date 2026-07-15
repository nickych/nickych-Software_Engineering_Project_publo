import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


export async function GET() {

  try {

    const results = await prisma.result.findMany({

      orderBy: {
        createdAt: "desc",
      },

    });



    return NextResponse.json(
      {
        results,
      },
      {
        status: 200,
      }
    );


  } catch (error) {

    console.error(
      "Failed to fetch results:",
      error
    );


    return NextResponse.json(
      {
        error: "Failed to fetch results",
      },
      {
        status: 500,
      }
    );

  }

}