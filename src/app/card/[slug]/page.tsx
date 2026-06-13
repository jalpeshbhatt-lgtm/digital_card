import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import TemplateRenderer from "@/components/templates/TemplateRenderer";

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

  // FIX FOR NULL TEMPLATE
  if (!card.template) {
    return (
      <div className="p-10 text-red-500">
        Template not assigned to this card
      </div>
    );
  }

  return (
    <>
      <TemplateRenderer
        template={card.template.category}
        cardData={card}
      />
    </>
  );
}