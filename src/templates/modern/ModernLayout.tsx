
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
  FaGlobe,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function ModernAuraLayout({
  card,
}: {
  card: CardData;
}) {
  const primaryColor =
    card.primaryColor || "#7C3AED";

  const secondaryColor =
    card.secondaryColor || "#0F172A";

  const [selectedImage, setSelectedImage] =
    useState<string | null>(null);

  return (
    <>
      <div
        className="max-w-[390px] mx-auto overflow-hidden rounded-[34px]"
        style={{
          background:
            "linear-gradient(180deg,#020617 0%,#0f172a 45%,#111827 100%)",
          boxShadow:
            "0 25px 70px rgba(0,0,0,0.65)",
          fontFamily:
            card.fontFamily || "Inter",
        }}
      >
       

{/* TOP HEADER */}

<div
  className="relative overflow-hidden rounded-b-[42px]"
  style={{
    background: `linear-gradient(
      135deg,
      ${primaryColor} 0%,
      #4f46e5 45%,
      #1e1b4b 100%
    )`,
  }}
>

  {/* HEADER HEIGHT */}

  <div className="relative px-6 pt-6 pb-8">

    {/* DOT PATTERN */}

    <div className="absolute top-6 left-6 opacity-20">

      <div className="grid grid-cols-8 gap-2">

        {Array.from({ length: 40 }).map(
          (_, i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 bg-white rounded-full"
            />
          )
        )}

      </div>

    </div>

    {/* CURVED GLOW LINES */}

    <div
      className="
        absolute
        left-[-10%]
        top-[110px]
        w-[120%]
        h-[180px]
        rounded-[100%]
        opacity-20
      "
      style={{
        border:
          "2px solid rgba(255,255,255,0.12)",
        transform:
          "rotate(8deg)",
      }}
    />

    <div
      className="
        absolute
        left-[-10%]
        top-[150px]
        w-[120%]
        h-[160px]
        rounded-[100%]
        opacity-10
      "
      style={{
        border:
          "2px solid rgba(255,255,255,0.10)",
        transform:
          "rotate(8deg)",
      }}
    />

    {/* LIGHT GLOW */}

    <div
      className="
        absolute
        top-[-120px]
        right-[-120px]
        w-80
        h-80
        rounded-full
        blur-3xl
        opacity-20
      "
      style={{
        background: "#ffffff",
      }}
    />

    {/* PROFILE CARD */}

    <div className="relative z-20 mt-40">

      <div
        className="
          rounded-[30px]
          border
          border-white/10
          bg-[#111827]/70
          backdrop-blur-2xl
          p-5
          shadow-2xl
        "
      >

        <div className="flex items-center gap-4">

          {/* IMAGE */}

          <div className="relative flex-shrink-0">

            {/* IMAGE GLOW */}

            <div
              className="
                absolute
                inset-0
                rounded-[22px]
                blur-xl
                opacity-40
              "
              style={{
                background: primaryColor,
              }}
            />

            <img
              src={
                card.profileImage ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  card.name
                )}`
              }
              alt={card.name}
              className="
                relative
                w-24
                h-24
                rounded-[22px]
                object-cover
                border-2
              "
              style={{
                borderColor:
                  "rgba(255,255,255,0.2)",
              }}
            />

          </div>

          {/* TEXT */}

          <div className="flex-1 min-w-0">

            <h1
              className="
                text-[30px]
                font-bold
                text-white
                leading-tight
                truncate
              "
            >
              {card.name}
            </h1>

            <p
              className="
                mt-2
                text-lg
                font-medium
              "
              style={{
                color: "#d8b4fe",
              }}
            >
              {card.designation}
            </p>

            <p
              className="
                text-sm
                text-gray-300
                mt-1
                truncate
              "
            >
              {card.company}
            </p>

          </div>

        </div>

      </div>

    </div>

  </div>

</div>


        {/* MAIN CONTENT */}

        <div className="px-5 pt-28 pb-8 text-white">

          {/* QUICK ACTIONS */}

          <div className="grid grid-cols-3 gap-3">

            {card.mobile && (
              <a
                href={`tel:${card.mobile}`}
                className="
                  rounded-2xl
                  p-4
                  flex
                  flex-col
                  items-center
                  justify-center
                  text-center
                  bg-white/5
                  border
                  border-white/10
                  hover:scale-[1.03]
                  transition
                "
              >
                <FaPhoneAlt
                  size={20}
                  color={primaryColor}
                />

                <span className="text-sm mt-2">
                  Call
                </span>
              </a>
            )}

            {card.email && (
              <a
                href={`mailto:${card.email}`}
                className="
                  rounded-2xl
                  p-4
                  flex
                  flex-col
                  items-center
                  justify-center
                  text-center
                  bg-white/5
                  border
                  border-white/10
                  hover:scale-[1.03]
                  transition
                "
              >
                <FaEnvelope
                  size={20}
                  color={primaryColor}
                />

                <span className="text-sm mt-2">
                  Email
                </span>
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
                className="
                  rounded-2xl
                  p-4
                  flex
                  flex-col
                  items-center
                  justify-center
                  text-center
                  bg-white/5
                  border
                  border-white/10
                  hover:scale-[1.03]
                  transition
                "
              >
                <FaGlobe
                  size={20}
                  color={primaryColor}
                />

                <span className="text-sm mt-2">
                  Website
                </span>
              </a>
            )}
          </div>

          {/* CONTACT INFO */}

          <div className="mt-8">

            <h2
              className="text-xl font-bold mb-5"
              style={{
                color: primaryColor,
              }}
            >
              Contact Information
            </h2>

            <div className="space-y-4">

              {card.mobile && (
                <div className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-2xl p-4">

                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{
                      background: `${primaryColor}22`,
                    }}
                  >
                    <FaPhoneAlt
                      color={primaryColor}
                    />
                  </div>

                  <div>
                    <p className="text-gray-400 text-sm">
                      Phone
                    </p>

                    <p className="text-gray-100">
                      {card.mobile}
                    </p>
                  </div>
                </div>
              )}

              {card.email && (
                <div className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-2xl p-4">

                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{
                      background: `${primaryColor}22`,
                    }}
                  >
                    <FaEnvelope
                      color={primaryColor}
                    />
                  </div>

                  <div>
                    <p className="text-gray-400 text-sm">
                      Email
                    </p>

                    <p className="text-gray-100 break-all">
                      {card.email}
                    </p>
                  </div>
                </div>
              )}

              {card.address && (
                <div className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-2xl p-4">

                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{
                      background: `${primaryColor}22`,
                    }}
                  >
                    <FaMapMarkerAlt
                      color={primaryColor}
                    />
                  </div>

                  <div>
                    <p className="text-gray-400 text-sm">
                      Address
                    </p>

                    <p className="text-gray-100">
                      {card.address}
                    </p>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* ABOUT */}

          {(card.aboutUs || card.bio) && (
            <div className="mt-10">

              <div
                className="
                rounded-[28px]
                p-6
                border
                border-white/10
                bg-gradient-to-br
                from-white/10
                to-white/5
              "
              >
                <h2
                  className="text-xl font-bold mb-4"
                  style={{
                    color: primaryColor,
                  }}
                >
                  About
                </h2>

                <p className="text-gray-300 leading-relaxed">
                  {card.aboutUs || card.bio}
                </p>
              </div>
            </div>
          )}

          {/* SOCIAL */}

          <div className="mt-10">

            <h2
              className="text-xl font-bold mb-5"
              style={{
                color: primaryColor,
              }}
            >
              Social Links
            </h2>

            <div className="flex flex-wrap gap-4">

              {card.facebook && (
                <a
                  href={card.facebook}
                  target="_blank"
                  className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:scale-110 transition"
                >
                  <FaFacebook size={22} />
                </a>
              )}

              {card.instagram && (
                <a
                  href={card.instagram}
                  target="_blank"
                  className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:scale-110 transition"
                >
                  <FaInstagram size={22} />
                </a>
              )}

              {card.linkedin && (
                <a
                  href={card.linkedin}
                  target="_blank"
                  className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:scale-110 transition"
                >
                  <FaLinkedin size={22} />
                </a>
              )}

              {card.youtube && (
                <a
                  href={card.youtube}
                  target="_blank"
                  className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:scale-110 transition"
                >
                  <FaYoutube size={22} />
                </a>
              )}

              {card.twitter && (
                <a
                  href={card.twitter}
                  target="_blank"
                  className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:scale-110 transition"
                >
                  <FaTwitter size={22} />
                </a>
              )}

              {card.telegram && (
                <a
                  href={card.telegram}
                  target="_blank"
                  className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:scale-110 transition"
                >
                  <FaTelegram size={22} />
                </a>
              )}
            </div>
          </div>

          {/* QR */}

          {card.showQrSection && (
            <div className="mt-10 flex justify-center">

              <div className="bg-white rounded-[28px] p-5">
                <CardQRCode
                  slug={card.slug ?? ""}
                  primaryColor={
                    primaryColor
                  }
                />
              </div>

            </div>
          )}

          {/* CONTACT ACTIONS */}

          <div className="mt-8">
            <ContactActions
              card={card}
            />
          </div>

{/* GALLERY */}

{(card.galleryImages?.length ?? 0) > 0 && (
  <div className="mt-10">
    <h2
      className="text-xl font-bold mb-5"
      style={{
        color: primaryColor,
      }}
    >
      Gallery
    </h2>

    <div className="grid grid-cols-2 gap-4">
      {(card.galleryImages ?? []).map(
        (
          image: string,
          index: number
        ) => (
          <div
            key={index}
            className="overflow-hidden rounded-xl"
          >
            <img
              src={image}
              alt={`Gallery ${index}`}
              className="w-full h-40 object-cover hover:scale-105 transition"
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
    <div className="mt-10">
      <h2
        className="text-xl font-bold mb-5"
        style={{
          color: primaryColor,
        }}
      >
        Services
      </h2>

      <div className="space-y-5">
        {(card.services ?? []).map(
          (
            service: any,
            index: number
          ) => (
            <div
              key={index}
              className="
                rounded-[28px]
                p-5
                border
                border-white/10
                bg-white/5
              "
            >
              {service.icon && (
                <img
                  src={service.icon}
                  alt=""
                  className="
                    w-16
                    h-16
                    rounded-2xl
                    object-cover
                    mb-4
                  "
                />
              )}

              <h3 className="text-xl font-bold text-white">
                {service.title}
              </h3>

              <p className="text-gray-300 mt-3">
                {service.description}
              </p>

              {service.price && (
                <div
                  className="text-2xl font-bold mt-4"
                  style={{
                    color: primaryColor,
                  }}
                >
                  ₹{service.price}
                </div>
              )}
            </div>
          )
        )}
      </div>
    </div>
)}

{/* PRODUCTS */}

{card.showProducts &&
  (card.products?.length ?? 0) > 0 && (
    <div className="mt-10">
      <h2
        className="text-xl font-bold mb-5"
        style={{
          color: primaryColor,
        }}
      >
        Products
      </h2>

      <div className="space-y-5">
        {(card.products ?? []).map(
          (
            product: any,
            index: number
          ) => (
            <div
              key={index}
              className="
                overflow-hidden
                rounded-[28px]
                border
                border-white/10
                bg-white/5
              "
            >
              {product.image && (
                <img
                  src={product.image}
                  alt=""
                  className="
                    w-full
                    h-52
                    object-cover
                    cursor-pointer
                  "
                  onClick={() =>
                    setSelectedImage(
                      product.image
                    )
                  }
                />
              )}

              <div className="p-5">
                <h3 className="text-xl font-bold text-white">
                  {product.name}
                </h3>

                <p className="text-gray-300 mt-3">
                  {product.description}
                </p>

                <div
                  className="text-2xl font-bold mt-4"
                  style={{
                    color: primaryColor,
                  }}
                >
                  ₹
                  {product.discountPrice ||
                    product.price}
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
)}

          {/* PAYMENT */}

          <div className="mt-10">
            <PaymentSection
              card={card}
            />
          </div>

          {/* LEAD FORM */}

          <div className="mt-10">
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
          className="
            fixed
            inset-0
            bg-black/90
            flex
            items-center
            justify-center
            z-[9999]
          "
          onClick={() =>
            setSelectedImage(null)
          }
        >

          <img
            src={selectedImage}
            alt=""
            className="
              max-w-[95vw]
              max-h-[90vh]
              rounded-[30px]
            "
          />

        </div>
      )}
    </>
  );
}