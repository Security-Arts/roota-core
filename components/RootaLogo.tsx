// components/RootaLogo.tsx

import React from "react";

// Простий SVG-логотип Roota з двома листками вгору
export interface RootaLogoProps {
  size?: number;
}

export const RootaLogo: React.FC<RootaLogoProps> = ({ size = 48 }) => {
  const viewBoxSize = 64;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
      aria-hidden="true"
    >
      {/* Темний квадрат із заокругленням */}
      <rect x="8" y="8" width="48" height="48" rx="14" fill="#020617" />

      {/* Легке зовнішнє світіння */}
      <rect
        x="8"
        y="8"
        width="48"
        height="48"
        rx="14"
        fill="url(#rootaGlow)"
        opacity="0.4"
      />

      {/* Стебло */}
      <path
        d="M32 40 C31.5 36 31.3 32 31.3 28 C31.3 26.8 32.7 26.8 32.7 28 C32.7 32 32.5 36 32 40 Z"
        fill="#4ade80"
      />

      {/* Лівий листок */}
      <path
        d="M30 28 C22 26, 20 20, 22 16 C26 16, 30 18, 32 22 C31 24, 30.5 26, 30 28 Z"
        fill="#4ade80"
      />

      {/* Правий листок */}
      <path
        d="M34 28 C42 26, 44 20, 42 16 C38 16, 34 18, 32 22 C33 24, 33.5 26, 34 28 Z"
        fill="#22c55e"
      />

      <defs>
        <radialGradient id="rootaGlow" cx="50%" cy="20%" r="80%">
          <stop offset="0%" stopColor="#4ade80" stopOpacity="0.9" />
          <stop offset="40%" stopColor="#22c55e" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
};

export default RootaLogo;
