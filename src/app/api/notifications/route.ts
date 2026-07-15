import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const announcements = await prisma.announcement.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      notifications: announcements.map((announcement) => ({
        id: announcement.id,
        title: announcement.title,
        message: announcement.content,
        date: announcement.createdAt,
      })),
    });

  } catch (error) {
    console.error("Notification fetch error:", error);

    return NextResponse.json(
      { error: "Failed to fetch notifications" },
      { status: 500 }
    );
  }
}