"use client";

import QRCode from "react-qr-code";

interface PaymentQRProps {
  upiId: string;
  name?: string;
}

export default function PaymentQR({
  upiId,
  name = "Business",
}: PaymentQRProps) {
  const upiLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(
    name
  )}&cu=INR`;

  return (
    <div className="flex flex-col items-center gap-3">
      <QRCode
        value={upiLink}
        size={180}
      />

      <p className="text-sm font-medium">
        {upiId}
      </p>
    </div>
  );
}