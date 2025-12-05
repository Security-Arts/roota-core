// components/RootaHeader.tsx
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RootaLogo } from "./RootaLogo";

const headerStyles: { [key: string]: React.CSSProperties } = {
  wrap: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 40,
    display: "flex",
    justifyContent: "center",
    pointerEvents: "none",
  },
  inner: {
    pointerEvents: "auto",
    marginTop: 12,
    marginLeft: 12,
    marginRight: 12,
    padding: "10px 14px",
    maxWidth: 1120,
    width: "100%",
    borderRadius: 999,
    border: "1px solid rgba(30,64,175,0.55)",
    background:
      "linear-gradient(120deg, rgba(15,23,42,0.95), rgba(15,23,42,0.85))",
    boxShadow:
      "0 18px 45px rgba(15,23,42,0.9), 0 0 0 1px rgba(15,23,42,0.9)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
  },
  left: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  brandTitle: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  brandName: {
    fontSize: 15,
    fontWeight: 600,
    letterSpacing: "0.2em",
  },
  brandTagline: {
    fontSize: 11,
    color: "#9ca3af",
  },

  navWrap: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  nav: {
    display: "flex",
    gap: 6,
    padding: 3,
    borderRadius: 999,
    border: "1px solid rgba(15,23,42,0.85)",
    background: "rgba(2,6,23,0.95)",
    fontSize: 12,
  },
  navBtnBase: {
    padding: "6px 14px",
    borderRadius: 999,
    textDecoration: "none",
    border: "1px solid transparent",
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
  navBtnActive: {
    borderColor: "#1d4ed8",
    background:
      "radial-gradient(circle at top left, rgba(59,130,246,0.45), transparent 60%) #020617",
    color: "#e5e7eb",
  },
  navBtnIdle: {
    color: "#9ca3af",
  },

  // Мобільність
  headerRoot: {
    width: "100%",
  },
};

export function RootaHeader() {
  const pathname = usePathname();
  const isHive = pathname === "/" || pathname === "/hive";
  const isOverview = pathname === "/landing";
  const isAbout = pathname === "/about";

  return (
    <header style={headerStyles.wrap}>
      <div style={headerStyles.inner}>
        {/* Logo + name */}
       <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
  <div style={headerStyles.left}>
    <RootaLogo size={44} />
    <div style={headerStyles.brandTitle}>
      <span style={headerStyles.brandName}>ROOTA</span>
      <span style={headerStyles.brandTagline}>
        Ideas Stock Exchange · Proof &amp; Pulse
      </span>
    </div>
  </div>
</Link>

        {/* Nav */}
        <div style={headerStyles.navWrap}>
          <nav style={headerStyles.nav}>
            <Link
              href="/#hive"
              style={{
                ...headerStyles.navBtnBase,
                ...(isHive ? headerStyles.navBtnActive : headerStyles.navBtnIdle),
              }}
            >
              Hive
            </Link>
            <Link
              href="/"
              style={{
                ...headerStyles.navBtnBase,
                ...(pathname === "/" && !isHive
                  ? headerStyles.navBtnActive
                  : headerStyles.navBtnIdle),
              }}
            >
              Overview
            </Link>
            <Link
              href="/about"
              style={{
                ...headerStyles.navBtnBase,
                ...(isAbout
                  ? headerStyles.navBtnActive
                  : headerStyles.navBtnIdle),
              }}
            >
              About
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
