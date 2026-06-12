import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const token =
    cookies().get("token")?.value;

  if (!token) {
    return NextResponse.json(
      { user: null }
    );
  }

  const payload = verifyToken(token) as {
    userId: string;
  };

  if (!payload) {
    return NextResponse.json(
      { user: null }
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      id: payload.userId,
    },
  });

  return NextResponse.json({ user });
}