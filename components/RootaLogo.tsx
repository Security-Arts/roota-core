// components/RootaLogo.tsx

type RootaLogoProps = {
  /** Розмір у пікселях (ширина = висота) */
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
      {/* Фон — темний сквід з легким градієнтом вгору */}
      <defs>
        <linearGradient id="ro_bg" x1="0" y1="40" x2="40" y2="0">
          <stop offset="0%" stopColor="#020617" />
          <stop offset="45%" stopColor="#020617" />
          <stop offset="100%" stopColor="#020617" />
        </linearGradient>

        {/* Світла пляма за ростком */}
        <radialGradient id="ro_glow" cx="50%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#22c55e" stopOpacity="0.18" />
          <stop offset="60%" stopColor="#22c55e" stopOpacity="0.0" />
          <stop offset="100%" stopColor="#22c55e" stopOpacity="0.0" />
        </radialGradient>
      </defs>

      {/* Основний сквід */}
      <rect
        x="2"
        y="2"
        width="36"
        height="36"
        rx="12"
        fill="url(#ro_bg)"
      />

      {/* Світіння */}
      <rect
        x="2"
        y="2"
        width="36"
        height="36"
        rx="12"
        fill="url(#ro_glow)"
      />

      {/* Сам росток — дві листочки + стебло */}
      <g transform="translate(20 21)">
        {/* Лівий листок */}
        <path
          d="M-1.5 -6.5C-5 -6.4 -7.8 -4 -8.6 -0.2C-8.7 0.3 -8.3 0.8 -7.8 0.9C-4.5 1.7 -1.8 0.2 -0.4 -2.5C0.3 -3.9 0.1 -5.4 -0.2 -6.0C-0.5 -6.4 -1.0 -6.5 -1.5 -6.5Z"
          fill="#4ade80"
        />
        {/* Правий листок */}
        <path
          d="M1.5 -6.5C5 -6.4 7.8 -4 8.6 -0.2C8.7 0.3 8.3 0.8 7.8 0.9C4.5 1.7 1.8 0.2 0.4 -2.5C-0.3 -3.9 -0.1 -5.4 0.2 -6.0C0.5 -6.4 1.0 -6.5 1.5 -6.5Z"
          fill="#22c55e"
        />
        {/* Стебло */}
        <path
          d="M-1.0 0.2C-1.0 2.5 -0.6 4.7 0 6.6C0.6 4.7 1.0 2.5 1.0 0.2C1.0 -0.5 0.6 -1 0 -1C-0.6 -1 -1.0 -0.5 -1.0 0.2Z"
          fill="#16a34a"
        />
      </g>
    </svg>
  );
}

export default RootaLogo;
