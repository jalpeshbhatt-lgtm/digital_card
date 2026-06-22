import { prisma } from "@/lib/prisma";

export async function canCreateCard(
  userId: string
) {
  const subscription =
    await prisma.subscription.findUnique({
      where: {
        userId,
      },
    });

  const cardCount =
    await prisma.card.count({
      where: {
        userId,
      },
    });

  if (!subscription) {
    return cardCount < 1;
  }

  return (
    cardCount <
    subscription.cardLimit +
      subscription.extraCards
  );
}