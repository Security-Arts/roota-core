"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
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

type PulseFilter = "all" | "1" | "3" | "5";
type Locale = "en" | "es" | "ja";

const translations: Record<
  Locale,
  {
    appTitle: string;
    tagline: string;
    backend: string;
    endpoint: string;
    mode: string;
    liveStream: string;
    totalIdeas: (n: number) => string;
    searchLabel: string;
    searchPlaceholder: string;
    pulseFilterLabel: string;
    pulseFilter_all: string;
    pulseFilter_1: string;
    pulseFilter_3: string;
    pulseFilter_5: string;
    pulseLegend: string;
    visibleLabel: (shown: number, total: number) => string;
    table_idea: string;
    table_description: string;
    table_proof_token: string;
    table_pulse: string;
    table_author: string;
    table_date: string;
    loading: string;
    errorPrefix: string;
    noIdeasForFilter: string;
    proofTokenLabel: string;
    proofTokenMissing: string;
    modal_created: string;
    modal_author: string;
    modal_proof_hash: string;
    modal_close: string;
    pulseSuffix: string;
    pulseLevelLabel: string;
    pulseLevelNone: string;
    pulseLevelSeed: string;
    pulseLevelValidated: string;
    pulseLevelHigh: string;
    pulseTooltip: string;
    // new idea form
    newIdeaButton: string;
    createIdeaTitle: string;
    form_titleLabel: string;
    form_descriptionLabel: string;
    form_authorLabel: string;
    form_proofLabel: string;
    form_generateProof: string;
    form_publish: string;
    form_cancel: string;
    form_generating: string;
    form_publishing: string;
    form_error_missingProof: string;
  }
> = {
  en: {
    appTitle: "Roota",
    tagline:
      "Ideas Stock Exchange · a live registry of ideas with proof and pulse of interest",
    backend: "Backend: Supabase",
    endpoint: "Endpoint: /api/ideas",
    mode: "Mode: MVP · read-only list + idea creation",
    liveStream: "Live Idea Stream",
    totalIdeas: (n) => `${n} idea${n === 1 ? "" : "s"}`,
    searchLabel: "Search",
    searchPlaceholder: "Idea, description, keywords…",
    pulseFilterLabel: "Pulse level",
    pulseFilter_all: "All levels",
    pulseFilter_1: "Seed & above (≥1)",
    pulseFilter_3: "Validated & above (≥3)",
    pulseFilter_5: "High conviction (≥5)",
    pulseLegend: "Pulse: 1–2 = Seed · 3–4 = Validated · 5+ = High conviction",
    visibleLabel: (shown, total) =>
      `Showing ${shown} of ${total} idea${total === 1 ? "" : "s"}`,
    table_idea: "Idea",
    table_description: "Description",
    table_proof_token: "Proof token",
    table_pulse: "Pulse",
    table_author: "Author",
    table_date: "Date",
    loading: "Loading ideas…",
    errorPrefix: "Error",
    noIdeasForFilter: "No ideas match the current filters.",
    proofTokenLabel: "Proof token",
    proofTokenMissing: "missing",
    modal_created: "Created",
    modal_author: "Author",
    modal_proof_hash: "Proof / hash",
    modal_close: "Close",
    pulseSuffix: "pulse",
    pulseLevelLabel: "Pulse level",
    pulseLevelNone: "None",
    pulseLevelSeed: "Seed",
    pulseLevelValidated: "Validated",
    pulseLevelHigh: "High conviction",
    pulseTooltip:
      "Roota score: 0–10. 1–2 = Seed, 3–4 = Validated, 5+ = High conviction.",
    // new idea form
    newIdeaButton: "New idea",
    createIdeaTitle: "Create new idea with proof",
    form_titleLabel: "Idea title",
    form_descriptionLabel: "Description",
    form_authorLabel: "Author (optional)",
    form_proofLabel: "Proof token (SHA-256)",
    form_generateProof: "Generate proof token",
    form_publish: "Publish idea",
    form_cancel: "Cancel",
    form_generating: "Generating…",
    form_publishing: "Publishing…",
    form_error_missingProof: "Generate proof token before publishing.",
  },
  es: {
    appTitle: "Roota",
    tagline:
      "Ideas Stock Exchange · un registro vivo de ideas con prueba y pulso de interés",
    backend: "Backend: Supabase",
    endpoint: "Endpoint: /api/ideas",
    mode: "Modo: MVP · sólo lectura + creación de ideas",
    liveStream: "Flujo en vivo de ideas",
    totalIdeas: (n) => `${n} idea${n === 1 ? "" : "s"}`,
    searchLabel: "Buscar",
    searchPlaceholder: "Idea, descripción, palabras clave…",
    pulseFilterLabel: "Nivel de pulso",
    pulseFilter_all: "Todos los niveles",
    pulseFilter_1: "Seed y más (≥1)",
    pulseFilter_3: "Validado y más (≥3)",
    pulseFilter_5: "Alta convicción (≥5)",
    pulseLegend:
      "Pulso: 1–2 = Seed · 3–4 = Validado · 5+ = Alta convicción",
    visibleLabel: (shown, total) =>
      `Mostrando ${shown} de ${total} idea${total === 1 ? "" : "s"}`,
    table_idea: "Idea",
    table_description: "Descripción",
    table_proof_token: "Token de prueba",
    table_pulse: "Pulso",
    table_author: "Autor",
    table_date: "Fecha",
    loading: "Cargando ideas…",
    errorPrefix: "Error",
    noIdeasForFilter: "No hay ideas que coincidan con los filtros actuales.",
    proofTokenLabel: "Token de prueba",
    proofTokenMissing: "falta",
    modal_created: "Creado",
    modal_author: "Autor",
    modal_proof_hash: "Prueba / hash",
    modal_close: "Cerrar",
    pulseSuffix: "pulso",
    pulseLevelLabel: "Nivel de pulso",
    pulseLevelNone: "Ninguno",
    pulseLevelSeed: "Seed",
    pulseLevelValidated: "Validado",
    pulseLevelHigh: "Alta convicción",
    pulseTooltip:
      "Puntaje Roota: 0–10. 1–2 = Seed, 3–4 = Validado, 5+ = Alta convicción.",
    newIdeaButton: "Nueva idea",
    createIdeaTitle: "Crear nueva idea con proof",
    form_titleLabel: "Título de la idea",
    form_descriptionLabel: "Descripción",
    form_authorLabel: "Autor (opcional)",
    form_proofLabel: "Token de prueba (SHA-256)",
    form_generateProof: "Generar token de prueba",
    form_publish: "Publicar idea",
    form_cancel: "Cancelar",
    form_generating: "Generando…",
    form_publishing: "Publicando…",
    form_error_missingProof:
      "Genera el token de prueba antes de publicar.",
  },
  ja: {
    appTitle: "Roota",
    tagline:
      "Ideas Stock Exchange · 証拠と関心のパルスを持つアイデアのライブレジストリ",
    backend: "バックエンド: Supabase",
    endpoint: "エンドポイント: /api/ideas",
    mode: "モード: MVP · 読み取り専用 + 追加",
    liveStream: "ライブ・アイデアストリーム",
    totalIdeas: (n) => `アイデア ${n} 件`,
    searchLabel: "検索",
    searchPlaceholder: "アイデア、説明、キーワード…",
    pulseFilterLabel: "パルスレベル",
    pulseFilter_all: "すべてのレベル",
    pulseFilter_1: "Seed 以上 (≥1)",
    pulseFilter_3: "Validated 以上 (≥3)",
    pulseFilter_5: "High conviction (≥5)",
    pulseLegend:
      "パルス: 1–2 = Seed · 3–4 = Validated · 5+ = High conviction",
    visibleLabel: (shown, total) =>
      `${total} 件中 ${shown} 件を表示`,
    table_idea: "アイデア",
    table_description: "説明",
    table_proof_token: "Proof トークン",
    table_pulse: "パルス",
    table_author: "投稿者",
    table_date: "日付",
    loading: "アイデアを読み込み中…",
    errorPrefix: "エラー",
    noIdeasForFilter: "現在のフィルターに一致するアイデアはありません。",
    proofTokenLabel: "Proof トークン",
    proofTokenMissing: "なし",
    modal_created: "作成日",
    modal_author: "投稿者",
    modal_proof_hash: "Proof / ハッシュ",
    modal_close: "閉じる",
    pulseSuffix: "パルス",
    pulseLevelLabel: "パルスレベル",
    pulseLevelNone: "なし",
    pulseLevelSeed: "Seed",
    pulseLevelValidated: "Validated",
    pulseLevelHigh: "High conviction",
    pulseTooltip:
      "Roota スコア: 0–10。1–2 = Seed、3–4 = Validated、5+ = High conviction。",
    newIdeaButton: "New idea",
    createIdeaTitle: "Create new idea with proof",
    form_titleLabel: "Idea title",
    form_descriptionLabel: "Description",
    form_authorLabel: "Author (optional)",
    form_proofLabel: "Proof token (SHA-256)",
    form_generateProof: "Generate proof token",
    form_publish: "Publish idea",
    form_cancel: "Cancel",
    form_generating: "Generating…",
    form_publishing: "Publishing…",
    form_error_missingProof: "Generate proof token before publishing.",
  },
};

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
  titleRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
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
  sectionRight: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  sectionCount: {
    fontSize: "13px",
    color: "#94a3b8",
  },
  langSwitcher: {
    display: "inline-flex",
    gap: "6px",
    padding: "4px",
    borderRadius: "999px",
    border: "1px solid #1e293b",
    backgroundColor: "#020617",
  },
  langButton: {
    border: "none",
    borderRadius: "999px",
    padding: "3px 10px",
    fontSize: "11px",
    cursor: "pointer",
    backgroundColor: "transparent",
    color: "#cbd5f5",
  } as const,
  langButtonActive: {
    backgroundColor: "#1d4ed8",
    color: "#e5e7eb",
  },
  primaryButton: {
    padding: "6px 12px",
    borderRadius: "999px",
    border: "none",
    backgroundColor: "#1d4ed8",
    color: "#e5e7eb",
    fontSize: "12px",
    cursor: "pointer",
    whiteSpace: "nowrap" as const,
  },
  primaryButtonDisabled: {
    opacity: 0.6,
    cursor: "default",
  },

  // filters
  filtersBar: {
    marginBottom: "4px",
    display: "flex",
    flexWrap: "wrap" as const,
    gap: "12px",
    alignItems: "center",
    justifyContent: "space-between",
  },
  filtersLeft: {
    display: "flex",
    flexWrap: "wrap" as const,
    gap: "10px",
    alignItems: "center",
  },
  filtersRight: {
    fontSize: "12px",
    color: "#94a3b8",
  },
  filterGroup: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "4px",
  },
  filterLabel: {
    fontSize: "11px",
    color: "#94a3b8",
  },
  searchInput: {
    minWidth: "220px",
    padding: "6px 10px",
    borderRadius: "999px",
    border: "1px solid #1e293b",
    backgroundColor: "#020617",
    color: "#e5e7eb",
    fontSize: "13px",
    outline: "none",
  },
  select: {
    minWidth: "180px",
    padding: "6px 10px",
    borderRadius: "999px",
    border: "1px solid #1e293b",
    backgroundColor: "#020617",
    color: "#e5e7eb",
    fontSize: "13px",
    outline: "none",
  },
  pulseLegend: {
    marginBottom: "10px",
    fontSize: "11px",
    color: "#64748b",
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
  thPulseHeader: {
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
  },
  thPulseIcon: {
    fontSize: 11,
    color: "#94a3b8",
  },
  tooltipIcon: {
    fontSize: 11,
    color: "#9ca3af",
    cursor: "help",
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
  proofLabel: {
    fontSize: "11px",
    color: "#cbd5f5",
  },
  proofShort: {
    fontSize: "11px",
    color: "#9ca3af",
    fontFamily: "monospace",
  },
  pulseBadgeBase: {
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
    padding: "3px 8px",
    borderRadius: "999px",
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
  // modal base
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
    fontFamily: "monospace",
  },
  modalFooter: {
    marginTop: "16px",
    display: "flex",
    justifyContent: "flex-end",
    gap: "8px",
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
  modalButtonSecondary: {
    padding: "6px 12px",
    borderRadius: "8px",
    border: "1px solid #4b5563",
    backgroundColor: "transparent",
    color: "#e5e7eb",
    cursor: "pointer",
    fontSize: "13px",
  },
  formGroup: {
    marginTop: "12px",
    display: "flex",
    flexDirection: "column" as const,
    gap: "4px",
  },
  formLabel: {
    fontSize: "12px",
    color: "#9ca3af",
  },
  formInput: {
    padding: "7px 10px",
    borderRadius: "8px",
    border: "1px solid #1f2937",
    backgroundColor: "#020617",
    color: "#e5e7eb",
    fontSize: "13px",
    outline: "none",
  },
  formTextarea: {
    padding: "7px 10px",
    borderRadius: "8px",
    border: "1px solid #1f2937",
    backgroundColor: "#020617",
    color: "#e5e7eb",
    fontSize: "13px",
    outline: "none",
    minHeight: "80px",
    resize: "vertical" as const,
  },
  formError: {
    marginTop: "8px",
    fontSize: "12px",
    color: "#fca5a5",
  },
};

// helpers for pulse visual + label
const getPulseBadgeStyle = (value: number | null) => {
  const v = value ?? 0;
  if (v >= 5) {
    // high conviction
    return {
      backgroundColor: "rgba(234,179,8,0.18)",
      color: "#facc15",
    };
  }
  if (v >= 3) {
    // validated
    return {
      backgroundColor: "rgba(129,140,248,0.25)",
      color: "#c7d2fe",
    };
  }
  if (v >= 1) {
    // seed
    return {
      backgroundColor: "rgba(56,189,248,0.25)",
      color: "#bae6fd",
    };
  }
  // none
  return {
    backgroundColor: "rgba(15,23,42,0.9)",
    color: "#64748b",
  };
};

const getPulseLevelName = (
  value: number | null,
  localeStrings: (typeof translations)[Locale]
) => {
  const v = value ?? 0;
  if (v >= 5) return localeStrings.pulseLevelHigh;
  if (v >= 3) return localeStrings.pulseLevelValidated;
  if (v >= 1) return localeStrings.pulseLevelSeed;
  return localeStrings.pulseLevelNone;
};

// SHA-256 proof generator (runs in browser)
async function generateProofHash(
  title: string,
  description: string,
  author: string
): Promise<string> {
  const encoder = new TextEncoder();
  const signature = `${title}||${description}||${author || ""}||${Date.now()}`;
  const data = encoder.encode(signature);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
}

export default function HomePage() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [sortField, setSortField] = useState<SortField>("date");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const [selectedIdea, setSelectedIdea] = useState<Idea | null>(null);
  const [hoveredRowId, setHoveredRowId] = useState<string | null>(null);

  // filters
  const [searchQuery, setSearchQuery] = useState("");
  const [pulseFilter, setPulseFilter] = useState<PulseFilter>("all");

  // locale
  const [locale, setLocale] = useState<Locale>("en");
  const t = translations[locale];

  // create idea modal state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newProof, setNewProof] = useState("");
  const [creating, setCreating] = useState(false);
  const [generatingProof, setGeneratingProof] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

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

  const handleSort = (field: SortField) => {
    if (!field) return;
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  // filter
  const filteredIdeas = ideas.filter((idea) => {
    const text = (idea.title + " " + idea.description).toLowerCase();
    const q = searchQuery.trim().toLowerCase();

    if (q && !text.includes(q)) return false;

    const p = idea.pulse ?? 0;
    if (pulseFilter === "1" && p < 1) return false;
    if (pulseFilter === "3" && p < 3) return false;
    if (pulseFilter === "5" && p < 5) return false;

    return true;
  });

  // sort
  const sortedIdeas = (() => {
    if (!sortField) return filteredIdeas;
    const copy = [...filteredIdeas];
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

  const totalLabel =
    !loading && !error ? t.totalIdeas(ideas.length) : "—";

  const visibleLabel =
    !loading && !error ? t.visibleLabel(filteredIdeas.length, ideas.length) : "";

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(locale === "ja" ? "ja-JP" : "en-GB", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const shortHash = (hash: string) =>
    hash.length > 12
      ? `${hash.slice(0, 6)}…${hash.slice(-4)}`
      : hash;

  const resetForm = () => {
    setNewTitle("");
    setNewDescription("");
    setNewAuthor("");
    setNewProof("");
    setFormError(null);
  };

  const handleOpenCreate = () => {
    resetForm();
    setShowCreateModal(true);
  };

  const handleGenerateProof = async () => {
    setFormError(null);
    if (!newTitle.trim() || !newDescription.trim()) {
      setFormError("Title and description are required before generating proof.");
      return;
    }
    try {
      setGeneratingProof(true);
      const hash = await generateProofHash(
        newTitle.trim(),
        newDescription.trim(),
        newAuthor.trim()
      );
      setNewProof(hash);
    } catch (e: any) {
      setFormError(e?.message || "Failed to generate proof token.");
    } finally {
      setGeneratingProof(false);
    }
  };

  const handlePublishIdea = async () => {
    setFormError(null);

    if (!newTitle.trim() || !newDescription.trim()) {
      setFormError("Title and description are required.");
      return;
    }
    if (!newProof) {
      setFormError(t.form_error_missingProof);
      return;
    }

    try {
      setCreating(true);
      const payload = {
        title: newTitle.trim(),
        description: newDescription.trim(),
        author: newAuthor.trim() || null,
        proof_hash: newProof,
        pulse: 1,
      };

      const res = await fetch("/api/ideas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data?.error || "Failed to publish idea.");
      }

      const created: Idea = data.idea;

      // prepend to list
      setIdeas((prev) => [created, ...prev]);
      setShowCreateModal(false);
      resetForm();
    } catch (e: any) {
      setFormError(e?.message || "Failed to publish idea.");
    } finally {
      setCreating(false);
    }
  };
  const handlePulseChange = async (id: string, delta: number) => {
  // оптимістично оновлюємо локальний стейт
  setIdeas((prev) =>
    prev.map((idea) =>
      idea.id === id
        ? { ...idea, pulse: (idea.pulse ?? 0) + delta }
        : idea
    )
  );

  try {
    const res = await fetch("/api/pulse", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, delta }),
    });

    const data = await res.json();

    if (!res.ok || !data.ok) {
      throw new Error(data?.error || "Pulse update failed");
    }

    // синхронізуємося з тим, що в БД
    setIdeas((prev) =>
      prev.map((idea) =>
        idea.id === id ? data.idea : idea
      )
    );
  } catch (e) {
    console.error(e);
  }
};

  return (
    <main style={styles.page}>
      {/* HEADER */}
      <header style={styles.headerTop}>
        <div>
          <div style={styles.titleRow}>
            <h1 style={styles.title}>{t.appTitle}</h1>

            {/* language switcher */}
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

          <p style={styles.subtitle}>{t.tagline}</p>
        </div>
        <div style={styles.metaBlock}>
          <div>{t.backend}</div>
          <div>{t.endpoint}</div>
          <div>{t.mode}</div>
        </div>
      </header>

      {/* SECTION HEADER */}
      <div style={styles.sectionHeader}>
        <div style={styles.sectionTitle}>{t.liveStream}</div>
        <div style={styles.sectionRight}>
          <div style={styles.sectionCount}>{totalLabel}</div>
          <button
            style={styles.primaryButton}
            onClick={handleOpenCreate}
          >
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
              onChange={(e) => setPulseFilter(e.target.value as PulseFilter)}
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

      {/* TABLE BLOCK */}
      <div style={styles.tableWrapper}>
        {loading && <div style={styles.loading}>{t.loading}</div>}

        {error && (
          <div style={styles.errorBox}>
            {t.errorPrefix}: {error}
          </div>
        )}

        {!loading && !error && sortedIdeas.length > 0 && (
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
                    {t.table_author}
                  </th>
                  <th
                    style={{
                      ...styles.thBase,
                      cursor: "pointer",
                    }}
                    onClick={() => handleSort("date")}
                  >
                    <span style={styles.thPulseHeader}>
                      <span>{t.table_date}</span>
                      <span style={styles.thPulseIcon}>
                        {sortIcon("date")}
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
                      {/* IDEA */}
                      <td
                        style={{
                          ...styles.tdBase,
                          ...styles.tdWithRightBorder,
                          ...styles.ideaCell,
                        }}
                      >
                        {idea.title}
                      </td>

                      {/* DESCRIPTION */}
                      <td
                        style={{
                          ...styles.tdBase,
                          ...styles.tdWithRightBorder,
                          ...styles.descCell,
                        }}
                      >
                        {idea.description}
                      </td>

                      {/* PROOF TOKEN */}
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

                    {/* PULSE */}
<td
  style={{
    ...styles.tdBase,
    ...styles.tdWithRightBorder,
  }}
>
  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
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

                      {/* AUTHOR */}
                      <td
                        style={{
                          ...styles.tdBase,
                          ...styles.tdWithRightBorder,
                        }}
                      >
                        {idea.author || "anonymous"}
                      </td>

                      {/* DATE */}
                      <td style={styles.tdBase}>
                        <span style={{ fontSize: 12, color: "#94a3b8" }}>
                          {formatDate(idea.created_at)}
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
                <span>· {getPulseLevelName(selectedIdea.pulse, t)}</span>
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
    href={`/idea/${selectedIdea.id}`}
    style={{
      ...styles.modalButton,
      textDecoration: "none",
      display: "inline-block",
    }}
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
                {generatingProof ? t.form_generating : t.form_generateProof}
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
