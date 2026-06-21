import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    console.log("REGISTER BODY:", body);

    const existingUser = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          error: "Email already exists",
        },
        {
          status: 400,
        }
      );
    }

    const hashedPassword = await bcrypt.hash(
      body.password,
      10
    );

    const allowedRoles = [
      "USER",
      "RESELLER",
    ];

    const role = allowedRoles.includes(body.role)
      ? body.role
      : "USER";

    // Create User + Free Subscription
    const user = await prisma.user.create({
  data: {
    name: body.name,
    email: body.email,
    password: hashedPassword,
    role,

    subscription: {
      create: {
        plan: "BASIC",
        status: "ACTIVE",

        cardLimit: 1,
        extraCards: 0,

        customDomain: false,

        startDate: new Date(),

        expiryDate: new Date(
          new Date().setFullYear(
            new Date().getFullYear() + 1
          )
        ),
      },
    },
  },

  include: {
    subscription: true,
  },
});

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(
      "REGISTER ERROR:",
      error
    );

    return NextResponse.json(
      {
        error: "Registration failed",
      },
      {
        status: 500,
      }
    );
  }
}