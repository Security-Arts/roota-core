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
          pulse of interest, and a chance to bloom into something real.
        </p>
      </header>

      {/* WHAT IS ROOTA */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>What Roota is</h2>
        <p style={styles.paragraph}>
          Roota is a live registry of ideas with <strong>proof</strong> and{" "}
          <strong>pulse</strong>. Instead of being lost in chats, docs and
          notebooks, every idea becomes a record with:
        </p>
        <ul style={styles.list}>
          <li style={styles.listItem}>
            a <strong>timestamped proof token</strong> (hash) that shows when
            the idea was registered,
          </li>
          <li style={styles.listItem}>
            a <strong>pulse score</strong> that reflects interest and energy
            around it over time,
          </li>
          <li style={styles.listItem}>
            basic context — title, description, author, and a public page.
          </li>
        </ul>
        <p style={styles.paragraph}>
          The goal is not to gamify ideas, but to keep a persistent trail of how
          thinking evolves — from raw sparks to mature concepts.
        </p>
      </section>

      {/* SYMBOLS: ROOT, HIVE, BEES, BLOOM, PULSE */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Root, hive, bees &amp; bloom</h2>
        <p style={styles.paragraph}>
          The name Roota comes from <em>root</em> — the origin point. Ideas grow
          from somewhere, and Roota is that soil: a place where they can take
          root instead of disappearing.
        </p>
        <p style={styles.paragraph}>
          In Ukrainian, “Roota” also quietly echoes “рута” — a traditional rue
          flower that often symbolises protection, resilience and quiet
          strength. That association fits how Roota treats ideas: fragile at
          first, but capable of becoming something strong and persistent.
        </p>
        <p style={styles.paragraph}>
          The <strong>hive</strong> metaphor is about collective energy. A hive
          is never static: it hums, it reacts, it adapts. In Roota, each idea
          lives inside this hive of activity.
        </p>
        <p style={styles.paragraph}>
          <strong>Bees</strong> are future agents and people who add ideas,
          react, upvote or downvote pulse, and move concepts forward. They
          don&apos;t own the hive — they make it alive.
        </p>
        <p style={styles.paragraph}>
          <strong>Bloom</strong> is what happens when an idea builds enough
          proof and pulse to find its path into a product, project or
          investment. Roota doesn&apos;t promise success — it documents the
          journey towards bloom.
        </p>
        <div style={styles.tagRow}>
          <span style={styles.tag}>🌱 Root — registry of ideas</span>
          <span style={styles.tag}>🐝 Bees — people &amp; agents</span>
          <span style={styles.tag}>🏠 Hive — shared space</span>
          <span style={styles.tag}>🌺 Bloom — ideas that mature</span>
          <span style={styles.tag}>⚡ Pulse — energy of attention</span>
        </div>
      </section>

      {/* PROOF & PULSE */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Proof &amp; pulse</h2>
        <p style={styles.paragraph}>
          Every idea in Roota can carry a <strong>proof token</strong> — a hash
          generated from its core data. It&apos;s not a legal patent or IP
          registration, but it gives a verifiable anchor in time: “this idea
          existed in this form on this date”.
        </p>
        <p style={styles.paragraph}>
          <strong>Pulse</strong> is a small, simple metric that shows how much
          attention an idea gets inside the hive. Pulse can go up or down as
          people (and agents) interact with the idea — vote, discuss, or build
          on top of it.
        </p>
        <p style={styles.paragraph}>
          Over time, this combination of proof + pulse forms a living history of
          what people cared about — and when.
        </p>
      </section>

      {/* WHAT ROOTA IS NOT */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>What Roota is not</h2>
        <p style={styles.paragraph}>
          Roota is <strong>not</strong> a pitch contest, not a startup ranking,
          and not a social feed. There are no “likes for vanity” here. Pulse is
          about signal, not ego.
        </p>
        <p style={styles.paragraph}>
          It is also not a replacement for legal tools like NDAs, IP
          registrations or patents. Roota simply adds a transparent, shared
          layer of visibility over how ideas emerge and move.
        </p>
      </section>

      {/* ROADMAP / MVP */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>MVP and what comes next</h2>
        <p style={styles.paragraph}>
          The current version of Roota is an{" "}
          <strong>MVP running on a Supabase backend</strong> with a public API
          for ideas (<code>/api/ideas</code>). You can:
        </p>
        <ul style={styles.list}>
          <li style={styles.listItem}>publish ideas with proof tokens,</li>
          <li style={styles.listItem}>adjust pulse,</li>
          <li style={styles.listItem}>share public idea pages.</li>
        </ul>
        <p style={styles.paragraph}>
          Next steps include: autonomous bee-agents, richer idea graph
          visualisations, and curated &quot;bloom&quot; boards for ideas that
          are ready to move into execution.
        </p>
      </section>

      {/* MONETIZATION */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>How Roota will make money</h2>
        <p style={styles.paragraph}>
          Right now Roota is in an open, exploratory phase. There are{" "}
          <strong>no fees, no subscriptions and no commissions</strong> for
          publishing or browsing ideas. The hive is focused on one thing:
          capturing proof and pulse in a clean way.
        </p>
        <p style={styles.paragraph}>
          If Roota proves useful, monetization will live{" "}
          <em>around</em> the registry, not against it. Possible future layers
          include:
        </p>
        <ul style={styles.list}>
          <li style={styles.listItem}>
            <strong>private or invite-only hives</strong> for teams, studios or
            investors,
          </li>
          <li style={styles.listItem}>
            <strong>advanced pulse &amp; proof analytics</strong> for tracking
            idea portfolios,
          </li>
          <li style={styles.listItem}>
            <strong>Bee-agents as a service</strong> that scout, cluster or
            validate ideas for specific problems.
          </li>
        </ul>
        <p style={styles.paragraph}>
          The core registry of ideas — the place where proof and pulse live — is
          meant to stay open. Optional paid layers will appear only where they
          genuinely add leverage, not friction.
        </p>
      </section>

      {/* COLLABORATION AROUND IDEAS */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Collaboration around ideas</h2>
        <p style={styles.paragraph}>
          Roota doesn’t force ideas into pitches or deals — but it does create a
          clean way to <strong>signal interest</strong> and track where energy
          naturally goes. If someone discovers an idea in the hive and wants to
          join, support or invest in it, the path is simple:
        </p>
        <ul style={styles.list}>
          <li style={styles.listItem}>
            reach out to the author via the public idea page,
          </li>
          <li style={styles.listItem}>
            build a branch (a related idea or extension) that moves it forward,
          </li>
          <li style={styles.listItem}>
            or offer resources — time, skills, funding — directly around the
            idea.
          </li>
        </ul>
        <p style={styles.paragraph}>
          Roota itself does not take a commission or mediate deals. The hive is
          simply a <strong>neutral ground</strong> where ideas become visible,
          traceable and easier to build on. All collaboration happens directly
          between people who care about the same spark.
        </p>
        <p style={styles.paragraph}>
          Over time, Roota may introduce optional tools — private hives for
          teams, shared workspaces for idea execution, and matchmaking for
          investors looking for emerging signals. But the core flow remains:
          <strong>
            {" "}
            if an idea resonates with someone, Roota helps them find each other.
          </strong>
        </p>
      </section>

      {/* BACK LINK */}
      <Link href="/" style={styles.backLink}>
        <span>← Back to live ideas stream</span>
      </Link>
    </main>
  );
}
