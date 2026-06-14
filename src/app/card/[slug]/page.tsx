
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

import TemplateRenderer from "@/template-engine/renderer";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CardPage({
  params,
}: Props) {
  const { slug } = await params;

  const card = await prisma.card.findUnique({
    where: {
      slug,
    },

    include: {
      template: true,
    },
  });

  if (!card) {
    notFound();
  }



const parsedCard = {
  ...card,

  galleryImages: Array.isArray(
    card.galleryImages
  )
    ? (card.galleryImages as string[])
    : [],

  services: Array.isArray(card.services)
    ? (card.services as any[])
    : [],

  products: Array.isArray(card.products)
    ? (card.products as any[])
    : [],

  paymentLinks: Array.isArray(
    card.paymentLinks
  )
    ? (card.paymentLinks as any[])
    : [],

  socialLinks: Array.isArray(
    card.socialLinks
  )
    ? (card.socialLinks as any[])
    : [],

  testimonials: Array.isArray(
    card.testimonials
  )
    ? (card.testimonials as any[])
    : [],

  documents: Array.isArray(card.documents)
    ? (card.documents as any[])
    : [],
};


  return (
    <TemplateRenderer
      template={
        card.template?.category ||
        "corporate"
      }
      cardData={parsedCard}
    />
  );
}
