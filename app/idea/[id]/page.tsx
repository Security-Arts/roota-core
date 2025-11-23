// app/idea/[id]/page.tsx
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

type Idea = {
  id: string;
  title: string;
  description: string | null;
  proof_hash: string | null;
  pulse: number | null;
  author: string | null;
  created_at: string;
  updated_at: string | null;
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getPulseLabel(pulse: number | null) {
  const v = pulse ?? 0;
  if (v >= 5) return "High conviction";
  if (v >= 3) return "Validated";
  if (v >= 1) return "Seed";
  return "None";
}

export default async function IdeaPage({ params }: { params: { id: string } }) {
  const { id } = params;

  // -----------------------------
  // 1) Пошук по UUID (id)
  // -----------------------------
  const { data: byId, error: errById } = await supabase
    .from("ideas")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  let idea: Idea | null = null;

  if (byId && !errById) {
    idea = byId as Idea;
  } else {
    // -----------------------------
    // 2) Якщо не знайдено — шукаємо по slug
    // -----------------------------
    const { data: bySlug, error: errBySlug } = await supabase
      .from("ideas")
      .select("*")
      .eq("slug", id)
      .maybeSingle();

    if (bySlug && !errBySlug) {
      idea = bySlug as Idea;
    }
  }

  // -----------------------------
  // 3) Якщо нема ні по id, ні по slug → 404
  // -----------------------------
  if (!idea) {
    return notFound();
  }

  // ---------------------------------------------------
  // 4) Page rendering — все нижче лишаємо як у тебе було
  // ---------------------------------------------------
  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <header className="flex items-center justify-between gap-4 mb-8">
          <div>
            <Link href="/" className="text-xs text-gray-400 hover:text-gray-200">
              ← Back to Roota stream
            </Link>
            <h1 className="text-2xl md:text-3xl font-semibold mt-3">{idea.title}</h1>
            <p className="text-[11px] text-gray-500 mt-2">
              by <span className="text-gray-200">{idea.author || "anonymous"}</span>{" "}
              · {formatDate(idea.created_at)}
            </p>
          </div>

          <div className="flex flex-col items-end gap-2">
            <span className="text-[10px] tracking-wide uppercase text-gray-400">Pulse</span>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/70 bg-emerald-500/10 px-3 py-1">
              <span className="text-sm">⚡</span>
              <span className="text-lg font-semibold text-emerald-400">
                {idea.pulse ?? 0}
              </span>
            </span>
            <span className="text-[11px] text-gray-400">{getPulseLabel(idea.pulse)}</span>
          </div>
        </header>

        {idea.description && (
          <section className="mb-8">
            <h2 className="text-sm font-semibold text-gray-300 mb-2">Description</h2>
            <p className="text-sm leading-relaxed text-gray-100 whitespace-pre-wrap">
              {idea.description}
            </p>
          </section>
        )}

        <section className="mb-8">
          <h2 className="text-sm font-semibold text-gray-300 mb-2">Proof token (SHA-256)</h2>
          {idea.proof_hash ? (
            <div className="rounded-lg border border-gray-700 bg-black/30 px-3 py-2">
              <code className="block text-[11px] font-mono break-all text-gray-100">
                {idea.proof_hash}
              </code>
            </div>
          ) : (
            <p className="text-xs text-gray-500">No proof token stored for this idea.</p>
          )}
        </section>

        <section className="border-t border-gray-800 pt-4 mt-6 flex flex-col gap-1 text-[11px] text-gray-500">
          <div>Roota · live registry of ideas with proof and pulse of interest</div>
          <div className="flex flex-wrap justify-between gap-2">
            <span className="truncate max-w-[220px]">ID: {idea.id}</span>
            {idea.updated_at && <span>Last updated: {formatDate(idea.updated_at)}</span>}
          </div>
        </section>
      </div>
    </main>
  );
}
