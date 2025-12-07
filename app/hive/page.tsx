"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { HiveTable } from "@/components/HiveTable";
<HiveTable ideas={visibleIdeas} onPulse={handlePulseChange} />
type Idea = {
  id: string;
  title: string;
  description: string;
  slug: string | null;
  created_at: string;
  pulse: number | null;
};

const s: { [k: string]: React.CSSProperties } = {
  page: {
    minHeight: "100vh",
    background:
      "radial-gradient(circle at top left, rgba(56,189,248,0.16), transparent 60%), radial-gradient(circle at bottom right, rgba(129,140,248,0.18), #020617)",
    color: "#e5e7eb",
    padding: "32px 20px 56px",
    fontFamily:
      "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
    width: "100%",
    maxWidth: 1100,
    margin: "0 auto",
    boxSizing: "border-box" as const,
  },
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    gap: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 600,
    letterSpacing: "-0.02em",
  },
  hint: {
    fontSize: 12,
    color: "#9ca3af",
  },
  searchRow: {
    display: "flex",
    gap: 12,
    marginBottom: 16,
    flexWrap: "wrap" as const,
  },
  searchInput: {
    flex: "1 1 220px",
    borderRadius: 999,
    border: "1px solid #1f2937",
    background: "#020617",
    padding: "8px 14px",
    fontSize: 13,
    color: "#e5e7eb",
    outline: "none",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: 13,
  },
  thRow: {
    borderBottom: "1px solid #1f2937",
  },
  th: {
    textAlign: "left" as const,
    padding: "8px 10px",
    fontSize: 11,
    textTransform: "uppercase" as const,
    letterSpacing: "0.12em",
    color: "#9ca3af",
  },
  td: {
    padding: "9px 10px",
    borderBottom: "1px solid #020617",
    verticalAlign: "top" as const,
  },
  pulseCell: {
    display: "flex",
    alignItems: "center",
    gap: 6,
  },
  pulsePill: {
    borderRadius: 999,
    border: "1px solid #374151",
    padding: "3px 9px",
    fontSize: 12,
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
  },
  pulseBtn: {
    width: 22,
    height: 22,
    borderRadius: 999,
    border: "1px solid #334155",
    background: "#020617",
    color: "#e5e7eb",
    cursor: "pointer",
    fontSize: 14,
    lineHeight: "18px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  },
  ideaTitle: {
    fontWeight: 600,
    marginBottom: 3,
  },
  ideaDesc: {
    color: "#9ca3af",
  },
  link: {
    fontSize: 12,
    color: "#93c5fd",
    textDecoration: "none",
    marginTop: 4,
    display: "inline-flex",
    gap: 4,
  },
  loadMoreBtn: {
    marginTop: 18,
    borderRadius: 999,
    border: "1px solid #334155",
    background: "#020617",
    color: "#e5e7eb",
    padding: "8px 16px",
    fontSize: 13,
    cursor: "pointer",
  },
};

export default function HivePage() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [visibleCount, setVisibleCount] = useState(25);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        const res = await fetch("/api/ideas", { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        const list: Idea[] = data?.ideas ?? data ?? [];

        const sorted = [...list].sort(
          (a, b) =>
            new Date(b.created_at).getTime() -
            new Date(a.created_at).getTime()
        );
        if (!cancelled) setIdeas(sorted);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = ideas.filter((i) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (
      i.title.toLowerCase().includes(q) ||
      (i.description ?? "").toLowerCase().includes(q)
    );
  });

  const visible = filtered.slice(0, visibleCount);

  async function adjustPulse(id: string, delta: 1 | -1) {
    try {
      const res = await fetch(`/api/ideas/${id}/pulse`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ delta }),
      });
      if (!res.ok) return;
      const json = await res.json();
      const newPulse = json?.pulse as number | undefined;

      setIdeas((prev) =>
        prev.map((idea) =>
          idea.id === id
            ? { ...idea, pulse: newPulse ?? (idea.pulse ?? 0) + delta }
            : idea
        )
      );
    } catch {
      // тихо ігноруємо для MVP
    }
  }

  return (
    <main style={s.page}>
      <div style={s.headerRow}>
        <h1 style={s.title}>Hive · live registry of ideas</h1>
        <p style={s.hint}>
          Adjust pulse with + / −. Every change is logged in pulse_events as a
          heartbeat.
        </p>
      </div>

      <div style={s.searchRow}>
        <input
          placeholder="Search by title or description…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={s.searchInput}
        />
      </div>

      {loading && <p style={s.hint}>Loading ideas…</p>}

      {!loading && filtered.length === 0 && (
        <p style={s.hint}>No ideas yet. Time to plant the first seed.</p>
      )}

      {!loading && filtered.length > 0 && (
        <>
          <table style={s.table}>
            <thead>
              <tr style={s.thRow}>
                <th style={s.th}>Idea</th>
                <th style={s.th}>Created</th>
                <th style={s.th}>Pulse</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((idea) => (
                <tr key={idea.id}>
                  <td style={s.td}>
                    <div style={s.ideaTitle}>{idea.title}</div>
                    <div style={s.ideaDesc}>{idea.description}</div>
                    <Link
                      href={`/idea/${idea.slug || idea.id}`}
                      style={s.link}
                    >
                      <span>Open idea page</span>
                      <span>→</span>
                    </Link>
                  </td>
                  <td style={s.td}>
                    {new Date(idea.created_at).toLocaleDateString()}
                  </td>
                  <td style={s.td}>
                    <div style={s.pulseCell}>
                      <button
                        type="button"
                        style={s.pulseBtn}
                        onClick={() => adjustPulse(idea.id, -1)}
                      >
                        −
                      </button>
                      <div style={s.pulsePill}>
                        <span>⚡</span>
                        <span>{idea.pulse ?? 0}</span>
                      </div>
                      <button
                        type="button"
                        style={s.pulseBtn}
                        onClick={() => adjustPulse(idea.id, +1)}
                      >
                        +
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {visibleCount < filtered.length && (
            <button
              type="button"
              style={s.loadMoreBtn}
              onClick={() => setVisibleCount((c) => c + 25)}
            >
              Load more
            </button>
          )}
        </>
      )}
    </main>
  );
}
