// components/HiveTable.tsx
"use client";

import React from "react";
import Link from "next/link";

export function HiveTable({ ideas, onPulse }: any) {
  return (
    <div className="hive-table">
      {ideas.map((idea: any) => {
        const p = idea.pulse ?? 0;

        return (
          <div key={idea.id} className="hive-row">
            <div className="hive-main">
              <div className="hive-title">{idea.title}</div>
              <div className="hive-desc">{idea.description}</div>

              <div className="hive-footer">
                <span>{new Date(idea.created_at).toLocaleDateString()}</span>
                <Link href={`/idea/${idea.slug || idea.id}`}>→</Link>
              </div>
            </div>

            <div className="hive-right">
              <div className="hive-pulse">
                ⚡ {p}
              </div>

              <div className="hive-controls">
                <button onClick={() => onPulse(idea, -1)}>–</button>
                <button onClick={() => onPulse(idea, 1)}>+</button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
