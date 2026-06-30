import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Missing email or password" },
        { status: 400 }
      );
    }

    // 🔹 Try finding the user in all three tables
    const user =
      (await prisma.user.findUnique({ where: { email } })) ||
      (await prisma.lecturer.findUnique({ where: { email } })) ||
      (await prisma.admin.findUnique({ where: { email } }));

    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials (no account found)" },
        { status: 401 }
      );
    }

    // 🔹 Check password (bcrypt compare)
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid credentials (wrong password)" },
        { status: 401 }
      );
    }

    // 🔹 Determine role dynamically
    // (if role column exists, use it; otherwise hardcode based on table)
    let role = "student";
    if ("role" in user && user.role) {
      role = user.role; // covers Admin / Lecturer where role default is set
    } else {
      // fallback if no role column exists
      if ("announcements" in user) role = "lecturer";
    }

    // 🔹 Return minimal user object
    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role,
      },
    });
  } catch (err) {
    console.error("❌ Login error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
