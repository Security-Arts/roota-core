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
};

export default async function IdeaPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const { data, error } = await supabase
    .from("ideas")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    console.error("Idea page error:", error);
    return notFound();
  }

  const idea = data as Idea;

  const createdAt = new Date(idea.created_at).toLocaleString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <header className="flex items-center justify-between gap-4 mb-8">
          <div>
            <Link
              href="/"
              className="text-xs text-gray-400 hover:text-gray-200"
            >
              ← Back to stream
            </Link>
            <h1 className="text-2xl font-semibold mt-2">{idea.title}</h1>
            <p className="text-xs text-gray-500 mt-1">
              by {idea.author || "anonymous"} · {createdAt}
            </p>
          </div>

          <div className="flex flex-col items-end gap-2">
            <span className="text-[11px] text-gray-400 uppercase tracking-wide">
              Pulse
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/60 px-3 py-1 text-sm">
              <span>⚡</span>
              <span className="font-semibold text-emerald-400">
                {idea.pulse ?? 0}
              </span>
            </span>
          </div>
        </header>

        {idea.description && (
          <section className="mb-6">
            <h2 className="text-sm font-semibold text-gray-300 mb-2">
              Description
            </h2>
            <p className="text-sm text-gray-100 leading-relaxed whitespace-pre-wrap">
              {idea.description}
            </p>
          </section>
        )}

        <section className="mb-8">
          <h2 className="text-sm font-semibold text-gray-300 mb-2">
            Proof token (SHA-256)
          </h2>
          {idea.proof_hash ? (
            <div className="rounded-lg border border-gray-700 bg-black/30 px-3 py-2">
              <code className="block text-[11px] font-mono break-all text-gray-100">
                {idea.proof_hash}
              </code>
            </div>
          ) : (
            <p className="text-xs text-gray-500">
              No proof token stored for this idea.
            </p>
          )}
        </section>

        <section className="border-t border-gray-800 pt-4 flex items-center justify-between text-xs text-gray-500">
          <span>Roota · live registry of ideas with proof and pulse</span>
          <span className="truncate max-w-[220px] text-right">
            ID: {idea.id}
          </span>
        </section>
      </div>
    </main>
  );
}
