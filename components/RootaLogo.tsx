// components/RootaLogo.tsx
import React from "react";

export function RootaLogo({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >// components/RootaLogo.tsx
import React from "react";

export function RootaLogo({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      {/* --- BACKGROUND (rounded square) --- */}
      <rect
        x="1"
        y="1"
        width="22"
        height="22"
        rx="6"
        fill="#07101a"
      />

      {/* --- TOP GREEN GLOW --- */}
      <rect
        x="1"
        y="1"
        width="22"
        height="22"
        rx="6"
        fill="url(#greenGlow)"
        opacity="0.45"
      />

      {/* --- STEM (твій) --- */}
      <path
        d="M12 20c-.35 0-.65-.28-.68-.63L11 13.5c-.03-.41.28-.77.69-.77h.62c.41 0 .72.36.69.77L12.68 19.37c-.03.35-.33.63-.68.63z"
        fill="#22c55e"
      />

      {/* --- LEFT LEAF (твій) --- */}
      <path
        d="M11 11.2c-2.4.08-4.1-.4-5.3-1.6C4.5 8.4 4.1 7.1 4 6.1c-.01-.2.14-.37.34-.39 1.0-.09 2.33-.05 3.55.47 1.5.62 2.6 1.83 3.08 3.4.06.2-.08.41-.3.42L11 11.2z"
        fill="#4ade80"
      />

      {/* --- RIGHT LEAF (твій) --- */}
      <path
        d="M13 11.2c2.4.08 4.1-.4 5.3-1.6 1.2-1.2 1.6-2.5 1.7-3.5.01-.2-.14-.37-.34-.39-1.0-.09-2.33-.05-3.55.47-1.5.62-2.6 1.83-3.08 3.4-.06.2.08.41.3.42L13 11.2z"
        fill="#86efac"
      />

      {/* --- SHADOW under plant --- */}
      <ellipse
        cx="12"
        cy="21"
        rx="3.2"
        ry="0.8"
        fill="rgba(0,0,0,0.35)"
      />

      {/* --- DEFINITIONS: glow gradient --- */}
      <defs>
        <radialGradient id="greenGlow" cx="50%" cy="5%" r="80%">
          <stop offset="0%" stopColor="#3bf76f" stopOpacity="0.8" />
          <stop offset="60%" stopColor="#2ad063" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#1b5a36" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}

      {/* стебло */}
      <path
        d="M12 20c-.35 0-.65-.28-.68-.63L11 13.5c-.03-.41.28-.77.69-.77h.62c.41 0 .72.36.69.77L12.68 19.37c-.03.35-.33.63-.68.63z"
        fill="#22c55e"
      />
      {/* ліва листочка */}
      <path
        d="M11 11.2c-2.4.08-4.1-.4-5.3-1.6C4.5 8.4 4.1 7.1 4 6.1c-.01-.2.14-.37.34-.39 1.0-.09 2.33-.05 3.55.47 1.5.62 2.6 1.83 3.08 3.4.06.2-.08.41-.3.42L11 11.2z"
        fill="#4ade80"
      />
      {/* права листочка */}
      <path
        d="M13 11.2c2.4.08 4.1-.4 5.3-1.6 1.2-1.2 1.6-2.5 1.7-3.5.01-.2-.14-.37-.34-.39-1.0-.09-2.33-.05-3.55.47-1.5.62-2.6 1.83-3.08 3.4-.06.2.08.41.3.42L13 11.2z"
        fill="#86efac"
      />
      {/* легке світіння під рослиною */}
      <ellipse
        cx="12"
        cy="21"
        rx="3.2"
        ry="0.8"
        fill="rgba(15,23,42,0.6)"
      />
    </svg>
  );
}
