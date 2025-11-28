"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type IdeaPreview = {
  id: string;
  title: string;
  description: string | null;
  pulse: number | null;
  slug?: string | null;
  created_at: string;
};

export default function LandingPage() {
  const [liveIdeas, setLiveIdeas] = useState<IdeaPreview[]>([]);
  const [liveLoading, setLiveLoading] = useState(true);
  const [liveError, setLiveError] = useState<string | null>(null);

  const styles = {
    page: {
      minHeight: "100vh",
      background:
        "radial-gradient(circle at top left, rgba(56,189,248,0.12), transparent 60%), radial-gradient(circle at bottom right, rgba(129,140,248,0.14), #020617)",
      color: "#e5e7eb",
      padding: "24px 20px 60px",
      fontFamily:
        "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
      width: "100%",
      maxWidth: 1400,
      margin: "0 auto",
      boxSizing: "border-box" as const,
    },

    // NAV
    nav: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 28,
    },
    navLeft: {
      display: "flex",
      alignItems: "center",
      gap: 8,
    },
    navBrand: {
      fontSize: 16,
      fontWeight: 600,
      letterSpacing: "0.12em",
      textTransform: "uppercase" as const,
      color: "#e5e7eb",
    },
    navBadge: {
      fontSize: 11,
      color: "#9ca3af",
    },
    navRight: {
      display: "flex",
      gap: 14,
      fontSize: 13,
    },
    navLink: {
      textDecoration: "none",
      color: "#cbd5f5",
      padding: "4px 10px",
      borderRadius: 999,
      border: "1px solid transparent",
    },
    navLinkActive: {
      borderColor: "#334155",
      background:
        "radial-gradient(circle at top left, rgba(59,130,246,0.25), transparent 60%) #020617",
    },

    badgeRow: {
      display: "flex",
      gap: 8,
      alignItems: "center",
      marginBottom: 12,
      fontSize: 11,
      textTransform: "uppercase" as const,
      letterSpacing: "0.12em",
      color: "#a5b4fc",
    },
    badge: {
      padding: "2px 8px",
      borderRadius: 999,
      border: "1px solid #4338ca",
      background: "rgba(30,64,175,0.3)",
    },

    title: {
      fontSize: 38,
      fontWeight: 700,
      letterSpacing: "-0.03em",
      marginBottom: 12,
    },
    subtitle: {
      fontSize: 17,
      color: "#cbd5f5",
      maxWidth: 620,
      lineHeight: 1.55,
      marginBottom: 24,
    },

    section: {
      marginTop: 36,
      paddingTop: 24,
      borderTop: "1px solid #1f2937",
    },
    sectionTitle: {
      fontSize: 15,
      fontWeight: 600,
      color: "#e5e7eb",
      marginBottom: 12,
      textTransform: "uppercase" as const,
      letterSpacing: "0.14em",
    },
    paragraph: {
      fontSize: 15,
      lineHeight: 1.7,
      color: "#cbd5f5",
      marginBottom: 12,
    },
    list: {
      margin: "6px 0 6px 0",
      paddingLeft: 18,
      fontSize: 15,
      color: "#cbd5f5",
    },
    listItem: { marginBottom: 4 },

    ctaRow: {
      marginTop: 32,
      display: "flex",
      gap: 16,
      flexWrap: "wrap" as const,
    },
    ctaButtonPrimary: {
      borderRadius: 999,
      border: "1px solid #3b82f6",
      padding: "10px 20px",
      background:
        "radial-gradient(circle at top left, rgba(59,130,246,0.4), transparent 60%) #020617",
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

    // LIVE SIGNALS
    liveWrapper: {
      marginTop: 20,
      display: "flex",
      flexDirection: "column" as const,
      gap: 10,
    },
    liveHeaderRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 12,
    },
    liveTitle: {
      fontSize: 13,
      letterSpacing: "0.14em",
      textTransform: "uppercase" as const,
      color: "#9ca3af",
    },
    liveHint: {
      fontSize: 12,
      color: "#64748b",
    },
    liveList: {
      display: "flex",
      flexDirection: "column" as const,
      gap: 8,
    },
    liveCard: {
      borderRadius: 14,
      border: "1px solid #111827",
      background:
        "radial-gradient(circle at top left, rgba(37,99,235,0.15), transparent 55%) #020617",
      padding: "10px 12px",
      display: "flex",
      flexDirection: "column" as const,
      gap: 4,
    },
    liveTopRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 8,
    },
    liveIdeaTitle: {
      fontSize: 14,
      fontWeight: 600,
      color: "#e5e7eb",
    },
    livePulseChip: {
      display: "inline-flex",
      alignItems: "center",
      gap: 4,
      borderRadius: 999,
      border: "1px solid #1d4ed8",
      padding: "3px 8px",
      fontSize: 11,
      background: "rgba(15,23,42,0.95)",
      color: "#e5e7eb",
      whiteSpace: "nowrap" as const,
    },
    liveDesc: {
      fontSize: 13,
      color: "#cbd5f5",
      overflow: "hidden",
      display: "-webkit-box",
      WebkitLineClamp: 2,
      WebkitBoxOrient: "vertical" as const,
    },
    liveMetaRow: {
      marginTop: 2,
      fontSize: 11,
      color: "#64748b",
      display: "flex",
      justifyContent: "space-between",
      gap: 6,
      alignItems: "center",
    },
    liveLink: {
      fontSize: 11,
      color: "#93c5fd",
      textDecoration: "none",
    },
    liveEmpty: {
      fontSize: 12,
      color: "#64748b",
    },
  };

  // завантажуємо останні ідеї для "Live signals"
  useEffect(() => {
    let cancelled = false;

    async function loadIdeas() {
      setLiveLoading(true);
      setLiveError(null);
      try {
        const res = await fetch("/api/ideas", { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const ideas: IdeaPreview[] = data?.ideas ?? data ?? [];

        if (!cancelled) {
          // беремо максимум 3 найновіші
          const sorted = [...ideas].sort(
            (a, b) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
          );
          setLiveIdeas(sorted.slice(0, 3));
        }
      } catch (e: any) {
        if (!cancelled) {
          setLiveError(e?.message || "Failed to load live signals");
        }
      } finally {
        if (!cancelled) {
          setLiveLoading(false);
        }
      }
    }

    loadIdeas();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main style={styles.page}>
      {/* TOP NAV */}
      <nav style={styles.nav}>
        <div style={styles.navLeft}>
          <span style={styles.navBrand}>ROOTA</span>
          <span style={styles.navBadge}>Ideas Stock Exchange · Proof &amp; Pulse</span>
        </div>
        <div style={styles.navRight}>
          <Link
            href="/"
            style={{ ...styles.navLink, ...styles.navLinkActive }}
          >
            Landing
          </Link>
          <Link href="/hive" style={styles.navLink}>
            Hive
          </Link>
          <Link href="/about" style={styles.navLink}>
            About
          </Link>
        </div>
      </nav>

      {/* HEADER / HERO */}
      <div style={styles.badgeRow}>
        <span style={styles.badge}>Roota</span>
        <span>Ideas deserve a home, not a feed.</span>
      </div>

      <h1 style={styles.title}>Ideas deserve a home, not a feed.</h1>

      <p style={styles.subtitle}>
        Roota turns raw thoughts into timestamped records with{" "}
        <strong>proof</strong> and <strong>pulse</strong>. It’s a live hive — a
        place where ideas take root, grow and become visible to people who care.
      </p>

      <div style={styles.ctaRow}>
        <Link href="/hive" style={styles.ctaButtonPrimary}>
          Enter the Hive
        </Link>
        <Link href="/about" style={styles.ctaButtonSecondary}>
          Learn more
        </Link>
      </div>

      {/* LIVE SIGNALS SECTION */}
      <section style={styles.section}>
        <div style={styles.liveWrapper}>
          <div style={styles.liveHeaderRow}>
            <h2 style={styles.liveTitle}>Live signals from the hive</h2>
            <span style={styles.liveHint}>
              Realtime pulse — no screenshots, just what&apos;s alive now.
            </span>
          </div>

          {liveLoading && (
            <div style={styles.liveEmpty}>Loading live signals…</div>
          )}

          {liveError && (
            <div style={styles.liveEmpty}>
              Couldn&apos;t load signals: {liveError}
            </div>
          )}

          {!liveLoading && !liveError && liveIdeas.length === 0 && (
            <div style={styles.liveEmpty}>
              No ideas yet. Be the first one to leave a trace.
            </div>
          )}

          {!liveLoading && !liveError && liveIdeas.length > 0 && (
            <div style={styles.liveList}>
              {liveIdeas.map((idea) => (
                <div key={idea.id} style={styles.liveCard}>
                  <div style={styles.liveTopRow}>
                    <div style={styles.liveIdeaTitle}>{idea.title}</div>
                    <div style={styles.livePulseChip}>
                      <span>⚡</span>
                      <span>{idea.pulse ?? 0}</span>
                      <span>| heartbeat</span>
                    </div>
                  </div>
                  {idea.description && (
                    <div style={styles.liveDesc}>{idea.description}</div>
                  )}
                  <div style={styles.liveMetaRow}>
                    <span>
                      {new Date(idea.created_at).toLocaleDateString()}
                    </span>
                    <Link
                      href={`/idea/${idea.slug || idea.id}`}
                      style={styles.liveLink}
                    >
                      View idea →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* SECTION: How it works */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>How Roota works</h2>

        <p style={styles.paragraph}>
          Every idea in Roota becomes a structured, verifiable entry — not a
          disappearing note.
        </p>

        <ul style={styles.list}>
          <li style={styles.listItem}>
            📌 <strong>Proof token</strong> — a hash that anchors your idea in
            time.
          </li>
          <li style={styles.listItem}>
            ⚡ <strong>Pulse</strong> — a signal of attention and momentum.
          </li>
          <li style={styles.listItem}>
            🌱 <strong>Branches</strong> — related ideas that expand or refine
            the original.
          </li>
          <li style={styles.listItem}>
            🐝 <strong>Bees</strong> — people and agents who interact, explore
            and build.
          </li>
        </ul>
      </section>

      {/* SECTION: Why it matters */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Why it matters</h2>

        <p style={styles.paragraph}>
          Most ideas die in chats and notebooks. Roota gives them a place to
          live — a transparent, timestamped history of how they evolve.
        </p>

        <p style={styles.paragraph}>
          The hive turns scattered thoughts into a map of signals: what&apos;s
          gaining attention, which directions grow, and where early energy
          forms.
        </p>
      </section>

      {/* SECTION: Why Roota exists (heartbeat vs applause) */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Why Roota exists</h2>

        <p style={styles.paragraph}>
          Most platforms treat ideas like a show: you launch, get a burst of
          attention, and then the crowd moves on. That&apos;s applause.
        </p>

        <p style={styles.paragraph}>
          Roota is built for something quieter and deeper —{" "}
          <strong>серцебиття ідей</strong>. Instead of one loud launch day, it
          tracks whether an idea keeps attracting energy over time: new
          branches, new votes, new proofs.
        </p>

        <p style={styles.paragraph}>
          If Product Hunt is about the moment everyone claps, Roota is about the{" "}
          <strong>pulse that doesn&apos;t stop</strong>. It&apos;s less “look
          what I shipped” and more “дивись, ця думка все ще жива, і до неї
          повертаються”.
        </p>
      </section>

      {/* SECTION: Roadmap snapshot */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>What&apos;s coming next</h2>

        <ul style={styles.list}>
          <li style={styles.listItem}>🤖 Autonomous Bee-agents</li>
          <li style={styles.listItem}>
            📊 Pulse &amp; proof analytics dashboards
          </li>
          <li style={styles.listItem}>🎨 Idea clustering &amp; bloom boards</li>
          <li style={styles.listItem}>🔒 Private hives for teams &amp; studios</li>
          <li style={styles.listItem}>🌐 Matchmaking toolkit for investors</li>
        </ul>

        <p style={styles.paragraph}>
          Roota keeps the public hive open. Paid tools exist to{" "}
          <strong>amplify ideas</strong> — not to gate them.
        </p>
      </section>

      {/* BOTTOM CTA */}
      <div style={styles.ctaRow}>
        <Link href="/hive" style={styles.ctaButtonPrimary}>
          Explore live ideas
        </Link>
        <Link href="/about" style={styles.ctaButtonSecondary}>
          About Roota
        </Link>
      </div>
    </main>
  );
}
