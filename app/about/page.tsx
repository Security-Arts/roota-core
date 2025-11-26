// app/about/page.tsx
import Link from "next/link";

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "radial-gradient(circle at top left, rgba(56,189,248,0.12), transparent 60%), radial-gradient(circle at bottom right, rgba(129,140,248,0.14), #020617)",
    color: "#e5e7eb",
    padding: "24px 16px 40px",
    fontFamily:
      "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
    width: "100%",
    maxWidth: "900px",
    margin: "0 auto",
    boxSizing: "border-box" as const,
  },
  header: {
    marginBottom: 32,
  },
  badgeRow: {
    display: "flex",
    gap: 8,
    alignItems: "center",
    marginBottom: 10,
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
    fontSize: 32,
    fontWeight: 700,
    letterSpacing: "-0.03em",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: "#cbd5f5",
    maxWidth: 620,
    lineHeight: 1.5,
  },
  section: {
    marginTop: 28,
    paddingTop: 20,
    borderTop: "1px solid #1f2937",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 600,
    color: "#e5e7eb",
    marginBottom: 10,
    textTransform: "uppercase" as const,
    letterSpacing: "0.14em",
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 1.7,
    color: "#cbd5f5",
    marginBottom: 10,
  },
  list: {
    margin: "6px 0 4px 0",
    paddingLeft: 18,
    fontSize: 14,
    color: "#cbd5f5",
  },
  listItem: {
    marginBottom: 4,
  },
  tagRow: {
    display: "flex",
    flexWrap: "wrap" as const,
    gap: 8,
    marginTop: 6,
  },
  tag: {
    fontSize: 12,
    padding: "3px 8px",
    borderRadius: 999,
    border: "1px solid #1f2937",
    background: "rgba(15,23,42,0.9)",
    color: "#e5e7eb",
  },
  backLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    marginTop: 28,
    fontSize: 13,
    color: "#93c5fd",
    textDecoration: "none",
    borderRadius: 999,
    border: "1px solid #1d4ed8",
    padding: "6px 12px",
    background:
      "radial-gradient(circle at top left, rgba(59,130,246,0.25), transparent 60%) #020617",
  },
};

export default function AboutPage() {
  return (
    <main style={styles.page}>
      {/* HEADER */}
      <header style={styles.header}>
        <div style={styles.badgeRow}>
          <span style={styles.badge}>Roota</span>
          <span>Ideas Stock Exchange · Proof &amp; Pulse</span>
        </div>
        <h1 style={styles.title}>About Roota</h1>
        <p style={styles.subtitle}>
          Roota is an ideas stock exchange — a live hive where ideas don&apos;t
          just appear and vanish. Each thought gets its own proof, a measurable
          pulse of interest, and a clear trace of how it grows.
        </p>
      </header>

      {/* WHAT IS ROOTA */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>What Roota is</h2>
        <p style={styles.paragraph}>
          Roota is a live registry of ideas built around two signals:
          <strong> proof</strong> and <strong>pulse</strong>. Instead of
          disappearing into chats and notebooks, ideas become timestamped
          records with:
        </p>
        <ul style={styles.list}>
          <li style={styles.listItem}>
            a <strong>proof token</strong> — a hash that anchors the idea in
            time,
          </li>
          <li style={styles.listItem}>
            a <strong>pulse score</strong> that reflects growing or fading
            attention,
          </li>
          <li style={styles.listItem}>
            public context: title, description, author, and a shareable page.
          </li>
        </ul>
        <p style={styles.paragraph}>
          The purpose is simple: to create a transparent trail of how thinking
          evolves — from raw sparks to ideas ready for execution.
        </p>
      </section>

      {/* SYMBOLISM */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Root, hive, bees &amp; bloom</h2>
        <p style={styles.paragraph}>
          The name Roota comes from <em>root</em> — the origin point. Ideas grow,
          and Roota is the soil where they take hold instead of evaporating into
          noise.
        </p>
        <p style={styles.paragraph}>
          In Ukrainian, “Roota” echoes “рута” — a resilient traditional flower.
          This symbolism reflects how Roota treats ideas: delicate at first, but
          capable of becoming something strong.
        </p>
        <p style={styles.paragraph}>
          The <strong>hive</strong> is the ecosystem. A hive is dynamic — it
          hums, shifts and adapts. Ideas live inside this collective energy.
        </p>
        <p style={styles.paragraph}>
          <strong>Bees</strong> are people and future autonomous agents who
          create, react, vote, branch and contribute. They don&apos;t own the
          hive — they animate it.
        </p>
        <p style={styles.paragraph}>
          <strong>Bloom</strong> happens when an idea accumulates enough proof
          and pulse to become a project, product or investment direction.
        </p>
        <div style={styles.tagRow}>
          <span style={styles.tag}>🌱 Root — origin of ideas</span>
          <span style={styles.tag}>🐝 Bees — contributors &amp; agents</span>
          <span style={styles.tag}>🏠 Hive — shared space</span>
          <span style={styles.tag}>🌺 Bloom — ideas maturing</span>
          <span style={styles.tag}>⚡ Pulse — attention signal</span>
        </div>
      </section>

      {/* PROOF & PULSE */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Proof &amp; pulse</h2>
        <p style={styles.paragraph}>
          A <strong>proof token</strong> is a verifiable timestamp that says:
          &quot;this idea existed, in this form, on this date&quot;. It is not a
          patent — but it is a transparent anchor in time.
        </p>
        <p style={styles.paragraph}>
          <strong>Pulse</strong> measures attention and momentum. It moves up or
          down depending on interactions — voting, branching, discussions, or
          simply curiosity.
        </p>
        <p style={styles.paragraph}>
          Together, proof + pulse create a living map of what people find
          meaningful — and when.
        </p>
      </section>

      {/* WHAT ROOTA IS NOT */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>What Roota is not</h2>
        <p style={styles.paragraph}>
          Roota is not a pitch contest, not a startup ranking, and not a
          social-feed built on vanity metrics. Pulse is a signal — not ego.
        </p>
        <p style={styles.paragraph}>
          It also does not replace legal tools like patents, NDAs or IP filings.
          Roota adds visibility and structure, not bureaucracy.
        </p>
      </section>

      {/* MVP */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>MVP and what comes next</h2>
        <p style={styles.paragraph}>
          Roota currently runs as an MVP on a Supabase-backed registry with a
          public API. You can:
        </p>
        <ul style={styles.list}>
          <li style={styles.listItem}>publish ideas with proof tokens,</li>
          <li style={styles.listItem}>adjust pulse in real time,</li>
          <li style={styles.listItem}>share public idea pages.</li>
        </ul>
        <p style={styles.paragraph}>
          Next phases include autonomous Bee-agents, idea clustering, and
          curated &quot;bloom boards&quot; for concepts ready for execution or
          exploration.
        </p>
      </section>

      {/* MONETIZATION */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>How Roota will make money</h2>
        <p style={styles.paragraph}>
          Roota doesn&apos;t charge for ideas or take a cut from collaboration.
          The hive is meant to stay an open and neutral space — a living registry
          where proof and pulse can grow without friction.
        </p>
        <p style={styles.paragraph}>
          Monetization will appear only where it adds real leverage — around the
          registry, not inside it. These layers are optional and designed to help
          people work with ideas more effectively:
        </p>
        <ul style={styles.list}>
          <li style={styles.listItem}>
            <strong>Private or invite-only hives</strong> for teams, studios and
            innovation groups.
          </li>
          <li style={styles.listItem}>
            <strong>Advanced proof &amp; pulse analytics</strong> for trend
            spotting, clustering and portfolio-level insight.
          </li>
          <li style={styles.listItem}>
            <strong>Bee-agents as a service</strong> — autonomous scouts that
            monitor niches, cluster ideas and surface emerging signals.
          </li>
        </ul>
        <p style={styles.paragraph}>
          The public idea registry will remain open. Paid tools will enhance the
          experience — never restrict it.
        </p>
      </section>

      {/* COLLABORATION */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Collaboration around ideas</h2>
        <p style={styles.paragraph}>
          Roota isn&apos;t a deal-flow marketplace — but it makes collaboration
          easier by providing clarity: visible proof, transparent pulse, and a
          public home for each idea.
        </p>
        <p style={styles.paragraph}>
          If an idea resonates with someone, they can:
        </p>
        <ul style={styles.list}>
          <li style={styles.listItem}>
            contact the author directly through the public idea page,
          </li>
          <li style={styles.listItem}>
            build a related branch — an extension or refinement of the idea,
          </li>
          <li style={styles.listItem}>
            or offer resources: time, skills, funding or partnership.
          </li>
        </ul>
        <p style={styles.paragraph}>
          Roota itself does not take commissions and does not mediate agreements.
          It stays a neutral ground — a clean map of what sparks interest.
        </p>
        <p style={styles.paragraph}>
          Over time, optional tools may appear: private workspaces, co-creation
          boards, investor dashboards. But the core remains simple:
          <strong> Roota helps people who care about the same idea find each other.</strong>
        </p>
      </section>

      {/* BACK LINK */}
      <Link href="/" style={styles.backLink}>
        <span>← Back to live ideas stream</span>
      </Link>
    </main>
  );
}
