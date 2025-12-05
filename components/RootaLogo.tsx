// components/RootaLogo.tsx

import React from "react";

export interface RootaLogoProps {
  size?: number;
}

export const RootaLogo: React.FC<RootaLogoProps> = ({ size = 48 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      aria-hidden="true"
    >
      {/* Background */}
      <rect x="8" y="8" width="48" height="48" rx="14" fill="#020617" />
      <rect
        x="8"
        y="8"
        width="48"
        height="48"
        rx="14"
        fill="url(#rootaGlow)"
        opacity="0.35"
      />

      {/* Stem — short & wide */}
      <path
        d="
          M30 38
          C29.8 34, 30.4 30, 31.2 27
          H32.8
          C33.6 30, 34.2 34, 34 38
          Z
        "
        fill="#4ade80"
      />

      {/* Left leaf — elongated & narrow */}
      <path
        d="
          M32 27
          C28 25, 25.8 21, 27.2 17.5
            28.4 15, 31 14.2, 33 15.8
            34.2 17, 35 18.8, 35 20.6
          C33.5 23.2, 32.6 25.1, 32 27
        "
        fill="#6BFFA8"
      />

      {/* Right leaf — mirror */}
      <path
        d="
          M32 27
          C36 25, 38.2 21, 36.8 17.5
            35.6 15, 33 14.2, 31 15.8
            29.8 17, 29 18.8, 29 20.6
          C30.5 23.2, 31.4 25.1, 32 27
        "
        fill="#5CFF9C"
      />

      <defs>
        <radialGradient id="rootaGlow" cx="50%" cy="20%" r="80%">
          <stop offset="0%" stopColor="#3bffa3" stopOpacity="0.65" />
          <stop offset="40%" stopColor="#22c55e" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
};

export default RootaLogo;
