"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RootaLogo } from "./RootaLogo";

export function RootaHeader() {
  const pathname = usePathname();

  const isActive = (route: string) => {
    if (route === "/hive" && (pathname === "/" || pathname === "/hive"))
      return true;
    return pathname === route;
  };

  const tabStyle = (active: boolean): React.CSSProperties => ({
    padding: "6px 14px",
    borderRadius: 999,
    fontSize: 13,
    textDecoration: "none",
    border: active ? "1px solid #3b82f6" : "1px solid transparent",
    background: active
      ? "radial-gradient(circle at 20% 0, rgba(37,99,235,1), rgba(15,23,42,1))"
      : "transparent",
    color: active ? "#fff" : "#9ca3af",
    cursor: "pointer",
  });

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 40,
        display: "flex",
        justifyContent: "center",
        padding: "8px 10px",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
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
        }}
      >
        <Link
          href="/"
          style={{ display: "flex", alignItems: "center", gap: 10 }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(0,0,0,0.45)",
              border: "1px solid #1f2937",
            }}
          >
            <RootaLogo size={26} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <div
              style={{
                fontSize: 14,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
              }}
            >
              ROOTA
            </div>
            <div style={{ fontSize: 12, color: "#9ca3af" }}>
              Ideas Stock Exchange · Proof & Pulse
            </div>
          </div>
        </Link>

        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <Link
            href="/hive"
            className="roota-tab"
            style={tabStyle(isActive("/hive"))}
          >
            Hive
          </Link>

          <Link
            href="/overview"
            className="roota-tab"
            style={tabStyle(isActive("/overview"))}
          >
            Overview
          </Link>

          <Link
            href="/about"
            className="roota-tab"
            style={tabStyle(isActive("/about"))}
          >
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default RootaHeader;
