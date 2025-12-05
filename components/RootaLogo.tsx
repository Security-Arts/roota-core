// components/RootaLogo.tsx
import React from "react";

type RootaLogoProps = {
  size?: number;
};

export function RootaLogo({ size = 32 }: RootaLogoProps) {
  const strokeWidth = 1.4;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      aria-hidden="true"
    >
      {/* Тло-кружок */}
      <defs>
        <radialGradient id="roota-bg" cx="30%" cy="20%" r="70%">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="45%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#020617" />
        </radialGradient>
      </defs>
      <circle
        cx="20"
        cy="20"
        r="18"
        fill="url(#roota-bg)"
        stroke="#1f2937"
        strokeWidth="1"
      />

      {/* Стебло */}
      <path
        d="M20 26 L20 14"
        stroke="#e5e7eb"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />

      {/* Листок лівий */}
      <path
        d="M20 18 C16 17 14 14.5 13.5 12.2 C13.3 11.2 13.9 10.3 15 10.2 C16.4 10.1 18.4 11 19.5 12.7 C20.3 13.9 20.4 15.4 20 18 Z"
        fill="rgba(226, 232, 240, 0.95)"
        stroke="#0f172a"
        strokeWidth={strokeWidth * 0.7}
      />

      {/* Листок правий */}
      <path
        d="M20 19 C23.4 18.4 25.6 16.2 26.5 14.2 C27.0 13.2 27.0 12.1 26.2 11.5 C25.3 10.7 23.3 10.7 21.8 11.5 C20.4 12.3 19.5 13.7 19.3 15.3 C19.1 16.6 19.2 17.8 20 19 Z"
        fill="rgba(248, 250, 252, 0.9)"
        stroke="#0f172a"
        strokeWidth={strokeWidth * 0.7}
      />
    </svg>
  );
}
