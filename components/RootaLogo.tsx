// components/RootaLogo.tsx

import React from "react";

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

      {/* ШИРШЕ СТЕБЛО */}
      <path
        d="
          M31 40
          C30.5 34, 30.5 28, 30.8 24
           30.9 22.5, 33.1 22.5, 33.2 24
           33.5 28, 33.5 34, 33 40
          Z
        "
        fill="#4ade80"
      />

      {/* ЛІВИЙ ЛИСТОК — видовжений */}
      <path
        d="
          M30 26
          C24 24, 21.5 19, 23.2 15.5
           25 12, 29 13, 32 17
           31 20, 30.5 23.2, 30 26
          Z
        "
        fill="#4ade80"
      />

      {/* ПРАВИЙ ЛИСТОК — видовжений */}
      <path
        d="
          M34 26
          C40 24, 42.5 19, 40.8 15.5
           39 12, 35 13, 32 17
           33 20, 33.5 23.2, 34 26
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
