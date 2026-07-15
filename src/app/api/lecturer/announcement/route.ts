import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { title, content, lecturerId } = await req.json();

    if (!title || !content || !lecturerId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const announcement = await prisma.announcement.create({
      data: {
        title,
        content,
        lecturerId,
      },
    });

    return NextResponse.json({
      message: "Announcement posted successfully!",
      announcement,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to post announcement" },
      { status: 500 }
    );
  }
}