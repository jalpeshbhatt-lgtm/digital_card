import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import TemplateRenderer from "@/template-engine/TemplateRenderer";
import LeadForm from "@/components/LeadForm";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function PublicCard({
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

  console.log("CARD DATA:", card);

  return (
  <>
  <TemplateRenderer
  template={card.template.category}
  cardData={card}
/>

   
  </>
);
}