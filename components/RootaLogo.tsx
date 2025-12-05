// components/RootaLogo.tsx

import React from "react";

export interface RootaLogoProps {
  size?: number;
}

export const RootaLogo: React.FC<RootaLogoProps> = ({ size = 44 }) => (
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

    {/* STEM – slightly longer */}
    <rect
      x={29}
      y={28}           // довше вниз
      width={6}
      height={14}
      rx={3}
      fill="#16a34a"
    />

    {/* LEFT LEAF – wider spread */}
    <ellipse
      cx={24}
      cy={23}
      rx={4.6}
      ry={8.5}
      transform="rotate(-26 24 23)"
      fill="#6BFFA8"
    />

    {/* RIGHT LEAF – wider spread */}
    <ellipse
      cx={40}
      cy={23}
      rx={4.6}
      ry={8.5}
      transform="rotate(26 40 23)"
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

export default RootaLogo;
