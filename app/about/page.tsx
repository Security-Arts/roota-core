// app/about/page.tsx
import Link from "next/link";

export const metadata = {
  title: "Roota · Ideas Stock Exchange",
  description:
    "Roota is a live registry of ideas with proof and pulse of interest.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Top nav */}
        <header className="flex items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
              Roota
            </h1>
            <p className="text-sm text-gray-400 mt-2">
              Ideas Stock Exchange · a live registry of ideas with proof and
              pulse of interest.
            </p>
          </div>
          <div className="flex gap-2">
            <Link
              href="/"
              className="text-xs px-4 py-2 rounded-full border border-gray-700 hover:border-gray-500 text-gray-200"
            >
              Open live stream
            </Link>
          </div>
        </header>

        {/* What is Roota */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-3">What is Roota?</h2>
          <p className="text-sm text-gray-200 leading-relaxed">
            Roota is a place where ideas don&apos;t get lost in chats or
            notebooks. It&apos;s a live registry where each idea receives:
          </p>
          <ul className="mt-3 space-y-1 text-sm text-gray-300 list-disc list-inside">
            <li>
              <span className="font-medium">Proof</span> — a cryptographic
              token (SHA-256) that fixes the moment and authorship.
            </li>
            <li>
              <span className="font-medium">Pulse</span> — a living signal of
              interest that can grow or fade over time.
            </li>
          </ul>
        </section>

        {/* How it works */}
        <section className="mb-10 grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="text-lg font-semibold mb-2">1 · Capture</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              You create a new idea, write a short description and generate a
              proof token. Roota stores it in a public registry backed by
              Supabase.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">2 · Proof</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Each idea gets a unique SHA-256 hash. This acts as a lightweight
              &quot;proof-of-idea&quot; that can be referred to later in
              decks, emails or investor conversations.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">3 · Pulse</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Pulse reflects how alive the idea is. You can boost it, downgrade
              it, and see which ideas keep attention over time.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">4 · Stream</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              The main Roota stream shows ideas with filters, search and
              sorting. It&apos;s a living surface of what you&apos;re thinking
              about — not a static backlog.
            </p>
          </div>
        </section>

        {/* Who it's for */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-3">Who is Roota for?</h2>
          <p className="text-sm text-gray-200 leading-relaxed mb-3">
            Roota is built for people who generate more ideas than they can
            execute:
          </p>
          <ul className="space-y-1 text-sm text-gray-300 list-disc list-inside">
            <li>founders and product leaders</li>
            <li>researchers and strategists</li>
            <li>builders who prototype in public</li>
          </ul>
        </section>

        {/* MVP status */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-3">MVP status</h2>
          <ul className="space-y-1 text-sm text-gray-300 list-disc list-inside">
            <li>✅ Public idea registry on Supabase</li>
            <li>✅ Live stream with filters, search and pulse</li>
            <li>✅ Per-idea public pages with proof token</li>
            <li>✅ Pulse actions (+1 / −1) directly from the stream</li>
            <li>⏳ Private spaces and invite-only boards</li>
            <li>⏳ Paid features for founders and teams</li>
          </ul>
        </section>

        {/* CTA */}
        <section className="border-t border-gray-800 pt-6 mt-4 flex flex-col md:flex-row md:items-center justify-between gap-4 text-sm">
          <div className="text-gray-300">
            <div className="font-semibold">What&apos;s next?</div>
            <p className="text-gray-400 mt-1">
              Next steps: private idea vaults, team spaces, and paid features
              for tracking idea portfolios.
            </p>
          </div>
          <div className="flex gap-2">
            <Link
              href="/"
              className="px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-xs font-medium"
            >
              Open live idea stream
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

