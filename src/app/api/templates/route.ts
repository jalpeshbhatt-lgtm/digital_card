import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const templates = await prisma.template.findMany({
    where: {
      isActive: true,
    },
  });

  return NextResponse.json(templates);
}