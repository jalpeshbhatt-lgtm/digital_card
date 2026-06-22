"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Script from "next/script";
import toast from "react-hot-toast";

function CheckoutContent() {
  const searchParams = useSearchParams();

  const plan =
    searchParams.get("plan") || "Basic";

  const prices = {
    Basic: 499,
    Pro: 1499,
    Premium: 2499,
  };

  const amount =
    prices[plan as keyof typeof prices];

  const handlePayment = async () => {
    try {
      const res = await fetch(
        "/api/payment/create-order",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            plan,
          }),
        }
      );

      const order = await res.json();

      if (!res.ok) {
        throw new Error(
          order.error ||
            "Failed to create order"
        );
      }

      const options = {
        key:
          process.env
            .NEXT_PUBLIC_RAZORPAY_KEY_ID,

        amount: order.amount,

        currency: order.currency,

        order_id: order.id,

        name: "Digital Card SaaS",

        description: `${plan} Plan`,

        handler: async (
          response: any
        ) => {
          try {
            const verify =
              await fetch(
                "/api/payment/verify",
                {
                  method: "POST",

                  headers: {
                    "Content-Type":
                      "application/json",
                  },

                  body: JSON.stringify({
                    ...response,
                    plan,
                  }),
                }
              );

            const data =
              await verify.json();

            if (data.success) {
              toast.success(
                "Payment Successful"
              );

              setTimeout(() => {
                window.location.href =
                  "/dashboard";
              }, 1500);
            } else {
              toast.error(
                "Payment verification failed"
              );
            }
          } catch (error) {
            console.error(error);

            toast.error(
              "Verification failed"
            );
          }
        },

        theme: {
          color: "#7c3aed",
        },
      };

      const razorpay =
        new (window as any).Razorpay(
          options
        );

      razorpay.open();
    } catch (error: any) {
      console.error(error);

      toast.error(
        error.message ||
          "Payment failed"
      );
    }
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      <div className="min-h-screen bg-[#0f172a] text-white flex justify-center items-center">
        <div className="max-w-md w-full bg-white/5 p-8 rounded-3xl border border-white/10">
          <h1 className="text-3xl font-bold">
            Checkout
          </h1>

          <p className="mt-4">
            Plan: {plan}
          </p>

          <div className="text-5xl font-bold mt-6">
            ₹{amount}
          </div>

          <button
            onClick={handlePayment}
            className="w-full mt-8 bg-violet-600 hover:bg-violet-700 py-4 rounded-xl font-semibold"
          >
            Pay Now
          </button>
        </div>
      </div>
    </>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0f172a] flex items-center justify-center text-white">
          Loading Checkout...
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}