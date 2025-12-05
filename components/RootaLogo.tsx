// Простий SVG-логотип Roota з двома листками вгору
const RootaLogo: React.FC<{ size?: number }> = ({ size = 44 }) => {
  const viewBoxSize = 64;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
      aria-hidden="true"
    >
      {/* Темний квадрат із заокругленням */}
      <rect x="8" y="8" width="48" height="48" rx="14" fill="#020617" />

      {/* Легке зовнішнє світіння */}
      <rect
        x="8"
        y="8"
        width="48"
        height="48"
        rx="14"
        fill="url(#rootaGlow)"
        opacity="0.4"
      />

      {/* Стебло */}
      <path
        d="
          M32 40
          C31.6 36, 31.4 32, 31.4 28.5
           31.4 27.5, 31.8 27, 32 27
           32.2 27, 32.6 27.5, 32.6 28.5
           32.6 32, 32.4 36, 32 40
          Z
        "
        fill="#4ade80"
      />

      {/* Лівий листок — вужчий і вище */}
      <path
        d="
          M30 27.5
          C27.2 26.5, 25.6 23.7, 26.1 20.6
