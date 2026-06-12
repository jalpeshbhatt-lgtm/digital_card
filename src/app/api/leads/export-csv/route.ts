import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

export async function GET() {
  try {
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

    if (!decoded?.userId) {
      return new Response("Unauthorized", {
        status: 401,
      });
    }

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

    const headers =
      "Name,Mobile,Email,Message,Card,Date\n";

    const rows = leads
      .map(
        (lead) =>
          `"${lead.name || ""}","${lead.mobile || ""}","${lead.email || ""}","${lead.message || ""}","${lead.card.name}","${lead.createdAt.toISOString()}"`
      )
      .join("\n");

    const csv = headers + rows;

    return new Response(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition":
          'attachment; filename="my-leads.csv"',
      },
    });
  } catch (error) {
    console.error("CSV EXPORT ERROR:", error);

    return new Response(
      "Failed to export CSV",
      {
        status: 500,
      }
    );
  }
}