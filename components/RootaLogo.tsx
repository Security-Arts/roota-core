// components/RootaLogo.tsx
import React from "react";

export function RootaLogo({ size = 44 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      aria-hidden="true"
    >
      {/* BACKGROUND — dark rounded square */}
      <rect
        x="8"
        y="8"
        width="48"
        height="48"
        rx="14"
        fill="#07101e"
      />

      {/* TOP GREEN GLOW */}
      <rect
        x="8"
        y="8"
        width="48"
        height="48"
        rx="14"
        fill="url(#rootaGlow)"
        opacity="0.42"
      />

      {/* STEM — thicker, but still elegant */}
      <path
        d="
          M30.5 42
          C30.2 37, 30.4 32, 31 28.3
            31.3 26.8, 32.7 26.8, 33.0 28.3
            33.6 32, 33.8 37, 33.5 42
          Z
        "
        fill="#29e67a"
      />

      {/* LEFT LEAF — elongated, pointed, spreading left */}
      <path
        d="
          M32 28
          C27 25, 24.2 21.5, 23.7 18
            23.3 15.5, 25.0 13.8, 27.3 13.6
            29.6 13.3, 31.3 14.8, 32.1 16.8
            32.8 18.8, 33.0 22.0, 32 28
        "
        fill="#6BFFA8"
      />

      {/* RIGHT LEAF — mirrored, spreading right */}
      <path
        d="
          M32 28
          C37 25, 39.8 21.5, 40.3 18
            40.7 15.5, 39.0 13.8, 36.7 13.6
            34.4 13.3, 32.7 14.8, 31.9 16.8
            31.2 18.8, 31.0 22.0, 32 28
        "
        fill="#5CFF9C"
      />

      <defs>
        <radialGradient id="rootaGlow" cx="50%" cy="20%" r="70%">
          <stop offset="0%" stopColor="#3cf584" stopOpacity="0.7" />
          <stop offset="40%" stopColor="#2ad96e" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#1d5f3a" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}
