
"use client";

import { useState } from "react";
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

export default function CorporateLayout({
  card,
}: {
  card: CardData;
}) {
  const primaryColor =
    card.primaryColor || "#2563eb";

  const [selectedImage, setSelectedImage] =
    useState<string | null>(null);

  return (
    <>
      <div
        className="max-w-[360px] mx-auto bg-white shadow-lg rounded-xl overflow-hidden border-[6px]"
        style={{
          fontFamily:
            card.fontFamily || "Inter",
          borderColor: primaryColor,
          boxShadow: `0 8px 25px ${primaryColor}25`,
        }}
      >
        {/* HEADER */}
        <div
          className="relative text-center pb-6 shadow-lg"
          style={{
            background: `linear-gradient(
              135deg,
              ${primaryColor} 0%,
              #7c6bc9 100%
            )`,
          }}
        >
          <div className="h-10" />

          <div className="flex justify-center">
            <img
              src={
                card.profileImage ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  card.name
                )}&background=random`
              }
              alt={card.name}
              className="w-24 h-24 rounded-full border-4 border-white"
            />
          </div>

          <div className="mt-4 px-4">
            <h1 className="text-2xl font-bold text-white">
              {card.name}
            </h1>

            {card.designation && (
              <p className="text-white/90 font-semibold mt-1">
                {card.designation}
              </p>
            )}

            {card.company && (
              <p className="text-white/80 mt-1">
                {card.company}
              </p>
            )}
          </div>
        </div>

        <div className="p-6">

          {/* BIO */}
          {card.bio && (
            <div className="mb-6">
              <h2
                className="text-xl font-bold mb-2"
                style={{ color: primaryColor }}
              >
                Bio
              </h2>

              <p className="text-gray-700 leading-7">
                {card.bio}
              </p>
            </div>
          )}

          {/* ABOUT */}
          {(card.about || card.aboutUs) && (
            <div className="mb-6">
              <h2
                className="text-xl font-bold mb-2"
                style={{ color: primaryColor }}
              >
                About Us
              </h2>

              <p className="text-gray-700 leading-7">
                {card.about || card.aboutUs}
              </p>
            </div>
          )}

          {/* CONTACT INFO */}
          <div className="mb-6">
            <h2
              className="text-xl font-bold mb-3"
              style={{ color: primaryColor }}
            >
              Contact Information
            </h2>

            <div className="space-y-2 text-gray-700">
              {card.mobile && (
                <p>
                  <strong>Phone:</strong>{" "}
                  {card.mobile}
                </p>
              )}

              {card.email && (
                <p>
                  <strong>Email:</strong>{" "}
                  {card.email}
                </p>
              )}

              {card.website && (
                <p>
                  <strong>Website:</strong>{" "}
                  {card.website}
                </p>
              )}

              {card.address && (
                <p>
                  <strong>Address:</strong>{" "}
                  {card.address}
                </p>
              )}
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="space-y-3 mb-8">
            {card.mobile && (
              <a
                href={`tel:${card.mobile}`}
                className="block w-full text-center py-3 rounded text-white font-semibold"
                style={{
                  backgroundColor:
                    primaryColor,
                }}
              >
                Call Now
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

            {card.email && (
              <a
                href={`mailto:${card.email}`}
                className="block w-full text-center py-3 rounded bg-gray-700 text-white font-semibold"
              >
                Send Email
              </a>
            )}

            {card.directionUrl && (
              <a
                href={card.directionUrl}
                target="_blank"
                rel="noreferrer"
                className="block w-full text-center py-3 rounded bg-blue-600 text-white font-semibold"
              >
                Get Direction
              </a>
            )}

            {card.website && (
              <a
                href={
                  card.website.startsWith(
                    "http"
                  )
                    ? card.website
                    : `https://${card.website}`
                }
                target="_blank"
                rel="noreferrer"
                className="block w-full text-center py-3 rounded bg-purple-600 text-white font-semibold"
              >
                Visit Website
              </a>
            )}
          </div>

          {/* SOCIAL LINKS */}
          <div
            className="flex justify-center gap-4 text-2xl mb-8"
            style={{ color: primaryColor }}
          >
            {card.facebook && (
              <a
                href={card.facebook}
                target="_blank"
                rel="noreferrer"
              >
                <FaFacebook />
              </a>
            )}

            {card.instagram && (
              <a
                href={card.instagram}
                target="_blank"
                rel="noreferrer"
              >
                <FaInstagram />
              </a>
            )}

            {card.linkedin && (
              <a
                href={card.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                <FaLinkedin />
              </a>
            )}

            {card.youtube && (
              <a
                href={card.youtube}
                target="_blank"
                rel="noreferrer"
              >
                <FaYoutube />
              </a>
            )}

            {card.twitter && (
              <a
                href={card.twitter}
                target="_blank"
                rel="noreferrer"
              >
                <FaTwitter />
              </a>
            )}

            {card.telegram && (
              <a
                href={card.telegram}
                target="_blank"
                rel="noreferrer"
              >
                <FaTelegram />
              </a>
            )}
          </div>

          {/* QR */}
          {card.showQrSection && (
            <div className="mb-8">
              <div className="flex justify-center">
                <CardQRCode
                  slug={card.slug ?? ""}
                  primaryColor={
                    primaryColor
                  }
                />
              </div>

              <div className="mt-4">
                <ContactActions
                  card={card}
                />
              </div>
            </div>
          )}

          {/* GALLERY */}
          {(card.galleryImages?.length ??
            0) > 0 && (
            <div className="mb-8">
              <h2
                className="text-xl font-bold mb-4"
                style={{
                  color: primaryColor,
                }}
              >
                Gallery
              </h2>

              <div className="grid grid-cols-2 gap-4">
                {(card.galleryImages ??
                  []).map(
                  (
                    image: string,
                    index: number
                  ) => (
                    <img
                      key={index}
                      src={image}
                      alt=""
                      className="rounded-lg cursor-pointer hover:scale-105 transition"
                      onClick={() =>
                        setSelectedImage(
                          image
                        )
                      }
                    />
                  )
                )}
              </div>
            </div>
          )}

          {/* SERVICES */}
          {card.showServices &&
            (card.services?.length ??
              0) > 0 && (
              <div className="mb-8">
                <h2
                  className="text-xl font-bold mb-4"
                  style={{
                    color:
                      primaryColor,
                  }}
                >
                  Services
                </h2>

                <div className="space-y-4">
                  {(card.services ??
                    []).map(
                    (
                      service: any,
                      index: number
                    ) => (
                      <div
                        key={index}
                        className="border rounded-xl p-4"
                      >
                        <h3 className="font-bold text-lg">
                          {
                            service.title
                          }
                        </h3>

                        <p className="text-gray-600 mt-2">
                          {
                            service.description
                          }
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

          {/* PRODUCTS */}
          {card.showProducts &&
            (card.products?.length ??
              0) > 0 && (
              <div className="mb-8">
                <h2
                  className="text-xl font-bold mb-4"
                  style={{
                    color:
                      primaryColor,
                  }}
                >
                  Products
                </h2>

                <div className="space-y-4">
                  {(card.products ??
                    []).map(
                    (
                      product: any,
                      index: number
                    ) => (
                      <div
                        key={index}
                        className="border rounded-xl p-4"
                      >
                        {product.image && (
                          <img
                            src={
                              product.image
                            }
                            alt=""
                            className="rounded-lg mb-3"
                          />
                        )}

                        <h3 className="font-bold text-lg">
                          {
                            product.name
                          }
                        </h3>

                        <p className="text-gray-600 mt-2">
                          {
                            product.description
                          }
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

          {/* YOUTUBE */}
          {card.youtubeVideo && (
            <div className="mb-8">
              <iframe
                src={card.youtubeVideo}
                className="w-full h-64 rounded-xl"
                allowFullScreen
              />
            </div>
          )}

          {/* DOCUMENTS */}
          {(card.documents?.length ??
            0) > 0 && (
            <div className="mb-8">
              <h2
                className="text-xl font-bold mb-4"
                style={{
                  color: primaryColor,
                }}
              >
                Documents
              </h2>

              {(card.documents ??
                []).map(
                (
                  doc: any,
                  index: number
                ) => (
                  <a
                    key={index}
                    href={doc.file}
                    target="_blank"
                    className="block underline mb-2"
                  >
                    {doc.name}
                  </a>
                )
              )}
            </div>
          )}

          {/* PAYMENT */}
          <PaymentSection
            card={card}
          />

          {/* LEAD FORM */}
          <div className="mt-8">
            <LeadForm
              cardId={card.id ?? ""}
              primaryColor={
                primaryColor
              }
            />
          </div>
        </div>
      </div>

      {/* IMAGE PREVIEW */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-[9999]"
          onClick={() =>
            setSelectedImage(null)
          }
        >
          <button
            className="absolute top-5 right-5 text-white text-4xl"
            onClick={() =>
              setSelectedImage(null)
            }
          >
            ×
          </button>

          <img
            src={selectedImage}
            alt="Preview"
            className="max-w-[95vw] max-h-[90vh] rounded-xl"
            onClick={(e) =>
              e.stopPropagation()
            }
          />
        </div>
      )}
    </>
  );
}