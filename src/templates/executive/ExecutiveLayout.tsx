import { CardData } from "@/types/card";
import CardQRCode from "@/components/CardQRCode";
import LeadForm from "@/components/LeadForm";
import PaymentSection from "@/components/PaymentSection";
import ContactActions from "@/components/ContactActions";

export default function ExecutiveLayout({
  card,
}: {
  card: CardData;
}) {
  return (
    <div className="max-w-md mx-auto bg-slate-900 text-white rounded-3xl overflow-hidden shadow-xl">

      <div className="p-8 text-center">

        <img
          src={
            card.profileImage ||
            `https://ui-avatars.com/api/?name=${card.name}`
          }
          className="w-28 h-28 rounded-full mx-auto"
        />

        <h1 className="text-3xl font-bold mt-4">
          {card.name}
        </h1>

        <p>{card.designation}</p>

        <p className="text-gray-400">
          {card.company}
        </p>

        <div className="mt-6 space-y-3">

          <a
            href={`tel:${card.mobile}`}
            className="block bg-blue-600 py-3 rounded-xl"
          >
            Call
          </a>

          <a
            href={`https://wa.me/${card.whatsapp}`}
            className="block bg-green-600 py-3 rounded-xl"
          >
            WhatsApp
          </a>

        </div>

      </div>
     <CardQRCode
  slug={card.slug}
  primaryColor={card.primaryColor || "#9333EA"}
/>
    </div>
  );
}