// app/idea/[slug]/page.tsx
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Idea = {
  id: string;
  title: string;
  description: string | null;
  author: string | null;
  proof_hash: string | null;
  pulse: number | null;
  created_at: string;
  slug: string;
};

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
  backLink: {
    fontSize: 13,
    color: "#9ca3af",
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    marginBottom: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 600,
    letterSpacing: "-0.02em",
    marginBottom: 8,
  },
  metaRow: {
    display: "flex",
    flexWrap: "wrap" as const,
    gap: 10,
    fontSize: 12,
    color: "#9ca3af",
  },
  layoutRow: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 2.2fr) minmax(0, 1fr)",
    gap: 24,
  },
  card: {
    background: "rgba(15,23,42,0.9)",
    borderRadius: 16,
    border: "1px solid rgba(148,163,184,0.25)",
    padding: 18,
  },
  cardTitle: {
    fontSize: 13,
    textTransform: "uppercase" as const,
    letterSpacing: "0.16em",
    color: "#9ca3af",
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    lineHeight: 1.6,
    color: "#e5e7eb",
    whiteSpace: "pre-wrap" as const,
  },
  proofRow: {
    display: "flex",
    flexDirection: "column" as const,
    gap: 6,
    fontSize: 12,
    color: "#e5e7eb",
    wordBreak: "break-all" as const,
  },
  proofLabel: {
    fontSize: 11,
    textTransform: "uppercase" as const,
    letterSpacing: "0.16em",
    color: "#9ca3af",
  },
  pulseValue: {
    fontSize: 24,
    fontWeight: 600,
  },
  branchesPlaceholder: {
    fontSize: 13,
    color: "#9ca3af",
    marginTop: 8,
  },
} as const;

async function getIdeaBySlug(slug: string): Promise<Idea | null> {
  const { data, error } = await supabase
    .from("ideas")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) {
    console.error("Idea not found:", error);
    return null;
  }

  return data as Idea;
}

export default async function IdeaPage({
  params,
}: {
  params: { slug: string };
}) {
  const idea = await getIdeaBySlug(params.slug);

  if (!idea) {
    notFound();
  }

  const created = new Date(idea.created_at);
  const createdLabel = created.toLocaleDateString("uk-UA", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <main style={styles.page}>
      <a href="/" style={styles.backLink}>
        ← Back to hive
      </a>

      <header style={styles.header}>
        <h1 style={styles.title}>{idea.title}</h1>
        <div style={styles.metaRow}>
          <span>Created: {createdLabel}</span>
          {idea.author && <span>· By {idea.author}</span>}
          <span>· ID: {idea.id.slice(0, 8)}…</span>
        </div>
      </header>

      <section style={styles.layoutRow}>
        {/* Left: root-лог ідеї */}
        <article style={styles.card}>
          <div style={styles.cardTitle}>Root log</div>
          <p style={styles.description}>
            {idea.description || "No description yet. This idea is still rooting."}
          </p>
        </article>

        {/* Right: proof / pulse / branches */}
        <aside style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={styles.card}>
            <div style={styles.cardTitle}>Proof & pulse</div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={styles.proofRow}>
                <span style={styles.proofLabel}>Proof hash</span>
                <span>{idea.proof_hash || "—"}</span>
              </div>

              <div style={styles.proofRow}>
                <span style={styles.proofLabel}>Pulse of interest</span>
                <span style={styles.pulseValue}>{idea.pulse ?? 0}</span>
              </div>
            </div>
          </div>

          <div style={styles.card}>
            <div style={styles.cardTitle}>Branches</div>
            <p style={styles.branchesPlaceholder}>
              Branches (idea routes, hives, bee-activity) will live here.
              For now this idea is a single root in the hive.
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}
