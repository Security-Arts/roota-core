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

      {/* Glow */}
      <rect
        x="8"
        y="8"
        width="48"
        height="48"
        rx="14"
        fill="url(#glow)"
        opacity="0.42"
      />

      {/* STEM — long & thin */}
      <path
        d="
          M30.8 44
          C30.5 38, 30.6 32, 31.1 27.5
           31.3 26.4, 32.7 26.4, 32.9 27.5
           33.4 32, 33.5 38, 33.2 44
          Z
        "
        fill="#1FE870"
      />

      {/* LEFT LEAF — real leaf shape, wide-open */}
      <path
        d="
          M31 27
          C27 25, 24.2 22, 23.4 18.5
            22.8 15.5, 25.4 13.2, 29 14
            31.8 14.6, 33.4 17, 33 19.8
            32.4 23, 30.6 25.3, 31 27
        "
        fill="#6BFFA8"
        transform="rotate(-28 31 21)"
      />

      {/* RIGHT LEAF — mirrored real leaf shape */}
      <path
        d="
          M33 27
          C37 25, 39.8 22, 40.6 18.5
            41.2 15.5, 38.6 13.2, 35 14
            32.2 14.6, 30.6 17, 31 19.8
            31.6 23, 33.4 25.3, 33 27
        "
        fill="#5CFD9C"
        transform="rotate(28 33 21)"
      />

      <defs>
        <radialGradient id="glow" cx="50%" cy="12%" r="80%">
          <stop offset="0%" stopColor="#34d399" stopOpacity="0.85" />
          <stop offset="35%" stopColor="#22c55e" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
};

export default RootaLogo;
