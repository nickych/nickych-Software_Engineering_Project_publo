import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      title,
      description,
      course,
      semester,
      fileUrl,
      lecturerId,
    } = body;

    const book = await prisma.book.create({
      data: {
        title,
        description,
        course,
        semester,
        fileUrl,
        lecturerId,
      },
    });

    return NextResponse.json(book, { status: 201 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to save book" },
      { status: 500 }
    );
  }
}