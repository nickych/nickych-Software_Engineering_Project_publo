import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("📩 Incoming announcement POST:", body); // <-- add this
    const { title, content, lecturerId } = body;

    if (!title || !content || !lecturerId) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const announcement = await prisma.announcement.create({
      data: {
        title,
        content,
        lecturerId: Number(lecturerId), // ensure it's an int
      },
    });

    return NextResponse.json({ message: "Announcement posted", announcement });
  } catch (err) {
    console.error("❌ Server error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}


export async function GET() {
  // Fetch all announcements (students view)
  const announcements = await prisma.announcement.findMany({
    orderBy: { createdAt: "desc" },
    include: { lecturer: { select: { name: true } } },
  });
  return NextResponse.json({ announcements });
}



