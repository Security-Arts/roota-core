"use client";

import { useEffect, useState } from "react";

type Idea = {
  id: string;
  title: string;
  description: string;
  proof_hash: string | null;
  pulse: number | null;
  author: string | null;
  created_at: string;
};

type IdeasResponse =
  | { ok: true; ideas: Idea[] }
  | { ok: false; error: string };

type SortField = "pulse" | "date" | null;
type SortDirection = "asc" | "desc";

const styles = {
  page: {
    width: "100%",
    maxWidth: "1100px",
    margin: "0 auto",
  },
  headerTop: {
    marginBottom: "32px",
    display: "flex",
    justifyContent: "space-between",
    gap: "24px",
  },
  title: {
    fontSize: "32px",
    fontWeight: 700,
  },
  subtitle: {
    marginTop: "8px",
    fontSize: "14px",
    color: "#cbd5f5",
  },
  metaBlock: {
    fontSize: "11px",
    color: "#94a3b8",
    textAlign: "right" as const,
  },
  sectionHeader: {
    marginBottom: "12px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: "18px",
    fontWeight: 600,
  },
  sectionCount: {
    fontSize: "13px",
    color: "#94a3b8",
  },
  tableWrapper: {
    borderRadius: "16px",
    border: "1px solid #1e293b",
    backgroundColor: "rgba(15,23,42,0.95)",
    overflow: "hidden",
  },
  scrollArea: {
    maxHeight: "520px",
    overflowY: "auto" as const,
  },
  table: {
    width: "100%",
    borderCollapse: "collapse" as const,
    tableLayout: "fixed" as const,
    fontSize: "14px",
  },
  headRow: {
    backgroundColor: "#020617",
  },
  thBase: {
    position: "sticky" as const,
    top: 0,
    zIndex: 2,
    padding: "10px 14px",
    textAlign: "left" as const,
    fontWeight: 600,
    color: "#e5e7eb",
    borderBottom: "1px solid #1f2937",
    backgroundColor: "#020617",
    fontSize: "13px",
    whiteSpace: "nowrap" as const,
  },
  thWithRightBorder: {
    borderRight: "1px solid #64748b",
  },
  tdBase: {
    padding: "10px 14px",
    borderBottom: "1px solid #1f2937",
    verticalAlign: "top" as const,
    color: "#e2e8f0",
    fontSize: "14px",
  },
  tdWithRightBorder: {
    borderRight: "1px solid #64748b",
  },
  ideaCell: {
    fontWeight: 600,
  },
  descCell: {
    color: "#cbd5f5",
    maxWidth: "320px",
    whiteSpace: "normal" as const,
    wordBreak: "break-word" as const,
  },
  proofBadge: {
    display: "inline-block",
    padding: "3px 8px",
    borderRadius: "999px",
    border: "1px solid #4ade80",
    backgroundColor: "rgba(22,163,74,0.15)",
    color: "#bbf7d0",
    fontSize: "11px",
  },
  proofBadgeEmpty: {
    display: "inline-block",
    padding: "3px 8px",
    borderRadius: "999px",
    border: "1px solid #64748b",
    backgroundColor: "#020617",
    color: "#e2e8f0",
    fontSize: "11px",
  },
  pulseBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
    padding: "3px 8px",
    borderRadius: "999px",
    backgroundColor: "rgba(79,70,229,0.2)",
    color: "#c7d2fe",
    fontSize: "11px",
    fontWeight: 600,
  },
  rowBase: {
    cursor: "pointer",
    transition: "background-color 0.15s ease",
  },
  rowHover: {
    backgroundColor: "rgba(30,64,175,0.35)",
  },
  loading: {
    padding: "16px 18px",
    fontSize: "13px",
    borderBottom: "1px solid #1e293b",
    color: "#e2e8f0",
  },
  errorBox: {
    padding: "16px 18px",
    fontSize: "13px",
    borderBottom: "1px solid #7f1d1d",
    color: "#fecaca",
    backgroundColor: "rgba(127,29,29,0.3)",
  },
  emptyBox: {
    padding: "16px 18px",
    fontSize: "13px",
    color: "#e2e8f0",
  },
  // modal
  modalOverlay: {
    position: "fixed" as const,
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.65)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 50,
  },
  modalCard: {
    width: "100%",
    maxWidth: "560px",
    backgroundColor: "#020617",
    borderRadius: "16px",
    border: "1px solid #1e293b",
    padding: "18px 20px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    gap: "16px",
  },
  modalTitle: {
    fontSize: "18px",
    fontWeight: 600,
  },
  modalMeta: {
    marginTop: "4px",
    fontSize: "11px",
    color: "#94a3b8",
  },
  modalClose: {
    border: "none",
    background: "none",
    color: "#94a3b8",
    cursor: "pointer",
    fontSize: "16px",
  },
  modalTags: {
    marginTop: "12px",
    display: "flex",
    flexWrap: "wrap" as const,
    gap: "8px",
    fontSize: "11px",
  },
  modalDesc: {
    marginTop: "14px",
    fontSize: "13px",
    color: "#e2e8f0",
    lineHeight: 1.6,
    whiteSpace: "pre-wrap" as const,
  },
  modalProofBox: {
    marginTop: "12px",
    fontSize: "11px",
    color: "#94a3b8",
  },
  modalProofCode: {
    marginTop: "4px",
    padding: "6px 8px",
    backgroundColor: "#020617",
    borderRadius: "8px",
    border: "1px solid #1e293b",
    fontSize: "11px",
    color: "#e5e7eb",
    wordBreak: "break-all" as const,
  },
  modalFooter: {
    marginTop: "16px",
    display: "flex",
    justifyContent: "flex-end",
  },
  modalButton: {
    padding: "6px 12px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#1f2937",
    color: "#e5e7eb",
    cursor: "pointer",
    fontSize: "13px",
  },
};

export default function HomePage() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [sortField, setSortField] = useState<SortField>("date");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const [selectedIdea, setSelectedIdea] = useState<Idea | null>(null);
  const [hoveredRowId, setHoveredRowId] = useState<string | null>(null);

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const res = await fetch("/api/ideas");
        const data: IdeasResponse = await res.json();

        if (!res.ok || !("ok" in data) || data.ok === false) {
          throw new Error((data as any)?.error || "Failed to load ideas");
        }

        setIdeas(data.ideas);
      } catch (err: any) {
        setError(err.message || "Unexpected error");
      } finally {
        setLoading(false);
      }
    };

    fetchIdeas();
  }, []);

  const totalLabel =
    !loading && !error ? `${ideas.length} ідея(й)` : "—";

  const handleSort = (field: SortField) => {
    if (!field) return;
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const sortedIdeas = (() => {
    if (!sortField) return ideas;
    const copy = [...ideas];
    copy.sort((a, b) => {
      if (sortField === "pulse") {
        const av = a.pulse ?? 0;
        const bv = b.pulse ?? 0;
        return sortDirection === "asc" ? av - bv : bv - av;
      }
      const av = new Date(a.created_at).getTime();
      const bv = new Date(b.created_at).getTime();
      return sortDirection === "asc" ? av - bv : bv - av;
    });
    return copy;
  })();

  const sortIcon = (field: SortField) => {
    if (sortField !== field) return "⇅";
    return sortDirection === "asc" ? "↑" : "↓";
  };

  return (
    <main style={styles.page}>
      {/* HEADER */}
      <header style={styles.headerTop}>
        <div>
          <h1 style={styles.title}>Roota</h1>
          <p style={styles.subtitle}>
            Ideas Stock Exchange · живий реєстр ідей з доказом та пульсом інтересу
          </p>
        </div>
        <div style={styles.metaBlock}>
          <div>Backend: Supabase</div>
          <div>Endpoint: /api/ideas</div>
          <div>Mode: MVP · read-only list</div>
        </div>
      </header>

      {/* SECTION HEADER */}
      <div style={styles.sectionHeader}>
        <div style={styles.sectionTitle}>Живий потік ідей</div>
        <div style={styles.sectionCount}>{totalLabel}</div>
      </div>

      {/* TABLE BLOCK */}
      <div style={styles.tableWrapper}>
        {loading && (
          <div style={styles.loading}>Завантажую ідеї…</div>
        )}

        {error && (
          <div style={styles.errorBox}>Помилка: {error}</div>
        )}

        {!loading && !error && sortedIdeas.length > 0 && (
          <div style={styles.scrollArea}>
            <table style={styles.table}>
              <colgroup>
                <col style={{ width: "18%" }} />
                <col style={{ width: "32%" }} />
                <col style={{ width: "12%" }} />
                <col style={{ width: "12%" }} />
                <col style={{ width: "14%" }} />
                <col style={{ width: "12%" }} />
              </colgroup>
              <thead>
                <tr style={styles.headRow}>
                  <th
                    style={{
                      ...styles.thBase,
                      ...styles.thWithRightBorder,
                    }}
                  >
                    Ідея
                  </th>
                  <th
                    style={{
                      ...styles.thBase,
                      ...styles.thWithRightBorder,
                    }}
                  >
                    Опис
                  </th>
                  <th
                    style={{
                      ...styles.thBase,
                      ...styles.thWithRightBorder,
                    }}
                  >
                    Proof
                  </th>
                  <th
                    style={{
                      ...styles.thBase,
                      ...styles.thWithRightBorder,
                      cursor: "pointer",
                    }}
                    onClick={() => handleSort("pulse")}
                  >
                    <span style={{ display: "inline-flex", gap: 4 }}>
                      <span>Pulse</span>
                      <span style={{ fontSize: 11, color: "#94a3b8" }}>
                        {sortIcon("pulse")}
                      </span>
                    </span>
                  </th>
                  <th
                    style={{
                      ...styles.thBase,
                      ...styles.thWithRightBorder,
                    }}
                  >
                    Автор
                  </th>
                  <th
                    style={{
                      ...styles.thBase,
                      cursor: "pointer",
                    }}
                    onClick={() => handleSort("date")}
                  >
                    <span style={{ display: "inline-flex", gap: 4 }}>
                      <span>Дата</span>
                      <span style={{ fontSize: 11, color: "#94a3b8" }}>
                        {sortIcon("date")}
                      </span>
                    </span>
                  </th>
                </tr>
              </thead>

              <tbody>
                {sortedIdeas.map((idea) => {
                  const isHovered = hoveredRowId === idea.id;
                  return (
                    <tr
                      key={idea.id}
                      style={{
                        ...styles.rowBase,
                        ...(isHovered ? styles.rowHover : {}),
                      }}
                      onMouseEnter={() => setHoveredRowId(idea.id)}
                      onMouseLeave={() => setHoveredRowId(null)}
                      onClick={() => setSelectedIdea(idea)}
                    >
                      {/* ІДЕЯ */}
                      <td
                        style={{
                          ...styles.tdBase,
                          ...styles.tdWithRightBorder,
                          ...styles.ideaCell,
                        }}
                      >
                        {idea.title}
                      </td>

                      {/* ОПИС — тут і відступ, і перенос, і фіксована ширина */}
                      <td
                        style={{
                          ...styles.tdBase,
                          ...styles.tdWithRightBorder,
                          ...styles.descCell,
                        }}
                      >
                        {idea.description}
                      </td>

                      {/* PROOF */}
                      <td
                        style={{
                          ...styles.tdBase,
                          ...styles.tdWithRightBorder,
                        }}
                      >
                        {idea.proof_hash ? (
                          <span style={styles.proofBadge}>Proof linked</span>
                        ) : (
                          <span style={styles.proofBadgeEmpty}>no proof</span>
                        )}
                      </td>

                      {/* PULSE */}
                      <td
                        style={{
                          ...styles.tdBase,
                          ...styles.tdWithRightBorder,
                        }}
                      >
                        <span style={styles.pulseBadge}>
                          <span>⚡</span>
                          <span>{idea.pulse ?? 0}</span>
                        </span>
                      </td>

                      {/* АВТОР */}
                      <td
                        style={{
                          ...styles.tdBase,
                          ...styles.tdWithRightBorder,
                        }}
                      >
                        {idea.author || "anonymous"}
                      </td>

                      {/* ДАТА */}
                      <td style={styles.tdBase}>
                        <span style={{ fontSize: 12, color: "#94a3b8" }}>
                          {new Date(idea.created_at).toLocaleDateString(
                            "uk-UA",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {!loading && !error && sortedIdeas.length === 0 && (
          <div style={styles.emptyBox}>Поки що немає ідей.</div>
        )}
      </div>

      {/* MODAL */}
      {selectedIdea && (
        <div
          style={styles.modalOverlay}
          onClick={() => setSelectedIdea(null)}
        >
          <div
            style={styles.modalCard}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={styles.modalHeader}>
              <div>
                <div style={styles.modalTitle}>{selectedIdea.title}</div>
                <div style={styles.modalMeta}>
                  Створено{" "}
                  {new Date(selectedIdea.created_at).toLocaleDateString(
                    "uk-UA",
                    {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    }
                  )}
                </div>
              </div>
              <button
                style={styles.modalClose}
                onClick={() => setSelectedIdea(null)}
              >
                ✕
              </button>
            </div>

            <div style={styles.modalTags}>
              <span style={styles.pulseBadge}>
                ⚡ {selectedIdea.pulse ?? 0} <span>pulse</span>
              </span>
              {selectedIdea.proof_hash ? (
                <span style={styles.proofBadge}>Proof linked</span>
              ) : (
                <span style={styles.proofBadgeEmpty}>No proof yet</span>
              )}
              <span style={{ color: "#e5e7eb" }}>
                Автор:{" "}
                <span style={{ fontWeight: 500 }}>
                  {selectedIdea.author || "anonymous"}
                </span>
              </span>
            </div>

            <div style={styles.modalDesc}>{selectedIdea.description}</div>

            {selectedIdea.proof_hash && (
              <div style={styles.modalProofBox}>
                <div>Proof / hash:</div>
                <div style={styles.modalProofCode}>
                  {selectedIdea.proof_hash}
                </div>
              </div>
            )}

            <div style={styles.modalFooter}>
              <button
                style={styles.modalButton}
                onClick={() => setSelectedIdea(null)}
              >
                Закрити
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
