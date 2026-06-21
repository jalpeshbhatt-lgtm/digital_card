import crypto from "crypto";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/getCurrentUser";

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      plan,
    } = body;

    const generatedSignature = crypto
      .createHmac(
        "sha256",
        process.env.RAZORPAY_KEY_SECRET!
      )
      .update(
        `${razorpay_order_id}|${razorpay_payment_id}`
      )
      .digest("hex");

    const isValid =
      generatedSignature === razorpay_signature;

    if (!isValid) {
      return NextResponse.json({
        success: false,
        error: "Invalid signature",
      });
    }

    // -------------------------
    // PLAN CONFIG
    // -------------------------

    const planConfig = {
      Basic: {
        amount: 499,
        cardLimit: 1,
        customDomain: false,
      },

      Pro: {
        amount: 1499,
        cardLimit: 5,
        customDomain: false,
      },

      Premium: {
        amount: 2499,
        cardLimit: 10,
        customDomain: true,
      },
    };

    const selectedPlan =
      planConfig[
        plan as keyof typeof planConfig
      ];

    if (!selectedPlan) {
      return NextResponse.json({
        success: false,
        error: "Invalid plan",
      });
    }

    // -------------------------
    // SAVE PAYMENT
    // -------------------------

    await prisma.payment.create({
      data: {
        userId: user.userId,

        amount: selectedPlan.amount,

        plan,

        status: "SUCCESS",

        razorpayOrderId:
          razorpay_order_id,

        razorpayPaymentId:
          razorpay_payment_id,
      },
    });

    // -------------------------
    // SUBSCRIPTION
    // -------------------------

    const startDate = new Date();

    const expiryDate = new Date();

    expiryDate.setFullYear(
      expiryDate.getFullYear() + 1
    );

    await prisma.subscription.upsert({
      where: {
        userId: user.userId,
      },

      update: {
        plan,

        status: "ACTIVE",

        cardLimit:
          selectedPlan.cardLimit,

        customDomain:
          selectedPlan.customDomain,

        startDate,

        expiryDate,

        razorpayOrderId:
          razorpay_order_id,

        razorpayPaymentId:
          razorpay_payment_id,
      },

      create: {
        userId: user.userId,

        plan,

        status: "ACTIVE",

        cardLimit:
          selectedPlan.cardLimit,

        customDomain:
          selectedPlan.customDomain,

        startDate,

        expiryDate,

        razorpayOrderId:
          razorpay_order_id,

        razorpayPaymentId:
          razorpay_payment_id,
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(
      "VERIFY PAYMENT ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}