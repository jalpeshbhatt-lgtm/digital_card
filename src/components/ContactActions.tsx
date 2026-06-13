"use client";

import { CardData } from "@/types/card";

interface Props {
  card: CardData;
}

export default function ContactActions({ card }: Props) {
  const primaryColor =
    card.primaryColor || "#9333EA";

  const generateVCard = () => {
    const vCard = `BEGIN:VCARD
VERSION:3.0
FN:${card.name || ""}
ORG:${card.company || ""}
TITLE:${card.designation || ""}
TEL:${card.mobile || ""}
EMAIL:${card.email || ""}
URL:${card.website || ""}
ADR:;;${card.address || ""};;;;
END:VCARD`;

    const blob = new Blob([vCard], {
      type: "text/vcard",
    });

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${card.name}.vcf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.URL.revokeObjectURL(url);
  };

  const shareContact = async () => {
    const shareUrl = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: card.name,
          text: `View ${card.name}'s Digital Card`,
          url: shareUrl,
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      await navigator.clipboard.writeText(
        shareUrl
      );
      alert("Link copied to clipboard");
    }
  };

  return (
    <div className="flex flex-col gap-3 items-center mt-4">
      <button
        onClick={generateVCard}
        className="w-64 py-3 rounded-xl text-white font-bold"
        style={{ backgroundColor: primaryColor }}
      >
        Save Contact
      </button>

      <button
        onClick={shareContact}
        className="w-64 py-3 rounded-xl border font-bold"
        style={{
          color: primaryColor,
          borderColor: primaryColor,
        }}
      >
        Share Contact
      </button>
    </div>
  );
}