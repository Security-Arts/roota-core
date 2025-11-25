// /lib/translations.ts
import { Locale } from "./types";

export interface Translations {
  appTitle: string;
  tagline: string[];
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

export const translations: Record<Locale, Translations> = {
  en: {
    appTitle: "Roota · Ideas Stock Exchange",
    tagline: [
      "A live registry of ideas with proof tokens and a visible pulse of interest.",
      "Roota is an idea hive – each thought gets its proof, pulse and room to bloom.",
    ],
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
    noIdeasForFilter: "No hay ideas que coinciden con los filtros.",
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
    noIdeasForFilter:
      "現在のフィルターに一致するアイデアはありません。",
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

export function getTranslations(locale: Locale): Translations {
  return translations[locale] ?? translations.en;
}
