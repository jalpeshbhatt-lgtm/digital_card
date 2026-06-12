import { CardData } from "@/types/card";
import CardQRCode from "@/components/CardQRCode";
import LeadForm from "@/components/LeadForm";
import PaymentSection from "@/components/PaymentSection";
import ContactActions from "@/components/ContactActions";

import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaTwitter,
  FaTelegram,
} from "react-icons/fa";

function darkenColor(hex: string, percent: number) {
  const num = parseInt(hex.replace("#", ""), 16);

  const amt = Math.round(2.55 * percent);

  const r = Math.max((num >> 16) - amt, 0);
  const g = Math.max(((num >> 8) & 0xff) - amt, 0);
  const b = Math.max((num & 0xff) - amt, 0);

  return `rgb(${r}, ${g}, ${b})`;
}

export default function DoctorLayout({ card }: { card: CardData }) {
  const primaryColor = card.primaryColor || "#2563eb";
console.log("DOCTOR CARD DATA:", card);
  return (
    
  <div
  className="max-w-[360px] mx-auto bg-white shadow-lg rounded-xl overflow-hidden border-[6px]"
  style={{
    fontFamily: card.fontFamily || "Inter",
    borderColor: card.primaryColor || "#2563eb",
    boxShadow: `0 8px 25px ${
      card.primaryColor || "#2563eb"
    }25`,
  }}
>
     {/* Header Section */}
<div
  className="text-center p-6"
  style={{
    backgroundColor: "#fff",
    borderBottom: `4px solid ${primaryColor}`,
  }}
>
  <img
    src={
      card.profileImage ||
      `https://ui-avatars.com/api/?name=${encodeURIComponent(
        card.name
      )}`
    }
    alt={card.name}
    className="w-28 h-28 rounded-full mx-auto border-4"
    style={{ borderColor: primaryColor }}
  />

  <h1
    className="text-2xl font-bold mt-4"
    style={{ color: primaryColor }}
  >
    Dr. {card.name}
  </h1>

  <p className="font-semibold text-gray-700">
    {card.qualification}
  </p>

  <p className="text-gray-600">
    {card.specialization}
  </p>

  <p className="mt-2 font-medium">
    {card.company}
  </p>
</div>
      {/* Buttons */}
     <div className="p-4 space-y-3">
  {card.mobile && (
    <a
      href={`tel:${card.mobile}`}
      className="block w-full text-center py-3 rounded text-white font-semibold"
      style={{ backgroundColor: primaryColor }}
    >
      Call Clinic
    </a>
  )}

  {card.whatsapp && (
    <a
      href={`https://wa.me/${card.whatsapp}`}
      target="_blank"
      rel="noreferrer"
      className="block w-full text-center py-3 rounded bg-green-600 text-white font-semibold"
    >
      WhatsApp
    </a>
  )}

  {card.appointmentUrl && (
    <a
      href={card.appointmentUrl}
      target="_blank"
      rel="noreferrer"
      className="block w-full text-center py-3 rounded text-white font-semibold"
      style={{ backgroundColor: primaryColor }}
    >
      Book Appointment
    </a>
  )}

  {card.directionUrl && (
    <a
      href={card.directionUrl}
      target="_blank"
      rel="noreferrer"
      className="block w-full text-center py-3 rounded bg-blue-600 text-white font-semibold"
    >
      Get Directions
    </a>
  )}
</div>
{card.clinicTiming && (
  <div className="p-4">
    <h3
      className="text-lg font-bold mb-2"
      style={{ color: primaryColor }}
    >
      Clinic Timings
    </h3>

    <p>{card.clinicTiming}</p>
  </div>
)}

      {/* About Us & Bio */}
      {(card.aboutUs || card.bio) && (
        <div className="p-4 text-left">
          {card.aboutUs && (
            <>
              <h3
  className="text-lg font-bold mb-2"
  style={{ color: card.primaryColor || "#2563eb" }}
>
  About Us
</h3>              <p className="text-gray-700 leading-relaxed">{card.aboutUs}</p>
            </>
          )}
          {card.bio && (
            <>
     <h3
  className="text-lg font-bold mt-4 mb-2"
  style={{ color: card.primaryColor || "#2563eb" }}
>
  Bio
</h3>
              <p className="text-gray-700 leading-relaxed">{card.bio}</p>
            </>
          )}
        </div>
      )}

      {/* Social Icons */}
      <div className="flex justify-center gap-4 p-4 text-2xl text-gray-700">
        {card.facebook && <a href={card.facebook} target="_blank" rel="noreferrer"><FaFacebook /></a>}
        {card.instagram && <a href={card.instagram} target="_blank" rel="noreferrer"><FaInstagram /></a>}
        {card.linkedin && <a href={card.linkedin} target="_blank" rel="noreferrer"><FaLinkedin /></a>}
        {card.youtube && <a href={card.youtube} target="_blank" rel="noreferrer"><FaYoutube /></a>}
        {card.twitter && <a href={card.twitter} target="_blank" rel="noreferrer"><FaTwitter /></a>}
        {card.telegram && <a href={card.telegram} target="_blank" rel="noreferrer"><FaTelegram /></a>}
      </div>

<ContactActions card={card} />
                 {/* QR Code */}
      <div className="p-4 flex justify-center">
       <CardQRCode
  slug={card.slug}
  primaryColor={card.primaryColor || "#9333EA"}
/>
      </div>

<PaymentSection card={card} />

      {/* Inquiry Form */}
      <div className="p-4">
        <LeadForm
  cardId={card.id}
  primaryColor={card.primaryColor}
/>
      </div>
     </div>
);
}