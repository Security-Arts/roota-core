// components/RootaLogo.tsx
import React from "react";

export function RootaLogo({ size = 48 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      {/* стебло — трохи ширше і масивніше */}
      <path
        d="
          M11.2 19.8
          C10.9 17.4 11 15 11.2 13.0
           11.3 12.2 11.9 11.7 12.6 11.7
           13.3 11.7 13.9 12.2 14.0 13.0
           14.2 15.0 14.3 17.4 14.0 19.8
           13.9 20.4 13.4 20.8 12.8 20.8
           12.2 20.8 11.6 20.4 11.2 19.8
          Z
        "
        fill="#22c55e"
      />

      {/* ліва листочка — вузька й видовжена вгору */}
      <ellipse
        cx={9}
        cy={8}
        rx={3}
        ry={5}
        transform="rotate(-18 9 8)"
        fill="#4ade80"
      />

      {/* права листочка — дзеркальна */}
      <ellipse
        cx={15}
        cy={8}
        rx={3}
        ry={5}
        transform="rotate(18 15 8)"
        fill="#86efac"
      />

      {/* легке затемнення / тінь під рослиною */}
      <ellipse
        cx="12"
        cy="21"
        rx="3.4"
        ry="0.9"
        fill="rgba(15,23,42,0.6)"
      />
    </svg>
  );
}
