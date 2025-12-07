// app/page.tsx
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

type PulseFilter = "ALL" | "SEED" | "VALIDATED" | "HIGH";

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    minHeight: "100vh",
    background:
      "radial-gradient(circle at top left, rgba(56,189,248,0.16), transparent 60%), radial-gradient(circle at bottom right, rgba(129,140,248,0.18), #020617)",
    color: "#e5e7eb",
    padding: "32px 20px 56px",
    width: "100%",
    maxWidth: 1120,
    margin: "0 auto",
    boxSizing: "border-box",
  },

  badgeRow: {
    display: "flex",
    gap: 8,
    alignItems: "center",
    marginBottom: 14,
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    color: "#a5b4fc",
  },
  badge: {
    padding: "2px 8px",
    borderRadius: 999,
    border: "1px solid #4338ca",
    background: "rgba(30,64,175,0.35)",
  },

  heroGrid: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 2.1fr) minmax(0, 1.4fr)",
    gap: 40,
    alignItems: "flex-start",
    marginBottom: 40,
  },

  title: {
    fontSize: 40,
    fontWeight: 700,
    letterSpacing: "-0.03em",
    marginBottom: 14,
  },
  subtitle: {
    fontSize: 16,
    color: "#cbd5f5",
    maxWidth: 620,
    lineHeight: 1.6,
    marginBottom: 22,
  },

  ctaRow: {
    marginTop: 4,
    display: "flex",
    gap: 14,
    flexWrap: "wrap",
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
    cursor: "pointer",
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

  heroSideCard: {
    borderRadius: 18,
    border: "1px solid #1f2937",
    padding: "14px 16px 16px",
    background:
      "radial-gradient(circle at top left, rgba(15,118,110,0.6), transparent 60%) #020617",
    fontSize: 13,
    color: "#cbd5f5",
    lineHeight: 1.6,
  },
  heroSideTitle: {
    fontSize: 13,
    textTransform: "uppercase",
    letterSpacing: "0.16em",
    color: "#a5b4fc",
    marginBottom: 6,
  },
  heroSideRow: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    marginTop: 6,
  },
  heroSideLabel: {
    fontSize: 12,
    color: "#9ca3af",
  },
  heroSideValue: {
    fontSize: 13,
  },

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
    textTransform: "uppercase",
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

  twoColText: {
    display: "grid",
    gridTemplateColumns: "minmax(0,1.3fr) minmax(0,1.3fr)",
    gap: 28,
  },

  miniList: {
    margin: "4px 0 6px 0",
    paddingLeft: 18,
    fontSize: 14,
    color: "#cbd5f5",
  },
  miniItem: {
    marginBottom: 4,
  },

  // HIVE CONTROLS
  hiveControlsRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 12,
    alignItems: "center",
    justifyContent: "space-between",
  },
searchInput: {
  width: "100%",          // на мобілці — повна ширина
  maxWidth: 520,          // на десктопі — не розтягується до безмежності
  borderRadius: 999,
  border: "1px solid #1f2937",
  padding: "10px 14px",
  fontSize: 14,
  backgroundColor: "rgba(2,6,23,0.92)",  // легка прозорість дає глибину
  color: "#e5e7eb",
  boxShadow: "0 8px 20px rgba(0,0,0,0.45)", // компактна тінь, без "бублика"
  outline: "none",
},

  filterPillsRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: 6,
  },
  filterPill: {
    borderRadius: 999,
    border: "1px solid #1f2937",
    padding: "4px 10px",
    fontSize: 11,
    backgroundColor: "#020617",
    color: "#9ca3af",
    cursor: "pointer",
  },
  filterPillActive: {
    borderColor: "#3b82f6",
    background:
      "radial-gradient(circle at top left, rgba(59,130,246,0.38), transparent 60%) #020617",
    color: "#e5e7eb",
  },

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
  liveRight: {
    textAlign: "right",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: 6,
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
  pulseControls: {
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    marginTop: 4,
  },
  pulseBtn: {
    width: 20,
    height: 20,
    borderRadius: 999,
    border: "1px solid #374151",
    background: "#020617",
    color: "#e5e7eb",
    fontSize: 12,
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  },
  liveViewLink: {
    fontSize: 12,
    color: "#93c5fd",
    textDecoration: "none",
    marginTop: 4,
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
  },

  bottomCta: {
    marginTop: 32,
    paddingTop: 20,
    borderTop: "1px solid #1f2937",
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 16,
    alignItems: "center",
  },
};

function getPulseBucket(pulse: number | null): PulseFilter | "NONE" {
  const p = pulse ?? 0;
  if (p >= 5) return "HIGH";
  if (p >= 3) return "VALIDATED";
  if (p >= 1) return "SEED";
  return "NONE";
}

export default function HomePage() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loadingIdeas, setLoadingIdeas] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [pulseFilter, setPulseFilter] = useState<PulseFilter>("ALL");
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const update = () => {
      if (typeof window !== "undefined") {
        setIsMobile(window.innerWidth < 768);
      }
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  const scrollToHive = () => {
    const el = document.getElementById("hive");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        setIsMobile(window.innerWidth <= 768);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
          setIdeas(sorted.slice(0, 20));
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

  const handlePulseChange = async (idea: Idea, delta: 1 | -1) => {
    if (updatingId) return;
    setUpdatingId(idea.id);
    try {
      const res = await fetch(`/api/ideas/${idea.id}/pulse`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ delta }),
      });
      if (!res.ok) return;
      const json = await res.json();
      const newPulse = json?.pulse as number | undefined;

      if (typeof newPulse === "number") {
        setIdeas((prev) =>
          prev.map((i) =>
            i.id === idea.id ? { ...i, pulse: newPulse } : i
          )
        );
      }
    } finally {
      setUpdatingId(null);
    }
  };

   const visibleIdeas = ideas.filter((i) => {
    const text = (i.title + " " + (i.description ?? "")).toLowerCase();
    const q = search.trim().toLowerCase();
    if (q && !text.includes(q)) return false;

    if (pulseFilter === "ALL") return true;
    const bucket = getPulseBucket(i.pulse);
    return bucket === pulseFilter;
  });

  // стилі для hive-controls (щоб на мобільних воно не було в один довгий ряд)
  const controlsRowStyle: React.CSSProperties = isMobile
    ? {
        ...styles.hiveControlsRow,
        flexDirection: "column",
        alignItems: "stretch",
        gap: 10,
      }
    : styles.hiveControlsRow;

  // небагато збільшимо відступ під фіксованим хедером
  const pageStyle: React.CSSProperties = isMobile
    ? { ...styles.page, paddingTop: 96 }
    : { ...styles.page, paddingTop: 96 };

  return (
    <main style={pageStyle}>
      {/* HERO */}
      <div style={styles.badgeRow}>
        <span style={styles.badge}>ROOTA</span>
        <span>
          Ideas Stock Exchange · A live registry of ideas with Proof & Pulse
        </span>
      </div>

      <section style={styles.heroGrid}>
        <div>
          <h1 style={styles.title}>Ideas deserve a home, not a feed.</h1>
          <p style={styles.subtitle}>
            Roota turns raw thoughts into timestamped records with{" "}
            <strong>proof</strong> and <strong>pulse</strong>. It&apos;s a live
            hive — a place where ideas take root, grow and stay visible to
            people who actually care.
          </p>

          <div style={styles.ctaRow}>
            <button
              type="button"
              onClick={scrollToHive}
              style={styles.ctaButtonPrimary}
            >
              Enter the Hive
            </button>
            <Link href="/about" style={styles.ctaButtonSecondary}>
              Why Roota exists
            </Link>
          </div>
        </div>

        <aside style={styles.heroSideCard}>
          <div style={styles.heroSideTitle}>Heartbeat, not applause</div>
          <p>
            Product launches chase applause — a spike of attention, then
            silence. Roota tracks the heartbeat of ideas: every proof fixes a
            moment in time, every pulse adds energy.
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
                No screenshots, no vanity likes — just signals of life.
              </div>
            </div>
          </div>
        </aside>
      </section>

      {/* WHY ROOTA EXISTS (коротка версія) */}
      <section style={styles.section} id="overview">
        <div style={styles.sectionTitleRow}>
          <h2 style={styles.sectionTitle}>Why Roota exists</h2>
          <div style={styles.sectionHint}>
            Ideas usually die in chats and notebooks. Roota keeps their
            heartbeat.
          </div>
        </div>

        <div style={styles.twoColText}>
          <div>
            <p style={styles.paragraph}>
              Most ideas live in fragments: notes, Notion pages, chat threads.
              They&apos;re hard to show, impossible to track and nearly
              impossible to prove.
            </p>
            <p style={styles.paragraph}>
              Roota turns thoughts into records: a{" "}
              <strong>timestamped proof token</strong>, public context and{" "}
              <strong>pulse</strong> that shows how attention moves.
            </p>
          </div>

          <div>
            <p style={styles.paragraph}>
              Together this becomes a living registry of ideas — not a list of
              launches, but a map of what people care about and when.
            </p>
            <ul style={styles.miniList}>
              <li style={styles.miniItem}>
                ⏱ Proof — “this idea existed here, in this form, on this date”.
              </li>
              <li style={styles.miniItem}>
                ⚡ Pulse — “this is how strongly it resonates over time”.
              </li>
              <li style={styles.miniItem}>
                🐝 Hive — a space where ideas cross-pollinate instead of
                compete.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* HIVE SECTION */}
      <section id="hive" style={styles.section}>
        <div style={styles.liveHeaderRow}>
          <div style={styles.sectionTitle}>Live signals from the hive</div>
          <div style={styles.sectionHint}>
            Realtime pulse — no screenshots, just what&apos;s alive now.
          </div>
        </div>

        {/* Controls: search + pulse filter */}
        <div style={controlsRowStyle}>
          <input
            style={styles.searchInput}
            placeholder="Search ideas by title or description…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div style={styles.filterPillsRow}>
            {([
              ["ALL", "All"],
              ["SEED", "Seed (1–2)"],
              ["VALIDATED", "Validated (3–4)"],
              ["HIGH", "High conviction (5+)"],
            ] as [PulseFilter | "ALL", string][]).map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setPulseFilter(value as PulseFilter)}
                style={{
                  ...styles.filterPill,
                  ...(pulseFilter === value
                    ? styles.filterPillActive
                    : null),
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <p style={styles.sectionHint}>
          Pulse levels: 1–2 = Seed · 3–4 = Validated · 5+ = High conviction.
        </p>

        {loadingIdeas && (
          <p style={styles.sectionHint}>Loading latest ideas…</p>
        )}

        {!loadingIdeas && visibleIdeas.length === 0 && (
          <p style={styles.sectionHint}>
            No signals match this view. Try changing the filter or search.
          </p>
        )}

        {!loadingIdeas && visibleIdeas.length > 0 && (
          <div style={styles.liveList}>
            {visibleIdeas.map((idea) => {
              const p = idea.pulse ?? 0;
              const bucket = getPulseBucket(idea.pulse);
              const label =
                bucket === "HIGH"
                  ? "High conviction"
                  : bucket === "VALIDATED"
                  ? "Validated"
                  : bucket === "SEED"
                  ? "Seed"
                  : "New";

              const dateText = new Date(
                idea.created_at
              ).toLocaleDateString();

              // 📱 MOBILE КАРТКА
              if (isMobile) {
                return (
                  <div key={idea.id} style={styles.liveCard}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 6,
                        width: "100%",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: 8,
                        }}
                      >
                        <div style={styles.liveTitle}>{idea.title}</div>
                        <div style={styles.livePulsePill}>
                          <span>⚡</span>
                          <span>{p}</span>
                          <span>· {label}</span>
                        </div>
                      </div>

                      {idea.description && (
                        <div style={styles.liveDesc}>
                          {idea.description}
                        </div>
                      )}

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: 8,
                          marginTop: 4,
                        }}
                      >
                        <div style={styles.liveMeta}>
                          {dateText} · Proof & pulse on record
                        </div>

                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                          }}
                        >
                          <div style={styles.pulseControls}>
                            <button
                              type="button"
                              onClick={() =>
                                handlePulseChange(idea, -1)
                              }
                              disabled={!!updatingId}
                              style={{
                                ...styles.pulseBtn,
                                opacity: updatingId ? 0.5 : 1,
                              }}
                            >
                              –
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                handlePulseChange(idea, +1)
                              }
                              disabled={!!updatingId}
                              style={{
                                ...styles.pulseBtn,
                                opacity: updatingId ? 0.5 : 1,
                              }}
                            >
                              +
                            </button>
                          </div>

                          <Link
                            href={`/idea/${idea.slug || idea.id}`}
                            style={styles.liveViewLink}
                          >
                            <span>→</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              // 🖥 DESKTOP КАРТКА
              return (
                <div key={idea.id} style={styles.liveCard}>
                  <div>
                    <div style={styles.liveTitle}>{idea.title}</div>
                    <div style={styles.liveDesc}>{idea.description}</div>
                    <div style={styles.liveMeta}>
                      {dateText} · Proof & pulse on record
                    </div>
                  </div>

                  <div style={styles.liveRight}>
                    <div style={styles.livePulsePill}>
                      <span>⚡</span>
                      <span>{p}</span>
                      <span>· {label}</span>
                    </div>
                    <div style={styles.pulseControls}>
                      <button
                        type="button"
                        onClick={() =>
                          handlePulseChange(idea, -1)
                        }
                        disabled={!!updatingId}
                        style={{
                          ...styles.pulseBtn,
                          opacity: updatingId ? 0.5 : 1,
                        }}
                      >
                        –
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          handlePulseChange(idea, +1)
                        }
                        disabled={!!updatingId}
                        style={{
                          ...styles.pulseBtn,
                          opacity: updatingId ? 0.5 : 1,
                        }}
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
              );
            })}
          </div>
        )}
      </section>

      {/* BOTTOM CTA */}
      <div style={styles.bottomCta}>
        <div style={{ maxWidth: 520 }}>
          <p style={styles.paragraph}>
            Roota keeps the public hive open and neutral. Proof and pulse
            stay public — paid layers appear only where they add real
            leverage: private hives, analytics and Bee-agents.
          </p>
        </div>
        <div style={styles.ctaRow}>
          <button
            type="button"
            onClick={scrollToHive}
            style={styles.ctaButtonPrimary}
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

