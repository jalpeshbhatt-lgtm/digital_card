import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export default async function DashboardPage() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (!token) {
    return (
      <div className="p-8 text-red-500">
        Not authenticated
      </div>
    );
  }

  const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET!
  ) as {
    userId: string;
  };

  const userId = decoded.userId;

  const totalCards = await prisma.card.count({
    where: {
      userId,
    },
  });

  const totalViews = await prisma.card.aggregate({
    where: {
      userId,
    },
    _sum: {
      views: true,
    },
  });

  const totalLeads = await prisma.lead.count({
    where: {
      card: {
        userId,
      },
    },
  });

  const startOfMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1
  );

  const monthlyLeads = await prisma.lead.count({
    where: {
      createdAt: {
        gte: startOfMonth,
      },
      card: {
        userId,
      },
    },
  });

  const recentLeads = await prisma.lead.findMany({
    where: {
      card: {
        userId,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });

  const subscription =
    await prisma.subscription.findUnique({
      where: {
        userId,
      },
    });

  const cardLimit =
    (subscription?.cardLimit || 0) +
    (subscription?.extraCards || 0);

  const usedPercentage =
    cardLimit > 0
      ? Math.min(
          (totalCards / cardLimit) * 100,
          100
        )
      : 0;

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-8">
      {/* Header */}

      <div className="mb-10">
        <h1 className="text-5xl font-bold">
          Dashboard
        </h1>

        <p className="text-gray-400 mt-3 text-lg">
          Manage your digital business card platform
        </p>
      </div>

      {/* Analytics */}

      <div className="grid md:grid-cols-4 gap-6 mb-10">
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
          <p className="text-gray-400">
            Total Cards
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {totalCards}
          </h2>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
          <p className="text-gray-400">
            Total Views
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {totalViews._sum.views || 0}
          </h2>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
          <p className="text-gray-400">
            Total Leads
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {totalLeads}
          </h2>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
          <p className="text-gray-400">
            Leads This Month
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {monthlyLeads}
          </h2>
        </div>
      </div>

      {/* Subscription */}

      <div className="bg-white/5 border border-white/10 rounded-3xl p-6 mb-10">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">
              Subscription
            </h2>

            <p className="text-gray-400 mt-2">
              Plan:{" "}
              <span className="text-white font-semibold">
                {subscription?.plan ||
                  "No Plan"}
              </span>
            </p>

            <p className="text-gray-400">
              Cards Used: {totalCards} /{" "}
              {cardLimit}
            </p>

            <p className="text-gray-400">
              Expires:
              {" "}
              {subscription?.expiryDate
                ? new Date(
                    subscription.expiryDate
                  ).toLocaleDateString()
                : "N/A"}
            </p>
          </div>

          <Link
            href="/pricing"
            className="px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 transition font-semibold"
          >
            Upgrade Plan
          </Link>
        </div>

        {/* Progress Bar */}

        <div className="mt-6">
          <div className="w-full h-4 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full bg-violet-600"
              style={{
                width: `${usedPercentage}%`,
              }}
            />
          </div>

          <p className="text-sm text-gray-400 mt-2">
            {totalCards} of {cardLimit} cards used
          </p>
        </div>
      </div>

      {/* Actions */}

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <Link
          href="/dashboard/cards/new"
          className="rounded-3xl border border-white/10 bg-white/5 p-8 hover:bg-white/10 transition"
        >
          <h2 className="text-2xl font-bold">
            Create New Card
          </h2>

          <p className="text-gray-400 mt-3">
            Create and publish a new
            digital business card.
          </p>
        </Link>

        <Link
          href="/dashboard/cards"
          className="rounded-3xl border border-white/10 bg-white/5 p-8 hover:bg-white/10 transition"
        >
          <h2 className="text-2xl font-bold">
            My Cards
          </h2>

          <p className="text-gray-400 mt-3">
            Manage and edit all your
            existing cards.
          </p>
        </Link>
      </div>

      {/* Recent Leads */}

      <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
        <h2 className="text-2xl font-bold mb-6">
          Recent Leads
        </h2>

        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-white/10">
              <th className="py-3">Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {recentLeads.map((lead) => (
              <tr
                key={lead.id}
                className="border-b border-white/5"
              >
                <td className="py-3">
                  {lead.name}
                </td>

                <td>{lead.email}</td>

                <td>{lead.mobile}</td>

                <td>
                  {new Date(
                    lead.createdAt
                  ).toLocaleDateString()}
                </td>
              </tr>
            ))}

            {recentLeads.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="py-6 text-center text-gray-400"
                >
                  No leads yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}