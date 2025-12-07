"use client";
import Link from "next/link";

export default function OverviewPage() {
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
      boxSizing: "border-box" as const,
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
        Roota turns raw thoughts into timestamped records with{" "}
        <strong>proof</strong> and <strong>pulse</strong>. It’s a live hive — a
        place where ideas take root, grow and become visible to people who care.
      </p>

      <div style={styles.ctaRow}>
        <Link href="/" style={styles.ctaButtonPrimary}>
          Enter the Hive
        </Link>
        <Link href="/about" style={styles.ctaButtonSecondary}>
          Learn more
        </Link>
      </div>

      {/* HOW IT WORKS */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>How Roota works</h2>
        <p style={styles.paragraph}>
          Every idea in Roota becomes a structured, verifiable entry — not a
          disappearing message or private note.
        </p>
        <ul style={styles.list}>
          <li style={styles.listItem}>📌 Proof token — a timestamped hash.</li>
          <li style={styles.listItem}>⚡ Pulse — a signal of attention.</li>
          <li style={styles.listItem}>🐝 Hive — a public space for ideas.</li>
        </ul>
      </section>

      {/* WHY IT MATTERS */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Why it matters</h2>
        <p style={styles.paragraph}>
          Most ideas die in chats and notebooks. Roota gives them a persistent,
          timestamped home — a visible trail of evolution.
        </p>
        <p style={styles.paragraph}>
          Instead of chasing applause, Roota shows the <strong>heartbeat</strong> of ideas.
        </p>
      </section>

      {/* NEXT */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>What's next</h2>
        <ul style={styles.list}>
          <li style={styles.listItem}>🤖 Autonomous Bee-agents</li>
          <li style={styles.listItem}>📊 Pulse & proof analytics</li>
          <li style={styles.listItem}>🎨 Idea clustering</li>
          <li style={styles.listItem}>🔒 Private hives for teams</li>
        </ul>
      </section>
    </main>
  );
}
