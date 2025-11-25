// /lib/pulse.ts
import { CSSProperties } from "react";
import { Translations } from "./translations";

export function getPulseBadgeStyle(pulse?: number | null): CSSProperties {
  const value = pulse ?? 0;

  if (value >= 5) {
    return {
      background:
        "radial-gradient(circle at top left, rgba(74,222,128,0.3), transparent 60%) #064e3b",
      border: "1px solid rgba(34,197,94,0.7)",
      color: "#bbf7d0",
    };
  }

  if (value >= 3) {
    return {
      background:
        "radial-gradient(circle at top left, rgba(96,165,250,0.3), transparent 60%) #0f172a",
      border: "1px solid rgba(59,130,246,0.7)",
      color: "#bfdbfe",
    };
  }

  if (value >= 1) {
    return {
      background:
        "radial-gradient(circle at top left, rgba(251,191,36,0.25), transparent 60%) #111827",
      border: "1px solid rgba(245,158,11,0.7)",
      color: "#fef3c7",
    };
  }

  return {
    background: "rgba(15,23,42,0.9)",
    border: "1px solid #1f2937",
    color: "#9ca3af",
  };
}

export function getPulseLevel(pulse: number | null | undefined, t: Translations) {
  const value = pulse ?? 0;
  if (value >= 5) return "High pulse";
  if (value >= 3) return "Medium pulse";
  if (value >= 1) return "Low pulse";
  return "Dormant";
}
