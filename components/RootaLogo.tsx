// components/RootaLogo.tsx
import React from "react";

export function RootaLogo({ size = 40 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      role="img"
      aria-label="Roota logo"
    >
      <defs>
        {/* фон квадрата */}
        <linearGradient id="roota-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#020617" />
          <stop offset="1" stopColor="#020617" />
        </linearGradient>

        {/* легке світіння навколо листка */}
        <radialGradient
          id="roota-glow"
          cx="0.25"
          cy="0.1"
          r="1"
        >
          <stop offset="0" stopColor="#22c55e" stopOpacity="0.35" />
          <stop offset="1" stopColor="#22c55e" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* квадратна основа */}
      <rect
        x="1.2"
        y="1.2"
        width="37.6"
        height="37.6"
        rx="12"
        fill="url(#roota-bg)"
        stroke="#0b1120"
        strokeWidth="1.2"
      />

      {/* підсвітка зверху зліва */}
      <rect
        x="1.2"
        y="1.2"
        width="37.6"
        height="24"
        rx="12"
        fill="url(#roota-glow)"
        style={{ mixBlendMode: "screen" as any }}
      />

      {/* стебло */}
      <path
        d="M20 25.4c-.43 0-.78-.32-.82-.75l-.7-7.4c-.05-.55.37-1 .93-1h1.2c.56 0 .98.45.93 1l-.7 7.4c-.04.43-.39.75-.82.75z"
        fill="#22c55e"
      />

      {/* ліва листочка */}
      <path
        d="M19 15.4c-3.1.1-5.3-.6-6.9-2.2-1.6-1.6-2.2-3.5-2.3-4.9-.02-.27.18-.5.45-.52 1.35-.11 3.06-.05 4.7.64 1.92.83 3.33 2.42 3.9 4.43.08.28-.12.56-.4.57L19 15.4z"
        fill="#4ade80"
      />

      {/* права листочка */}
      <path
        d="M21 15.4c3.1.1 5.3-.6 6.9-2.2 1.6-1.6 2.2-3.5 2.3-4.9.02-.27-.18-.5-.45-.52-1.35-.11-3.06-.05-4.7.64-1.92.83-3.33 2.42-3.9 4.43-.08.28.12.56.4.57L21 15.4z"
        fill="#86efac"
      />
    </svg>
  );
}
