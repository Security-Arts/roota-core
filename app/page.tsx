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

  // Видимі, акуратні межі колонок
  const borderRight = {
    borderRight: "1px solid rgba(100,116,139,0.35)", // slate-500/35
  } as const;

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="max-w-6xl mx-auto px-6 py-12">
        
        {/* HEADER */}
        <header className="mb-12">
          <h1 className="text-4xl font-bold">Roota</h1>
          <p className="text-slate-300 mt-2">
            Ideas Stock Exchange · живий реєстр ідей з доказом та пульсом інтересу
          </p>
        </header>

        {/* TITLE BAR */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-100">Живий потік ідей</h2>
          <span className="text-sm text-slate-400">{totalLabel}</span>
        </div>

        {/* WRAPPER */}
        <div className="overflow-x-auto rounded-2xl border border-slate-700 bg-slate-900/70 backdrop-blur">
          
          {/* LOADING */}
          {loading && (
            <div className="px-6 py-6 text-slate-300 text-sm border-b border-slate-700">
              Завантажую ідеї…
            </div>
          )}

          {/* ERROR */}
          {error && (
            <div className="px-6 py-6 text-red-200 text-sm bg-red-500/10 border-b border-red-400/40">
              Помилка: {error}
            </div>
          )}

          {/* TABLE */}
          {!loading && !error && ideas.length > 0 && (
            <table className="min-w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-900/90 border-b border-slate-700">
                  <th className="px-6 py-3 font-semibold text-slate-300 text-left" style={borderRight}>Ідея</th>
                  <th className="px-6 py-3 font-semibold text-slate-300 text-left" style={borderRight}>Опис</th>
                  <th className="px-6 py-3 font-semibold text-slate-300 text-left" style={borderRight}>Proof</th>
                  <th className="px-6 py-3 font-semibold text-slate-300 text-left" style={borderRight}>Pulse</th>
                  <th className="px-6 py-3 font-semibold text-slate-300 text-left" style={borderRight}>Автор</th>
                  <th className="px-6 py-3 font-semibold text-slate-300 text-left">Дата</th>
                </tr>
              </thead>

              <tbody>
                {ideas.map((idea) => (
                  <tr
                    key={idea.id}
                    className="border-b border-slate-700 hover:bg-slate-900/70 transition-colors"
                  >
                    {/* TITLE */}
                    <td className="px-6 py-4 align-top font-semibold text-slate-50" style={borderRight}>
                      {idea.title}
                    </td>

                    {/* DESCRIPTION */}
                    <td
                      className="px-6 py-4 align-top text-slate-300 leading-relaxed max-w-[500px] whitespace-normal break-words"
                      style={borderRight}
                    >
                      {idea.description}
                    </td>

                    {/* PROOF */}
                    <td className="px-6 py-4 align-top" style={borderRight}>
                      {idea.proof_hash ? (
                        <span className="inline-block rounded-full border border-emerald-400 bg-emerald-500/15 px-3 py-0.5 text-xs text-emerald-100">
                          Proof linked
                        </span>
                      ) : (
                        <span className="inline-block rounded-full border border-slate-500 bg-slate-800 px-3 py-0.5 text-xs text-slate-200">
                          no proof
                        </span>
                      )}
                    </td>

                    {/* PULSE */}
                    <td className="px-6 py-4 align-top" style={borderRight}>
                      <span className="inline-flex items-center gap-1 rounded-full bg-indigo-500/15 px-3 py-0.5 text-xs font-semibold text-indigo-100">
                        ⚡ {idea.pulse ?? 0}
                      </span>
                    </td>

                    {/* AUTHOR */}
                    <td className="px-6 py-4 align-top text-slate-200" style={borderRight}>
                      {idea.author}
                    </td>

                    {/* DATE */}
                    <td className="px-6 py-4 align-top whitespace-nowrap text-slate-400 text-xs">
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
          )}

          {/* NO IDEAS */}
          {!loading && !error && ideas.length === 0 && (
            <div className="px-6 py-6 text-slate-300">Поки що немає ідей.</div>
          )}
        </div>
      </div>
    </main>
  );
}
