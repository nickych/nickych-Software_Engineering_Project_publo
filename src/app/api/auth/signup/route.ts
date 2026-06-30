// app/api/auth/signup/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { name, email, password, role } = await req.json();

    if (!name || !email || !password || !role) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    });

    return NextResponse.json({ message: "Account created", user });
  } catch (err: any) {
    console.error(err);

    // Handle unique constraint error (duplicate email)
    if (err.code === "P2002") {
      return NextResponse.json({ error: "Email already exists" }, { status: 400 });
    }

    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
