import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function PublicCardPage({
  params,
}: {
  params: { slug: string };
}) {
  const card = await prisma.card.findFirst({
    where: {
      slug: params.slug,
    },
    include: {
      template: true,
    },
  });

  if (!card) return notFound();

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl font-bold">{card.name}</h1>
      <p>{card.designation}</p>
      <p>{card.company}</p>

      {card.profileImage && (
        <img
          src={card.profileImage}
          className="w-40 h-40 rounded-xl mt-4"
        />
      )}

      <div className="mt-6">
        <h2 className="text-xl font-semibold">About</h2>
        <p>{card.aboutUs}</p>
      </div>
    </div>
  );
}