"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RootaLogo } from "@/components/RootaLogo";

const headerStyles: { [key: string]: React.CSSProperties } = {
  wrap: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 40,
    backdropFilter: "blur(16px)",
    background:
      "linear-gradient(to bottom, rgba(15,23,42,0.98), rgba(15,23,42,0.94), rgba(15,23,42,0.88))",
    borderBottom: "1px solid rgba(15,23,42,0.9)",
  },
  inner: {
    maxWidth: 1120,
    margin: "0 auto",
    padding: "14px 20px 10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20,
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
    fontSize: 16,
    fontWeight: 600,
    letterSpacing: "0.24em",
  },
  brandTagline: {
    fontSize: 11,
    color: "#9ca3af",
  },
  navWrap: {
    display: "flex",
    alignItems: "center",
    gap: 16,
  },
  nav: {
    display: "flex",
    gap: 6,
    padding: 3,
    borderRadius: 999,
    border: "1px solid #1f2937",
    background: "rgba(2,6,23,0.95)",
    fontSize: 12,
  },
  navBtnBase: {
    padding: "5px 16px",
    borderRadius: 999,
    textDecoration: "none",
    border: "1px solid transparent",
    cursor: "pointer",
  },
  navBtnActive: {
    borderColor: "#1d4ed8",
    background:
      "radial-gradient(circle at top left, rgba(37,99,235,0.45), transparent 60%) #020617",
    color: "#e5e7eb",
  },
  navBtnIdle: {
    color: "#9ca3af",
  },
  langs: {
    display: "flex",
    gap: 6,
    fontSize: 11,
    color: "#9ca3af",
    alignItems: "center",
  },
  langChip: {
    padding: "3px 10px",
    borderRadius: 999,
    border: "1px solid transparent",
    cursor: "pointer",
  },
  langChipActive: {
    borderColor: "#1d4ed8",
    background: "rgba(15,23,42,0.95)",
    color: "#e5e7eb",
  },
};

const langs: Array<"EN" | "ES" | "JA"> = ["EN", "ES", "JA"];

export function RootaHeader() {
  const pathname = usePathname();
  const [activeLang, setActiveLang] = useState<"EN" | "ES" | "JA">("EN");
  // ...
}

  const isHive = pathname === "/" || pathname === "/hive";
  const isAbout = pathname === "/about";
  const isOverview = pathname === "/landing";

  return (
    <header style={headerStyles.wrap}>
      <div style={headerStyles.inner}>
        {/* Logo + name */}
        <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
          <div style={headerStyles.left}>
            <RootaLogo size={32} />
            <div style={headerStyles.brandTitle}>
              <span style={headerStyles.brandName}>ROOTA</span>
              <span style={headerStyles.brandTagline}>
                Ideas Stock Exchange · Proof &amp; Pulse
              </span>
            </div>
          </div>
        </Link>

        <div style={headerStyles.navWrap}>
          {/* Nav */}
          <nav style={headerStyles.nav}>
            <Link
              href="/hive"
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
                ...(isOverview
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
                ...(isAbout ? headerStyles.navBtnActive : headerStyles.navBtnIdle),
              }}
            >
              About
            </Link>
          </nav>

          {/* Langs – поки що клієнтський стейт, без реального i18n */}
          <div style={headerStyles.langs}>
            {langs.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setActiveLang(l)}
                style={{
                  ...headerStyles.langChip,
                  ...(activeLang === l ? headerStyles.langChipActive : null),
                  background: "none",
                }}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
