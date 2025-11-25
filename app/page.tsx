"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  CSSProperties,
} from "react";
import Link from "next/link";

import {
  Locale,
  PulseFilter,
  SortKey,
  SortDirection,
  Idea,
} from "@/lib/types";
import { getTranslations } from "@/lib/translations";
import { getPulseBadgeStyle, getPulseLevel } from "@/lib/pulse";
import { formatDate, shortHash, generateSimpleHash } from "@/lib/utils";

const styles: Record<string, CSSProperties> = {
  page: {
    minHeight: "100vh",
    background:
      "radial-gradient(circle at top left, rgba(56,189,248,0.12), transparent 60%), radial-gradient(circle at bottom right, rgba(129,140,248,0.14), #020617)",
    color: "#e5e7eb",
    padding: "20px 16px 40px",
    fontFamily:
      "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
    width: "100%",
    maxWidth: 1400,
    margin: "0 auto",
    boxSizing: "border-box",
  },

  headerTop: {
    display: "flex",
    justifyContent: "space-between",
    gap: 16,
    alignItems: "flex-start",
    marginBottom: 24,
  },

  titleRow: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: 6,
    flexWrap: "wrap",
  },

leafIconBox: {
  width: 46,
  height: 46,
  borderRadius: 14,
  background: "rgba(15,23,42,0.9)",
  border: "1px solid #1f2937",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 28,
  lineHeight: 1.1,
  paddingTop: 2,      // трохи опускаємо емодзі вниз, щоб ґрунт точно був видимий
  overflow: "visible",
},

  title: {
    fontSize: 22,
    fontWeight: 650,
    letterSpacing: 0.3,
    color: "#f9fafb",
  },

  langSwitcher: {
    display: "inline-flex",
    gap: 4,
    padding: 2,
    borderRadius: 999,
    border: "1px solid #1f2937",
    background: "rgba(15,23,42,0.9)",
  },

  langButton: {
    border: "none",
    borderRadius: 999,
    fontSize: 11,
    padding: "3px 8px",
    background: "transparent",
    color: "#9ca3af",
    cursor: "pointer",
  },

  langButtonActive: {
    background:
      "radial-gradient(circle at top left, rgba(59,130,246,0.35), transparent 60%) #020617",
    color: "#e5e7eb",
  },

  subtitle: {
    fontSize: 13,
    color: "#9ca3af",
    maxWidth: 560,
    lineHeight: 1.45,
    marginTop: 2,
    display: "flex",
    alignItems: "center",
    gap: 6,
  },

  taglineIcon: {
    fontSize: 14,
  },

  metaBlock: {
    marginTop: 10,
    fontSize: 11,
    color: "#9ca3af",
    textAlign: "right",
    lineHeight: 1.4,
  },

  sectionHeader: {
    marginTop: 8,
    marginBottom: 12,
    display: "flex",
    justifyContent: "space-between",
    gap: 12,
    alignItems: "center",
  },

  sectionTitle: {
    fontSize: 14,
    letterSpacing: 1.4,
    textTransform: "uppercase",
    color: "#9ca3af",
  },

  sectionRight: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },

  sectionCount: {
    fontSize: 11,
    padding: "4px 8px",
    borderRadius: 999,
    border: "1px solid #1f2937",
    color: "#9ca3af",
    background: "rgba(15,23,42,0.9)",
  },

  primaryButton: {
    borderRadius: 999,
    border: "1px solid #3b82f6",
    background:
      "radial-gradient(circle at top left, rgba(59,130,246,0.4), transparent 60%) #020617",
    color: "#e5e7eb",
    fontSize: 12,
    padding: "6px 14px",
    cursor: "pointer",
  },

  filtersBar: {
    marginBottom: 8,
    display: "flex",
    justifyContent: "space-between",
    gap: 12,
    alignItems: "flex-end",
    flexWrap: "wrap",
  },

  filtersLeft: {
    display: "flex",
    flexWrap: "wrap",
    gap: 12,
  },

  filterGroup: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },

  filterLabel: {
    fontSize: 11,
    color: "#9ca3af",
  },

  searchInput: {
    fontSize: 12,
    padding: "6px 9px",
    borderRadius: 999,
    border: "1px solid #1f2937",
    backgroundColor: "#020617",
    color: "#e5e7eb",
    minWidth: 180,
  },

  select: {
    fontSize: 12,
    padding: "6px 9px",
    borderRadius: 999,
    border: "1px solid #1f2937",
    backgroundColor: "#020617",
    color: "#e5e7eb",
    minWidth: 130,
  },

  filtersRight: {
    fontSize: 11,
    color: "#9ca3af",
  },

  pulseLegend: {
    marginBottom: 10,
    fontSize: 11,
    color: "#6b7280",
  },

  tableWrapper: {
    borderRadius: 18,
    border: "1px solid #111827",
    background:
      "linear-gradient(to bottom right, rgba(15,23,42,0.96), rgba(2,6,23,0.98))",
    padding: "10px 10px 12px",
  },

  loading: {
    padding: "16px 12px",
    fontSize: 12,
    color: "#9ca3af",
  },

  errorBox: {
    padding: "12px 10px",
    fontSize: 12,
    color: "#fecaca",
    backgroundColor: "rgba(127,29,29,0.4)",
    borderRadius: 12,
    border: "1px solid rgba(248,113,113,0.7)",
    marginBottom: 8,
  },

  scrollArea: {
    maxHeight: 520,
    overflowY: "auto",
    borderRadius: 14,
    border: "1px solid #111827",
  },

  table: {
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: 0,
    fontSize: 12,
  },

  headRow: {
    background:
      "linear-gradient(to right, rgba(15,23,42,0.92), rgba(15,23,42,0.96))",
  },

  thBase: {
    textAlign: "left",
    padding: "8px 10px",
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: 0.7,
    color: "#9ca3af",
    borderBottom: "1px solid #1f2937",
    position: "sticky",
    top: 0,
    background:
      "linear-gradient(to right, rgba(15,23,42,0.96), rgba(15,23,42,0.98))",
    zIndex: 5,
  },

  thWithRightBorder: {
    borderRight: "1px solid #111827",
  },

  thPulseHeader: {
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
  } as CSSProperties,

  tooltipIcon: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 14,
    height: 14,
    borderRadius: "50%",
    border: "1px solid #4b5563",
    fontSize: 10,
    cursor: "default",
  },

  thPulseIcon: {
    fontSize: 11,
    color: "#6b7280",
  },

  rowBase: {
    backgroundColor: "#020617",
    cursor: "pointer",
  },

  rowHover: {
    background:
      "radial-gradient(circle at top left, rgba(37,99,235,0.18), transparent 60%) #020617",
  },

  tdBase: {
    padding: "8px 10px",
    borderBottom: "1px solid #0f172a",
    fontSize: 12,
    color: "#e5e7eb",
    verticalAlign: "top",
  },

  tdWithRightBorder: {
    borderRight: "1px solid #0f172a",
  },

  ideaCell: {
    fontWeight: 500,
  },

  descCell: {
    color: "#9ca3af",
  },

  proofLabel: {
    fontSize: 10,
    color: "#6b7280",
    marginBottom: 3,
  },

  proofShort: {
    fontFamily: "monospace",
    fontSize: 11,
    color: "#e5e7eb",
    padding: "3px 7px",
    borderRadius: 999,
    border: "1px solid #1f2937",
    display: "inline-block",
    backgroundColor: "#020617",
  },

  pulseBadgeBase: {
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    padding: "2px 7px",
    borderRadius: 999,
    fontSize: 12,
  },

  emptyBox: {
    padding: "18px 12px",
    fontSize: 12,
    color: "#9ca3af",
    textAlign: "center",
  },

  modalOverlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(15,23,42,0.8)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 50,
    padding: 12,
  },

  modalCard: {
    width: "100%",
    maxWidth: 520,
    maxHeight: "80vh",
    overflowY: "auto",
    borderRadius: 18,
    border: "1px solid #1f2937",
    background:
      "radial-gradient(circle at top left, rgba(59,130,246,0.25), transparent 55%) #020617",
    padding: "14px 16px 16px",
    boxShadow: "0 18px 45px rgba(0,0,0,0.7)",
  },

  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    gap: 12,
    alignItems: "flex-start",
    marginBottom: 10,
  },

  modalTitle: {
    fontSize: 16,
    fontWeight: 600,
    color: "#f9fafb",
    marginBottom: 2,
  },

  modalMeta: {
    fontSize: 11,
    color: "#9ca3af",
  },

  modalClose: {
    borderRadius: 999,
    border: "1px solid #1f2937",
    backgroundColor: "rgba(15,23,42,0.9)",
    color: "#e5e7eb",
    fontSize: 12,
    width: 26,
    height: 26,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },

  modalTags: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    alignItems: "center",
    marginBottom: 8,
    fontSize: 12,
  },

  modalDesc: {
    fontSize: 13,
    color: "#e5e7eb",
    marginBottom: 10,
    lineHeight: 1.5,
  },

  modalProofBox: {
    borderRadius: 12,
    border: "1px solid #1f2937",
    backgroundColor: "rgba(15,23,42,0.9)",
    padding: "8px 9px",
    fontSize: 11,
    color: "#9ca3af",
    marginBottom: 10,
  },

  modalProofCode: {
    marginTop: 4,
    fontFamily: "monospace",
    fontSize: 11,
    color: "#e5e7eb",
    wordBreak: "break-all",
  },

  modalFooter: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    justifyContent: "flex-end",
    marginTop: 6,
  },

  modalButton: {
    borderRadius: 999,
    border: "1px solid #3b82f6",
    background:
      "radial-gradient(circle at top left, rgba(59,130,246,0.35), transparent 60%) #020617",
    color: "#e5e7eb",
    fontSize: 12,
    padding: "6px 12px",
    cursor: "pointer",
  },

  modalButtonSecondary: {
    borderRadius: 999,
    border: "1px solid #1f2937",
    backgroundColor: "#020617",
    color: "#e5e7eb",
    fontSize: 12,
    padding: "6px 12px",
    cursor: "pointer",
  },

  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    marginBottom: 8,
  },

  formLabel: {
    fontSize: 11,
    color: "#9ca3af",
  },

  formInput: {
    fontSize: 12,
    padding: "6px 9px",
    borderRadius: 10,
    border: "1px solid #1f2937",
    backgroundColor: "#020617",
    color: "#e5e7eb",
  },

  formTextarea: {
    fontSize: 12,
    padding: "6px 9px",
    borderRadius: 10,
    border: "1px solid #1f2937",
    backgroundColor: "#020617",
    color: "#e5e7eb",
    minHeight: 90,
    resize: "vertical",
  },

  formError: {
    fontSize: 11,
    color: "#fecaca",
    backgroundColor: "rgba(127,29,29,0.4)",
    borderRadius: 10,
    border: "1px solid rgba(248,113,113,0.7)",
    padding: "6px 8px",
    marginBottom: 6,
  },
};

function sortIcon(
  key: SortKey,
  activeKey: SortKey,
  direction: SortDirection
): string {
  if (key !== activeKey) return "↕";
  return direction === "asc" ? "↑" : "↓";
}

export default function Page() {
  const [locale, setLocale] = useState<Locale>("en");
  const t = getTranslations(locale);

  const [taglineVisible, setTaglineVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [pulseFilter, setPulseFilter] = useState<PulseFilter>("all");
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const [hoveredRowId, setHoveredRowId] = useState<string | null>(null);
  const [selectedIdea, setSelectedIdea] = useState<Idea | null>(null);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newProof, setNewProof] = useState("");
  const [generatingProof, setGeneratingProof] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);

  // анімація теглайну
  useEffect(() => {
    const timer = setTimeout(() => setTaglineVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  // mobile breakpoint
  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        setIsMobile(window.innerWidth < 768);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // завантаження ідей
  useEffect(() => {
    let cancelled = false;

    async function loadIdeas() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/ideas", { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();
        const loaded: Idea[] = data?.ideas ?? data ?? [];
        if (!cancelled) setIdeas(loaded);
      } catch (e: any) {
        if (!cancelled) {
          setError(e?.message || "Failed to load ideas");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadIdeas();
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredIdeas = useMemo(() => {
    let result = [...ideas];

    const query = searchQuery.trim().toLowerCase();
    if (query) {
      result = result.filter((idea) => {
        const inTitle = idea.title?.toLowerCase().includes(query);
        const inDesc = idea.description?.toLowerCase().includes(query);
        return inTitle || inDesc;
      });
    }

    if (pulseFilter !== "all") {
      const threshold = Number(pulseFilter);
      result = result.filter((idea) => (idea.pulse ?? 0) >= threshold);
    }

    return result;
  }, [ideas, searchQuery, pulseFilter]);

  const sortedIdeas = useMemo(() => {
    const arr = [...filteredIdeas];
    arr.sort((a, b) => {
      if (sortKey === "pulse") {
        const av = a.pulse ?? 0;
        const bv = b.pulse ?? 0;
        if (av === bv) return 0;
        return sortDirection === "asc" ? av - bv : bv - av;
      }
      const at = new Date(a.created_at).getTime();
      const bt = new Date(b.created_at).getTime();
      if (at === bt) return 0;
      return sortDirection === "asc" ? at - bt : bt - at;
    });
    return arr;
  }, [filteredIdeas, sortKey, sortDirection]);

  const totalIdeas = ideas.length;
  const visibleIdeas = filteredIdeas.length;

  const totalLabel =
    totalIdeas === 0 ? "0/0 ideas" : `${visibleIdeas}/${totalIdeas} ideas`;
  const visibleLabel =
    totalIdeas === 0
      ? "No ideas yet. Be the first to publish."
      : `${visibleIdeas} of ${totalIdeas} ideas match filters`;

  const handleOpenCreate = useCallback(() => {
    setFormError(null);
    setShowCreateModal(true);
  }, []);

  const handleSort = useCallback(
    (key: SortKey) => {
      if (sortKey === key) {
        setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
      } else {
        setSortKey(key);
        setSortDirection("desc");
      }
    },
    [sortKey]
  );

  const handlePulseChange = useCallback(async (id: string, delta: 1 | -1) => {
    try {
      setIdeas((prev) =>
        prev.map((idea) =>
          idea.id === id
            ? { ...idea, pulse: (idea.pulse ?? 0) + delta }
            : idea
        )
      );

      await fetch(`/api/ideas/${id}/pulse`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ delta }),
      });
    } catch {
      // можна додати rollback або refetch, поки ігноруємо
    }
  }, []);

  const handleGenerateProof = useCallback(() => {
    setFormError(null);
    setGeneratingProof(true);
    try {
      const payload = `${newTitle}::${newDescription}::${newAuthor}::${
        new Date().toISOString()
      }`;
      const hash = generateSimpleHash(payload);
      setNewProof(hash);
    } catch (e: any) {
      setFormError(e?.message || "Failed to generate proof hash");
    } finally {
      setGeneratingProof(false);
    }
  }, [newTitle, newDescription, newAuthor]);

  const handlePublishIdea = useCallback(async () => {
    setFormError(null);

    if (!newTitle.trim() || !newDescription.trim()) {
      setFormError("Title and description are required.");
      return;
    }

    setCreating(true);
    try {
      const body = {
        title: newTitle.trim(),
        description: newDescription.trim(),
        author: newAuthor.trim() || null,
        proof_hash: newProof || null,
      };

      const res = await fetch("/api/ideas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `HTTP ${res.status}`);
      }

      const created: Idea = await res.json();
      setIdeas((prev) => [created, ...prev]);

      setShowCreateModal(false);
      setNewTitle("");
      setNewDescription("");
      setNewAuthor("");
      setNewProof("");
    } catch (e: any) {
      setFormError(
        e?.message || "Failed to publish idea. Please try again."
      );
    } finally {
      setCreating(false);
    }
  }, [newTitle, newDescription, newAuthor, newProof]);

  return (
    <main style={styles.page}>
      {/* HEADER + About Roota */}
      <header style={styles.headerTop}>
        <div>
          {/* верхній рядок: іконка рута + назва + мови */}
          <div style={styles.titleRow}>
            <div style={styles.leafIconBox}>🌱</div>

            <h1 style={styles.title}>{t.appTitle}</h1>

            <div style={styles.langSwitcher}>
              {(["en", "es", "ja"] as Locale[]).map((code) => (
                <button
                  key={code}
                  style={{
                    ...styles.langButton,
                    ...(locale === code ? styles.langButtonActive : {}),
                  }}
                  onClick={() => setLocale(code)}
                >
                  {code.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* tagline: два рядки з легкою анімацією */}
          <div style={{ marginTop: 6 }}>
            {t.tagline.map((line, i) => (
              <p
                key={i}
                style={{
                  ...styles.subtitle,
                  opacity: taglineVisible ? 1 : 0,
                  transform: taglineVisible
                    ? "translateY(0)"
                    : "translateY(4px)",
                  transition:
                    "opacity 400ms ease-out, transform 400ms ease-out",
                  transitionDelay: `${i * 80}ms`,
                }}
              >
                <span style={styles.taglineIcon}>
                  {i === 0 ? "🌱" : "🐝"}
                </span>
                {line}
              </p>
            ))}
          </div>

          {/* технічний рядок + About Roota на мобільних */}
          {isMobile && (
            <>
              <p style={{ marginTop: 6, fontSize: 10, color: "#64748b" }}>
                MVP • Supabase backend • /api/ideas
              </p>
              <div style={{ marginTop: 10 }}>
                <Link
                  href="/about"
                  style={{
                    display: "inline-block",
                    padding: "6px 12px",
                    borderRadius: 999,
                    border: "1px solid #334155",
                    fontSize: 12,
                    textDecoration: "none",
                    color: "#e5e7eb",
                    background:
                      "radial-gradient(circle at top left, rgba(59,130,246,0.25), transparent 60%) #020617",
                  }}
                >
                  About Roota
                </Link>
              </div>
            </>
          )}
        </div>

        {/* правий блок — тільки десктоп (тільки кнопка About, без backend/mode) */}
        {!isMobile && (
          <div style={{ textAlign: "right" as const }}>
            <Link
              href="/about"
              style={{
                display: "inline-block",
                marginBottom: 8,
                padding: "6px 12px",
                borderRadius: 999,
                border: "1px solid #334155",
                fontSize: 12,
                textDecoration: "none",
                color: "#e5e7eb",
                background:
                  "radial-gradient(circle at top left, rgba(59,130,246,0.25), transparent 60%) #020617",
              }}
            >
              About Roota
            </Link>
          </div>
        )}
      </header>

      {/* SECTION HEADER */}
      <div style={styles.sectionHeader}>
        <div style={styles.sectionTitle}>{t.liveStream}</div>
        <div style={styles.sectionRight}>
          <div style={styles.sectionCount}>{totalLabel}</div>
          <button style={styles.primaryButton} onClick={handleOpenCreate}>
            {t.newIdeaButton}
          </button>
        </div>
      </div>

      {/* FILTERS BAR */}
      <div style={styles.filtersBar}>
        <div style={styles.filtersLeft}>
          <div style={styles.filterGroup}>
            <label style={styles.filterLabel}>{t.searchLabel}</label>
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={styles.searchInput}
            />
          </div>

          <div style={styles.filterGroup}>
            <label style={styles.filterLabel}>{t.pulseFilterLabel}</label>
            <select
              value={pulseFilter}
              onChange={(e) =>
                setPulseFilter(e.target.value as PulseFilter)
              }
              style={styles.select}
            >
              <option value="all">{t.pulseFilter_all}</option>
              <option value="1">{t.pulseFilter_1}</option>
              <option value="3">{t.pulseFilter_3}</option>
              <option value="5">{t.pulseFilter_5}</option>
            </select>
          </div>
        </div>

        <div style={styles.filtersRight}>{visibleLabel}</div>
      </div>

      {/* Pulse legend */}
      <div style={styles.pulseLegend}>{t.pulseLegend}</div>

      {/* TABLE / MOBILE CARDS */}
      <div style={styles.tableWrapper}>
        {loading && <div style={styles.loading}>{t.loading}</div>}

        {error && (
          <div style={styles.errorBox}>
            {t.errorPrefix}: {error}
          </div>
        )}

        {!loading && !error && sortedIdeas.length > 0 && (
          isMobile ? (
            // мобільні картки
            <div
              style={{
                padding: "8px 10px 10px",
                display: "flex",
                flexDirection: "column",
                gap: 10,
                maxHeight: 520,
                overflowY: "auto",
              }}
            >
              {sortedIdeas.map((idea) => {
                const pulseStyle = getPulseBadgeStyle(idea.pulse);
                return (
                  <div
                    key={idea.id}
                    style={{
                      borderRadius: 14,
                      border: "1px solid #1f2937",
                      background:
                        "radial-gradient(circle at top left, rgba(37,99,235,0.15), transparent 55%) #020617",
                      padding: "10px 12px",
                      display: "flex",
                      flexDirection: "column",
                      gap: 6,
                    }}
                    onClick={() => setSelectedIdea(idea)}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 8,
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          fontSize: 14,
                          fontWeight: 600,
                          color: "#e5e7eb",
                          flex: 1,
                          marginRight: 6,
                        }}
                      >
                        {idea.title}
                      </div>
                      <span
                        style={{
                          ...styles.pulseBadgeBase,
                          ...pulseStyle,
                          fontSize: 11,
                        }}
                      >
                        <span>⚡</span>
                        <span>{idea.pulse ?? 0}</span>
                      </span>
                    </div>

                    <div
                      style={{
                        fontSize: 12,
                        color: "#cbd5f5",
                        overflow: "hidden",
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {idea.description}
                    </div>

                    <div
                      style={{
                        marginTop: 4,
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 6,
                        fontSize: 11,
                        color: "#64748b",
                      }}
                    >
                      <span>
                        {idea.author || "anonymous"} ·{" "}
                        {formatDate(idea.created_at)}
                      </span>
                      {idea.proof_hash && (
                        <span
                          style={{
                            fontFamily: "monospace",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {idea.proof_hash.slice(0, 6)}…
                          {idea.proof_hash.slice(-4)}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            // десктопна таблиця
            <div style={styles.scrollArea}>
              <table style={styles.table}>
                <colgroup>
                  <col style={{ width: "18%" }} />
                  <col style={{ width: "32%" }} />
                  <col style={{ width: "18%" }} />
                  <col style={{ width: "12%" }} />
                  <col style={{ width: "12%" }} />
                  <col style={{ width: "8%" }} />
                </colgroup>
                <thead>
                  <tr style={styles.headRow}>
                    <th
                      style={{
                        ...styles.thBase,
                        ...styles.thWithRightBorder,
                      }}
                    >
                      {t.table_idea}
                    </th>
                    <th
                      style={{
                        ...styles.thBase,
                        ...styles.thWithRightBorder,
                      }}
                    >
                      {t.table_description}
                    </th>
                    <th
                      style={{
                        ...styles.thBase,
                        ...styles.thWithRightBorder,
                      }}
                    >
                      {t.table_proof_token}
                    </th>
                    <th
                      style={{
                        ...styles.thBase,
                        ...styles.thWithRightBorder,
                        cursor: "pointer",
                      }}
                      onClick={() => handleSort("pulse")}
                    >
                      <span style={styles.thPulseHeader}>
                        <span>{t.table_pulse}</span>
                        <span
                          style={styles.tooltipIcon}
                          title={t.pulseTooltip}
                        >
                          ?
                        </span>
                        <span style={styles.thPulseIcon}>
                          {sortIcon("pulse", sortKey, sortDirection)}
                        </span>
                      </span>
                    </th>
                    <th
                      style={{
                        ...styles.thBase,
                        ...styles.thWithRightBorder,
                      }}
                    >
                      {t.table_author}
                    </th>
                    <th
                      style={{ ...styles.thBase, cursor: "pointer" }}
                      onClick={() => handleSort("date")}
                    >
                      <span style={styles.thPulseHeader}>
                        <span>{t.table_date}</span>
                        <span style={styles.thPulseIcon}>
                          {sortIcon("date", sortKey, sortDirection)}
                        </span>
                      </span>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {sortedIdeas.map((idea) => {
                    const isHovered = hoveredRowId === idea.id;
                    const pulseStyle = getPulseBadgeStyle(idea.pulse);

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
                        <td
                          style={{
                            ...styles.tdBase,
                            ...styles.tdWithRightBorder,
                            ...styles.ideaCell,
                          }}
                        >
                          {idea.title}
                        </td>

                        <td
                          style={{
                            ...styles.tdBase,
                            ...styles.tdWithRightBorder,
                            ...styles.descCell,
                          }}
                        >
                          {idea.description}
                        </td>

                        <td
                          style={{
                            ...styles.tdBase,
                            ...styles.tdWithRightBorder,
                          }}
                        >
                          {idea.proof_hash ? (
                            <div>
                              <div style={styles.proofLabel}>
                                {t.proofTokenLabel}
                              </div>
                              <div style={styles.proofShort}>
                                {shortHash(idea.proof_hash)}
                              </div>
                            </div>
                          ) : (
                            <div>
                              <div style={styles.proofLabel}>
                                {t.proofTokenLabel}
                              </div>
                              <div style={styles.proofShort}>
                                {t.proofTokenMissing}
                              </div>
                            </div>
                          )}
                        </td>

                        <td
                          style={{
                            ...styles.tdBase,
                            ...styles.tdWithRightBorder,
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 8,
                            }}
                          >
                            <span
                              style={{
                                ...styles.pulseBadgeBase,
                                ...pulseStyle,
                              }}
                            >
                              <span>⚡</span>
                              <span>{idea.pulse ?? 0}</span>
                            </span>

                            <button
                              style={{
                                border: "1px solid #334155",
                                background: "transparent",
                                color: "#e5e7eb",
                                borderRadius: 999,
                                fontSize: 11,
                                padding: "2px 6px",
                                cursor: "pointer",
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                handlePulseChange(idea.id, 1);
                              }}
                            >
                              +1
                            </button>

                            <button
                              style={{
                                border: "1px solid #334155",
                                background: "transparent",
                                color: "#94a3b8",
                                borderRadius: 999,
                                fontSize: 11,
                                padding: "2px 6px",
                                cursor: "pointer",
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                handlePulseChange(idea.id, -1);
                              }}
                            >
                              −1
                            </button>
                          </div>
                        </td>

                        <td
                          style={{
                            ...styles.tdBase,
                            ...styles.tdWithRightBorder,
                          }}
                        >
                          {idea.author || "anonymous"}
                        </td>

                        <td style={styles.tdBase}>
                          <span
                            style={{ fontSize: 12, color: "#94a3b8" }}
                          >
                            {formatDate(idea.created_at)}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )
        )}

        {!loading && !error && sortedIdeas.length === 0 && (
          <div style={styles.emptyBox}>{t.noIdeasForFilter}</div>
        )}
      </div>

      {/* VIEW IDEA MODAL */}
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
                  {t.modal_created}: {formatDate(selectedIdea.created_at)}
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
              <span
                style={{
                  ...styles.pulseBadgeBase,
                  ...getPulseBadgeStyle(selectedIdea.pulse),
                }}
              >
                <span>⚡</span>
                <span>{selectedIdea.pulse ?? 0}</span>
                <span>· {getPulseLevel(selectedIdea.pulse, t)}</span>
              </span>
              <span style={{ color: "#e5e7eb" }}>
                {t.modal_author}:{" "}
                <span style={{ fontWeight: 500 }}>
                  {selectedIdea.author || "anonymous"}
                </span>
              </span>
            </div>

            <div style={styles.modalDesc}>{selectedIdea.description}</div>

            {selectedIdea.proof_hash && (
              <div style={styles.modalProofBox}>
                <div>{t.modal_proof_hash}:</div>
                <div style={styles.modalProofCode}>
                  {selectedIdea.proof_hash}
                </div>
              </div>
            )}

            <div style={styles.modalFooter}>
              <Link
                href={`/idea/${selectedIdea.slug || selectedIdea.id}`}
                style={{
                  ...styles.modalButton,
                  textDecoration: "none",
                  display: "inline-block",
                }}
                onClick={() => setSelectedIdea(null)}
              >
                View public page
              </Link>

              <button
                style={styles.modalButton}
                onClick={() => setSelectedIdea(null)}
              >
                {t.modal_close}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CREATE IDEA MODAL */}
      {showCreateModal && (
        <div
          style={styles.modalOverlay}
          onClick={() => setShowCreateModal(false)}
        >
          <div
            style={styles.modalCard}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={styles.modalHeader}>
              <div>
                <div style={styles.modalTitle}>{t.createIdeaTitle}</div>
              </div>
              <button
                style={styles.modalClose}
                onClick={() => setShowCreateModal(false)}
              >
                ✕
              </button>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.formLabel}>{t.form_titleLabel}</label>
              <input
                style={styles.formInput}
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.formLabel}>
                {t.form_descriptionLabel}
              </label>
              <textarea
                style={styles.formTextarea}
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.formLabel}>{t.form_authorLabel}</label>
              <input
                style={styles.formInput}
                value={newAuthor}
                onChange={(e) => setNewAuthor(e.target.value)}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.formLabel}>{t.form_proofLabel}</label>
              <input
                style={{
                  ...styles.formInput,
                  fontFamily: "monospace",
                  fontSize: "12px",
                }}
                value={newProof}
                readOnly
              />
              <button
                style={{
                  ...styles.modalButton,
                  ...(generatingProof ? { opacity: 0.7 } : {}),
                  marginTop: "6px",
                  alignSelf: "flex-start",
                }}
                onClick={handleGenerateProof}
                disabled={generatingProof}
              >
                {generatingProof
                  ? t.form_generating
                  : t.form_generateProof}
              </button>
            </div>

            {formError && (
              <div style={styles.formError}>{formError}</div>
            )}

            <div style={styles.modalFooter}>
              <button
                style={styles.modalButtonSecondary}
                onClick={() => setShowCreateModal(false)}
              >
                {t.form_cancel}
              </button>
              <button
                style={{
                  ...styles.modalButton,
                  ...(creating ? { opacity: 0.7 } : {}),
                }}
                onClick={handlePublishIdea}
                disabled={creating}
              >
                {creating ? t.form_publishing : t.form_publish}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
