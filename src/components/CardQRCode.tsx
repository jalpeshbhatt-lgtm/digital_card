"use client";

import QRCode from "react-qr-code";

interface Props {
  slug: string;
  primaryColor?: string;
}

export default function CardQRCode({
  slug,
  primaryColor = "#9333EA",
}: Props) {
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL ||
    "http://localhost:3000";

  return (
    <div className="p-4 border-t flex flex-col items-center">
      <h3
        className="text-lg font-bold mb-3"
        style={{ color: primaryColor }}
      >
        Scan to Save Contact
      </h3>

      <QRCode
        value={`${baseUrl}/card/${slug}`}
        size={140}
      />
    </div>
  );
}