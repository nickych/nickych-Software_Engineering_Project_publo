import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const existingUser =
        (await prisma.user.findUnique({
          where: { email: user.email! },
        })) ||
        (await prisma.lecturer.findUnique({
          where: { email: user.email! },
        })) ||
        (await prisma.admin.findUnique({
          where: { email: user.email! },
        }));

      if (!existingUser) {
        await prisma.user.create({
          data: {
            name: user.name || "No Name",
            email: user.email!,
            password: "",
            role: "student",
          },
        });
      }

      return true;
    },

    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.sub;
        (session.user as any).role = "student";
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };