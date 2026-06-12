import Link from "next/link";

export default function DashboardPage() {
  return (
    <div
      className="
        min-h-screen
        bg-[#0f172a]
        text-white
        p-8
      "
    >
      {/* HEADER */}

      <div className="mb-10">
        <h1 className="text-5xl font-bold text-white">
          Dashboard
        </h1>

        <p className="text-gray-400 mt-3 text-lg">
          Manage your digital business card platform
        </p>
      </div>

      {/* CARDS */}

      <div className="grid md:grid-cols-2 gap-8">
        {/* CREATE CARD */}

        <Link
          href="/dashboard/cards/new"
          className="
            rounded-3xl
            border
            border-white/10
            bg-white/5
            p-8
            hover:bg-white/10
            transition
            shadow-xl
          "
        >
          <div
            className="
              w-16
              h-16
              rounded-2xl
              bg-gradient-to-r
              from-violet-600
              to-purple-600
              flex
              items-center
              justify-center
              text-3xl
              mb-6
            "
          >
            +
          </div>

          <h2 className="text-2xl font-bold text-white">
            Create New Card
          </h2>

          <p className="text-gray-400 mt-3 leading-7">
            Create premium digital visiting
            cards with themes, services,
            gallery, products, payment QR,
            and social links.
          </p>
        </Link>

        {/* MY CARDS */}

        <Link
          href="/dashboard/cards"
          className="
            rounded-3xl
            border
            border-white/10
            bg-white/5
            p-8
            hover:bg-white/10
            transition
            shadow-xl
          "
        >
          <div
            className="
              w-16
              h-16
              rounded-2xl
              bg-gradient-to-r
              from-blue-600
              to-cyan-600
              flex
              items-center
              justify-center
              text-3xl
              mb-6
            "
          >
            📇
          </div>

          <h2 className="text-2xl font-bold text-white">
            My Cards
          </h2>

          <p className="text-gray-400 mt-3 leading-7">
            View, edit, manage, and share all
            your digital business cards from
            one dashboard.
          </p>
        </Link>
      </div>
    </div>
  );
}