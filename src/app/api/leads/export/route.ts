import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/api";
import { cookies } from "next/headers";
import * as XLSX from "xlsx";

export async function GET() {
  try {
    // Get JWT from cookie
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

    // Export ONLY current user's leads
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

    const data = leads.map((lead) => ({
      Name: lead.name,
      Mobile: lead.mobile,
      Email: lead.email,
      Message: lead.message,
      Card: lead.card.name,
      Date: lead.createdAt,
    }));

    const worksheet =
      XLSX.utils.json_to_sheet(data);

    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Leads"
    );

    const buffer = XLSX.write(workbook, {
      type: "buffer",
      bookType: "xlsx",
    });

    return new Response(buffer, {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition":
          'attachment; filename="my-leads.xlsx"',
      },
    });
  } catch (error) {
    console.error("EXPORT ERROR:", error);

    return new Response(
      "Failed to export leads",
      {
        status: 500,
      }
    );
  }
}
