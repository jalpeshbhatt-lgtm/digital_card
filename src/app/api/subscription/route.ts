import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/getCurrentUser";

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const subscription =
      await prisma.subscription.findUnique({
        where: {
          userId: user.userId,
        },
      });

    const cardsUsed =
      await prisma.card.count({
        where: {
          userId: user.userId,
        },
      });

    return NextResponse.json({
      subscription,
      cardsUsed,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed" },
      { status: 500 }
    );
  }
}