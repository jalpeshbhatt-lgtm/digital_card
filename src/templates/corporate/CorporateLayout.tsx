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
    fontFamily: card.fontFamily || "Inter",
    borderColor: card.primaryColor || "#2563eb",
    boxShadow: `0 8px 25px ${
      card.primaryColor || "#2563eb"
    }25`,
  }}
>
     {/* Header Section */}
<div
  className="relative text-center pb-6 shadow-lg"
style={{
  background: `linear-gradient(
    135deg,
    ${card.primaryColor || "#2563eb"} 0%,
    #7c6bc9 100%
  )`,
}}
>
    {/* Top spacing */}
  <div className="h-10" />

  {/* Profile Image */}
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

  {/* Name & Company INSIDE HEADER */}
  <div className="mt-4 px-4">
    <h1 className="text-2xl font-bold text-white">
      {card.name}
    </h1>

    <p className="text-white/90 font-semibold mt-1">
      {card.designation}
    </p>

    <p className="text-white/80 mt-1">
      {card.company}
    </p>
  </div>
</div>

{/* Remaining Card Content */}
<div className="p-6">

 {/* Contact Info */}
<div className="p-4">
  <h3
    className="text-lg font-bold mb-3 text-left"
    style={{
      color: card.primaryColor || "#2563eb",
      opacity: 0.9,
    }}
  >
    Contact Information
  </h3>

  <div className="text-left text-sm text-gray-700 space-y-2">
    {card.mobile && (
      <p>
        <span className="font-bold">Phone No :</span> {card.mobile}
      </p>
    )}

    {card.email && (
      <p>
        <span className="font-bold">Email ID :</span> {card.email}
      </p>
    )}

    {card.address && (
      <p>
        <span className="font-bold">Address :</span> {card.address}
      </p>
    )}
  </div>
</div>
      {/* Buttons */}
      <div className="p-4 space-y-3">
        {card.mobile && (
    <a
  href={`tel:${card.mobile}`}
  className="block w-full text-center py-3 font-semibold rounded"
  style={{
    backgroundColor: card.primaryColor || "#2563eb",
    color: "#ffffff",
  }}
>
  Call Now
</a>        )}
        {card.whatsapp && (
          <a
            href={`https://wa.me/${card.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className="block w-full bg-green-600 text-white py-3 rounded font-semibold text-center"
          >
            WhatsApp
          </a>
        )}
        {card.email && (
          <a
            href={`mailto:${card.email}`}
            className="block w-full bg-gray-700 text-white py-3 rounded font-semibold text-center"
          >
            Email
          </a>
        )}
{card.directionUrl && (
  <a
    href={card.directionUrl}
    target="_blank"
    rel="noreferrer"
    className="block w-full bg-blue-600 text-white py-3 rounded font-semibold text-center"
  >
    Direction
  </a>
)}

        {card.website && (
          <a
            href={card.website.startsWith("http") ? card.website : `https://${card.website}`}
            target="_blank"
            rel="noreferrer"
            className="block w-full bg-purple-600 text-white py-3 rounded font-semibold text-center"
          >
            Visit Website
          </a>
        )}
     
      </div>

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
<div
  className="flex justify-center gap-4 p-4 text-2xl"
  style={{ color: primaryColor }}
>
  {[
    card.facebook && (
      <a key="facebook" href={card.facebook} target="_blank" rel="noreferrer">
        <FaFacebook />
      </a>
    ),
    card.instagram && (
      <a key="instagram" href={card.instagram} target="_blank" rel="noreferrer">
        <FaInstagram />
      </a>
    ),
    card.linkedin && (
      <a key="linkedin" href={card.linkedin} target="_blank" rel="noreferrer">
        <FaLinkedin />
      </a>
    ),
    card.youtube && (
      <a key="youtube" href={card.youtube} target="_blank" rel="noreferrer">
        <FaYoutube />
      </a>
    ),
    card.twitter && (
      <a key="twitter" href={card.twitter} target="_blank" rel="noreferrer">
        <FaTwitter />
      </a>
    ),
    card.telegram && (
      <a key="telegram" href={card.telegram} target="_blank" rel="noreferrer">
        <FaTelegram />
      </a>
    ),
  ]}
</div>

{/* Save Contact & QR */}

{card.showQrSection && (
  <>
       <div className="p-4 flex justify-center">
      <CardQRCode
        slug={card.slug}
        primaryColor={card.primaryColor || "#9333EA"}
      />
    </div>
  </>
)}
<ContactActions card={card} />

{card.galleryImages?.length > 0 && (
  <div className="mt-8">
    <h2
      className="text-xl font-bold mb-4"
      style={{
        color:
          card.primaryColor || "#2563eb",
      }}
    >
      Gallery
    </h2>

    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {card.galleryImages.map(
  (image: string, index: number) => (
    <div
      key={`${image}-${index}`}
      className="h-40 bg-white border rounded-lg shadow flex items-center justify-center overflow-hidden"
    >
      <img
        src={image}
        alt={`Gallery ${index + 1}`}
        className="max-h-full max-w-full object-contain cursor-pointer hover:scale-105 transition"
        onClick={() => setSelectedImage(image)}
      />
    </div>
  )
)}
    </div>
  </div>
)}
  
  
{/* SERVICES */}

{card.showServices &&
  card.services?.length > 0 && (
    <div className="mt-8">
      <h2
        className="text-xl font-bold mb-4"
        style={{ color: primaryColor }}
      >
        Services
      </h2>

      <div className="space-y-4">
        {card.services.map(
          (service: any, index: number) => (
            <div
              key={index}
              className="border rounded-xl p-4 shadow bg-white"
            >
              {service.icon && (
                <img
                  src={service.icon}
                  alt={service.title}
                  className="w-16 h-16 object-cover rounded-lg mb-3"
                />
              )}

              <h3 className="font-bold text-lg">
                {service.title}
              </h3>

              {service.category && (
                <p className="text-gray-500 text-sm">
                  {service.category}
                </p>
              )}

              <p className="text-gray-600 text-sm mt-2">
                {service.description}
              </p>

              {service.price && (
                <div
                  className="font-bold text-xl mt-3"
                  style={{
                    color: primaryColor,
                  }}
                >
                  ₹ {service.price}
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
                  className="block w-full mt-4 text-center text-white py-2 rounded"
                  style={{
                    backgroundColor: primaryColor,
                  }}
                >
                  Enquire Now
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
  card.products?.length > 0 && (
    <div className="mt-8">
      <h2
        className="text-xl font-bold mb-4"
        style={{ color: primaryColor }}
      >
        Products
      </h2>

      <div className="space-y-4">
        {card.products.map(
          (product: any, index: number) => (
            <div
              key={index}
              className="border rounded-xl p-4 shadow bg-white"
            >
  {product.image && (
  <img
    src={product.image}
    alt={product.name}
    className="w-full h-40 object-cover rounded mb-3 cursor-pointer hover:scale-105 transition"
    onClick={() => setSelectedImage(product.image)}
  />
)}

              <h3 className="font-bold text-lg">
                {product.name}
              </h3>

              {product.category && (
                <p className="text-gray-500 text-sm">
                  {product.category}
                </p>
              )}

              <p className="text-gray-600 text-sm mt-2">
                {product.description}
              </p>

              <div className="mt-2">
                {product.discountPrice ? (
                  <>
                    <span className="line-through text-gray-400 mr-2">
                      ₹{product.price}
                    </span>

                    <span className="font-bold text-green-600">
                      ₹{product.discountPrice}
                    </span>
                  </>
                ) : (
                  <span
                    className="font-bold"
                    style={{
                      color: primaryColor,
                    }}
                  >
                    ₹{product.price}
                  </span>
                )}
              </div>

              {card.whatsapp && (
                <a
                  href={`https://wa.me/${card.whatsapp}?text=Hi, I want to order ${product.name}`}
                  target="_blank"
                  rel="noreferrer"
                  className="block mt-3 text-center text-white py-2 rounded"
                  style={{
                    backgroundColor: "#25D366",
                  }}
                >
                  Order on WhatsApp
                </a>
              )}
            </div>
          )
        )}
      </div>
    </div>
)}
<PaymentSection card={card} />

      {/* Inquiry Form */}
            <div className="p-4">
        <LeadForm
          cardId={card.id}
          primaryColor={card.primaryColor}
        />
      </div>
    </div>
  </div>

  {selectedImage && (
    <div
      className="fixed inset-0 bg-black/90 flex items-center justify-center z-[9999]"
      onClick={() => setSelectedImage(null)}
    >
      <button
        className="absolute top-5 right-5 text-white text-4xl"
        onClick={() => setSelectedImage(null)}
      >
        ×
      </button>

      <img
        src={selectedImage}
        alt="Preview"
        className="max-w-[95vw] max-h-[90vh] rounded-xl"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  )}

  
  </>
);
}