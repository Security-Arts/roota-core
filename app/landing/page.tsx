"use client";
import Link from "next/link";

export default function LandingPage() {
  const styles = {
    page: {
      minHeight: "100vh",
      background:
        "radial-gradient(circle at top left, rgba(56,189,248,0.12), transparent 60%), radial-gradient(circle at bottom right, rgba(129,140,248,0.14), #020617)",
      color: "#e5e7eb",
      padding: "40px 20px 60px",
      fontFamily:
        "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
      width: "100%",
      maxWidth: 900,
      margin: "0 auto",
      boxSizing: "border-box",
    },

    badgeRow: {
      display: "flex",
      gap: 8,
      alignItems: "center",
      marginBottom: 12,
      fontSize: 11,
      textTransform: "uppercase",
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
      textTransform: "uppercase",
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
      flexWrap: "wrap",
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
  };

  return (
    <main style={styles.page}>
      {/* HEADER */}
      <div style={styles.badgeRow}>
        <span style={styles.badge}>Roota</span>
        <span>Ideas Stock Exchange — Proof & Pulse</span>
      </div>

      <h1 style={styles.title}>Ideas deserve a home, not a feed.</h1>

      <p style={styles.subtitle}>
        Roota turns raw thoughts into timestamped records with <strong>proof</strong>{' '}
        and <strong>pulse</strong>.  
        It’s a live hive — a place where ideas take root, grow and become visible
        to people who care.
      </p>

      <div style={styles.ctaRow}>
        <Link href="/" style={styles.ctaButtonPrimary}>
          Enter the Hive
        </Link>
        <Link href="/about" style={styles.ctaButtonSecondary}>
          Learn more
        </Link>
      </div>

      {/* SECTION: How it works */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>How Roota works</h2>

        <p style={styles.paragraph}>
          Every idea in Roota becomes a structured, verifiable entry — not a disappearing note.
        </p>

        <ul style={styles.list}>
          <li style={styles.listItem}>
            📌 <strong>Proof token</strong> — a hash that anchors your idea in time.
          </li>
          <li style={styles.listItem}>
            ⚡ <strong>Pulse</strong> — a signal of attention and momentum.
          </li>
          <li style={styles.listItem}>
            🌱 <strong>Branches</strong> — related ideas that expand or refine the original.
          </li>
          <li style={styles.listItem}>
            🐝 <strong>Bees</strong> — people and agents who interact, explore and build.
          </li>
        </ul>
      </section>

      {/* SECTION: Why it matters */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Why it matters</h2>

        <p style={styles.paragraph}>
          Most ideas die in chats and notebooks. Roota gives them a place to live — 
          a transparent, timestamped history of how they evolve.
        </p>

        <p style={styles.paragraph}>
          The hive turns scattered thoughts into a map of signals: 
          what's gaining attention, which directions grow, and where early energy forms.
        </p>
      </section>

      {/* SECTION: Roadmap snapshot */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>What&apos;s coming next</h2>

        <ul style={styles.list}>
          <li style={styles.listItem}>🤖 Autonomous Bee-agents</li>
          <li style={styles.listItem}>📊 Pulse & proof analytics dashboards</li>
          <li style={styles.listItem}>🎨 Idea clustering & bloom boards</li>
          <li style={styles.listItem}>🔒 Private hives for teams & studios</li>
          <li style={styles.listItem}>🌐 Matchmaking toolkit for investors</li>
        </ul>

        <p style={styles.paragraph}>
          Roota keeps the public hive open.  
          Paid tools exist to amplify ideas — not to gate them.
        </p>
      </section>

      {/* BOTTOM CTA */}
      <div style={styles.ctaRow}>
        <Link href="/" style={styles.ctaButtonPrimary}>
          Explore live ideas
        </Link>
        <Link href="/about" style={styles.ctaButtonSecondary}>
          About Roota
        </Link>
      </div>
    </main>
  );
}
