import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const card = await prisma.card.findUnique({
    where: { slug },
  });

  if (!card) {
    return NextResponse.json(
      { error: "Card not found" },
      { status: 404 }
    );
  }

  const vcf = `BEGIN:VCARD
VERSION:3.0
FN:${card.name || ""}
ORG:${card.company || ""}
TITLE:${card.designation || ""}
TEL:${card.mobile || ""}
EMAIL:${card.email || ""}
URL:${card.website || ""}
ADR:;;${card.address || ""};;;;
END:VCARD`;

  return new Response(vcf, {
    headers: {
      "Content-Type": "text/vcard",
      "Content-Disposition": `attachment; filename="${card.name}.vcf"`,
    },
  });
}