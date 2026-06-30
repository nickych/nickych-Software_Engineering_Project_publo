import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const lecturerId = Number(formData.get("lecturerId"));

    const file = formData.get("file") as File | null;

    let fileUrl = "";

    if (file) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const fileName = `${Date.now()}-${file.name}`;

      const { supabase } = await import("@/lib/supabase");

      const { error } = await supabase.storage
        .from("books")
        .upload(fileName, buffer, {
          contentType: file.type,
        });

      if (error) throw error;

      fileUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/books/${fileName}`;
    }

    const book = await prisma.book.create({
      data: {
        title,
        description,
        course: "computer-science",
        semester: "year-1-semester-1",
        fileUrl,
        lecturerId,
      },
    });

    return NextResponse.json(book);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to create course" },
      { status: 500 }
    );
  }
}