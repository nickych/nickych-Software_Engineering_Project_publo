import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      title,
      description,
      fileName,
      fileUrl,
    } = body;

    if (!title || !fileName || !fileUrl) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    const result = await prisma.result.create({
      data: {
        title,
        description,
        fileName,
        fileUrl,
      },
    });

    return NextResponse.json(
      {
        message: "Result published successfully.",
        result,
      },
      { status: 201 }
    );

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}