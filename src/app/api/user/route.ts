import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    return Response.json({ error: "Email required" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      name: true,
      email: true,
      role: true,
      profileImageUrl: true,
    },
  });

  return Response.json(user);
}

export async function PUT(req: Request) {
  try {
    const { email, profileImageUrl } = await req.json();

    if (!email || !profileImageUrl) {
      return Response.json(
        { error: "Email and profileImageUrl are required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.update({
      where: { email },
      data: {
        profileImageUrl,
      },
    });

    return Response.json(user);
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Failed to update profile image" },
      { status: 500 }
    );
  }
}