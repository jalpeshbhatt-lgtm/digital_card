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

function shiftColor(hex: string, amount: number) {
  const num = parseInt(hex.replace("#", ""), 16);

  const r = Math.max(0, Math.min(255, (num >> 16) + amount));
  const g = Math.max(0, Math.min(255, ((num >> 8) & 255) + amount));
  const b = Math.max(0, Math.min(255, (num & 255) + amount));

  return (
    "#" +
    ((1 << 24) + (r << 16) + (g << 8) + b)
      .toString(16)
      .slice(1)
  );
}
export default function PortfolioLayout({
  card,
}: {
  card: CardData;
}) {
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

      {/* Hero Section */}
     <div
  className="text-white p-10 text-center"
  style={{
    background: `linear-gradient(
      135deg,
      ${shiftColor(card.primaryColor || "#8e78dd", -15)},
      ${shiftColor(card.primaryColor || "#8e78dd", 15)}
    )`,
  }}
>
        <img
          src={
            card.profileImage ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              card.name
            )}&background=random`
          }
          alt={card.name}
          className="w-32 h-32 rounded-full mx-auto border-4 border-white mb-6"
        />

       <h1
        className="text-3xl font-bold"
       >{card.name}
      </h1>

        <p className="text-xl font-bold mt-2">
          {card.designation}
        </p>

        <p className="font-bold text-gray-200">
          {card.company}
        </p>
      </div>

      {/* Content */}
      <div className="p-8">

        {/* Contact Information */}
        <div className="bg-gray-50 rounded-xl p-5 mb-6">

         
<h2
  className="text-lg font-bold mb-3 text-left"
  style={{
    color: card.primaryColor || "#2563eb",
    opacity: 0.9,
  }}
>
  Contact Information
</h2>
          <div className="space-y-2 text-gray-700">

            {card.mobile && (
              <p>
                <span className="font-bold">
                  Phone No :
                </span>{" "}
                {card.mobile}
              </p>
            )}

            {card.email && (
              <p>
                <span className="font-bold">
                  Email ID :
                </span>{" "}
                {card.email}
              </p>
            )}
            

            {card.address && (
              <p>
                <span className="font-bold">
                  Address :
                </span>{" "}
                {card.address}
              </p>
            )}

          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-8">

          {card.mobile && (
            <a
              href={`tel:${card.mobile}`}
              className="bg-blue-600 text-white text-center py-3 rounded-lg font-semibold"
            >
              Call Now
            </a>
          )}

          {card.whatsapp && (
            <a
              href={`https://wa.me/${card.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="bg-green-600 text-white text-center py-3 rounded-lg font-semibold"
            >
              WhatsApp
            </a>
          )}

          {card.email && (
            <a
              href={`mailto:${card.email}`}
              className="bg-gray-800 text-white text-center py-3 rounded-lg font-semibold"
            >
              Email
            </a>
          )}
{card.directionUrl && (
  <a
    href={card.directionUrl}
    target="_blank"
    rel="noreferrer"
    className="block w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-center"
  >
    Direction
  </a>
)}
          {card.website && (
            <a
              href={
                card.website.startsWith("http")
                  ? card.website
                  : `https://${card.website}`
              }
              target="_blank"
              rel="noreferrer"
              className="bg-purple-600 text-white text-center py-3 rounded-lg font-semibold"
            >
              Visit Website
            </a>
          )}
          <a
  href={`/api/vcf/${card.slug}`}
  className="bg-indigo-600 text-white text-center py-3 rounded-lg font-semibold"
>
  Save Contact
</a>
        </div>

        {/* About Us */}
        {card.aboutUs && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-3">
              About Us
            </h2>

            <p className="text-gray-700 leading-relaxed">
              {card.aboutUs}
            </p>
          </div>
        )}

        {/* Bio */}
        {card.bio && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-3">
              Professional Summary
            </h2>

            <p className="text-gray-700 leading-relaxed">
              {card.bio}
            </p>
          </div>
        )}

        {/* Social Media */}
        <div>
        

          <div className="flex flex-wrap gap-5 text-3xl">

            {card.facebook && (
              <a
                href={`https://${card.facebook.replace(
                  /^https?:\/\//,
                  ""
                )}`}
                target="_blank"
                rel="noreferrer"
              >
                <FaFacebook />
              </a>
            )}

            {card.instagram && (
              <a
                href={`https://${card.instagram.replace(
                  /^https?:\/\//,
                  ""
                )}`}
                target="_blank"
                rel="noreferrer"
              >
                <FaInstagram />
              </a>
            )}

            {card.linkedin && (
              <a
                href={`https://${card.linkedin.replace(
                  /^https?:\/\//,
                  ""
                )}`}
                target="_blank"
                rel="noreferrer"
              >
                <FaLinkedin />
              </a>
            )}

            {card.youtube && (
              <a
                href={`https://${card.youtube.replace(
                  /^https?:\/\//,
                  ""
                )}`}
                target="_blank"
                rel="noreferrer"
              >
                <FaYoutube />
              </a>
            )}

            {card.twitter && (
              <a
                href={`https://${card.twitter.replace(
                  /^https?:\/\//,
                  ""
                )}`}
                target="_blank"
                rel="noreferrer"
              >
                <FaTwitter />
              </a>
            )}

            {card.telegram && (
              <a
                href={`https://${card.telegram.replace(
                  /^https?:\/\//,
                  ""
                )}`}
                target="_blank"
                rel="noreferrer"
              >
                <FaTelegram />
              </a>
            )}

          </div>
        </div>
        <ContactActions card={card} />
        <div className="mt-6 flex justify-center">

         <CardQRCode
  slug={card.slug}
  primaryColor={card.primaryColor || "#9333EA"}
/>

  </div>

{/* Payment Section */}
<PaymentSection card={card} />

{/* Inquiry Form */}
<LeadForm
  cardId={card.id}
  primaryColor={card.primaryColor}
/>
       </div>
    </div>
  );
}