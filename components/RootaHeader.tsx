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
    display: "flex",
    justifyContent: "center",
    pointerEvents: "none",
  },
  inner: {
    marginTop: 12,
    width: "100%",
    maxWidth: 1100,
    padding: "10px 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    borderRadius: 999,
    background:
      "linear-gradient(90deg, rgba(15,23,42,0.96), rgba(15,23,42,0.9))",
    border: "1px solid rgba(30,64,175,0.7)",
    boxShadow: "0 18px 55px rgba(15,23,42,0.9)",
    pointerEvents: "auto",
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
    letterSpacing: "0.24em",
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
    border: "1px solid transparent",
    textDecoration: "none",
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
    gap: 4,
    fontSize: 11,
  },
  langChip: {
    padding: "3px 8px",
    borderRadius: 999,
    border: "1px solid transparent",
    cursor: "pointer",
    color: "#9ca3af",
  },
  langChipActive: {
    borderColor: "#4f46e5",
    color: "#e5e7eb",
    background: "rgba(31,41,55,0.9)",
  },

  // responsive tweaks
  "@media (max-width: 720px)": {},
};

const langs = ["EN", "ES", "JA"] as const;
type Lang = (typeof langs)[number];

export function RootaHeader() {
  const pathname = usePathname();
  const [activeLang, setActiveLang] = useState<Lang>("EN");

  const isHive = pathname === "/" || pathname === "/hive";
  const isOverview = pathname === "/landing";
  const isAbout = pathname === "/about";

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
              href="/"
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

          {/* Lang toggle – поки що декоративний */}
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
