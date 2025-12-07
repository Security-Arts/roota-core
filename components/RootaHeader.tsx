// components/RootaHeader.tsx
import React from "react";
import { RootaLogo } from "./RootaLogo";

const headerStyles: { [key: string]: React.CSSProperties } = {
  shell: {
    marginBottom: 28,
  },
  inner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    padding: "10px 18px",
    borderRadius: 999,
    border: "1px solid rgba(30,64,175,0.7)",
    background:
      "radial-gradient(circle at top left, rgba(15,23,42,0.95), transparent 70%) #020617",
    boxShadow: "0 18px 40px rgba(0,0,0,0.7)",
  },
  brandRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    minWidth: 0,
  },
  logoBox: {
    width: 40,
    height: 40,
    borderRadius: 16,
    background:
      "radial-gradient(circle at 30% 20%, rgba(15,23,42,1), transparent 70%)",
    border: "1px solid rgba(15,23,42,1)",
    boxShadow: "0 14px 30px rgba(0,0,0,0.65)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  brandText: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  brandTitle: {
    fontSize: 14,
    letterSpacing: "0.22em",
    textTransform: "uppercase" as const,
    color: "#e5e7eb",
  },
  brandSubtitle: {
    fontSize: 12,
    color: "#9ca3af",
    whiteSpace: "nowrap" as const,
  },
  tabs: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  tab: {
    borderRadius: 999,
    border: "1px solid transparent",
    padding: "7px 18px",
    fontSize: 13,
    background: "transparent",
    color: "#9ca3af",
    cursor: "pointer",
  },
  tabActive: {
    background:
      "radial-gradient(circle at 20% 0, rgba(37,99,235,1), rgba(15,23,42,1))",
    borderColor: "rgba(59,130,246,0.9)",
    color: "#f9fafb",
  },
};

export function RootaHeader() {
  return (
    <header style={headerStyles.shell}>
      <div style={headerStyles.inner}>
        {/* Бренд зліва */}
        <div style={headerStyles.brandRow}>
          <div style={headerStyles.logoBox}>
            <RootaLogo size={26} />
          </div>
          <div style={headerStyles.brandText}>
            <div style={headerStyles.brandTitle}>ROOTA</div>
            <div style={headerStyles.brandSubtitle}>
              Ideas Stock Exchange · Proof &amp; Pulse
            </div>
          </div>
        </div>

        {/* Таби справа */}
        <nav style={headerStyles.tabs}>
          <button
            type="button"
            style={{ ...headerStyles.tab, ...headerStyles.tabActive }}
          >
            Hive
          </button>
          <button type="button" style={headerStyles.tab}>
            Overview
          </button>
          <button type="button" style={headerStyles.tab}>
            About
          </button>
        </nav>
      </div>
    </header>
  );
}

export default RootaHeader;
