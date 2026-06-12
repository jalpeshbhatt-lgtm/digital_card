"use client";

interface ShareCardButtonProps {
  slug: string;
  primaryColor?: string;
}

export default function ShareCardButton({
  slug,
  primaryColor,
}: ShareCardButtonProps) {
  const handleShare = async () => {
    const url =
      `${window.location.origin}/card/${slug}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Digital Visiting Card",
          text: "Check out my digital business card",
          url,
        });
      } catch (err) {
        console.log("Share cancelled");
      }
    } else {
      await navigator.clipboard.writeText(url);
      alert("Card link copied to clipboard");
    }
  };

  return (
    <button
      onClick={handleShare}
      className="w-full py-3 rounded font-semibold text-white"
      style={{
        backgroundColor:
          primaryColor || "#2563eb",
      }}
    >
      Share Card
    </button>
  );
}