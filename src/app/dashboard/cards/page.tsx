import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import DeleteCardButton from "@/components/DeleteCardButton";

export default async function CardsPage() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (!token) {
    return (
      <div className="p-6 text-white">
        Please login first
      </div>
    );
  }

  const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET!
  ) as {
    userId: string;
  };

  const cards = await prisma.card.findMany({
    where: {
      userId: decoded.userId,
    },
    include: {
      template: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-8">
      {/* HEADER */}

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-white">
            My Cards
          </h1>

          <p className="text-gray-400 mt-2">
            Manage your digital business cards
          </p>
        </div>

        <a
          href="/dashboard/cards/new"
          className="
            bg-gradient-to-r
            from-violet-600
            to-purple-600
            text-white
            px-6
            py-3
            rounded-2xl
            font-semibold
            shadow-lg
          "
        >
          Create New Card
        </a>
      </div>

      {/* EMPTY STATE */}

      {cards.length === 0 ? (
        <div
          className="
            border
            border-white/10
            bg-white/5
            rounded-3xl
            p-10
            text-center
          "
        >
          <p className="text-xl text-gray-300">
            No cards found
          </p>

          <a
            href="/dashboard/cards/new"
            className="
              inline-block
              mt-6
              bg-gradient-to-r
              from-blue-600
              to-violet-600
              text-white
              px-6
              py-3
              rounded-2xl
              font-semibold
            "
          >
            Create Your First Card
          </a>
        </div>
      ) : (
        <div className="grid gap-6">
          {cards.map((card) => (
            <div
              key={card.id}
              className="
                rounded-3xl
                border
                border-white/10
                bg-white/5
                backdrop-blur-sm
                p-6
              "
            >
              {/* TOP */}

              <div className="flex justify-between items-start gap-6 flex-wrap">
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {card.name}
                  </h2>

                  {card.designation && (
                    <p className="text-gray-300 mt-2">
                      {card.designation}
                    </p>
                  )}

                  {card.company && (
                    <p className="text-gray-400">
                      {card.company}
                    </p>
                  )}

                  <div className="mt-4 space-y-1">
                    <p className="text-sm text-gray-400">
                      Template:{" "}
                      <span className="text-white">
                        {card.template?.name ||
                          "No Template"}
                      </span>
                    </p>

                    <p className="text-sm text-gray-400">
                      Slug:{" "}
                      <span className="text-white">
                        {card.slug}
                      </span>
                    </p>
                  </div>
                </div>

                {/* ACTIONS */}

                <div className="flex gap-3 flex-wrap">
                  <a
                    href={`/card/${card.slug}`}
                    target="_blank"
                    className="
                      bg-blue-600
                      hover:bg-blue-700
                      text-white
                      px-5
                      py-2.5
                      rounded-xl
                      font-medium
                    "
                  >
                    View Card
                  </a>

                  <a
                    href={`/dashboard/cards/${card.id}/edit`}
                    className="
                      bg-yellow-500
                      hover:bg-yellow-600
                      text-white
                      px-5
                      py-2.5
                      rounded-xl
                      font-medium
                    "
                  >
                    Edit
                  </a>

                  <DeleteCardButton
                    cardId={card.id}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}