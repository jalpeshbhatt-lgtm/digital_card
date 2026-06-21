import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/api";


export async function GET() {
  const leads = await prisma.lead.findMany({
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
        `"${lead.name || ""}","${lead.mobile || ""}","${lead.email || ""}","${lead.message || ""}","${lead.card.name}","${lead.createdAt}"`
    )
    .join("\n");

  const csv = headers + rows;

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition":
        'attachment; filename="leads.csv"',
    },
  });
}
