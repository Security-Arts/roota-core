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
        {/* LEFT LEAF — tilted up */}
        <path
          d="M -1.3 -3.2 
             C -4.2 -3.4 -6.8 -1.3 -7.5 2.0 
               -7.6 2.6 -7.2 3.2 -6.6 3.3
               -3.6 3.8 -1.4 1.9 -0.4 0
               0.1 -1.1 -0.1 -2.6 -0.6 -3.0
             Z"
          fill="#4ade80"
        />

        {/* RIGHT LEAF — tilted up */}
        <path
          d="M 1.3 -3.2 
             C 4.2 -3.4 6.8 -1.3 7.5 2.0 
               7.6 2.6 7.2 3.2 6.6 3.3
               3.6 3.8 1.4 1.9 0.4 0
               -0.1 -1.1 0.1 -2.6 0.6 -3.0
             Z"
          fill="#22c55e"
        />

        {/* Stem */}
        <path
          d="M -0.9 1.2
             C -1.0 3.8 -0.5 6.3 0 8.4
               0.5 6.3 1.0 3.8 0.9 1.2
               0.9 0.5 0.5 0.1 0 0.1
              -0.5 0.1 -0.9 0.5 -0.9 1.2
             Z"
          fill="#16a34a"
        />
      </g>
    </svg>
  );
}

export default RootaLogo;
