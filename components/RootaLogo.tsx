// components/RootaLogo.tsx

import React from "react";

// Простий SVG-логотип Roota з двома листками вгору
export interface RootaLogoProps {
  size?: number;
}

export const RootaLogo: React.FC<RootaLogoProps> = ({ size = 44 }) => {
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
        d="
          M32 40
          C31.6 36, 31.4 32, 31.4 28.5
           31.4 27.5, 31.8 27, 32 27
           32.2 27, 32.6 27.5, 32.6 28.5
           32.6 32, 32.4 36, 32 40
          Z
        "
        fill="#4ade80"
      />

      {/* Лівий листок — вужчий і вище */}
      <path
        d="
          M30 27.5
          C27.2 26.5, 25.6 23.7, 26.1 20.6
           26.6 18.4, 28.4 17.3, 30.2 17.3
           31.6 17.3, 32.9 18.0, 33.8 19.4
           33.1 21.6, 31.8 24.3, 30 27.5
          Z
        "
        fill="#4ade80"
      />

      {/* Правий листок — дзеркальний, вужчий і вище */}
      <path
        d="
          M34 27.5
          C36.8 26.5, 38.4 23.7, 37.9 20.6
           37.4 18.4, 35.6 17.3, 33.8 17.3
           32.4 17.3, 31.1 18.0, 30.2 19.4
           30.9 21.6, 32.2 24.3, 34 27.5
          Z
        "
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
