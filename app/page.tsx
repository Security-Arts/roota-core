"use client";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  CSSProperties,
} from "react";
import Link from "next/link";

type Locale = "en" | "es" | "ja";

type PulseFilter = "all" | "1" | "3" | "5";

type SortKey = "pulse" | "date";

type SortDirection = "asc" | "desc";

interface Idea {
  id: string;
  title: string;
  description: string;
  proof_hash?: string | null;
  pulse?: number | null;
  author?: string | null;
  slug?: string | null;
  created_at: string;
}

interface Translations {
  appTitle: string;
  tagline: string[];
  backend: string;
  endpoint: string;
  mode: string;
  liveStream: string;
  newIdeaButton: string;
  searchLabel: string;
  searchPlaceholder: string;
  pulseFilterLabel: string;
  pulseFilter_all: string;
  pulseFilter_1: string;
  pulseFilter_3: string;
  pulseFilter_5: string;
  pulseLegend: string;
  loading: string;
  errorPrefix: string;
  noIdeasForFilter: string;
  table_idea: string;
  table_description: string;
  table_proof_token: string;
  table_pulse: string;
  table_author: string;
  table_date: string;
  pulseTooltip: string;
  proofTokenLabel: string;
  proofTokenMissing: string;
  modal_created: string;
  modal_author: string;
  modal_proof_hash: string;
  modal_close: string;
  createIdeaTitle: string;
  form_titleLabel: string;
  form_descriptionLabel: string;
  form_authorLabel: string;
  form_proofLabel: string;
  form_generating: string;
  form_generateProof: string;
  form_cancel: string;
  form_publishing: string;
  form_publish: string;
}

const translations: Record<Locale, Translations> = {
  en: {
    appTitle: "Roota · Ideas Stock Exchange",
    tagline: [
      "A live registry of ideas with proof tokens and a visible pulse of interest.",
      "Roota is an idea hive – each thought gets its proof, pulse and room to bloom.",
    ],
    backend: "Backend: Supabase · Postgres",
    endpoint: "Endpoint: /api/ideas",
    mode: "Mode: Live MVP · Public ideas",
    liveStream: "Ideas live stream",
    newIdeaButton: "Publish new idea",
    searchLabel: "Search",
    searchPlaceholder: "Search by title or description…",
    pulseFilterLabel: "Pulse filter",
    pulseFilter_all: "All pulses",
    pulseFilter_1: "Pulse ≥ 1",
    pulseFilter_3: "Pulse ≥ 3",
    pulseFilter_5: "Pulse ≥ 5",
    pulseLegend:
      "⚡ Pulse = interest level. +1 / −1 shows how the idea resonates with the hive.",
    loading: "Loading ideas…",
    errorPrefix: "Error",
    noIdeasForFilter: "No ideas match the current filters.",
    table_idea: "Idea",
    table_description: "Description",
    table_proof_token: "Proof token",
    table_pulse: "Pulse",
    table_author: "Author",
    table_date: "Created",
    pulseTooltip: "Pulse reflects community interest. Higher = more energy.",
    proofTokenLabel: "Proof token",
    proofTokenMissing: "Not generated",
    modal_created: "Created",
    modal_author: "Author",
    modal_proof_hash: "Full proof hash",
    modal_close: "Close",
    createIdeaTitle: "Publish a new idea",
    form_titleLabel: "Idea title",
    form_descriptionLabel: "Idea description",
    form_authorLabel: "Author name (optional)",
    form_proofLabel: "Proof hash",
    form_generating: "Generating proof…",
    form_generateProof: "Generate proof hash",
    form_cancel: "Cancel",
    form_publishing: "Publishing…",
    form_publish: "Publish idea",
  },

  es: {
    appTitle: "Roota · Ideas con Prueba y Pulso",
    tagline: [
      "Un registro vivo de ideas con tokens de prueba y un pulso visible de interés.",
      "Roota es una colmena de ideas: cada pensamiento obtiene su prueba, pulso y espacio para florecer.",
    ],
    backend: "Backend: Supabase · Postgres",
    endpoint: "Endpoint: /api/ideas",
    mode: "Modo: MVP en vivo · Ideas públicas",
    liveStream: "Flujo en vivo de ideas",
    newIdeaButton: "Publicar nueva idea",
    searchLabel: "Buscar",
    searchPlaceholder: "Buscar por título o descripción…",
    pulseFilterLabel: "Filtro de pulso",
    pulseFilter_all: "Todos los pulsos",
    pulseFilter_1: "Pulso ≥ 1",
    pulseFilter_3: "Pulso ≥ 3",
    pulseFilter_5: "Pulso ≥ 5",
    pulseLegend:
      "⚡ El pulso = nivel de interés. +1 / −1 muestra cómo resuena la idea.",
    loading: "Cargando ideas…",
    errorPrefix: "Error",
    noIdeasForFilter: "No hay ideas que coincidan con los filtros.",
    table_idea: "Idea",
    table_description: "Descripción",
    table_proof_token: "Token de prueba",
    table_pulse: "Pulso",
    table_author: "Autor",
    table_date: "Creado",
    pulseTooltip: "El pulso refleja el interés de la comunidad.",
    proofTokenLabel: "Token de prueba",
    proofTokenMissing: "No generado",
    modal_created: "Creado",
    modal_author: "Autor",
    modal_proof_hash: "Hash de prueba completo",
    modal_close: "Cerrar",
    createIdeaTitle: "Publicar nueva idea",
    form_titleLabel: "Título de la idea",
    form_descriptionLabel: "Descripción de la idea",
    form_authorLabel: "Nombre del autor (opcional)",
    form_proofLabel: "Hash de prueba",
    form_generating: "Generando prueba…",
    form_generateProof: "Generar hash de prueba",
    form_cancel: "Cancelar",
    form_publishing: "Publicando…",
    form_publish: "Publicar idea",
  },

  ja: {
    appTitle: "Roota · 証明とパルスを持つアイデア",
    tagline: [
      "証明トークンと可視化された関心のパルスを持つ、ライブなアイデアレジストリ。",
      "Rootaはアイデアのハイブです – すべての思考が証明とパルスを得て、開花する場所。",
    ],
    backend: "バックエンド: Supabase · Postgres",
    endpoint: "エンドポイント: /api/ideas",
    mode: "モード: ライブMVP · 公開アイデア",
    liveStream: "アイデア・ライブストリーム",
    newIdeaButton: "新しいアイデアを公開",
    searchLabel: "検索",
    searchPlaceholder: "タイトルまたは説明で検索…",
    pulseFilterLabel: "パルスフィルター",
    pulseFilter_all: "すべてのパルス",
    pulseFilter_1: "パルス ≥ 1",
    pulseFilter_3: "パルス ≥ 3",
    pulseFilter_5: "パルス ≥ 5",
    pulseLegend:
      "⚡ パルス = 関心レベル。+1 / −1 でアイデアへの共感を示します。",
    loading: "アイデアを読み込み中…",
    errorPrefix: "エラー",
    noIdeasForFilter: "現在のフィルターに一致するアイデアはありません。",
    table_idea: "アイデア",
    table_description: "説明",
    table_proof_token: "証明トークン",
    table_pulse: "パルス",
    table_author: "作者",
    table_date: "作成日",
    pulseTooltip: "パルスはコミュニティの関心を表します。",
    proofTokenLabel: "証明トークン",
    proofTokenMissing: "未生成",
    modal_created: "作成日",
    modal_author: "作者",
    modal_proof_hash: "完全な証明ハッシュ",
    modal_close: "閉じる",
    createIdeaTitle: "新しいアイデアを公開",
    form_titleLabel: "アイデアのタイトル",
    form_descriptionLabel: "アイデアの説明",
    form_authorLabel: "作者名（任意）",
    form_proofLabel: "証明ハッシュ",
    form_generating: "証明を生成中…",
    form_generateProof: "証明ハッシュを生成",
    form_cancel: "キャンセル",
    form_publishing: "公開中…",
    form_publish: "アイデアを公開",
  },
};

function getTranslations(locale: Locale): Translations {
  return translations[locale] ?? translations.en;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function shortHash(hash: string): string {
  if (!hash) return "";
  if (hash.length <= 10) return hash;
  return `${hash.slice(0, 6)}…${hash.slice(-4)}`;
}

function getPulseBadgeStyle(pulse?: number | null): CSSProperties {
  const value = pulse ?? 0;

  if (value >= 5) {
    // high
    return {
      background:
        "radial-gradient(circle at top left, rgba(74,222,128,0.3), transparent 60%) #064e3b",
      border: "1px solid rgba(34,197,94,0.7)",
      color: "#bbf7d0",
    };
  }

  if (value >= 3) {
    // medium
    return {
      background:
        "radial-gradient(circle at top left, rgba(96,165,250,0.3), transparent 60%) #0f172a",
      border: "1px solid rgba(59,130,246,0.7)",
      color: "#bfdbfe",
    };
  }

  if (value >= 1) {
    // low
      return {
      background:
        "radial-gradient(circle at top left, rgba(251,191,36,0.25), transparent 60%) #111827",
      border: "1px solid rgba(245,158,11,0.7)",
      color: "#fef3c7",
    };
  }

  // neutral / zero
  return {
    background: "rgba(15,23,42,0.9)",
    border: "1px solid #1f2937",
    color: "#9ca3af",
  };
}

function getPulseLevelName(pulse: number | null | undefined, t: Translations) {
  const value = pulse ?? 0;
  if (value >= 5) return "High pulse";
  if (value >= 3) return "Medium pulse";
  if (value >= 1) return "Low pulse";
  return "Dormant";
}

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
  maxWidth: "1400px",
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

  opacity: 0,
  transform: "translateY(4px)",
  transition: "opacity 400ms ease-out, transform 400ms ease-out",
},
  leafIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    background: "rgba(15,23,42,0.9)",
    border: "1px solid #1f2937",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 22,
    lineHeight: 1,
    overflow: "visible",
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

function generateSimpleHash(input: string): string {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    const chr = input.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  return Math.abs(hash).toString(16) + "-" + Date.now().toString(16);
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
  useEffect(() => {
    const timer = setTimeout(() => setTaglineVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

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

  useEffect(() => {
    let cancelled = false;

    async function loadIdeas() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/ideas", { cache: "no-store" });
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        const data = await res.json();
        const loaded: Idea[] =
          data?.ideas ??
          data ??
          [];
        if (!cancelled) {
          setIdeas(loaded);
        }
      } catch (e: any) {
        if (!cancelled) {
          setError(e?.message || "Failed to load ideas");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
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
      // date
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
    totalIdeas === 0
      ? "0/0 ideas"
      : `${visibleIdeas}/${totalIdeas} ideas`;
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
        setSortDirection(key === "pulse" ? "desc" : "desc");
      }
    },
    [sortKey]
  );

  const handlePulseChange = useCallback(
    async (id: string, delta: 1 | -1) => {
      try {
        // Optimistic update
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
        // If it fails, you could refetch or rollback; for now ignore
      }
    },
    []
  );

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

    {/* tagline: два рядки */}
    <div style={{ marginTop: 6 }}>
      <p style={styles.subtitle}>
        <span style={styles.taglineIcon}>🌱</span>
        {t.tagline[0]}
      </p>
      <p style={styles.subtitle}>
        <span style={styles.taglineIcon}>🐝</span>
        {t.tagline[1]}
      </p>
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

  {/* правий блок — тільки десктоп */}
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

      <div style={styles.metaBlock}>
        <div>{t.backend}</div>
        <div>{t.endpoint}</div>
        <div>{t.mode}</div>
      </div>
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
