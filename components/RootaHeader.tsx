"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RootaLogo } from "./RootaLogo";

const headerStyles: { [key: string]: React.CSSProperties } = {
  shell: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 40,
    display: "flex",
    justifyContent: "center",
    padding: "8px 10px",
    pointerEvents: "none", // фон не блокує скрол
  },
  inner: {
    maxWidth: 1120,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    padding: "10px 16px",
    borderRadius: 999,
    border: "1px solid rgba(30,64,175,0.7)",
    background:
      "radial-gradient(circle at top left, rgba(15,23,42,0.95), transparent 70%) #020617",
    boxShadow: "0 18px 40px rgba(0,0,0,0.7)",
    pointerEvents: "auto",
    flexWrap: "wrap", // щоб на мобілці таби могли стати нижнім рядом
  },
  brandRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    minWidth: 0,
    flexShrink: 1,
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
    flexShrink: 0,
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
    gap: 6,
    flexShrink: 0,
    flexWrap: "wrap",
    marginLeft: "auto",
  },
  tab: {
    borderRadius: 999,
    border: "1px solid transparent",
    padding: "6px 14px",
    fontSize: 12.5,
    background: "transparent",
    color: "#9ca3af",
    cursor: "pointer",
    textDecoration: "none",
    whiteSpace: "nowrap",
  } as React.CSSProperties,
  tabActive: {
    background:
      "radial-gradient(circle at 20% 0, rgba(37,99,235,1), rgba(15,23,42,1))",
    borderColor: "rgba(59,130,246,0.9)",
    color: "#f9fafb",
  },
};

export function RootaHeader() {
  const pathname = usePathname();

  const isHive = pathname === "/hive";
  const isOverview =
    pathname === "/overview" || pathname === "/landing"; // на випадок старого /landing
  const isAbout = pathname === "/about";

  return (
    <header style={headerStyles.shell}>
      <div style={headerStyles.inner}>
        {/* Бренд (лого + текст) → на головну */}
        <Link
          href="/"
          style={{ textDecoration: "none", color: "inherit", flexShrink: 0 }}
        >
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
        </Link>

        {/* Таби справа */}
        <nav style={headerStyles.tabs}>
          <Link
            href="/hive"
            style={{
              ...headerStyles.tab,
              ...(isHive ? headerStyles.tabActive : null),
            }}
          >
            Hive
          </Link>

          <Link
            href="/overview"
            style={{
              ...headerStyles.tab,
              ...(isOverview ? headerStyles.tabActive : null),
            }}
          >
            Overview
          </Link>

          <Link
            href="/about"
            style={{
              ...headerStyles.tab,
              ...(isAbout ? headerStyles.tabActive : null),
            }}
          >
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default RootaHeader;
