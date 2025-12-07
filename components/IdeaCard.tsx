// components/IdeaCard.tsx
"use client";

import React from "react";
import Link from "next/link";

export function IdeaCard({ idea }: any) {
  const p = idea.pulse ?? 0;

  // Опрацювання Pulse → Label
  const getBucket = (p: number) => {
    if (p >= 5) return "High conviction";
    if (p >= 3) return "Validated";
    if (p >= 1) return "Seed";
    return "New";
  };

  const label = getBucket(p);

  return (
    <div className="idea-card">
      <div className="idea-card-left">
        <h3 className="idea-card-title">{idea.title}</h3>
        <p className="idea-card-desc">{idea.description}</p>

        <div className="idea-card-footer">
          <span className="idea-card-date">
            {new Date(idea.created_at).toLocaleDateString()}
          </span>

          <Link
            href={`/idea/${idea.slug || idea.id}`}
            className="idea-card-view"
          >
            View →
          </Link>
        </div>
      </div>

      <div className="idea-card-right">
        <div className="idea-card-pulse">
          ⚡ {p} · {label}
        </div>
      </div>
    </div>
  );
}
