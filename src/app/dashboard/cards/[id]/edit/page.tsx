import { prisma } from "@/lib/prisma";
import CardForm from "@/components/CardForm";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditCardPage({
  params,
}: Props) {
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
    return (
      <div
        className="
          min-h-screen
          flex
          items-center
          justify-center
          bg-[#0f172a]
          text-white
          p-10
        "
      >
        <div
          className="
            w-full
            max-w-lg
            rounded-3xl
            border
            border-white/10
            bg-white/5
            p-10
            text-center
          "
        >
          <h1 className="text-4xl font-bold mb-4">
            Card Not Found
          </h1>

          <p className="text-gray-400">
            The requested digital card does not exist.
          </p>

          <a
            href="/dashboard/cards"
            className="
              inline-block
              mt-6
              px-6
              py-3
              rounded-2xl
              bg-gradient-to-r
              from-violet-600
              to-purple-600
              text-white
              font-semibold
            "
          >
            Back to My Cards
          </a>
        </div>
      </div>
    );
  }

  return (
    <div
      className="
        min-h-screen
        bg-[#0f172a]
      "
    >
      <div
        className="
          w-full
          px-4
          md:px-6
          xl:px-10
          py-6
        "
      >
        <CardForm
          initialData={card}
          cardId={card.id}
        />
      </div>
    </div>
  );
}