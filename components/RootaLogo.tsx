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
      {/* Background */}
      <rect x="8" y="8" width="48" height="48" rx="14" fill="#020617" />

      {/* Soft glow */}
      <rect
        x="8"
        y="8"
        width="48"
        height="48"
        rx="14"
        fill="url(#rootaGlow)"
        opacity="0.40"
      />

      {/* STEM – slightly longer but slim */}
      <rect
        x={30}
        y={28}
        width={4}
        height={16}
        rx={2}
        fill="#1FE870"
      />

      {/* LEFT LEAF – lifted higher, more spread */}
      <ellipse
        cx={27}
        cy={22}
        rx={4.8}
        ry={8.5}
        transform="rotate(-22 27 22)"
        fill="#6BFFA8"
      />

      {/* RIGHT LEAF – mirrored */}
      <ellipse
        cx={37}
        cy={22}
        rx={4.8}
        ry={8.5}
        transform="rotate(22 37 22)"
        fill="#5CFD9C"
      />

      <defs>
        <radialGradient id="rootaGlow" cx="50%" cy="15%" r="80%">
          <stop offset="0%" stopColor="#34d399" stopOpacity="0.85" />
          <stop offset="40%" stopColor="#22c55e" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
};

export default RootaLogo;
