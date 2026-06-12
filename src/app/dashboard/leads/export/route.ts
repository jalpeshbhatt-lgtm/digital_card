import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import * as XLSX from "xlsx";

export async function GET() {

  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (!token) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  const decoded = verifyToken(token) as {
    userId: string;
  };

  const leads = await prisma.lead.findMany({
    where: {
      card: {
        userId: decoded.userId,
      },
    },

    include: {
      card: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  // existing excel code continues...
}