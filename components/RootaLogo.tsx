// components/RootaLogo.tsx

type RootaLogoProps = {
  size?: number;
};

export function RootaLogo({ size = 48 }: RootaLogoProps) {
  const px = `${size}px`;

  return (
    <svg
      width={px}
      height={px}
      viewBox="0 0 40 40"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        display: "block",
        borderRadius: 14,
        boxShadow:
          "0 10px 28px rgba(0,0,0,0.55), 0 0 0 1px rgba(15,23,42,0.5)",
      }}
    >
      <defs>
        {/* Background */}
        <linearGradient id="bg" x1="0" y1="40" x2="40" y2="0">
          <stop offset="0%" stopColor="#020617" />
          <stop offset="100%" stopColor="#0a1020" />
        </linearGradient>

        {/* Subtle green glow */}
        <radialGradient id="glow" cx="50%" cy="55%" r="60%">
          <stop offset="0%" stopColor="#34d399" stopOpacity="0.25" />
          <stop offset="80%" stopColor="#34d399" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect x="2" y="2" width="36" height="36" rx="12" fill="url(#bg)" />
      <rect x="2" y="2" width="36" height="36" rx="12" fill="url(#glow)" />

      {/* Seedling */}
      <g transform="translate(20 18)">
        {/* LEFT LEAF — narrower */}
        <path
          d="
            M -1.1 -3.2
            C -3.0 -3.4 -4.8 -1.4 -5.4 1.4
              -5.6 2.1 -5.3 2.8 -4.7 2.9
              -2.6 3.2 -1.2 1.7 -0.4 0
              0.1 -1.0 -0.1 -2.5 -0.6 -3.0
            Z
          "
          fill="#4ade80"
        />

        {/* RIGHT LEAF — narrower */}
        <path
          d="
            M 1.1 -3.2
            C 3.0 -3.4 4.8 -1.4 5.4 1.4
              5.6 2.1 5.3 2.8 4.7 2.9
              2.6 3.2 1.2 1.7 0.4 0
              -0.1 -1.0 0.1 -2.5 0.6 -3.0
            Z
          "
          fill="#22c55e"
        />

        {/* Stem */}
        <path
          d="
            M -0.8 1.2
            C -0.9 3.6 -0.4 6.0 0 8.0
              0.4 6.0 0.9 3.6 0.8 1.2
              0.8 0.5 0.5 0.1 0 0.1
             -0.5 0.1 -0.8 0.5 -0.8 1.2
            Z
          "
          fill="#16a34a"
        />
      </g>
    </svg>
  );
}

export default RootaLogo;
