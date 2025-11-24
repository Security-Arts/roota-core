// app/about/page.tsx
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function AboutPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#020617",
        color: "#e5e7eb",
        padding: "32px 16px",
      }}
    >
      <div
        style={{
          maxWidth: 800,
          margin: "0 auto",
        }}
      >
        <Link
          href="/"
          style={{
            fontSize: 12,
            color: "#9ca3af",
            textDecoration: "none",
          }}
        >
          ← Back to Roota stream
        </Link>

        <h1
          style={{
            marginTop: 16,
            fontSize: 28,
            fontWeight: 700,
          }}
        >
          About Roota
        </h1>

        <p
          style={{
            marginTop: 12,
            fontSize: 14,
            color: "#cbd5f5",
            lineHeight: 1.7,
          }}
        >
          Roota is an Ideas Stock Exchange — a live registry of ideas with
          proof and pulse of interest. Each idea is timestamped, assigned a
          cryptographic proof token, and tracked with a public pulse score
          that reflects real-time validation by people who see the value.
        </p>

        <h2
          style={{
            marginTop: 24,
            fontSize: 18,
            fontWeight: 600,
          }}
        >
          Proof (idea fingerprint)
        </h2>
        <p
          style={{
            marginTop: 8,
            fontSize: 14,
            color: "#cbd5f5",
            lineHeight: 1.7,
          }}
        >
          Every idea in Roota can be bound to a SHA-256 proof token — a
          one-way cryptographic fingerprint that fixes the content in time
          without revealing any private details. It&apos;s a lightweight,
          Web-native way to say: “this idea existed, here and now”.
        </p>

        <h2
          style={{
            marginTop: 24,
            fontSize: 18,
            fontWeight: 600,
          }}
        >
          Pulse (signal of interest)
        </h2>
        <p
          style={{
            marginTop: 8,
            fontSize: 14,
            color: "#cbd5f5",
            lineHeight: 1.7,
          }}
        >
          Pulse is a simple 0–10 score that represents living interest around
          an idea. 1–2 means seed, 3–4 validated, 5+ high conviction. Over
          time, pulse becomes a public trail of how attention, trust, and
          conviction form around specific directions of thought.
        </p>

        <h2
          style={{
            marginTop: 24,
            fontSize: 18,
            fontWeight: 600,
          }}
        >
          Why Roota exists
        </h2>
        <p
          style={{
            marginTop: 8,
            fontSize: 14,
            color: "#cbd5f5",
            lineHeight: 1.7,
          }}
        >
          Roota is not about finished products. It&apos;s a place for
          half-formed, raw, and evolving ideas — especially those that don&apos;t
          yet have a company, funding, or team behind them. It lets you fix
          the root of your thinking, and then watch how the pulse evolves as
          the world reacts.
        </p>
      </div>
    </main>
  );
}
