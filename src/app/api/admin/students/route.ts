import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// ==============================
// GET ALL STUDENTS
// ==============================
export async function GET() {
  try {
    const students = await prisma.user.findMany({
      where: {
        role: "student",
      },
      orderBy: {
        id: "desc",
      },
      select: {
        id: true,
        name: true,
        email: true,
        course: true,
        createdAt: true,
      },
    });

    return NextResponse.json(students);
  } catch (error) {
    console.log("FETCH STUDENTS ERROR:", error);

    return NextResponse.json(
      {
        message: "Failed to fetch students",
      },
      {
        status: 500,
      }
    );
  }
}

// ==============================
// RESET PASSWORD
// ==============================
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();

    const { id, password } = body;

    if (!id || !password) {
      return NextResponse.json(
        {
          message: "Student ID and password are required",
        },
        {
          status: 400,
        }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: {
        id,
      },
      data: {
        password: hashedPassword,
      },
    });

    return NextResponse.json({
      message: "Password reset successfully",
    });
  } catch (error) {
    console.log("RESET PASSWORD ERROR:", error);

    return NextResponse.json(
      {
        message: "Failed to reset password",
      },
      {
        status: 500,
      }
    );
  }
}

// ==============================
// DELETE STUDENT
// ==============================
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const id = Number(searchParams.get("id"));

    if (!id) {
      return NextResponse.json(
        {
          message: "Student ID required",
        },
        {
          status: 400,
        }
      );
    }

    const student = await prisma.user.findFirst({
      where: {
        id,
        role: "student",
      },
    });

    if (!student) {
      return NextResponse.json(
        {
          message: "Student not found",
        },
        {
          status: 404,
        }
      );
    }

    await prisma.user.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      message: "Student deleted successfully",
    });
  } catch (error) {
    console.log("DELETE STUDENT ERROR:", error);

    return NextResponse.json(
      {
        message: "Failed to delete student",
      },
      {
        status: 500,
      }
    );
  }
}