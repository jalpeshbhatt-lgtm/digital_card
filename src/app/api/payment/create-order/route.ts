import { NextResponse } from "next/server";
import { razorpay } from "@/lib/razorpay";
import { getCurrentUser } from "@/lib/getCurrentUser";

const PLAN_PRICES = {
  Basic: 499,
  Pro: 1499,
  Premium: 2499,
};

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { plan } = await req.json();

    const amount =
      PLAN_PRICES[plan as keyof typeof PLAN_PRICES];

    if (!amount) {
      return NextResponse.json(
        { error: "Invalid plan" },
        { status: 400 }
      );
    }

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: `user_${user.userId.slice(-8)}`,
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Order creation failed" },
      { status: 500 }
    );
  }
}