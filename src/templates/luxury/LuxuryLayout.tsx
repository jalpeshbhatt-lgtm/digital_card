"use client";

import { useState } from "react";
import { CardData } from "@/types/card";
import CardQRCode from "@/components/CardQRCode";
import LeadForm from "@/components/LeadForm";
import PaymentSection from "@/components/PaymentSection";
import ContactActions from "@/components/ContactActions";
import ShareCardButton from "@/components/ShareCardButton";

import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaTwitter,
  FaTelegram,
} from "react-icons/fa";

export default function LuxuryLayout({
  card,
}: {
  card: CardData;
}) {
  const primaryColor =
    card.primaryColor || "#D4AF37";

  const secondaryColor =
    card.secondaryColor || "#111111";

  const [selectedImage, setSelectedImage] =
    useState<string | null>(null);

  return (
    <>
      <div
        className="max-w-[360px] mx-auto rounded-2xl overflow-hidden border-4"
        style={{
          fontFamily:
            card.fontFamily || "Inter",
          backgroundColor: "#111111",
          borderColor: primaryColor,
          boxShadow: `0 10px 30px ${primaryColor}55`,
        }}
      >
        {/* HEADER */}

        <div
          className="relative text-center pb-8"
          style={{
            background: `linear-gradient(
              135deg,
              #111111 0%,
              ${primaryColor} 100%
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
                )}`
              }
              alt={card.name}
              className="w-28 h-28 rounded-full border-4 object-cover"
              style={{
                borderColor: primaryColor,
              }}
            />
          </div>

          <div className="mt-4 px-4">
            <h1 className="text-3xl font-bold text-white">
              {card.name}
            </h1>

            <p className="text-yellow-200 mt-2">
              {card.designation}
            </p>

            <p className="text-yellow-100">
              {card.company}
            </p>
          </div>
        </div>

        {/* BODY */}

        <div className="p-6 text-white">

          {/* CONTACT INFO */}

          <div className="mb-6">
            <h2
              className="text-xl font-bold mb-4"
              style={{
                color: primaryColor,
              }}
            >
              Contact Information
            </h2>

            <div className="space-y-2 text-gray-300">

              {card.mobile && (
                <p>
                  <strong>Phone :</strong>{" "}
                  {card.mobile}
                </p>
              )}

              {card.email && (
                <p>
                  <strong>Email :</strong>{" "}
                  {card.email}
                </p>
              )}

              {card.address && (
                <p>
                  <strong>Address :</strong>{" "}
                  {card.address}
                </p>
              )}

            </div>
          </div>

          {/* ACTION BUTTONS */}

          <div className="space-y-3">

            {card.mobile && (
              <a
                href={`tel:${card.mobile}`}
                className="block w-full py-3 rounded-lg text-center font-bold"
                style={{
                  backgroundColor:
                    primaryColor,
                  color: "#111111",
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
                className="block w-full py-3 rounded-lg text-center font-bold bg-green-600 text-white"
              >
                WhatsApp
              </a>
            )}

            {card.email && (
              <a
                href={`mailto:${card.email}`}
                className="block w-full py-3 rounded-lg text-center font-bold bg-gray-700"
              >
                Email
              </a>
            )}

            {card.directionUrl && (
              <a
                href={card.directionUrl}
                target="_blank"
                rel="noreferrer"
                className="block w-full py-3 rounded-lg text-center font-bold bg-blue-600"
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
    className="block w-full text-center py-3 rounded-lg font-semibold"
    style={{
      backgroundColor: "#D4AF37",
      color: "#000",
    }}
  >
    Visit Website
  </a>
)}   </div>

          {/* ABOUT */}

          {(card.aboutUs ||
            card.bio) && (
            <div className="mt-8">

              {card.aboutUs && (
                <>
                  <h2
                    className="text-xl font-bold mb-3"
                    style={{
                      color:
                        primaryColor,
                    }}
                  >
                    About Us
                  </h2>

                  <p className="text-gray-300 leading-relaxed">
                    {card.aboutUs}
                  </p>
                </>
              )}

              {card.bio && (
                <>
                  <h2
                    className="text-xl font-bold mt-6 mb-3"
                    style={{
                      color:
                        primaryColor,
                    }}
                  >
                    Bio
                  </h2>

                  <p className="text-gray-300 leading-relaxed">
                    {card.bio}
                  </p>
                </>
              )}

            </div>
          )}

          {/* SOCIAL */}

          <div
            className="flex justify-center gap-5 text-3xl mt-8"
            style={{
              color: primaryColor,
            }}
          >
            {card.facebook && (
              <a
                href={card.facebook}
                target="_blank"
              >
                <FaFacebook />
              </a>
            )}

            {card.instagram && (
              <a
                href={card.instagram}
                target="_blank"
              >
                <FaInstagram />
              </a>
            )}

            {card.linkedin && (
              <a
                href={card.linkedin}
                target="_blank"
              >
                <FaLinkedin />
              </a>
            )}

            {card.youtube && (
              <a
                href={card.youtube}
                target="_blank"
              >
                <FaYoutube />
              </a>
            )}

            {card.twitter && (
              <a
                href={card.twitter}
                target="_blank"
              >
                <FaTwitter />
              </a>
            )}

            {card.telegram && (
              <a
                href={card.telegram}
                target="_blank"
              >
                <FaTelegram />
              </a>
            )}
          </div>

          {/* QR */}

          {card.showQrSection && (
            <div className="mt-8 flex justify-center">
              <CardQRCode
                slug={card.slug ?? ""}
                primaryColor={
                  primaryColor
                }
              />
            </div>
          )}

          <div className="mt-6">
            <ContactActions
              card={card}
            />
          </div>

        

          {/* GALLERY */}

        {(card.galleryImages?.length ?? 0) > 0 && (
            <div className="mt-8">
              <h2
                className="text-xl font-bold mb-4"
                style={{
                  color: primaryColor,
                }}
              >
                Gallery
              </h2>

              <div className="grid grid-cols-2 gap-4">
               {(card.galleryImages ?? []).map(
  (image: string, index: number) => (
    
                    <div
                      key={index}
                      className="bg-black border rounded-xl overflow-hidden flex items-center justify-center"
                      style={{
                        borderColor:
                          primaryColor,
                      }}
                    >
                      <img
                        src={image}
                        alt=""
                        className="w-full h-40 object-cover cursor-pointer hover:scale-105 transition"
                        onClick={() =>
                          setSelectedImage(
                            image
                          )
                        }
                      />
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {/* SERVICES */}

       {card.showServices &&
  (card.services?.length ?? 0) > 0 && (

              <div className="mt-8">
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
                 {(card.services ?? []).map(
                    (
                      service: any,
                      index: number
                    ) => (
                      <div
                        key={index}
                        className="border rounded-xl p-4"
                        style={{
                          borderColor:
                            primaryColor,
                          backgroundColor:
                            "#1a1a1a",
                        }}
                      >
                        {service.icon && (
                          <img
                            src={
                              service.icon
                            }
                            alt=""
                            className="w-16 h-16 rounded-lg object-cover mb-3"
                          />
                        )}

                        <h3 className="font-bold text-lg">
                          {
                            service.title
                          }
                        </h3>

                        {service.category && (
                          <p className="text-yellow-200 text-sm">
                            {
                              service.category
                            }
                          </p>
                        )}

                        <p className="text-gray-300 mt-2">
                          {
                            service.description
                          }
                        </p>

                        {service.price && (
                          <div
                            className="font-bold text-xl mt-3"
                            style={{
                              color:
                                primaryColor,
                            }}
                          >
                            ₹
                            {
                              service.price
                            }
                          </div>
                        )}

                        {card.whatsapp && (
                          <a
                            href={`https://wa.me/${card.whatsapp}?text=${encodeURIComponent(
                              `Hi,

I am interested in your service.

Service: ${service.title}
Price: ₹${service.price}

Please provide more details.`
                            )}`}
                            target="_blank"
                            rel="noreferrer"
                            className="block mt-4 text-center py-3 rounded-lg font-bold"
                            style={{
                              backgroundColor:
                                primaryColor,
                              color:
                                "#111111",
                            }}
                          >
                            Enquire
                            Now
                          </a>
                        )}
                      </div>
                    )
                  )}
                </div>
              </div>
            )}


{/* PRODUCTS */}

{card.showProducts &&
  (card.products ?? []).map(
  (product: any, index: number) => (
    <div
      key={index}
      className="border rounded-2xl p-5 shadow-lg"
      style={{
        background:
          "linear-gradient(135deg,#111111,#1a1a1a)",
        borderColor:
          card.primaryColor || "#d4af37",
      }}
    >
      {product.image && (
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-44 object-cover rounded-xl mb-4"
        />
      )}

      <h3 className="font-bold text-xl text-white">
        {product.name}
      </h3>

      {product.category && (
        <p className="text-gray-400 text-sm mt-1">
          {product.category}
        </p>
      )}

      <p className="text-gray-300 text-sm mt-3 leading-relaxed">
        {product.description}
      </p>

      <div
        className="font-bold text-3xl mt-4"
        style={{
          color:
            card.primaryColor || "#d4af37",
        }}
      >
        ₹
        {product.discountPrice ||
          product.price}
      </div>

      {card.whatsapp && (
        <a
          href={`https://wa.me/${card.whatsapp}?text=${encodeURIComponent(
            `Hi, I want to order ${product.name}`
          )}`}
          target="_blank"
          rel="noreferrer"
          className="block w-full mt-5 text-center text-black py-3 rounded-xl font-bold transition"
          style={{
            background:
              card.primaryColor || "#d4af37",
          }}
        >
          Order Now
        </a>
      )}
    </div>
  )
)}

          {/* PAYMENT */}

          <div className="mt-8">
            <PaymentSection
              card={card}
            />
          </div>

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

      {/* IMAGE POPUP */}

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-[9999]"
          onClick={() =>
            setSelectedImage(
              null
            )
          }
        >
          <button
            className="absolute top-5 right-5 text-blask text-5xl"
            onClick={() =>
              setSelectedImage(
                null
              )
            }
          >
            ×
          </button>

          <img
            src={selectedImage}
            alt=""
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
