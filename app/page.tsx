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

type SortField = "pulse" | "date" | null;
type SortDirection = "asc" | "desc";

export default function HomePage() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [sortField, setSortField] = useState<SortField>("date");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const [selectedIdea, setSelectedIdea] = useState<Idea | null>(null);

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

  // дуже помітні вертикальні межі між колонками
  const colBorderRight = {
    borderRight: "2px solid #64748b", // slate-500
  } as const;

  const handleSort = (field: SortField) => {
    if (!field) return;
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection(field === "date" ? "desc" : "desc");
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
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* HEADER */}
        <header className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Roota</h1>
            <p className="text-slate-300 mt-2">
              Ideas Stock Exchange · живий реєстр ідей з доказом та пульсом
              інтересу
            </p>
          </div>

          <div className="flex flex-col gap-1 text-xs text-slate-400 mt-2 sm:items-end">
            <p>Backend: Supabase</p>
            <p>Endpoint: /api/ideas</p>
            <p>Mode: MVP · read-only list</p>
          </div>
        </header>

        {/* TITLE BAR */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-100">
            Живий потік ідей
          </h2>
          <span className="text-sm text-slate-400">{totalLabel}</span>
        </div>

        {/* WRAPPER */}
        <div className="overflow-x-auto rounded-2xl border border-slate-700 bg-slate-900/70 backdrop-blur">
          {/* LOADING */}
          {loading && (
            <div className="px-8 py-6 text-slate-300 text-sm border-b border-slate-700">
              Завантажую ідеї…
            </div>
          )}

          {/* ERROR */}
          {error && (
            <div className="px-8 py-6 text-red-200 text-sm bg-red-500/10 border-b border-red-400/40">
              Помилка: {error}
            </div>
          )}

          {/* TABLE */}
          {!loading && !error && sortedIdeas.length > 0 && (
            <div className="relative max-h-[520px] overflow-y-auto">
              <table className="min-w-full text-sm border-collapse table-fixed">
                <colgroup>
                  <col className="w-[18%]" />
                  <col className="w-[42%]" />
                  <col className="w-[10%]" />
                  <col className="w-[10%]" />
                  <col className="w-[10%]" />
                  <col className="w-[10%]" />
                </colgroup>

                <thead className="sticky top-0 z-20 bg-slate-900/95">
                  <tr className="border-b border-slate-700">
                    <th
                      className="px-8 py-3 font-semibold text-slate-200 text-left"
                      style={colBorderRight}
                    >
                      Ідея
                    </th>
                    <th
                      className="px-8 py-3 font-semibold text-slate-200 text-left"
                      style={colBorderRight}
                    >
                      Опис
                    </th>
                    <th
                      className="px-8 py-3 font-semibold text-slate-200 text-left"
                      style={colBorderRight}
                    >
                      Proof
                    </th>
                    <th
                      className="px-8 py-3 font-semibold text-slate-200 text-left cursor-pointer select-none"
                      style={colBorderRight}
                      onClick={() => handleSort("pulse")}
                    >
                      <span className="inline-flex items-center gap-1">
                        Pulse
                        <span className="text-[11px] text-slate-400">
                          {sortIcon("pulse")}
                        </span>
                      </span>
                    </th>
                    <th
                      className="px-8 py-3 font-semibold text-slate-200 text-left"
                      style={colBorderRight}
                    >
                      Автор
                    </th>
                    <th
                      className="px-8 py-3 font-semibold text-slate-200 text-left cursor-pointer select-none"
                      onClick={() => handleSort("date")}
                    >
                      <span className="inline-flex items-center gap-1">
                        Дата
                        <span className="text-[11px] text-slate-400">
                          {sortIcon("date")}
                        </span>
                      </span>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {sortedIdeas.map((idea) => (
                    <tr
                      key={idea.id}
                      className="border-b border-slate-700 hover:bg-slate-800/80 transition-colors cursor-pointer"
                      onClick={() => setSelectedIdea(idea)}
                    >
                      {/* TITLE */}
                      <td
                        className="px-8 py-4 align-top font-semibold text-slate-50"
                        style={colBorderRight}
                      >
                        {idea.title}
                      </td>

                      {/* DESCRIPTION */}
                      <td
                        className="px-8 py-4 align-top text-slate-300 leading-relaxed whitespace-normal break-words"
                        style={colBorderRight}
                      >
                        {idea.description}
                      </td>

                      {/* PROOF */}
                      <td
                        className="px-8 py-4 align-top"
                        style={colBorderRight}
                      >
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
                      <td
                        className="px-8 py-4 align-top"
                        style={colBorderRight}
                      >
                        <span className="inline-flex items-center gap-1 rounded-full bg-indigo-500/15 px-3 py-0.5 text-xs font-semibold text-indigo-100">
                          ⚡ {idea.pulse ?? 0}
                        </span>
                      </td>

                      {/* AUTHOR */}
                      <td
                        className="px-8 py-4 align-top text-slate-200"
                        style={colBorderRight}
                      >
                        {idea.author || "anonymous"}
                      </td>

                      {/* DATE */}
                      <td className="px-8 py-4 align-top whitespace-nowrap text-slate-400 text-xs">
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

          {/* NO IDEAS */}
          {!loading && !error && sortedIdeas.length === 0 && (
            <div className="px-8 py-6 text-slate-300">
              Поки що немає ідей.
            </div>
          )}
        </div>
      </div>

      {/* MODAL VIEW DETAILS */}
      {selectedIdea && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setSelectedIdea(null)}
        >
          <div
            className="w-full max-w-xl rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl px-6 py-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-50">
                  {selectedIdea.title}
                </h3>
                <p className="mt-1 text-xs text-slate-400">
                  Створено:{" "}
                  {new Date(selectedIdea.created_at).toLocaleDateString(
                    "uk-UA",
                    { year: "numeric", month: "short", day: "numeric" }
                  )}
                </p>
              </div>
              <button
                onClick={() => setSelectedIdea(null)}
                className="text-slate-400 hover:text-slate-100 text-sm"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs">
              <span className="inline-flex items-center gap-1 rounded-full bg-indigo-500/15 px-3 py-0.5 font-semibold text-indigo-100">
                ⚡ {selectedIdea.pulse ?? 0}{" "}
                <span className="opacity-70">pulse</span>
              </span>

              {selectedIdea.proof_hash ? (
                <span className="inline-flex items-center rounded-full border border-emerald-400 bg-emerald-500/15 px-3 py-0.5 text-emerald-100">
                  Proof linked
                </span>
              ) : (
                <span className="inline-flex items-center rounded-full border border-slate-500 bg-slate-800 px-3 py-0.5 text-slate-200">
                  No proof yet
                </span>
              )}

              <span className="text-slate-300">
                Автор:{" "}
                <span className="text-slate-100">
                  {selectedIdea.author || "anonymous"}
                </span>
              </span>
            </div>

            <div className="mt-5">
              <p className="text-sm text-slate-100 leading-relaxed whitespace-pre-wrap">
                {selectedIdea.description}
              </p>
            </div>

            {selectedIdea.proof_hash && (
              <div className="mt-4">
                <p className="text-xs text-slate-400 mb-1">Proof / hash:</p>
                <code className="block text-xs text-slate-200 bg-slate-800/80 rounded-md px-3 py-2 break-all">
                  {selectedIdea.proof_hash}
                </code>
              </div>
            )}

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedIdea(null)}
                className="px-4 py-2 text-sm rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-100"
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
