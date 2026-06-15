
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

/* =========================
   UPDATE CARD
========================= */

export async function PUT(
  request: Request,
  context: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  try {
    const body = await request.json();

    const { id } = await context.params;

    const updatedCard =
      await prisma.card.update({
        where: {
          id,
        },
        data: {
          ...body,
        },
      });

    return NextResponse.json(
      updatedCard
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Update failed",
      },
      {
        status: 500,
      }
    );
  }
}

/* =========================
   DELETE CARD
========================= */

export async function DELETE(
  request: Request,
  context: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  try {
    const { id } = await context.params;

    await prisma.card.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Delete failed",
      },
      {
        status: 500,
      }
    );
  }
}
