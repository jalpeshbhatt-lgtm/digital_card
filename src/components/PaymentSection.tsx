"use client";

import PaymentQR from "./PaymentQR";
import { CardData } from "@/types/card";

interface PaymentSectionProps {
  card: CardData;
}

export default function PaymentSection({
  card,
}: PaymentSectionProps) {
  if (!card?.upiId) {
    return null;
  }

  const primaryColor =
    card.primaryColor || "#9333EA";

  return (
    <div className="p-4 border-t flex flex-col items-center">
      <h3
        className="text-lg font-bold mb-3 text-center"
        style={{ color: primaryColor }}
      >
        Make Payment
      </h3>

      <PaymentQR
        upiId={card.upiId}
        name={card.name}
      />

      <a
        href={`upi://pay?pa=${card.upiId}&pn=${encodeURIComponent(
          card.name
        )}&cu=INR`}
        className="block w-64 mx-auto mt-4 text-center text-white py-3 rounded-xl font-bold"
        style={{ backgroundColor: primaryColor }}
      >
        Pay Now
      </a>
    </div>
  );
}
