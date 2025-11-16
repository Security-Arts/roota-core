// app/page.tsx
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
  updated_at?: string;
};

type IdeasResponse =
  | { ok: true; ideas: Idea[] }
  | { ok: false; error: string };

export default function HomePage() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const res = await fetch("/api/ideas");
        const data: IdeasResponse = await res.json();

        if (!res.ok || !("ok" in data) || data.ok === false) {
          throw new Error(
            (data as any)?.error || "Failed to load ideas from API"
          );
        }

        setIdeas(data.ideas);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Unexpected error");
      } finally {
        setLoading(false);
      }
    };

    fetchIdeas();
  }, []);

  const ideasCountLabel =
    !loading && !error ? `${ideas.length} ідея(й)` : "—";

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Top bar / brand */}
        <header className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
              Roota
            </h1>
            <p className="text-sm sm:text-base text-slate-300 mt-1">
              Ideas Stock Exchange · живий реєстр ідей з доказом та пульсом
              інтересу
            </p>
          </div>

          <div className="flex flex-col gap-1 text-xs text-slate-400 mt-4 sm:items-end">
            <p>Backend: Supabase</p>
            <p>Endpoint: /api/ideas</p>
            <p>Mode: MVP · read-only list</p>
          </div>
        </header>

        {/* Потік ідей — завжди на місці, без стрибків */}
<section className="rounded-2xl border border-slate-800 bg-slate-900/70 backdrop-blur mt-12">
  <div className="border-b border-slate-800 px-4 py-3 flex items-center justify-between">
    <h2 className="text-sm font-semibold text-slate-100 uppercase tracking-wide">
      Живий потік ідей
    </h2>
    <span className="text-xs text-slate-400">
      {!loading && !error ? `${ideas.length} ідея(й)` : "—"}
    </span>
  </div>

  {/* Loader */}
  {loading && (
    <div className="px-4 py-6 text-slate-300 text-sm border-b border-slate-800">
      Завантажую ідеї з бекенду…
    </div>
  )}

  {/* Error */}
  {error && (
    <div className="px-4 py-6 text-sm text-red-100 bg-red-500/10 border-b border-red-500/40">
      Помилка: {error}
    </div>
  )}

  {/* No ideas */}
  {!loading && !error && ideas.length === 0 && (
    <div className="px-4 py-6 text-slate-300 text-sm border-b border-slate-800">
      Даних поки нема. Додамо форму створення ідей.
    </div>
  )}

  {/* Table */}
  {!loading && !error && ideas.length > 0 && (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-900/80">
          <tr className="border-b border-slate-800 text-left">
            <th className="px-4 py-2 font-medium text-slate-400">Ідея</th>
            <th className="px-4 py-2 font-medium text-slate-400">Опис</th>
            <th className="px-4 py-2 font-medium text-slate-400">Proof</th>
            <th className="px-4 py-2 font-medium text-slate-400">Pulse</th>
            <th className="px-4 py-2 font-medium text-slate-400">Автор</th>
            <th className="px-4 py-2 font-medium text-slate-400">Дата</th>
          </tr>
        </thead>
        <tbody>
          {ideas.map((idea) => (
            <tr
              key={idea.id}
              className="border-t border-slate-800/70 hover:bg-slate-900/80 transition-colors"
            >
              <td className="px-4 py-3 align-top font-semibold text-slate-50">
                {idea.title}
              </td>

              <td className="px-4 py-3 align-top max-w-xs text-slate-300">
                {idea.description}
              </td>

              <td className="px-4 py-3 align-top">
                {idea.proof_hash ? (
                  <span className="inline-flex items-center rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-200">
                    Proof linked
                  </span>
                ) : (
                  <span className="inline-flex items-center rounded-full border border-slate-600/60 bg-slate-800 px-2.5 py-0.5 text-[11px] text-slate-300">
                    no proof yet
                  </span>
                )}
              </td>

              <td className="px-4 py-3 align-top">
                <span className="inline-flex items-center gap-1 rounded-full bg-indigo-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-indigo-200">
                  ⚡ {idea.pulse ?? 0}
                </span>
              </td>

              <td className="px-4 py-3 align-top text-slate-300">
                {idea.author || "anonymous"}
              </td>

              <td className="px-4 py-3 align-top whitespace-nowrap text-slate-400 text-xs">
                {new Date(idea.created_at).toLocaleDateString("uk-UA", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</section>
      </div>
    </main>
  );
}
