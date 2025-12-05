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
    padding: "10px 20px",
    background:
      "linear-gradient(to bottom, rgba(15,23,42,0.96), rgba(15,23,42,0.88))",
    borderBottom: "1px solid rgba(15,23,42,0.9)",
    backdropFilter: "blur(14px)",
  },
  inner: {
    maxWidth: 1100,
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
  },
  left: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  brandTitle: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  brandName: {
    fontSize: 16,
    letterSpacing: "0.22em",
    fontWeight: 600,
  },
  brandTagline: {
    fontSize: 11,
    color: "#9ca3af",
  },
  navWrap: {
    display: "flex",
    alignItems: "center",
    gap: 14,
  },
  nav: {
    display: "flex",
    gap: 6,
    padding: 3,
    borderRadius: 999,
    border: "1px solid #1f2937",
    background: "rgba(2,6,23,0.96)",
    fontSize: 12,
  },
  navBtnBase: {
    padding: "6px 16px",
    borderRadius: 999,
    textDecoration: "none",
    border: "1px solid transparent",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    whiteSpace: "nowrap" as const,
  },
  navBtnActive: {
    borderColor: "#1d4ed8",
    background:
      "radial-gradient(circle at top left, rgba(37,99,235,0.55), transparent 60%) #020617",
    color: "#e5e7eb",
  },
  navBtnIdle: {
    color: "#9ca3af",
  },
  langs: {
    display: "flex",
    gap: 6,
    fontSize: 11,
  },
  langChip: {
    borderRadius: 999,
    border: "1px solid transparent",
    padding: "3px 8px",
    cursor: "pointer",
    color: "#9ca3af",
  },
  langChipActive: {
    borderColor: "#1d4ed8",
    background: "rgba(15,23,42,0.9)",
    color: "#e5e7eb",
  },
};

export function RootaHeader() {
  const pathname = usePathname();
  const isHive = pathname === "/" || pathname === "/hive";
  const isOverview = pathname === "/landing";
  const isAbout = pathname === "/about";

  const langs: Array<"EN" | "ES" | "JA"> = ["EN", "ES", "JA"];
  const [activeLang, setActiveLang] = useState<"EN" | "ES" | "JA">("EN");

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
                Ideas Stock Exchange · a live registry of ideas with proof and
                pulse of interest.
              </span>
            </div>
          </div>
        </Link>

        <div style={headerStyles.navWrap}>
          {/* Nav */}
          <nav style={headerStyles.nav}>
            <Link
              href="/#hive-section"
              style={{
                ...headerStyles.navBtnBase,
                ...(isHive ? headerStyles.navBtnActive : headerStyles.navBtnIdle),
              }}
            >
              Hive
            </Link>
            <Link
              href="/landing"
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

          {/* Langs – візуальний toggle, без i18n поки що */}
          <div style={headerStyles.langs}>
            {langs.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setActiveLang(l)}
                style={{
                  ...headerStyles.langChip,
                  ...(activeLang === l ? headerStyles.langChipActive : {}),
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
