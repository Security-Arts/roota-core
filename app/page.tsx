"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { RootaLogo } from "@/components/RootaLogo";

type Idea = {
  id: string;
  title: string;
  description: string;
  slug: string | null;
  created_at: string;
  pulse: number | null;
};

type Lang = "en" | "es" | "ja";

const copy: Record<
  Lang,
  {
    appTitle: string;
    tagline: string;
    heroTitle: string;
    heroSubtitle: string;
    heroCtaPrimary: string;
    heroCtaSecondary: string;
    whyTitle: string;
    whyHint: string;
    whyP1: string;
    whyP2: string;
    whyP3: string;
    hbTitle: string;
    hbHint: string;
    hbLaunchTitle: string;
    hbLaunchBody: string;
    hbRootaTitle: string;
    hbRootaBody: string;
    whoTitle: string;
    whoHint: string;
    bottomText: string;
    liveTitle: string;
    liveHint: string;
    liveEmpty: string;
    liveMetaSuffix: string;
    exploreHive: string;
    readStory: string;
  }
> = {
  en: {
    appTitle: "Roota · Ideas Stock Exchange",
    tagline: "A live registry of ideas with proof and pulse.",
    heroTitle: "Ideas deserve a home, not a feed.",
    heroSubtitle:
      "Roota turns raw thoughts into timestamped records with proof and pulse. It’s a live hive — a place where ideas take root, grow and stay visible to people who actually care.",
    heroCtaPrimary: "Enter the Hive",
    heroCtaSecondary: "Why Roota exists",
    whyTitle: "Why Roota exists",
    whyHint: "Ideas usually die in chats and notebooks. Roota keeps their heartbeat.",
    whyP1:
      "Most ideas live in fragments: notes, Notion pages, chat threads, voice messages. They’re hard to show, impossible to track and nearly impossible to prove.",
    whyP2:
      "Roota turns thoughts into records: a timestamped proof token, public context and pulse that shows how attention moves.",
    whyP3:
      "Together this becomes a living registry of ideas — not a list of launches, but a map of what people care about and when.",
    hbTitle: "Heartbeat, not applause",
    hbHint: "Launches chase applause. Roota listens to the ongoing heartbeat of ideas.",
    hbLaunchTitle: "Launch mode",
    hbLaunchBody:
      "A polished announcement, one spike of attention, screenshots and a day of noise. Then everyone scrolls away.",
    hbRootaTitle: "Roota mode",
    hbRootaBody:
      "A growth space for ideas. Proof, pulse and a visible trail of how a thought becomes a direction — long before or after a launch.",
    whoTitle: "Who uses the hive",
    whoHint:
      "Roota doesn’t sell ideas. It reveals what’s alive and where energy quietly gathers.",
    bottomText:
      "Roota keeps the public hive open and neutral. Proof and pulse stay visible — paid layers appear only where they add real leverage: private hives, analytics and Bee-agents.",
    liveTitle: "Live signals from the hive",
    liveHint: "Realtime pulse — no screenshots, just what’s alive now.",
    liveEmpty: "No signals yet. Be the first bee to publish an idea.",
    liveMetaSuffix: "· proof & pulse on record",
    exploreHive: "Explore the Hive",
    readStory: "Read the full story",
  },
  es: {
    appTitle: "Roota · Bolsa de Ideas",
    tagline: "Un registro vivo de ideas con prueba y pulso.",
    heroTitle: "Las ideas merecen un hogar, no solo un feed.",
    heroSubtitle:
      "Roota convierte pensamientos crudos en registros con marca de tiempo, prueba y pulso. Una colmena viva donde las ideas echan raíces y se vuelven visibles para quien realmente se preocupa.",
    heroCtaPrimary: "Entrar a la colmena",
    heroCtaSecondary: "Por qué existe Roota",
    whyTitle: "Por qué existe Roota",
    whyHint:
      "La mayoría de las ideas mueren en chats y cuadernos. Roota conserva su latido.",
    whyP1:
      "Muchas ideas viven en fragmentos: notas, páginas sueltas, hilos de chat, audios. Son difíciles de mostrar, de seguir y casi imposibles de probar.",
    whyP2:
      "Roota convierte pensamientos en registros: un token de prueba con marca de tiempo, contexto público y un pulso que muestra cómo se mueve la atención.",
    whyP3:
      "Así se forma un registro vivo de ideas — no una lista de lanzamientos, sino un mapa de lo que importa y cuándo.",
    hbTitle: "Latido, no aplausos",
    hbHint: "Los lanzamientos buscan aplausos. Roota escucha el latido continuo de las ideas.",
    hbLaunchTitle: "Modo lanzamiento",
    hbLaunchBody:
      "Un anuncio pulido, un pico de atención, capturas de pantalla y un día de ruido. Después, todos deslizan hacia abajo.",
    hbRootaTitle: "Modo Roota",
    hbRootaBody:
      "Un espacio de crecimiento para ideas. Prueba, pulso y un rastro visible de cómo un pensamiento se convierte en dirección.",
    whoTitle: "Quién usa la colmena",
    whoHint:
      "Roota no vende ideas. Muestra qué está vivo y dónde se junta la energía.",
    bottomText:
      "Roota mantiene la colmena pública abierta y neutral. La prueba y el pulso son visibles — las capas de pago solo aparecen donde añaden verdadera ventaja: colmenas privadas, analíticas y agentes Bee.",
    liveTitle: "Señales en vivo de la colmena",
    liveHint: "Pulso en tiempo real — sin capturas, solo lo que está vivo ahora.",
    liveEmpty: "Todavía no hay señales. Sé la primera abeja en publicar una idea.",
    liveMetaSuffix: "· prueba y pulso registrados",
    exploreHive: "Explorar la colmena",
    readStory: "Leer la historia completa",
  },
  ja: {
    appTitle: "Roota · アイデア取引所",
    tagline: "証拠とパルスを持つ生きたアイデアレジストリ。",
    heroTitle: "アイデアにはフィードではなく居場所が必要だ。",
    heroSubtitle:
      "Roota は、生の思いつきをタイムスタンプ付きのレコードに変えます。Proof と Pulse を持つハイブとして、アイデアが根を張り、成長し、本当に気にする人の目に触れ続けます。",
    heroCtaPrimary: "ハイブに入る",
    heroCtaSecondary: "Roota が存在する理由",
    whyTitle: "Roota が存在する理由",
    whyHint: "多くのアイデアはチャットやメモで死んでいく。Roota はその鼓動を残します。",
    whyP1:
      "アイデアの多くは断片として存在します。メモ、ノート、チャット、ボイスメッセージ。見せにくく、追跡しづらく、証明することはほぼ不可能です。",
    whyP2:
      "Roota は思考をレコードに変えます。タイムスタンプ付きの Proof トークン、公開コンテキスト、そして注意の動きを示す Pulse。",
    whyP3:
      "それらが合わさることで、生きたアイデアレジストリになります。ローンチのリストではなく、いつ・何に人々が心を動かされているかの地図です。",
    hbTitle: "拍手ではなく鼓動",
    hbHint: "ローンチは拍手を追いかける。Roota はアイデアの鼓動を聞き続ける。",
    hbLaunchTitle: "ローンチモード",
    hbLaunchBody:
      "磨き上げられた発表、一瞬の注目、スクリーンショットと一日のノイズ。その後はスクロールされて終わります。",
    hbRootaTitle: "Roota モード",
    hbRootaBody:
      "アイデアのための成長空間。Proof と Pulse、そして思考が方向性になるまでの可視化された軌跡。",
    whoTitle: "ハイブを使う人たち",
    whoHint: "Roota はアイデアを売る場ではありません。何が生きていて、どこにエネルギーが集まるかを見せます。",
    bottomText:
      "Roota はパブリックハイブを開かれた中立な場として保ちます。Proof と Pulse は公開され、課金レイヤーは本当にレバレッジを生む場所だけに現れます：プライベートハイブ、アナリティクス、Bee エージェントなど。",
    liveTitle: "ハイブからのライブシグナル",
    liveHint: "リアルタイムの Pulse — スクリーンショットではなく、今生きているものだけ。",
    liveEmpty: "まだシグナルはありません。最初の蜂としてアイデアを投稿しましょう。",
    liveMetaSuffix: "· 証拠とパルスが記録されています",
    exploreHive: "ハイブを探検する",
    readStory: "ストーリーを読む",
  },
};

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    minHeight: "100vh",
    background:
      "radial-gradient(circle at top left, rgba(56,189,248,0.16), transparent 60%), radial-gradient(circle at bottom right, rgba(129,140,248,0.18), #020617)",
    color: "#e5e7eb",
    padding: "32px 20px 56px",
    fontFamily:
      "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
    width: "100%",
    maxWidth: 1100,
    margin: "0 auto",
    boxSizing: "border-box" as const,
  },

  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 28,
    gap: 16,
  },
  brandLink: {
    textDecoration: "none",
    color: "inherit",
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  brandMark: {
    width: 44,
    height: 44,
    borderRadius: 18,
    background: "#020617",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 12px 30px rgba(15,23,42,0.9)",
  },
  brandText: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  brandTitle: {
    fontSize: 16,
    fontWeight: 600,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
  },
  brandTagline: {
    fontSize: 11,
    color: "#9ca3af",
  },

  rightTop: {
    display: "flex",
    alignItems: "center",
    gap: 14,
  },

  langToggle: {
    fontSize: 11,
    color: "#9ca3af",
    display: "flex",
    gap: 4,
  },
  langButton: {
    border: "none",
    background: "transparent",
    padding: "2px 6px",
    borderRadius: 999,
    cursor: "pointer",
    fontSize: 11,
  },
  langActive: {
    backgroundColor: "rgba(15,23,42,0.9)",
    color: "#e5e7eb",
    border: "1px solid #1d4ed8",
  },

  nav: {
    display: "flex",
    gap: 6,
    padding: 3,
    borderRadius: 999,
    border: "1px solid #1f2937",
    background: "rgba(2,6,23,0.9)",
    fontSize: 12,
  },
  navLinkBase: {
    padding: "5px 14px",
    borderRadius: 999,
    textDecoration: "none",
    border: "1px solid transparent",
    background: "transparent",
    color: "#9ca3af",
    cursor: "pointer",
  },
  navLinkAccent: {
    borderColor: "#1d4ed8",
    background:
      "radial-gradient(circle at top left, rgba(37,99,235,0.45), transparent 60%) #020617",
    color: "#e5e7eb",
  },

  badgeRow: {
    display: "flex",
    gap: 8,
    alignItems: "center",
    marginBottom: 14,
    fontSize: 11,
    textTransform: "uppercase" as const,
    letterSpacing: "0.12em",
    color: "#a5b4fc",
  },
  badge: {
    padding: "2px 8px",
    borderRadius: 999,
    border: "1px solid #4338ca",
    background: "rgba(30,64,175,0.35)",
  },

  heroGrid: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 2.1fr) minmax(0, 1.4fr)",
    gap: 40,
    alignItems: "flex-start",
    marginBottom: 40,
  },

  title: {
    fontSize: 40,
    fontWeight: 700,
    letterSpacing: "-0.03em",
    marginBottom: 14,
  },
  subtitle: {
    fontSize: 16,
    color: "#cbd5f5",
    maxWidth: 640,
    lineHeight: 1.6,
    marginBottom: 22,
  },

  ctaRow: {
    marginTop: 4,
    display: "flex",
    gap: 14,
    flexWrap: "wrap" as const,
  },
  ctaButtonPrimary: {
    borderRadius: 999,
    border: "1px solid #3b82f6",
    padding: "10px 20px",
    background:
      "radial-gradient(circle at top left, rgba(59,130,246,0.5), transparent 60%) #020617",
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

  heroSideCard: {
    borderRadius: 18,
    border: "1px solid #1f2937",
    padding: "14px 16px 16px",
    background:
      "radial-gradient(circle at top left, rgba(15,118,110,0.6), transparent 60%) #020617",
    fontSize: 13,
    color: "#cbd5f5",
    lineHeight: 1.6,
  },
  heroSideTitle: {
    fontSize: 13,
    textTransform: "uppercase" as const,
    letterSpacing: "0.16em",
    color: "#a5b4fc",
    marginBottom: 6,
  },
  heroSideRow: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    marginTop: 6,
  },
  heroSideLabel: {
    fontSize: 12,
    color: "#9ca3af",
  },
  heroSideValue: {
    fontSize: 13,
  },

  section: {
    marginTop: 32,
    paddingTop: 24,
    borderTop: "1px solid #1f2937",
  },
  sectionTitleRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    gap: 16,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 600,
    color: "#e5e7eb",
    textTransform: "uppercase" as const,
    letterSpacing: "0.14em",
  },
  sectionHint: {
    fontSize: 12,
    color: "#9ca3af",
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 1.7,
    color: "#cbd5f5",
    marginBottom: 10,
  },

  twoColText: {
    display: "grid",
    gridTemplateColumns: "minmax(0,1.3fr) minmax(0,1.3fr)",
    gap: 28,
  },

  miniList: {
    margin: "4px 0 6px 0",
    paddingLeft: 18,
    fontSize: 14,
    color: "#cbd5f5",
  },
  miniItem: {
    marginBottom: 4,
  },

  compareGrid: {
    display: "grid",
    gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)",
    gap: 18,
    marginTop: 10,
  },
  compareCard: {
    borderRadius: 16,
    border: "1px solid #111827",
    padding: "12px 14px",
    background:
      "radial-gradient(circle at top left, rgba(15,23,42,0.9), transparent 55%)",
    fontSize: 13,
  },
  compareTitle: {
    fontSize: 13,
    fontWeight: 600,
    marginBottom: 6,
  },
  compareTag: {
    display: "inline-block",
    fontSize: 11,
    borderRadius: 999,
    border: "1px solid #374151",
    padding: "2px 7px",
    marginBottom: 6,
    color: "#9ca3af",
  },

  personaGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0,1fr))",
    gap: 16,
    marginTop: 10,
  },
  personaCard: {
    borderRadius: 16,
    border: "1px solid #111827",
    padding: "12px 14px",
    background:
      "radial-gradient(circle at top left, rgba(37,99,235,0.35), transparent 60%) #020617",
    fontSize: 13,
  },
  personaTitle: {
    fontSize: 13,
    fontWeight: 600,
    marginBottom: 4,
  },

  liveHeaderRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
    marginBottom: 12,
  },
  liveList: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  liveCard: {
    borderRadius: 18,
    border: "1px solid #111827",
    padding: "12px 14px",
    background:
      "radial-gradient(circle at top left, rgba(15,23,42,0.95), transparent 55%) #020617",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 16,
  },
  liveTitle: {
    fontSize: 14,
    fontWeight: 600,
    marginBottom: 4,
  },
  liveDesc: {
    fontSize: 13,
    color: "#9ca3af",
    marginBottom: 6,
  },
  liveMeta: {
    fontSize: 12,
    color: "#6b7280",
  },
  livePulsePill: {
    borderRadius: 999,
    border: "1px solid #374151",
    padding: "3px 9px",
    fontSize: 12,
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
  },
  liveViewLink: {
    fontSize: 12,
    color: "#93c5fd",
    textDecoration: "none",
    marginTop: 8,
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
  },

  bottomCta: {
    marginTop: 32,
    paddingTop: 20,
    borderTop: "1px solid #1f2937",
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap" as const,
    gap: 16,
    alignItems: "center",
  },
};

export default function RootaHomePage() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loadingIdeas, setLoadingIdeas] = useState(false);
  const [lang, setLang] = useState<Lang>("en");

  const t = copy[lang];

  const scrollToHive = () => {
    const el = document.getElementById("hive-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoadingIdeas(true);
        const res = await fetch("/api/ideas", { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        const list: Idea[] = data?.ideas ?? data ?? [];

        const sorted = [...list].sort(
          (a, b) =>
            new Date(b.created_at).getTime() -
            new Date(a.created_at).getTime()
        );
        if (!cancelled) {
          setIdeas(sorted.slice(0, 4));
        }
      } finally {
        if (!cancelled) setLoadingIdeas(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main style={styles.page}>
      {/* TOP BAR */}
      <div style={styles.topBar}>
        <Link href="/" style={styles.brandLink}>
          <div style={styles.brand}>
            <div style={styles.brandMark}>
              <RootaLogo size={32} />
            </div>
            <div style={styles.brandText}>
              <span style={styles.brandTitle}>Roota</span>
              <span style={styles.brandTagline}>{t.tagline}</span>
            </div>
          </div>
        </Link>

        <div style={styles.rightTop}>
          <div style={styles.langToggle}>
            {(["en", "es", "ja"] as Lang[]).map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setLang(code)}
                style={{
                  ...styles.langButton,
                  ...(lang === code ? styles.langActive : {}),
                }}
              >
                {code.toUpperCase()}
              </button>
            ))}
          </div>

          <nav style={styles.nav}>
            <button
              type="button"
              onClick={scrollToHive}
              style={{
                ...styles.navLinkBase,
                ...styles.navLinkAccent,
              }}
            >
              Hive
            </button>
            <Link
              href="/landing"
              style={{
                ...styles.navLinkBase,
              }}
            >
              Overview
            </Link>
            <Link
              href="/about"
              style={{
                ...styles.navLinkBase,
              }}
            >
              About
            </Link>
          </nav>
        </div>
      </div>

      {/* HERO */}
      <div style={styles.badgeRow}>
        <span style={styles.badge}>ROOTA</span>
        <span>Ideas stock exchange · proof &amp; pulse</span>
      </div>

      <section style={styles.heroGrid}>
        <div>
          <h1 style={styles.title}>{t.heroTitle}</h1>
          <p style={styles.subtitle}>{t.heroSubtitle}</p>

          <div style={styles.ctaRow}>
            <button
              type="button"
              onClick={scrollToHive}
              style={{ ...styles.ctaButtonPrimary, cursor: "pointer" }}
            >
              {t.heroCtaPrimary}
            </button>
            <Link href="/about" style={styles.ctaButtonSecondary}>
              {t.heroCtaSecondary}
            </Link>
          </div>
        </div>

        <aside style={styles.heroSideCard}>
          <div style={styles.heroSideTitle}>{t.hbTitle}</div>
          <p>
            Launches chase applause — a spike of attention and then silence.
            Roota tracks the heartbeat of ideas: every proof fixes a moment in
            time, every pulse adds energy.
          </p>
          <div style={styles.heroSideRow}>
            <div>
              <div style={styles.heroSideLabel}>Visible signals</div>
              <div style={styles.heroSideValue}>
                Proof tokens, pulse changes, live idea pages.
              </div>
            </div>
            <div>
              <div style={styles.heroSideLabel}>Missing on purpose</div>
              <div style={styles.heroSideValue}>
                Screenshots, pitch decks and vanity likes don&apos;t live here.
              </div>
            </div>
          </div>
        </aside>
      </section>

      {/* WHY ROOTA EXISTS */}
      <section style={styles.section}>
        <div style={styles.sectionTitleRow}>
          <h2 style={styles.sectionTitle}>{t.whyTitle}</h2>
          <div style={styles.sectionHint}>{t.whyHint}</div>
        </div>

        <div style={styles.twoColText}>
          <div>
            <p style={styles.paragraph}>{t.whyP1}</p>
            <p style={styles.paragraph}>{t.whyP2}</p>
          </div>

          <div>
            <p style={styles.paragraph}>{t.whyP3}</p>
            <ul style={styles.miniList}>
              <li style={styles.miniItem}>
                ⏱ Proof — “this idea existed here, in this form, on this date”.
              </li>
              <li style={styles.miniItem}>
                ⚡ Pulse — “this is how strongly it resonates over time”.
              </li>
              <li style={styles.miniItem}>
                🐝 Hive — a space where ideas cross-pollinate instead of
                compete.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* HEARTBEAT VS APPLAUSE */}
      <section style={styles.section}>
        <div style={styles.sectionTitleRow}>
          <h2 style={styles.sectionTitle}>{t.hbTitle}</h2>
          <div style={styles.sectionHint}>{t.hbHint}</div>
        </div>

        <div style={styles.compareGrid}>
          <div style={styles.compareCard}>
            <div style={styles.compareTag}>Launch mode</div>
            <div style={styles.compareTitle}>{t.hbLaunchTitle}</div>
            <p style={styles.paragraph}>{t.hbLaunchBody}</p>
            <ul style={styles.miniList}>
              <li style={styles.miniItem}>One day of attention.</li>
              <li style={styles.miniItem}>Focus on hype and screenshots.</li>
              <li style={styles.miniItem}>Applause, then scroll and forget.</li>
            </ul>
          </div>

          <div style={styles.compareCard}>
            <div style={styles.compareTag}>Idea mode</div>
            <div style={styles.compareTitle}>{t.hbRootaTitle}</div>
            <p style={styles.paragraph}>{t.hbRootaBody}</p>
            <ul style={styles.miniList}>
              <li style={styles.miniItem}>
                Ideas are captured early, not only at launch.
              </li>
              <li style={styles.miniItem}>
                Energy is measured by proof and pulse, not vanity.
              </li>
              <li style={styles.miniItem}>
                A long, visible heartbeat instead of a single clap.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section style={styles.section}>
        <div style={styles.sectionTitleRow}>
          <h2 style={styles.sectionTitle}>{t.whoTitle}</h2>
          <div style={styles.sectionHint}>{t.whoHint}</div>
        </div>

        <div style={styles.personaGrid}>
          <div style={styles.personaCard}>
            <div style={styles.personaTitle}>Makers & founders</div>
            <p>
              Capture raw concepts, watch which ones resonate, and turn bloom
              candidates into projects, products or side ventures.
            </p>
          </div>

          <div style={styles.personaCard}>
            <div style={styles.personaTitle}>Studios & teams</div>
            <p>
              Run private hives, track internal signals and see which directions
              organically gain energy inside the group.
            </p>
          </div>

          <div style={styles.personaCard}>
            <div style={styles.personaTitle}>Funds & scouts</div>
            <p>
              Look at early signals — pockets where proof + pulse rise before
              pitch decks appear on the surface.
            </p>
          </div>
        </div>
      </section>

      {/* LIVE SIGNALS / HIVE */}
      <section id="hive-section" style={styles.section}>
        <div style={styles.liveHeaderRow}>
          <div style={styles.sectionTitle}>{t.liveTitle}</div>
          <div style={styles.sectionHint}>{t.liveHint}</div>
        </div>

        {loadingIdeas && <p style={styles.sectionHint}>Loading latest ideas…</p>}

        {!loadingIdeas && ideas.length === 0 && (
          <p style={styles.sectionHint}>{t.liveEmpty}</p>
        )}

        {!loadingIdeas && ideas.length > 0 && (
          <div style={styles.liveList}>
            {ideas.map((idea) => (
              <div key={idea.id} style={styles.liveCard}>
                <div>
                  <div style={styles.liveTitle}>{idea.title}</div>
                  <div style={styles.liveDesc}>{idea.description}</div>
                  <div style={styles.liveMeta}>
                    {new Date(idea.created_at).toLocaleDateString()}{" "}
                    {t.liveMetaSuffix}
                  </div>
                </div>
                <div style={{ textAlign: "right" as const }}>
                  <div style={styles.livePulsePill}>
                    <span>⚡</span>
                    <span>{idea.pulse ?? 0}</span>
                    <span>| heartbeat</span>
                  </div>
                  <Link
                    href={`/idea/${idea.slug || idea.id}`}
                    style={styles.liveViewLink}
                  >
                    <span>View idea</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* BOTTOM CTA */}
      <div style={styles.bottomCta}>
        <div style={{ maxWidth: 520 }}>
          <p style={styles.paragraph}>{t.bottomText}</p>
        </div>
        <div style={styles.ctaRow}>
          <button
            type="button"
            onClick={scrollToHive}
            style={{ ...styles.ctaButtonPrimary, cursor: "pointer" }}
          >
            {t.exploreHive}
          </button>
          <Link href="/about" style={styles.ctaButtonSecondary}>
            {t.readStory}
          </Link>
        </div>
      </div>
    </main>
  );
}
