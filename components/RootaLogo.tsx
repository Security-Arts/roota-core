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

      {/* STEM – longer but NOT thicker */}
      <rect
        x={30}
        y={26}           // підняли дуже трохи догори
        width={4}
        height={20}       // (було 14 → тепер довше)
        rx={2}
        fill="#1FE870"
      />

      {/* LEFT LEAF – much wider spread */}
      <ellipse
        cx={23.5}          // сильніший відступ уліво
        cy={21}
        rx={5.6}           // ширше
        ry={9}             // довше
        transform="rotate(-30 23.5 21)"   // більший кут відхилення
        fill="#6BFFA8"
      />

      {/* RIGHT LEAF – mirrored */}
      <ellipse
        cx={40.5}          // сильніший відступ вправо
        cy={21}
        rx={5.6}
        ry={9}
        transform="rotate(30 40.5 21)"
        fill="#5CFD9C"
      />

      <defs>
        <radialGradient id="glow" cx="50%" cy="10%" r="80%">
          <stop offset="0%" stopColor="#34d399" stopOpacity="0.85" />
          <stop offset="40%" stopColor="#22c55e" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
};

export default RootaLogo;
