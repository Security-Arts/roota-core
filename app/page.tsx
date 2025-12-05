"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

type Idea = {
  id: string;
  title: string;
  description: string;
  slug: string | null;
  created_at: string;
  pulse: number | null;
};

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    minHeight: "100vh",
    background:
      "radial-gradient(circle at top left, rgba(56,189,248,0.16), transparent 60%), radial-gradient(circle at bottom right, rgba(129,140,248,0.18), #020617)",
    color: "#e5e7eb",
    padding: "96px 20px 56px", // трохи відступу зверху під fixed header
    fontFamily:
      "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
    width: "100%",
    maxWidth: 1200,
    margin: "0 auto",
    boxSizing: "border-box" as const,
  },
    liveControls: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    marginBottom: 12,
  },
  searchInput: {
    width: "100%",
    borderRadius: 999,
    border: "1px solid #1f2937",
    backgroundColor: "#020617",
    padding: "8px 12px",
    fontSize: 13,
    color: "#e5e7eb",
    outline: "none",
  },
  pulseFilterRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    alignItems: "center",
    fontSize: 12,
    color: "#9ca3af",
  },
  pulseFilterBtn: {
    borderRadius: 999,
    border: "1px solid #1f2937",
    padding: "4px 10px",
    fontSize: 12,
    background: "#020617",
    cursor: "pointer",
  },
  pulseFilterBtnActive: {
    borderColor: "#22c55e",
    background:
      "radial-gradient(circle at top left, rgba(34,197,94,0.45), transparent 60%) #022c22",
    color: "#bbf7d0",
  },
  pulseLegend: {
    fontSize: 11,
    color: "#6b7280",
  },
  pulseActions: {
    display: "flex",
    gap: 6,
    justifyContent: "flex-end",
    marginTop: 6,
  },
  pulseActionBtn: {
    width: 22,
    height: 22,
    borderRadius: "999px",
    border: "1px solid #374151",
    background: "#020617",
    color: "#e5e7eb",
    fontSize: 13,
    lineHeight: "18px",
    cursor: "pointer",
  },

  // TOP BADGE
  badgeRow: {
    display: "flex",
    gap: 8,
    alignItems: "center",
    marginBottom: 14,
    fontSize: 11,
    textTransform: "uppercase" as const,
    letterSpacing: "0.12em",
    color: "#a5b4fc",
  },
  badge: {
    padding: "2px 8px",
    borderRadius: 999,
    border: "1px solid #4338ca",
    background: "rgba(30,64,175,0.35)",
  },

  // HERO
  heroGrid: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 2.1fr) minmax(0, 1.4fr)",
    gap: 40,
    alignItems: "flex-start",
    marginBottom: 40,
  },
  heroGridMobile: {
    display: "flex",
    flexDirection: "column",
    gap: 24,
    marginBottom: 32,
  },

  title: {
    fontSize: 40,
    fontWeight: 700,
    letterSpacing: "-0.03em",
    marginBottom: 14,
  },
  titleMobile: {
    fontSize: 30,
    fontWeight: 700,
    letterSpacing: "-0.03em",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: "#cbd5f5",
    maxWidth: 620,
    lineHeight: 1.6,
    marginBottom: 22,
  },
  subtitleMobile: {
    fontSize: 15,
    color: "#cbd5f5",
    maxWidth: 600,
    lineHeight: 1.5,
    marginBottom: 18,
  },

  ctaRow: {
    marginTop: 4,
    display: "flex",
    gap: 14,
    flexWrap: "wrap" as const,
  },
  ctaButtonPrimary: {
    borderRadius: 999,
    border: "1px solid #3b82f6",
    padding: "10px 20px",
    background:
      "radial-gradient(circle at top left, rgba(59,130,246,0.5), transparent 60%) #020617",
    fontSize: 14,
    color: "#e5e7eb",
    textDecoration: "none",
  },
  ctaButtonSecondary: {
    borderRadius: 999,
    border: "1px solid #334155",
    padding: "10px 20px",
    background: "#020617",
    fontSize: 14,
    color: "#e5e7eb",
    textDecoration: "none",
  },

  // DESKTOP HEARTBEAT CARD (праворуч від hero)
  heroSideCard: {
    borderRadius: 18,
    border: "1px solid #1f2937",
    padding: "14px 16px 16px",
    background:
      "linear-gradient(135deg, rgba(16,185,129,0.45), rgba(30,64,175,0.45))",
    fontSize: 13,
    color: "#e5e7eb",
    lineHeight: 1.6,
  },
  heroSideTitle: {
    fontSize: 13,
    textTransform: "uppercase" as const,
    letterSpacing: "0.16em",
    color: "#bbf7d0",
    marginBottom: 8,
  },
  heroSideRow: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    marginTop: 4,
  },
  heroSideLabel: {
    fontSize: 12,
    color: "#d1fae5",
  },
  heroSideValue: {
    fontSize: 13,
  },

  // GENERIC SECTION
  section: {
    marginTop: 32,
    paddingTop: 24,
    borderTop: "1px solid #1f2937",
  },
  sectionTitleRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    gap: 16,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 600,
    color: "#e5e7eb",
    textTransform: "uppercase" as const,
    letterSpacing: "0.14em",
  },
  sectionHint: {
    fontSize: 12,
    color: "#9ca3af",
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 1.7,
    color: "#cbd5f5",
    marginBottom: 10,
  },

  // MOBILE HEARTBEAT CARDS
  heartbeatCardList: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    marginTop: 4,
  },
  heartbeatCard: {
    borderRadius: 16,
    border: "1px solid #064e3b",
    padding: "10px 12px",
    background:
      "radial-gradient(circle at top left, rgba(16,185,129,0.55), transparent 60%) #022c22",
    fontSize: 13,
    color: "#d1fae5",
    lineHeight: 1.5,
  },
  heartbeatCardTitle: {
    fontSize: 13,
    fontWeight: 600,
    marginBottom: 4,
  },

  // WHO USES THE HIVE
  personaGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0,1fr))",
    gap: 16,
    marginTop: 10,
  },
  personaGridMobile: {
    display: "grid",
    gridTemplateColumns: "minmax(0,1fr)",
    gap: 12,
    marginTop: 10,
  },
  personaCard: {
    borderRadius: 16,
    border: "1px solid #111827",
    padding: "12px 14px",
    background:
      "radial-gradient(circle at top left, rgba(37,99,235,0.35), transparent 60%) #020617",
    fontSize: 13,
  },
  personaTitle: {
    fontSize: 13,
    fontWeight: 600,
    marginBottom: 4,
  },

  // LIVE HIVE
  liveHeaderRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
    marginBottom: 12,
  },
  liveList: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  liveCard: {
    borderRadius: 18,
    border: "1px solid #111827",
    padding: "12px 14px",
    background:
      "radial-gradient(circle at top left, rgba(15,23,42,0.95), transparent 55%) #020617",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 16,
  },
  liveTitle: {
    fontSize: 14,
    fontWeight: 600,
    marginBottom: 4,
  },
  liveDesc: {
    fontSize: 13,
    color: "#9ca3af",
    marginBottom: 6,
  },
  liveMeta: {
    fontSize: 12,
    color: "#6b7280",
  },
  livePulsePill: {
    borderRadius: 999,
    border: "1px solid #374151",
    padding: "3px 9px",
    fontSize: 12,
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
  },
  liveViewLink: {
    fontSize: 12,
    color: "#93c5fd",
    textDecoration: "none",
    marginTop: 8,
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
  },

  // BOTTOM CTA
  bottomCta: {
    marginTop: 32,
    paddingTop: 20,
    borderTop: "1px solid #1f2937",
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap" as const,
    gap: 16,
    alignItems: "center",
  },
};

export default function HomePage() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loadingIdeas, setLoadingIdeas] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [query, setQuery] = useState("");
  const [pulseFilter, setPulseFilter] = useState<"all" | "seed" | "validated" | "high">("all");

  // simple responsive flag
  useEffect(() => {
    const check = () => {
      if (typeof window !== "undefined") {
        setIsMobile(window.innerWidth < 768);
      }
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // scroll to hive
  const scrollToHive = () => {
    const el = document.getElementById("hive-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // load last ideas
  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoadingIdeas(true);
        const res = await fetch("/api/ideas", { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        const list: Idea[] = data?.ideas ?? data ?? [];

        const sorted = [...list].sort(
          (a, b) =>
            new Date(b.created_at).getTime() -
            new Date(a.created_at).getTime()
        );
        if (!cancelled) {
          setIdeas(sorted.slice(0, 4));
        }
      } finally {
        if (!cancelled) setLoadingIdeas(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);
  async function adjustPulse(ideaId: string, delta: number) {
  setIdeas((prev) =>
    prev.map((idea) =>
      idea.id === ideaId
        ? { ...idea, pulse: (idea.pulse ?? 0) + delta }
        : idea
    )
  );

  try {
    await fetch("/api/pulse", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ideaId, delta }),
    });
  } catch {
    // тихо ігноруємо на випадок, якщо бек ще не готовий
  }
}
const filteredIdeas = ideas.filter((idea) => {
  const text = (idea.title + " " + (idea.description ?? "")).toLowerCase();
  const q = query.toLowerCase();
  if (q && !text.includes(q)) return false;

  const p = idea.pulse ?? 0;
  if (pulseFilter === "seed" && !(p >= 1 && p <= 2)) return false;
  if (pulseFilter === "validated" && !(p >= 3 && p <= 4)) return false;
  if (pulseFilter === "high" && p < 5) return false;

  return true;
});

  return (
    <main style={styles.page}>
      {/* TOP BADGE UNDER HEADER */}
      <div style={styles.badgeRow}>
        <span style={styles.badge}>ROOTA</span>
        <span>IDEAS DESERVE A HOME, NOT A FEED.</span>
      </div>

      {/* HERO */}
      <section style={isMobile ? styles.heroGridMobile : styles.heroGrid}>
        <div>
          <h1 style={isMobile ? styles.titleMobile : styles.title}>
            Ideas deserve a home, not a feed.
          </h1>
          <p style={isMobile ? styles.subtitleMobile : styles.subtitle}>
            Roota turns raw thoughts into timestamped records with{" "}
            <strong>proof</strong> and <strong>pulse</strong>. It&apos;s a live
            hive — a place where ideas take root, grow and stay visible to
            people who actually care.
          </p>

          <div style={styles.ctaRow}>
            <button
              type="button"
              onClick={scrollToHive}
              style={{ ...styles.ctaButtonPrimary, cursor: "pointer" }}
            >
              Enter the Hive
            </button>
            <Link href="/about" style={styles.ctaButtonSecondary}>
              Why Roota exists
            </Link>
          </div>
        </div>

        {/* права картка — лише на desktop / tablet */}
        {!isMobile && (
          <aside style={styles.heroSideCard}>
            <div style={styles.heroSideTitle}>Heartbeat, not applause</div>
            <p>
              Launches chase applause — a spike of attention and then silence.
              Roota tracks the heartbeat of ideas: every proof fixes a moment in
              time, every pulse adds energy.
            </p>
            <div style={styles.heroSideRow}>
              <div>
                <div style={styles.heroSideLabel}>Visible signals</div>
                <div style={styles.heroSideValue}>
                  Proof tokens, pulse changes, live idea pages.
                </div>
              </div>
              <div>
                <div style={styles.heroSideLabel}>Missing on purpose</div>
                <div style={styles.heroSideValue}>
                  Screenshots, pitch decks and vanity likes don&apos;t live
                  here.
                </div>
              </div>
            </div>
          </aside>
        )}
      </section>

      {/* MOBILE HEARTBEAT CARDS – замість вузької вертикальної колони */}
      {isMobile && (
        <section style={styles.section}>
          <div style={styles.sectionTitleRow}>
            <h2 style={styles.sectionTitle}>How Roota feels</h2>
            <div style={styles.sectionHint}>
              Short cards instead of one long column.
            </div>
          </div>

          <div style={styles.heartbeatCardList}>
            <div style={styles.heartbeatCard}>
              <div style={styles.heartbeatCardTitle}>Proof &amp; pulse</div>
              <div>
                Every idea gets a timestamped proof token and a live pulse that
                can rise or fall as attention moves.
              </div>
            </div>
            <div style={styles.heartbeatCard}>
              <div style={styles.heartbeatCardTitle}>Visible signals</div>
              <div>
                You see changes over time: ideas that wake up, slow down or
                quietly keep beating in the background.
              </div>
            </div>
            <div style={styles.heartbeatCard}>
              <div style={styles.heartbeatCardTitle}>What doesn&apos;t live here</div>
              <div>
                No vanity screenshots, no pitch decks, no likes for the sake of
                likes. Just the heartbeat of ideas.
              </div>
            </div>
          </div>
        </section>
      )}

      {/* WHY ROOTA EXISTS – компактний текст для всіх екранів */}
      <section style={styles.section}>
        <div style={styles.sectionTitleRow}>
          <h2 style={styles.sectionTitle}>Why Roota exists</h2>
          <div style={styles.sectionHint}>
            Ideas usually die in chats and notebooks. Roota keeps their
            heartbeat.
          </div>
        </div>

        <p style={styles.paragraph}>
          Most ideas live in fragments: notes, Notion pages, chat threads, voice
          messages. They&apos;re hard to show, impossible to track and nearly
          impossible to prove.
        </p>
        <p style={styles.paragraph}>
          Roota turns thoughts into records: a{" "}
          <strong>timestamped proof token</strong>, context and{" "}
          <strong>pulse</strong> that shows how attention moves over time. The
          hive becomes a living registry of what people care about and when.
        </p>
      </section>

      {/* WHO USES THE HIVE */}
      <section style={styles.section}>
        <div style={styles.sectionTitleRow}>
          <h2 style={styles.sectionTitle}>Who uses the hive</h2>
          <div style={styles.sectionHint}>
            Roota doesn&apos;t sell ideas. It reveals what&apos;s alive and
            where energy quietly gathers.
          </div>
        </div>

        <div style={isMobile ? styles.personaGridMobile : styles.personaGrid}>
          <div style={styles.personaCard}>
            <div style={styles.personaTitle}>Makers &amp; founders</div>
            <p>
              Capture raw concepts, watch which ones resonate, and turn bloom
              candidates into projects, products or side ventures.
            </p>
          </div>

          <div style={styles.personaCard}>
            <div style={styles.personaTitle}>Studios &amp; teams</div>
            <p>
              Run private hives, track internal signals and see which
              directions organically gain energy inside the group.
            </p>
          </div>

          <div style={styles.personaCard}>
            <div style={styles.personaTitle}>Funds &amp; scouts</div>
            <p>
              Look at early signals — pockets where proof + pulse rise before
              pitch decks appear on the surface.
            </p>
          </div>
        </div>
      </section>

      {/* LIVE HIVE */}
     <section id="hive-section" style={styles.section}>
  <div style={styles.liveHeaderRow}>
    <div style={styles.sectionTitle}>Live signals from the hive</div>
    <div style={styles.sectionHint}>
      Realtime pulse — no screenshots, just what&apos;s alive now.
    </div>
  </div>

  <div style={styles.liveControls}>
    <input
      style={styles.searchInput}
      placeholder="Search by title or description…"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />

    <div style={styles.pulseFilterRow}>
      <span>Pulse level:</span>
      {(
        [
          ["all", "All"],
          ["seed", "Seed 1–2"],
          ["validated", "Validated 3–4"],
          ["high", "High 5+"],
        ] as const
      ).map(([value, label]) => (
        <button
          key={value}
          type="button"
          onClick={() => setPulseFilter(value)}
          style={{
            ...styles.pulseFilterBtn,
            ...(pulseFilter === value ? styles.pulseFilterBtnActive : {}),
          }}
        >
          {label}
        </button>
      ))}
    </div>

    <div style={styles.pulseLegend}>
      1–2 = Seed · 3–4 = Validated · 5+ = High conviction.
    </div>
  </div>

  {loadingIdeas && <p style={styles.sectionHint}>Loading latest ideas…</p>}

  {!loadingIdeas && filteredIdeas.length === 0 && (
    <p style={styles.sectionHint}>
      No signals for this view. Try another search or pulse level.
    </p>
  )}

  {!loadingIdeas && filteredIdeas.length > 0 && (
    <div style={styles.liveList}>
      {filteredIdeas.map((idea) => (
        <div key={idea.id} style={styles.liveCard}>
          <div>
            <div style={styles.liveTitle}>{idea.title}</div>
            <div style={styles.liveDesc}>{idea.description}</div>
            <div style={styles.liveMeta}>
              {new Date(idea.created_at).toLocaleDateString()} · proof &amp;
              pulse on record
            </div>
          </div>
          <div style={{ textAlign: "right" as const }}>
            <div style={styles.livePulsePill}>
              <span>⚡</span>
              <span>{idea.pulse ?? 0}</span>
              <span>| heartbeat</span>
            </div>

            <div style={styles.pulseActions}>
              <button
                type="button"
                style={styles.pulseActionBtn}
                onClick={() => adjustPulse(idea.id, -1)}
              >
                –
              </button>
              <button
                type="button"
                style={styles.pulseActionBtn}
                onClick={() => adjustPulse(idea.id, +1)}
              >
                +
              </button>
            </div>

            <Link
              href={`/idea/${idea.slug || idea.id}`}
              style={styles.liveViewLink}
            >
              <span>View idea</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      ))}
    </div>
  )}
</section>


      {/* BOTTOM CTA */}
      <div style={styles.bottomCta}>
        <div style={{ maxWidth: 520 }}>
          <p style={styles.paragraph}>
            Roota keeps the public hive open and neutral. Proof and pulse stay
            public — paid layers appear only where they add real leverage:
            private hives, analytics and Bee-agents.
          </p>
        </div>
        <div style={styles.ctaRow}>
          <button
            type="button"
            onClick={scrollToHive}
            style={{ ...styles.ctaButtonPrimary, cursor: "pointer" }}
          >
            Explore the Hive
          </button>
          <Link href="/about" style={styles.ctaButtonSecondary}>
            Read the full story
          </Link>
        </div>
      </div>
    </main>
  );
}
