import { prisma } from "@/lib/prisma";

export async function canCreateCard(userId: string) {
  const subscription =
    await prisma.subscription.findUnique({
      where: {
        userId,
      },
    });

  if (!subscription) {
    return {
      allowed: false,
      message: "No active subscription",
    };
  }

  const cardCount = await prisma.card.count({
    where: {
      userId,
    },
  });

  const limit =
    subscription.cardLimit +
    subscription.extraCards;

  if (cardCount >= limit) {
    return {
      allowed: false,
      message:
        "Card limit reached. Upgrade your plan.",
    };
  }

  return {
    allowed: true,
  };
}