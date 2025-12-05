// components/RootaLogo.tsx

import React from "react";

export interface RootaLogoProps {
  size?: number;
}

export const RootaLogo: React.FC<RootaLogoProps> = ({ size = 44 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      aria-hidden="true"
    >
      {/* Dark rounded square */}
      <rect x="8" y="8" width="48" height="48" rx="14" fill="#020617" />

      {/* Soft top glow */}
      <rect
        x="8"
        y="8"
        width="48"
        height="48"
        rx="14"
        fill="url(#rootaGlow)"
        opacity="0.45"
      />

      {/* STEM – short & wide */}
      <rect
        x={29}
        y={30}
        width={6}
        height={11}
        rx={3}
        fill="#16a34a"
      />

      {/* LEFT LEAF – narrow & elongated, pointing up */}
      <ellipse
        cx={26}
        cy={24}
        rx={4.1}
        ry={8}
        transform="rotate(-18 26 24)"
        fill="#6BFFA8"
      />

      {/* RIGHT LEAF – mirrored */}
      <ellipse
        cx={38}
        cy={24}
        rx={4.1}
        ry={8}
        transform="rotate(18 38 24)"
        fill="#5CFF9C"
      />

      <defs>
        <radialGradient id="rootaGlow" cx="50%" cy="15%" r="80%">
          <stop offset="0%" stopColor="#34d399" stopOpacity="0.85" />
          <stop offset="40%" stopColor="#22c55e" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
};

export default RootaLogo;
