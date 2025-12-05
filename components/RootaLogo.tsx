// components/RootaLogo.tsx

type RootaLogoProps = {
  size?: number;
};

export function RootaLogo({ size = 44 }: RootaLogoProps) {
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
          "0 18px 40px rgba(15,23,42,0.85), 0 0 0 1px rgba(15,23,42,0.9)",
      }}
    >
      <defs>
        {/* Темний фон */}
        <linearGradient id="ro_bg" x1="0" y1="40" x2="40" y2="0">
          <stop offset="0%" stopColor="#020617" />
          <stop offset="100%" stopColor="#020617" />
        </linearGradient>

        {/* Світіння під листками */}
        <radialGradient id="ro_glow" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#22c55e" stopOpacity="0.2" />
          <stop offset="70%" stopColor="#22c55e" stopOpacity="0.0" />
        </radialGradient>
      </defs>

      {/* Темний квадрат */}
      <rect x="2" y="2" width="36" height="36" rx="12" fill="url(#ro_bg)" />

      {/* Glow */}
      <rect x="2" y="2" width="36" height="36" rx="12" fill="url(#ro_glow)" />

      {/* Паросток */}
      <g transform="translate(20 17)">
        {/* Лівий листок (вгору-вліво) */}
        <path
          d="M-1.2 -3C-4.8 -3.1 -7.2 -1 -7.9 2.2C-8 2.7 -7.6 3.2 -7.1 3.3C-4.1 4.0 -1.7 2.2 -0.6 0C0.1 -1.3 -0.1 -2.5 -0.4 -2.9C-0.7 -3.1 -1.0 -3 -1.2 -3Z"
          fill="#4ade80"
        />

        {/* Правий листок (вгору-вправо) */}
        <path
          d="M1.2 -3C4.8 -3.1 7.2 -1 7.9 2.2C8 2.7 7.6 3.2 7.1 3.3C4.1 4.0 1.7 2.2 0.6 0C-0.1 -1.3 0.1 -2.5 0.4 -2.9C0.7 -3.1 1.0 -3 1.2 -3Z"
          fill="#22c55e"
        />

        {/* Стебло вниз */}
        <path
          d="M-1 2C-1 4.4 -0.6 6.7 0 8.6C0.6 6.7 1 4.4 1 2C1 1.3 0.6 1 0 1C-0.6 1 -1 1.3 -1 2Z"
          fill="#16a34a"
        />
      </g>
    </svg>
  );
}

export default RootaLogo;
