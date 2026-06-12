import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("LEAD DATA RECEIVED:", body);

    const lead = await prisma.lead.create({
      data: {
        cardId: body.cardId,
        name: body.name,
        mobile: body.mobile,
        message: body.message,
      },
    });

    console.log("LEAD SAVED:", lead);

    return NextResponse.json(lead);
  } catch (error) {
    console.error("LEAD SAVE ERROR:", error);

    return NextResponse.json(
      { error: "Failed to save lead" },
      { status: 500 }
    );
  }
}