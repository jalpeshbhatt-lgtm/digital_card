import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 border-r h-screen p-4">
      <nav className="space-y-3 flex flex-col">
        <Link href="/dashboard">Dashboard</Link>

        <Link href="/dashboard/cards">My Cards</Link>

        <Link href="/dashboard/cards/new">
          Create Card
        </Link>

        <Link href="/dashboard/templates">
          Templates
        </Link>

        <Link href="/dashboard/leads">
          Leads
        </Link>
      </nav>
    </aside>
  );
}