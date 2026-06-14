
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import CardForm from "@/components/CardForm";

export default async function EditCardPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const card = await prisma.card.findUnique({
    where: {
      id,
    },
    include: {
      template: true,
    },
  });

  if (!card) {
    return notFound();
  }

  const parsedCard = {
    ...card,

    galleryImages: Array.isArray(
      card.galleryImages
    )
      ? (card.galleryImages as any[])
      : [],

    services: Array.isArray(card.services)
      ? (card.services as any[])
      : [],

    products: Array.isArray(card.products)
      ? (card.products as any[])
      : [],

    socialLinks: Array.isArray(
      card.socialLinks
    )
      ? (card.socialLinks as any[])
      : [],

    paymentLinks: Array.isArray(
      card.paymentLinks
    )
      ? (card.paymentLinks as any[])
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
    <div className="min-h-screen bg-[#0f172a] p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">
          Edit Card
        </h1>

        <CardForm initialData={parsedCard} />
      </div>
    </div>
  );
}