import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: Promise<{
    cardId?: string;
  }>;
}) {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (!token) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-red-600">
          Please login again
        </h1>
      </div>
      
    );
  }

  const decoded = verifyToken(token) as {
    userId: string;
  } | null;

  if (!decoded?.userId) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-red-600">
          Unauthorized
        </h1>
      </div>
    );
  }

  const params = await searchParams;

const selectedCardId =
  params.cardId || "";

 const cards = await prisma.card.findMany({
  where: {
    userId: decoded.userId,
  },
  orderBy: {
    name: "asc",
  },
});

const leads = await prisma.lead.findMany({
  where: {
    card: {
      userId: decoded.userId,
    },

    ...(selectedCardId
      ? {
          cardId: selectedCardId,
        }
      : {}),
  },

  include: {
    card: true,
  },

  orderBy: {
    createdAt: "desc",
  },
});

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Leads
      </h1>

      <div className="flex gap-3 mb-6">
        <a
          href="/api/leads/export"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Export Excel
        </a>

        <a
          href="/api/leads/export-csv"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Export CSV
        </a>
      </div>

      {leads.length === 0 ? (
        <div className="bg-white p-6 rounded shadow">
          <p className="text-gray-500">
            No leads found.
          </p>
        </div>
        
      ) : (
          <div className="overflow-auto">
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Mobile</th>
                <th className="p-3 border">Message</th>
                <th className="p-3 border">Card</th>
                <th className="p-3 border">Date</th>
                <th className="p-3 border">Action</th>
              </tr>
            </thead>

            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id}>
                  <td className="p-3 border">
                    {lead.name}
                  </td>

                  <td className="p-3 border">
                    {lead.mobile}
                  </td>

                  <td className="p-3 border">
                    {lead.message}
                  </td>

                  <td className="p-3 border">
                    {lead.card.name}
                  </td>

                  <td className="p-3 border">
                    {new Date(
                      lead.createdAt
                    ).toLocaleString()}
                  </td>

                  <td className="p-3 border">
                    {lead.mobile && (
                      <a
                        href={`https://wa.me/91${lead.mobile}?text=Hello ${lead.name}, thank you for your enquiry.`}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      >
                        WhatsApp
                      </a>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}