import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export default async function PaymentsPage() {
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

  const payments = await prisma.payment.findMany({
    where: {
      userId: decoded.userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-8">
      <h1 className="text-4xl font-bold mb-8">
        Payment History
      </h1>

      <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-3">
                Plan
              </th>

              <th className="text-left">
                Amount
              </th>

              <th className="text-left">
                Status
              </th>

              <th className="text-left">
                Date
              </th>
            </tr>
          </thead>

          <tbody>
            {payments.map((payment) => (
              <tr
                key={payment.id}
                className="border-b border-white/5"
              >
                <td className="py-4">
                  {payment.plan}
                </td>

                <td>
                  ₹{payment.amount}
                </td>

                <td>
                  {payment.status}
                </td>

                <td>
                  {new Date(
                    payment.createdAt
                  ).toLocaleDateString()}
                </td>
              </tr>
            ))}

            {payments.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="py-8 text-center text-gray-400"
                >
                  No payments found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}