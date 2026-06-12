import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <section className="container mx-auto py-20 px-4">
        <h1 className="text-5xl font-bold">
          Create Professional Digital Visiting Cards
        </h1>

        <p className="mt-4 text-lg text-gray-600">
          Build, share and manage digital business cards in minutes.
        </p>

        <div className="mt-8 flex gap-4">
          <Link
            href="/register"
            className="px-6 py-3 rounded bg-black text-white"
          >
            Start Free Trial
          </Link>

          <Link
            href="/login"
            className="px-6 py-3 rounded border"
          >
            Login
          </Link>
        </div>
      </section>
    </main>
  );
}