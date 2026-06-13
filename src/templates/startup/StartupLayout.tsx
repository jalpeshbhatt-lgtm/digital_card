import { CardData } from "@/types/card";
import CardQRCode from "@/components/CardQRCode";
import PaymentSection from "@/components/PaymentSection";
import LeadForm from "@/components/LeadForm";
import ContactActions from "@/components/ContactActions";


import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaTwitter,
  FaTelegram,
} from "react-icons/fa";

export default function StartupLayout({
  card,
}: {
  card: CardData;
}) {
  return (
    <div className="max-w-md mx-auto bg-white rounded-3xl overflow-hidden shadow-2xl">

      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-cyan-500 p-8 text-center text-white">

        <img
          src={
            card.profileImage ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              card.name
            )}&background=random`
          }
          alt={card.name}
          className="w-28 h-28 rounded-full border-4 border-white mx-auto"
        />

        <h1 className="text-3xl font-bold mt-4">
          {card.name}
        </h1>

        <p className="font-bold mt-2 text-lg">
          {card.designation}
        </p>

        <p className="font-bold opacity-90">
          {card.company}
        </p>
      </div>

      <div className="p-6">

        {/* Contact Information */}
        <div className="bg-gray-50 rounded-xl p-4 mb-5">

          <h3 className="font-bold text-lg mb-3">
            Contact Information
          </h3>

          <div className="space-y-2 text-gray-700 text-left">

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
        <div className="space-y-3">

          {card.mobile && (
            <a
              href={`tel:${card.mobile}`}
              className="block w-full text-center bg-indigo-600 text-white py-3 rounded-xl font-semibold"
            >
              Call Now
            </a>
          )}

          {card.whatsapp && (
            <a
              href={`https://wa.me/${card.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="block w-full text-center bg-green-600 text-white py-3 rounded-xl font-semibold"
            >
              WhatsApp
            </a>
          )}

          {card.email && (
            <a
              href={`mailto:${card.email}`}
              className="block w-full text-center bg-gray-800 text-white py-3 rounded-xl font-semibold"
            >
              Email
            </a>
          )}
{card.directionUrl && (
  <a
    href={card.directionUrl}
    target="_blank"
    rel="noreferrer"
    className="block w-full bg-blue-600 text-white py-3 rounded-xl font-semibold text-center"
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
              className="block w-full text-center bg-cyan-600 text-white py-3 rounded-xl font-semibold"
            >
              Visit Website
            </a>
          )}

          {/* Save Contact */}
          <a
            href={`/api/vcf/${card.slug}`}
            className="block w-full text-center bg-indigo-700 text-white py-3 rounded-xl font-semibold"
          >
            Save Contact
          </a>

        </div>

        {/* About Us */}
        {card.aboutUs && (
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-3">
              About Us
            </h3>

            <p className="text-gray-700 leading-relaxed">
              {card.aboutUs}
            </p>
          </div>
        )}

        {/* Professional Summary */}
        {card.bio && (
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-3">
              Professional Summary
            </h3>

            <p className="text-gray-700 leading-relaxed">
              {card.bio}
            </p>
          </div>
        )}

        {/* Social Media */}
        <div className="mt-8">

          <h3 className="text-xl font-bold mb-4 text-center">
            Connect With Us
          </h3>

          <div className="flex justify-center gap-5 text-3xl text-indigo-600">

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
        {/* QR Code */}
        <div className="flex justify-center mt-8">
        <CardQRCode
  slug={card.slug ?? ""}
  primaryColor={card.primaryColor || "#9333EA"}
/>
         </div>
         
{/* Payment Section */}
<PaymentSection card={card} />
         </div>
         
      {/* Lead Form */}

      <div className="p-6">
        <LeadForm
          cardId={card.id ?? ""}
          primaryColor={
            card.primaryColor || "#7C3AED"
          }
        />
      </div>

    </div>
  );
}
