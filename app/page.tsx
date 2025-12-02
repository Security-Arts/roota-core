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
    padding: "32px 20px 56px",
    fontFamily:
      "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
    width: "100%",
    maxWidth: 1100,
    margin: "0 auto",
    boxSizing: "border-box" as const,
  },

  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 32,
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  brandMark: {
    width: 26,
    height: 26,
    borderRadius: "999px",
    background:
      "radial-gradient(circle at 30% 20%, rgba(96,165,250,0.9), transparent 60%)",
    border: "1px solid rgba(129,140,248,0.8)",
    boxShadow: "0 0 0 1px rgba(15,23,42,0.9), 0 12px 35px rgba(15,23,42,0.9)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 14,
  },
  brandText: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  brandTitle: {
    fontSize: 16,
    fontWeight: 600,
    letterSpacing: "0.22em",
  },
  brandTagline: {
    fontSize: 11,
    color: "#9ca3af",
  },

  nav: {
    display: "flex",
    gap: 6,
    padding: 3,
    borderRadius: 999,
    border: "1px solid #1f2937",
    background: "rgba(2,6,23,0.9)",
    fontSize: 12,
  },
  navLinkBase: {
    padding: "5px 14px",
    borderRadius: 999,
    textDecoration: "none",
    border: "1px solid transparent",
  },
  navLinkActive: {
    borderColor: "#1d4ed8",
    background:
      "radial-gradient(circle at top left, rgba(37,99,235,0.45), transparent 60%) #020617",
    color: "#e5e7eb",
  },
  navLinkIdle: {
    color: "#9ca3af",
  },

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
    textTransform: "uppercase" as const,
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

  // PH vs Roota
  compareGrid: {
    display: "grid",
    gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)",
    gap: 18,
    marginTop: 10,
  },
  compareCard: {
    borderRadius: 16,
    border: "1px solid #111827",
    padding: "12px 14px",
    background:
      "radial-gradient(circle at top left, rgba(15,23,42,0.9), transparent 55%)",
    fontSize: 13,
  },
  compareTitle: {
    fontSize: 13,
    fontWeight: 600,
    marginBottom: 6,
  },
  compareTag: {
    display: "inline-block",
    fontSize: 11,
    borderRadius: 999,
    border: "1px solid #374151",
    padding: "2px 7px",
    marginBottom: 6,
    color: "#9ca3af",
  },

  // Personas
  personaGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0,1fr))",
    gap: 16,
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

  // Live signals
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

export default function LandingPage() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loadingIdeas, setLoadingIdeas] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoadingIdeas(true);
        const res = await fetch("/api/ideas", { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        const list: Idea[] = data?.ideas ?? data ?? [];

        // sort by created_at desc, take top 4
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

  return (
    <main style={styles.page}>
      {/* TOP BAR */}
      <div style={styles.topBar}>
        <Link href="/" style={styles.brand}>
          <div style={styles.brandMark}>⚡</div>
          <div style={styles.brandText}>
            <span style={styles.brandTitle}>ROOTA</span>
            <span style={styles.brandTagline}>
              Ideas Stock Exchange · Proof &amp; Pulse
            </span>
          </div>
        </Link>

        <nav style={styles.nav}>
          <span
            style={{
              ...styles.navLinkBase,
              ...styles.navLinkActive,
            }}
          >
            Landing
          </span>
          <Link
            href="/"
            style={{
              ...styles.navLinkBase,
              ...styles.navLinkIdle,
            }}
          >
            Hive
          </Link>
          <Link
            href="/about"
            style={{
              ...styles.navLinkBase,
              ...styles.navLinkIdle,
            }}
          >
            About
          </Link>
        </nav>
      </div>

      {/* HERO */}
      <div style={styles.badgeRow}>
        <span style={styles.badge}>ROOTA</span>
        <span>IDEAS DESERVE A HOME, NOT A FEED.</span>
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
            <Link href="/" style={styles.ctaButtonPrimary}>
              Enter the Hive
            </Link>
            <Link href="/about" style={styles.ctaButtonSecondary}>
              Why Roota exists
            </Link>
          </div>
        </div>

        <aside style={styles.heroSideCard}>
          <div style={styles.heroSideTitle}>Heartbeat, not applause</div>
          <p>
            Product launches chase applause — a spike of attention and швидкий
            забуття. Roota фіксує інше: серцебиття ідей. Кожен proof додає
            шар часу, а кожен pulse — порцію енергії.
          </p>
          <div style={styles.heroSideRow}>
            <div>
              <div style={styles.heroSideLabel}>Signals you see</div>
              <div style={styles.heroSideValue}>
                Proof tokens · Pulse · Live ideas stream
              </div>
            </div>
            <div>
              <div style={styles.heroSideLabel}>Signals you don&apos;t see</div>
              <div style={styles.heroSideValue}>
                Screenshots, pitch decks, vanity metrics — тут їх немає.
              </div>
            </div>
          </div>
        </aside>
      </section>

      {/* WHY ROOTA EXISTS */}
      <section style={styles.section}>
        <div style={styles.sectionTitleRow}>
          <h2 style={styles.sectionTitle}>Why Roota exists</h2>
          <div style={styles.sectionHint}>
            Ideas die in chats and notebooks. Roota keeps their heartbeat.
          </div>
        </div>

        <div style={styles.twoColText}>
          <div>
            <p style={styles.paragraph}>
              Більшість ідей живе у фрагментах: notes, Notion-сторінки,
              телеграм-чати, голосові. Їх складно показати, неможливо відстежити
              і майже нереально довести, що вони взагалі існували.
            </p>
            <p style={styles.paragraph}>
              Roota перетворює думки на запис:{" "}
              <strong>timestamped proof token</strong>, публічний опис і{" "}
              <strong>pulse</strong>, який показує, як змінюється увага.
            </p>
          </div>

          <div>
            <p style={styles.paragraph}>
              Разом це створює живий реєстр ідей — не список лончів, а карту
              того, про що думають люди і що болить просто зараз.
            </p>
            <ul style={styles.miniList}>
              <li style={styles.miniItem}>⏱ Proof — “ця ідея була тут, тоді”.</li>
              <li style={styles.miniItem}>
                ⚡ Pulse — “наскільки сильно вона резонує”.
              </li>
              <li style={styles.miniItem}>
                🐝 Hive — простір, де ідеї запилюють одна одну, а не змагаються.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* HEARTBEAT VS APPLAUSE */}
      <section style={styles.section}>
        <div style={styles.sectionTitleRow}>
          <h2 style={styles.sectionTitle}>Heartbeat, not applause</h2>
          <div style={styles.sectionHint}>
            Product Hunt показує запуск. Roota показує життя до й після.
          </div>
        </div>

        <div style={styles.compareGrid}>
          <div style={styles.compareCard}>
            <div style={styles.compareTag}>Launch stage</div>
            <div style={styles.compareTitle}>Product Hunt</div>
            <p style={styles.paragraph}>
              Каталог готових продуктів. День уваги, апвоути, скріншоти,
              красиві лончі.
            </p>
            <ul style={styles.miniList}>
              <li style={styles.miniItem}>“Ми вже зробили”.</li>
              <li style={styles.miniItem}>Фокус на хайпі й трафіку.</li>
              <li style={styles.miniItem}>Аплодисменти — потім тиша.</li>
            </ul>
          </div>

          <div style={styles.compareCard}>
            <div style={styles.compareTag}>Idea stage</div>
            <div style={styles.compareTitle}>Roota</div>
            <p style={styles.paragraph}>
              Середовище народження ідей. Proof, pulse і слід того, як думка
              стає напрямком.
            </p>
            <ul style={styles.miniList}>
              <li style={styles.miniItem}>“Воно тільки починає рости”.</li>
              <li style={styles.miniItem}>
                Фокус на життєздатності та енергії, а не на лайках.
              </li>
              <li style={styles.miniItem}>
                Серцебиття ідей — не одноразовий пост.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section style={styles.section}>
        <div style={styles.sectionTitleRow}>
          <h2 style={styles.sectionTitle}>Who uses the hive</h2>
          <div style={styles.sectionHint}>
            Roota не продає ідеї. Вона показує, що живе і куди росте.
          </div>
        </div>

        <div style={styles.personaGrid}>
          <div style={styles.personaCard}>
            <div style={styles.personaTitle}>Makers & founders</div>
            <p>
              Фіксують сирі концепти, дивляться, що резонує, і перетворюють{" "}
              bloom-ідеї на проекти, продукти чи side-hustles.
            </p>
          </div>

          <div style={styles.personaCard}>
            <div style={styles.personaTitle}>Studios & teams</div>
            <p>
              Ведуть власні приватні hives, трекають внутрішні сигнали, бачать,
              які напрямки набирають енергію в команді.
            </p>
          </div>

          <div style={styles.personaCard}>
            <div style={styles.personaTitle}>Funds & scouts</div>
            <p>
              Дивляться на ранні сигнали — ніші, де proof + pulse ростуть ще до
              того, як з’являються пітчдеки.
            </p>
          </div>
        </div>
      </section>

      {/* LIVE SIGNALS */}
      <section style={styles.section}>
        <div style={styles.liveHeaderRow}>
          <div style={styles.sectionTitle}>Live signals from the hive</div>
          <div style={styles.sectionHint}>
            Realtime pulse — no screenshots, just what&apos;s alive now.
          </div>
        </div>

        {loadingIdeas && (
          <p style={styles.sectionHint}>Loading latest ideas…</p>
        )}

        {!loadingIdeas && ideas.length === 0 && (
          <p style={styles.sectionHint}>
            No signals yet. Be the first bee to publish an idea.
          </p>
        )}

        {!loadingIdeas && ideas.length > 0 && (
          <div style={styles.liveList}>
            {ideas.map((idea) => (
              <div key={idea.id} style={styles.liveCard}>
                <div>
                  <div style={styles.liveTitle}>{idea.title}</div>
                  <div style={styles.liveDesc}>{idea.description}</div>
                  <div style={styles.liveMeta}>
                    {new Date(idea.created_at).toLocaleDateString()} · proof &
                    pulse on record
                  </div>
                </div>
                <div style={{ textAlign: "right" as const }}>
                  <div style={styles.livePulsePill}>
                    <span>⚡</span>
                    <span>{idea.pulse ?? 0}</span>
                    <span>| heartbeat</span>
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
            Roota keeps the public hive open and neutral. Proof and pulse are
            public — paywalls з’являються тільки там, де вони дають реальне
            плече: приватні hives, аналітика, Bee-agents.
          </p>
        </div>
        <div style={styles.ctaRow}>
          <Link href="/" style={styles.ctaButtonPrimary}>
            Explore the Hive
          </Link>
          <Link href="/about" style={styles.ctaButtonSecondary}>
            Read the full story
          </Link>
        </div>
      </div>
    </main>
  );
}
