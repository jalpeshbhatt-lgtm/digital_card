import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import CardForm from "@/components/CardForm";

export default async function EditCardPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!id) return notFound();

  const card = await prisma.card.findUnique({
    where: { id },
    include: { template: true },
  });

  if (!card) return notFound();

  return (
    <div className="min-h-screen bg-[#0f172a] p-8">
      <CardForm initialData={card} cardId={id} />
    </div>
  );
}