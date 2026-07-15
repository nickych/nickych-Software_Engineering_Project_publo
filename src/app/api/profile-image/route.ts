import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// UPDATE profile image
export async function POST(req: Request) {
  const body = await req.json();

  const { email, imageUrl } = body;

  if (!email || !imageUrl) {
    return Response.json({ error: "Missing data" }, { status: 400 });
  }

  const updatedUser = await prisma.user.update({
    where: { email },
    data: {
      profileImageUrl: imageUrl,
    },
  });

  return Response.json(updatedUser);
}